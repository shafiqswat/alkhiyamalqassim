/** @format */

const OWNER_EMAIL = process.env.NEXT_PUBLIC_OWNER_EMAIL;

export const isOwner = (user) => {
  if (!user) return false;
  if (!OWNER_EMAIL) return true;
  return user.email === OWNER_EMAIL;
};

export const signInOwner = async (email, password) => {
  const { getFirebaseAuth } = await import("../lib/firebaseConfig");
  const auth = await getFirebaseAuth();
  if (!auth) throw new Error("Auth is not available in this environment");
  const { signInWithEmailAndPassword, signOut } = await import("firebase/auth");
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
    await signOut(auth);
    const error = new Error("Unauthorized: Not the site owner");
    error.code = "auth/not-owner";
    throw error;
  }
  return user;
};

export const signOutUser = async () => {
  const { getFirebaseAuth } = await import("../lib/firebaseConfig");
  const auth = await getFirebaseAuth();
  if (!auth) return;
  const { signOut } = await import("firebase/auth");
  await signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
  let unsubscribe = () => {};
  let cancelled = false;

  (async () => {
    try {
      const { getFirebaseAuth } = await import("../lib/firebaseConfig");
      const auth = await getFirebaseAuth();
      if (!auth || cancelled) {
        callback(null);
        return;
      }
      const { onAuthStateChanged } = await import("firebase/auth");
      unsubscribe = onAuthStateChanged(auth, callback) || (() => {});
    } catch (_) {
      callback(null);
    }
  })();

  return () => {
    cancelled = true;
    try {
      unsubscribe();
    } catch (_) {}
  };
};

export const getCurrentUser = async () => {
  const { getFirebaseAuth } = await import("../lib/firebaseConfig");
  const auth = await getFirebaseAuth();
  return auth ? auth.currentUser : null;
};

export default {
  isOwner,
  signInOwner,
  signOutUser,
  onAuthStateChangedListener,
  getCurrentUser,
};
