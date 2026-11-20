import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexable } from "@/config/deployment";

export const dynamic = "force-static";

/** Blocks every crawler until SITE_INDEXABLE=true (after owner approval). */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
