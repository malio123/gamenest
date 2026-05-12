import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.madkidgames.com",
        pathname: "/games/**",
      },
    ],
  },
};

export default nextConfig;
