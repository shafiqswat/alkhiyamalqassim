/** @format */
"use client";

import { useEffect } from "react";

/** Loads App.css after first paint to shorten render-blocking critical path. */
export default function DeferredAppStyles() {
  useEffect(() => {
    import("../App.css");
  }, []);
  return null;
}
