/** @format */
"use client";

import React, { useEffect } from "react";
import CardComponent from "../../../src/Components/layout/Card";
import CardSkeleton from "../../../src/Components/layout/CardSkeleton";
import { usePosts } from "../../../src/Context/postContext";

export default function Page() {
  const { posts, loading } = usePosts();

  useEffect(() => {
    document.title = "سواتر لكسان القصيم | الخيام القصيم";
  }, []);

  // Filter posts that contain "سواتر لكسان" or "لكسان" in the title or span
  const filteredPosts = posts.filter(
    (post) =>
      post.title.includes("سواتر لكسان") ||
      post.title.includes("لكسان") ||
      post.span.includes("سواتر لكسان") ||
      post.span.includes("لكسان")
  );

  return (
    <main>
      <h1 style={{ display: "none" }}>سواتر لكسان</h1>
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
