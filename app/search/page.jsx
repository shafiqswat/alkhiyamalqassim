/** @format */
"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSearch } from "../../src/Components/context/SearchContext";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const { searchResults } = useSearch();
  const query = searchParams.get("q") || "";

  return (
    <div>
      {query && query.trim() !== "" ? (
        searchResults.length > 0 ? (
          <ul>
            {searchResults.map((item, index) => (
              <li
                key={index}
                style={{ listStyle: "none" }}>
                <img
                  src={item.cardImage}
                  alt={item.cardTitle}
                />
                <p>{item.cardTitle}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found for "{query}"</p>
        )
      ) : (
        <p>Please enter a search term.</p>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
