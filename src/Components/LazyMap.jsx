/** @format */
"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const MapLeaflet = dynamic(() => import("./MapLeaflet"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 280,
        borderRadius: 12,
        background: "linear-gradient(135deg,#e8efe9,#d5e0d8)",
      }}
      aria-hidden='true'
    />
  ),
});

/** Load the map only when it scrolls near the viewport. */
export default function LazyMap() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setShow(true), 2500);
      return () => clearTimeout(t);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: 280 }}>
      {show ? <MapLeaflet /> : (
        <div
          style={{
            height: 280,
            borderRadius: 12,
            background: "linear-gradient(135deg,#e8efe9,#d5e0d8)",
            display: "grid",
            placeItems: "center",
            color: "#0f4c3a",
            fontWeight: 700,
          }}>
          جارٍ تحميل الخريطة…
        </div>
      )}
    </div>
  );
}
