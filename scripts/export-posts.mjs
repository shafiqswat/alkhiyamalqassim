/**
 * Export remapped posts from source Firestore to JSON (no write permissions needed).
 * Usage: node scripts/export-posts.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { initializeApp, deleteApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

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
    "الخيام القصيم - مظلات وسواتر";
  const withBrand = base.includes("الخيام القصيم")
    ? base
    : `${base} | الخيام القصيم القصيم بريدة`;
  // Remap any leftover phone digits in alt
  return remapText(withBrand);
}

function serializeTimestamp(value) {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate().toISOString();
  if (value.seconds != null) return new Date(value.seconds * 1000).toISOString();
  return null;
}

async function main() {
  const sourceApp = initializeApp(SOURCE, "source-export");
  const sourceDb = getFirestore(sourceApp);
  const snap = await getDocs(
    query(collection(sourceDb, "posts"), orderBy("createdAt", "desc"))
  );
  console.log(`Found ${snap.size} posts`);

  const posts = snap.docs.map((d) => {
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
      createdAt: serializeTimestamp(raw.createdAt),
      brand: "الخيام القصيم",
    };
  });

  mkdirSync(resolve(root, "public/data"), { recursive: true });
  mkdirSync(resolve(root, "scripts"), { recursive: true });
  const outPublic = resolve(root, "public/data/posts-seed.json");
  const outScripts = resolve(root, "scripts/posts-backup.json");
  writeFileSync(outPublic, JSON.stringify(posts, null, 2), "utf8");
  writeFileSync(outScripts, JSON.stringify(posts, null, 2), "utf8");
  console.log(`Wrote ${posts.length} posts to:`);
  console.log(` - ${outPublic}`);
  console.log(` - ${outScripts}`);
  await deleteApp(sourceApp);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
