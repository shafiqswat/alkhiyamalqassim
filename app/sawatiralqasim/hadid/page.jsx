/** @format */
"use client";

import React, { useEffect } from "react";
import CardComponent from "../../../src/Components/layout/Card";
import CardSkeleton from "../../../src/Components/layout/CardSkeleton";
import { usePosts } from "../../../src/Context/postContext";

export default function Page() {
  const { posts, loading } = usePosts();

  useEffect(() => {
    document.title = "سواتر حديد القصيم | الخيام القصيم";
  }, []);

  // Filter posts that contain "حديد" in the title or span
  const filteredPosts = posts.filter(
    (post) =>
      post.title.includes("حديد") ||
      post.span.includes("حديد")
  );

  return (
    <main>
      <h1 style={{ display: "none" }}>سواتر حديد</h1>
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
