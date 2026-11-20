import type { Metadata } from "next";
import { site } from "@/config/site";
import { photos, type PhotoName } from "@/content/photos";

type PageMetadataOptions = {
  /** Page title without the brand suffix. Omit for the home page title. */
  title?: string;
  /** Root-relative path with trailing slash, e.g. "/about/". */
  path: string;
  description?: string;
  /** Photo used for social previews. */
  image?: PhotoName;
};

/**
 * Per-page metadata: absolute title, description, canonical URL and Open
 * Graph tags. Relative URLs are resolved against `metadataBase` (root layout).
 */
export function pageMetadata({
  title,
  path,
  description = site.description,
  image = "home",
}: PageMetadataOptions): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : site.defaultTitle;
  const { src, width, height } = photos[image].full;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      title: fullTitle,
      description,
      url: path,
      images: [{ url: src, width, height }],
    },
  };
}
