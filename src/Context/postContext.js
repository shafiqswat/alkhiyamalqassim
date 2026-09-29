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

function mapSeedPosts(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map((p) => ({
    id: p.id,
    title: p.title || "",
    span: p.span || "",
    description: p.description || "",
    imageUrl: p.imageUrl || "",
    imageAlt: p.imageAlt || "",
  }));
}

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshFromFirestore = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const { listPosts } = await import("../services/post.service");
      const data = await listPosts();
      if (data?.length) setPosts(data);
    } catch {
      /* keep seed / cached posts — avoid console noise in production */
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadSeed = async () => {
      let seeded = false;
      try {
        const res = await fetch("/data/posts-seed.json", {
          cache: "force-cache",
        });
        if (res.ok) {
          const json = await res.json();
          if (!cancelled && json?.length) {
            setPosts(mapSeedPosts(json));
            setLoading(false);
            seeded = true;
          }
        }
      } catch {
        /* fall through */
      }

      if (cancelled) return;

      if (!seeded) {
        await refreshFromFirestore(true);
        return;
      }

      const syncLater = () => {
        if (!cancelled) refreshFromFirestore(false);
      };

      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(syncLater, { timeout: 15000 });
      } else {
        setTimeout(syncLater, 10000);
      }
    };

    loadSeed();
    return () => {
      cancelled = true;
    };
  }, [refreshFromFirestore]);

  const refresh = useCallback(async () => {
    await refreshFromFirestore(true);
  }, [refreshFromFirestore]);

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
