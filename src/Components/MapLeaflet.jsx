/** @format */
"use client";

import React from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapLeaflet() {
  // Ensure default marker icons work in Next.js bundling
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
  const center = [26.32, 43.96];
  return (
    <div
      style={{
        width: "100%",
        height: "360px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
      }}>
      <MapContainer
        center={center}
        zoom={12}
        style={{ width: "100%", height: "100%" }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <Marker position={center}>
          <Popup>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${center[0]},${center[1]}`}
              target='_blank'
              rel='noreferrer noopener'
              style={{ color: "#111827", textDecoration: "underline" }}>
              الخيام القصيم
            </a>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
