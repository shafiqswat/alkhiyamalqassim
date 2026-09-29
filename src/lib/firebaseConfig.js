/** @format */

import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let _firestore = null;
let _auth = null;

export const getFirestoreDb = async () => {
  if (typeof window === "undefined") return null;
  if (_firestore) return _firestore;
  const { getFirestore } = await import("firebase/firestore");
  _firestore = getFirestore(app);
  return _firestore;
};

/** Auth ONLY for /admin — never init on public pages (avoids auth iframe ~93KB) */
export const getFirebaseAuth = async () => {
  if (typeof window === "undefined") return null;
  if (_auth) return _auth;
  const { getAuth } = await import("firebase/auth");
  _auth = getAuth(app);
  return _auth;
};

export const firestore = null;
export const auth = null;

/**
 * Analytics after interaction or long idle. Skip on Save-Data / 2G.
 */
export function initAnalyticsDeferred() {
  if (typeof window === "undefined") return;

  const conn =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  if (conn?.saveData) return;
  if (conn?.effectiveType && /2g/.test(conn.effectiveType)) return;

  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    import("firebase/analytics")
      .then(({ getAnalytics, isSupported }) =>
        isSupported().then((ok) => {
          if (ok) getAnalytics(app);
        })
      )
      .catch(() => {});
  };

  const onInteract = () => {
    cleanup();
    setTimeout(run, 2500);
  };
  const cleanup = () => {
    window.removeEventListener("scroll", onInteract);
    window.removeEventListener("pointerdown", onInteract);
    window.removeEventListener("keydown", onInteract);
  };

  window.addEventListener("scroll", onInteract, { passive: true, once: true });
  window.addEventListener("pointerdown", onInteract, { once: true });
  window.addEventListener("keydown", onInteract, { once: true });

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => setTimeout(run, 12000), {
      timeout: 20000,
    });
  } else {
    setTimeout(run, 15000);
  }
}

export default app;
