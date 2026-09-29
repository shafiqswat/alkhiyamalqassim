/** @format */
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createPost as createPostService,
  deletePostById,
  listPosts,
  updatePost as updatePostService,
} from "../services/post.service";

const PostContext = createContext({
  posts: [],
  loading: false,
  refresh: async () => {},
  createPost: async (_post) => {},
  updatePost: async (_id, _updates) => {},
  deletePost: async (_id) => {},
});

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Start with true to match server state
  const [mounted, setMounted] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await listPosts();
      setPosts(data || []);
    } catch (error) {
      console.error("Error loading posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    // Only fetch on client side
    if (typeof window !== "undefined") {
      refresh();
    }
  }, []);

  const createPost = async (post) => {
    setLoading(true);
    try {
      const created = await createPostService(post);
      setPosts((prev) => [created, ...prev]);
      return created;
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id, updates) => {
    setLoading(true);
    try {
      const updated = await updatePostService(id, updates);
      setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return updated;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    setLoading(true);
    try {
      await deletePostById(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({ posts, loading, refresh, createPost, updatePost, deletePost }),
    [posts, loading]
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePosts = () => useContext(PostContext);

export default PostContext;
