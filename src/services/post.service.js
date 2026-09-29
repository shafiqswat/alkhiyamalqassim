/** @format */

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getFirestoreDb } from "../lib/firebaseConfig";
import { getCurrentUser, isOwner } from "./user.service";

const POSTS_COLLECTION = "posts";

const getPostsCollection = async () => {
  const firestore = await getFirestoreDb();
  if (!firestore)
    throw new Error("Firestore is not available in this environment");
  return collection(firestore, POSTS_COLLECTION);
};

const assertOwner = async () => {
  const user = await getCurrentUser();
  if (!isOwner(user)) {
    const error = new Error("غير مصرح: يجب تسجيل دخول المالك");
    error.code = "auth/not-owner";
    throw error;
  }
};

export const createPost = async (post) => {
  await assertOwner();
  const payload = {
    title: post.title || "",
    span: post.span || "",
    imageUrl: post.imageUrl || "",
    description: post.description || "",
    imageAlt: post.imageAlt || "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const col = await getPostsCollection();
  const ref = await addDoc(col, payload);
  const snapshot = await getDoc(ref);
  return { id: ref.id, ...snapshot.data() };
};

export const listPosts = async () => {
  const col = await getPostsCollection();
  const q = query(col, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getPost = async (id) => {
  const firestore = await getFirestoreDb();
  if (!firestore)
    throw new Error("Firestore is not available in this environment");
  const ref = doc(firestore, POSTS_COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};

export const updatePost = async (id, updates) => {
  await assertOwner();
  const firestore = await getFirestoreDb();
  if (!firestore)
    throw new Error("Firestore is not available in this environment");
  const ref = doc(firestore, POSTS_COLLECTION, id);
  await updateDoc(ref, { ...updates, updatedAt: serverTimestamp() });
  const snap = await getDoc(ref);
  return { id: snap.id, ...snap.data() };
};

export const deletePostById = async (id) => {
  await assertOwner();
  const firestore = await getFirestoreDb();
  if (!firestore)
    throw new Error("Firestore is not available in this environment");
  const ref = doc(firestore, POSTS_COLLECTION, id);
  await deleteDoc(ref);
};

export default {
  createPost,
  listPosts,
  getPost,
  updatePost,
  deletePostById,
};
