/** @format */
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePosts } from "../../Context/postContext";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { posts } = usePosts();

  // Update search results whenever the query changes
  useEffect(() => {
    if (query.trim() !== "") {
      const results = posts.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]); // Clear results if no valid query
    }
  }, [query, posts]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <SearchContext.Provider
      value={{ query, setQuery, searchResults, handleInputChange }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the SearchContext
export const useSearch = () => {
  return useContext(SearchContext);
};
