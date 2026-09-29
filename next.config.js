/** @format */

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === "production",
  },
  modularizeImports: {
    lodash: {
      transform: "lodash/{{member}}",
    },
  },
  experimental: {
    optimizePackageImports: ["firebase", "styled-components"],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
