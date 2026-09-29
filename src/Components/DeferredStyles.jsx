/** @format */
"use client";

import { useEffect } from "react";

/**
 * Loads non-critical CSS after first paint (typicons icon font).
 * Avoids render-blocking on mobile FCP/LCP.
 */
export default function DeferredStyles() {
  useEffect(() => {
    const id = "typicons-deferred";
    if (document.getElementById(id)) return undefined;

    const load = () => {
      if (document.getElementById(id)) return;
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "/font%20icons/typicons.min.css";
      link.media = "print";
      link.onload = () => {
        link.media = "all";
      };
      document.head.appendChild(link);
    };

    if ("requestIdleCallback" in window) {
      const rid = window.requestIdleCallback(load, { timeout: 2500 });
      return () => window.cancelIdleCallback?.(rid);
    }
    const t = setTimeout(load, 1200);
    return () => clearTimeout(t);
  }, []);

  return null;
}
