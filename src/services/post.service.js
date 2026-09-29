/** @format */

import { firestore } from "../lib/firebaseConfig";
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
import { getCurrentUser, isOwner } from "./user.service";

const POSTS_COLLECTION = "posts";

// Defer collection reference to call time to avoid accessing firestore during SSG/SSR
const getPostsCollection = () => {
  if (!firestore)
    throw new Error("Firestore is not available in this environment");
  return collection(firestore, POSTS_COLLECTION);
};

const assertOwner = () => {
  const user = getCurrentUser();
  if (!isOwner(user)) {
    const error = new Error("غير مصرح: يجب تسجيل دخول المالك");
    error.code = "auth/not-owner";
    throw error;
  }
};

export const createPost = async (post) => {
  assertOwner();
  const payload = {
    title: post.title || "",
    span: post.span || "",
    imageUrl: post.imageUrl || "",
    description: post.description || "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const ref = await addDoc(getPostsCollection(), payload);
  const snapshot = await getDoc(ref);
  return { id: ref.id, ...snapshot.data() };
};

export const listPosts = async () => {
  const q = query(getPostsCollection(), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getPost = async (id) => {
  if (!firestore)
    throw new Error("Firestore is not available in this environment");
  const ref = doc(firestore, POSTS_COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};

export const updatePost = async (id, updates) => {
  assertOwner();
  if (!firestore)
    throw new Error("Firestore is not available in this environment");
  const ref = doc(firestore, POSTS_COLLECTION, id);
  await updateDoc(ref, { ...updates, updatedAt: serverTimestamp() });
  const snap = await getDoc(ref);
  return { id: snap.id, ...snap.data() };
};

export const deletePostById = async (id) => {
  assertOwner();
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
