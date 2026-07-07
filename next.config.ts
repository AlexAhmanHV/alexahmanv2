import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      new URL("https://lovable.dev/**"),
      new URL("https://images.seeklogo.com/**"),
      new URL("https://cdn-images-1.medium.com/**"),
    ],
  },
};

export default nextConfig;
