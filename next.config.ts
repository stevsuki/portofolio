import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: { optimizeCss: true },
  productionBrowserSourceMaps: true,
};

export default nextConfig;
