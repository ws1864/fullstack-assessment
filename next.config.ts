import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      // Fix Bug 6 :allow loading product images on images-na.ssl-images-amazon.com
      { 
        protocol: "https", 
        hostname: "images-na.ssl-images-amazon.com" 
      },
    ],
  },
};

export default nextConfig;
