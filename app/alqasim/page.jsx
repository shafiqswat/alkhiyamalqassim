/** @format */
"use client";

import React, { useEffect } from "react";
import CardComponent from "../../src/Components/layout/Card";
import CardSkeleton from "../../src/Components/layout/CardSkeleton";
import { usePosts } from "../../src/Context/postContext";

export default function Page() {
  const { posts, loading } = usePosts();

  useEffect(() => {
    document.title = "مظلات القصيم بريدة عنيزة | الخيام القصيم";
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content =
      " للحدائق والأسطح والسيارات بخامات عالية جودة وبأفضل الخامات المستوردة   والمحلية، كما يوجد قماش بي في دي اف بتصاميم وأشكال حديثة وجديدة للأسطح   والحدائق، عليكم بالتواصل مع الخيام القصيم لتركيب وتصميم وتنفيذ   أفضل وأجمل مظلات وسواتر، مظلات قماش للسيارات بأرقى وأجمل التصاميم  والأشكال الجذابة والرائعة. ";
    document.head.appendChild(metaDescription);
  }, []);

  return (
    <main>
      <h1 style={{ display: "none" }}>
        مظلات وسواتر القصيم
        <strong>
          للحدائق والأسطح والسيارات بخامات عالية جودة وبأفضل الخامات المستوردة
          والمحلية، كما يوجد قماش بي في دي اف بتصاميم وأشكال حديثة وجديدة للأسطح
          والحدائق، عليكم بالتواصل مع الخيام القصيم لتركيب وتصميم وتنفيذ
          أفضل وأجمل مظلات وسواتر، مظلات قماش للسيارات بأرقى وأجمل التصاميم
          والأشكال الجذابة والرائعة.
        </strong>
        <strong>
          الخيام القصيم تفصيل خيام ملكي مظلات سواتر موقف سيارت مظلات
          مدارس القصيم بريده عنيزه
        </strong>
      </h1>
      <div>
        {loading ? (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </>
        ) : (
          posts.map((item, index) => (
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
      </div>
    </main>
  );
}
