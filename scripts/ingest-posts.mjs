/**
 * Authenticated ingest: source tents-f9b9d → target khiyammadinah
 * Signs in as farman@gmail.com, remaps phones/brand/alt, shuffles order.
 *
 * Usage: node scripts/ingest-posts.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { initializeApp, deleteApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnv() {
  const envPath = resolve(root, ".env");
  const raw = readFileSync(envPath, "utf8");
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    env[trimmed.slice(0, i)] = trimmed.slice(i + 1);
  }
  return env;
}

const env = loadEnv();

const SOURCE = {
  apiKey: env.SOURCE_FIREBASE_API_KEY,
  authDomain: env.SOURCE_FIREBASE_AUTH_DOMAIN,
  projectId: env.SOURCE_FIREBASE_PROJECT_ID,
  storageBucket: env.SOURCE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.SOURCE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.SOURCE_FIREBASE_APP_ID,
};

const TARGET = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const OWNER_EMAIL = env.NEXT_PUBLIC_OWNER_EMAIL || "farman@gmail.com";
const OWNER_PASSWORD = env.OWNER_PASSWORD || "farman";

const PHONE_MAP = [
  [/966500173090/g, "966500886893"],
  [/\+966500173090/g, "+966500886893"],
  [/050[\s\-]?017[\s\-]?3090/g, "0500886893"],
  [/0500173090/g, "0500886893"],
  [/059[\s\-]?066[\s\-]?7013/g, "0534614146"],
  [/0590667013/g, "0534614146"],
  [/500173090/g, "500886893"],
];

const TEXT_MAP = [
  [/مدينة الخيام المظلات/g, "الخيام القصيم"],
  [/مدينة الخيام/g, "الخيام القصيم"],
  [/madinatalkhayam\.com/gi, "alkhiyamalqassim.com"],
  [/madinatalkhayam/gi, "alkhiyamalqassim"],
  [/شركة حاتم للمقاولات/g, "الخيام القصيم"],
];

function remapText(value) {
  if (typeof value !== "string" || !value) return value || "";
  let out = value;
  for (const [re, to] of PHONE_MAP) out = out.replace(re, to);
  for (const [re, to] of TEXT_MAP) out = out.replace(re, to);
  return out;
}

function buildImageAlt(post) {
  const base =
    remapText(post.imageAlt) ||
    remapText(post.span) ||
    remapText(post.title) ||
    "مظلات وسواتر وخيام ملكي";
  let alt = base.includes("الخيام القصيم")
    ? base
    : `${base} | الخيام القصيم بريدة القصيم`;
  if (!/0500886893|0534614146/.test(alt)) {
    alt = `${alt} — تواصل 0500886893`;
  }
  return remapText(alt);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function main() {
  console.log("Source:", SOURCE.projectId);
  console.log("Target:", TARGET.projectId);
  console.log("Owner:", OWNER_EMAIL);

  const sourceApp = initializeApp(SOURCE, "source");
  const targetApp = initializeApp(TARGET, "target");
  const sourceDb = getFirestore(sourceApp);
  const targetDb = getFirestore(targetApp);
  const auth = getAuth(targetApp);

  const cred = await signInWithEmailAndPassword(
    auth,
    OWNER_EMAIL,
    OWNER_PASSWORD
  );
  console.log("Signed in:", cred.user.email);

  const snap = await getDocs(
    query(collection(sourceDb, "posts"), orderBy("createdAt", "desc"))
  );
  console.log(`Found ${snap.size} posts in source`);

  const mapped = snap.docs.map((d) => {
    const raw = d.data();
    const title = remapText(raw.title);
    const span = remapText(raw.span);
    const description = remapText(raw.description);
    return {
      id: d.id,
      title,
      span,
      description,
      imageUrl: raw.imageUrl || "",
      imageAlt: buildImageAlt({ ...raw, title, span }),
      sourceCreatedAt: raw.createdAt || null,
    };
  });

  const shuffled = shuffle(mapped);
  const now = Date.now();

  let ok = 0;
  let fail = 0;

  for (let i = 0; i < shuffled.length; i++) {
    const item = shuffled[i];
    // Newer sortOrder = higher in desc queries; shuffled index maps to staggered timestamps
    const createdAt = Timestamp.fromMillis(now - i * 1000);
    const payload = {
      title: item.title,
      span: item.span,
      description: item.description,
      imageUrl: item.imageUrl,
      imageAlt: item.imageAlt,
      sourceId: item.id,
      sortOrder: i,
      brand: "الخيام القصيم",
      createdAt,
      updatedAt: serverTimestamp(),
      ingestedAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(targetDb, "posts", item.id), payload, { merge: true });
      ok += 1;
      if (ok % 20 === 0 || ok === 1) {
        console.log(`✓ ${ok}/${shuffled.length} — ${item.title?.slice(0, 42) || item.id}`);
      }
    } catch (err) {
      fail += 1;
      console.error(`✗ ${item.id}`, err.message);
      if (fail >= 3 && ok === 0) {
        console.error(
          "\nWrites still denied. Deploy firestore.rules to project khiyammadinah,\n" +
            "or temporarily set posts write: if request.auth != null;\n"
        );
        break;
      }
    }
  }

  mkdirSync(resolve(root, "public/data"), { recursive: true });
  const backup = shuffled.map((p, i) => ({
    id: p.id,
    title: p.title,
    span: p.span,
    description: p.description,
    imageUrl: p.imageUrl,
    imageAlt: p.imageAlt,
    sortOrder: i,
  }));
  writeFileSync(
    resolve(root, "scripts/posts-backup.json"),
    JSON.stringify(backup, null, 2),
    "utf8"
  );
  writeFileSync(
    resolve(root, "public/data/posts-seed.json"),
    JSON.stringify(backup, null, 2),
    "utf8"
  );

  console.log(`Done. success=${ok} fail=${fail}`);
  await signOut(auth);
  await deleteApp(sourceApp);
  await deleteApp(targetApp);
  if (fail > 0 && ok === 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
