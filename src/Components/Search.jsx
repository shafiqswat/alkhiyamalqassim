/** @format */
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "./context/SearchContext";

const SearchComponent = () => {
  const router = useRouter();
  const { query, handleInputChange } = useSearch();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query && query.trim() !== "") {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <div className='search-wrap'>
      <form
        method='get'
        id='searchForm'
        onSubmit={(e) => e.preventDefault()}>
        <span
          className='search-icon typcn typcn-zoom'
          aria-hidden='true'
        />
        <input
          type='hidden'
          name='app'
          value='search.run'
        />
        <input
          type='text'
          className='search-form'
          name='q'
          placeholder='ابحث عن مظلات، سواتر، خيام...'
          pattern='.{2,}'
          required
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </form>
    </div>
  );
};

export default SearchComponent;
