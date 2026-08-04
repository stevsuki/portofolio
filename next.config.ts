import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: { inlineCss: true },
  images: {
    // The portrait is already a lossy webp, so the default re-encode at 75
    // stacks a second round of compression on it and mushes the skin
    // gradients. Any quality the app asks for has to be listed here.
    qualities: [75, 90],
  },
};

export default nextConfig;
