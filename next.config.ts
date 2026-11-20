import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to out/.
  output: "export",
  // /about/ is exported as about/index.html, which every static host serves.
  trailingSlash: true,
  images: {
    // No image server in a static export. Photos are pre-sized at 640px and
    // 1600px; the loader maps each srcset width to the matching file.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 1600],
    imageSizes: [],
  },
};

export default nextConfig;
