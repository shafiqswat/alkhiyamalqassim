/** @format */
"use client";

import React, { useEffect } from "react";
import CardComponent from "../../src/Components/layout/Card";
import CardSkeleton from "../../src/Components/layout/CardSkeleton";
import { usePosts } from "../../src/Context/postContext";

export default function Page() {
  const { posts, loading } = usePosts();

  useEffect(() => {
    document.title = "بيوت شعر القصيم | الخيام القصيم";
  }, []);

  // Filter posts that contain "بيوت شعر" or "شعر" in the title or span
  const filteredPosts = posts.filter(
    (post) =>
      post.title.includes("بيوت شعر") ||
      post.title.includes("شعر") ||
      post.span.includes("بيوت شعر") ||
      post.span.includes("شعر")
  );

  return (
    <main>
      <h1 style={{ display: "none" }}>بيوت شعر</h1>
      {loading ? (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </>
      ) : (
        filteredPosts.map((item, index) => (
          <CardComponent
            key={item.id || index}
            item={{
              id: item.id,
              cardImage: item.imageUrl,
              cardTitle: item.title,
              cardSpan: item.span,
            }}
          />
        ))
      )}
    </main>
  );
}
