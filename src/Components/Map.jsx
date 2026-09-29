/** @format */
"use client";

import React from "react";

export default function MapEmbed() {
  return (
    <div
      style={{
        width: "100%",
        height: 0,
        paddingBottom: "56.25%",
        position: "relative",
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}>
      <iframe
        title='Google Map Location'
        src='https://maps.app.goo.gl/rEdN5q4e4D3UzX816'
        style={{
          border: 0,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
        allowFullScreen
      />
    </div>
  );
}
