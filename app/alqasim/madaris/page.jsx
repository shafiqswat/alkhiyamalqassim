/** @format */
"use client";

import React, { useEffect } from "react";
import CardComponent from "../../../src/Components/layout/Card";
import CardSkeleton from "../../../src/Components/layout/CardSkeleton";
import { usePosts } from "../../../src/Context/postContext";

export default function Page() {
  const { posts, loading } = usePosts();

  useEffect(() => {
    document.title = "مظلات مدارس القصيم | الخيام القصيم";
  }, []);

  // Filter posts that contain "مدارس" or "مدرسة" in the title
  const filteredPosts = posts.filter(
    (post) =>
      post.title.includes("مدارس") ||
      post.title.includes("مدرسة") ||
      post.span.includes("مدارس") ||
      post.span.includes("مدرسة")
  );

  return (
    <main>
      <h1 style={{ display: "none" }}>مظلات مدارس</h1>
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
