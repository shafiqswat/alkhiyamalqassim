/** @format */
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

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
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const { listPosts } = await import("../services/post.service");
      const data = await listPosts();
      setPosts(data || []);
    } catch (error) {
      console.error("Error loading posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (!cancelled) refresh();
    };
    // Defer Firestore off the critical rendering path
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1800 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(id);
      };
    }
    const t = setTimeout(start, 200);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [refresh]);

  const createPost = async (post) => {
    const { createPost: createPostService } = await import(
      "../services/post.service"
    );
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
    const { updatePost: updatePostService } = await import(
      "../services/post.service"
    );
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
    const { deletePostById } = await import("../services/post.service");
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
    [posts, loading, refresh]
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePosts = () => useContext(PostContext);

export default PostContext;
