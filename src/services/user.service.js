/** @format */

import { auth } from "../lib/firebaseConfig";

const OWNER_EMAIL = process.env.NEXT_PUBLIC_OWNER_EMAIL;

export const isOwner = (user) => {
  if (!user) return false;
  // If no owner email configured, treat any signed-in user as owner
  if (!OWNER_EMAIL) return true;
  return user.email === OWNER_EMAIL;
};

export const signInOwner = async (email, password) => {
  if (!auth) throw new Error("Auth is not available in this environment");
  const { signInWithEmailAndPassword } = await import("firebase/auth");
  let credential;
  try {
    credential = await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    const code = err?.code || "auth/unknown";
    const messageMap = {
      "auth/invalid-email": "البريد الإلكتروني غير صالح",
      "auth/user-disabled": "تم تعطيل هذا الحساب",
      "auth/user-not-found": "المستخدم غير موجود",
      "auth/wrong-password": "كلمة المرور غير صحيحة",
      "auth/too-many-requests": "محاولات كثيرة. حاول لاحقًا",
    };
    const error = new Error(messageMap[code] || "فشل تسجيل الدخول");
    error.code = code;
    throw error;
  }
  const user = credential.user;
  if (!isOwner(user)) {
    // Immediately sign out non-owner accounts for safety
    await signOut(auth);
    const error = new Error("Unauthorized: Not the site owner");
    error.code = "auth/not-owner";
    throw error;
  }
  return user;
};

export const signOutUser = async () => {
  if (!auth) return;
  const { signOut } = await import("firebase/auth");
  await signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
  if (!auth) {
    // Auth disabled: immediately unblock UI and report no user
    try {
      callback(null);
    } catch (_) {}
    return () => {};
  }
  // Always return a sync cleanup function; populate it once import resolves
  let unsubscribe = () => {};
  import("firebase/auth").then(({ onAuthStateChanged }) => {
    try {
      unsubscribe = onAuthStateChanged(auth, callback) || (() => {});
    } catch (_) {}
  });
  return () => {
    try {
      unsubscribe();
    } catch (_) {}
  };
};

export const getCurrentUser = () => (auth ? auth.currentUser : null);

export default {
  isOwner,
  signInOwner,
  signOutUser,
  onAuthStateChangedListener,
  getCurrentUser,
};
