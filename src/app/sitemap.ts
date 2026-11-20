import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/deployment";
import { servicePath, services } from "@/content/services";

export const dynamic = "force-static";

const STATIC_ROUTES = [
  "/",
  "/services/",
  "/about/",
  "/service-areas/",
  "/contact/",
  "/privacy/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES,
    ...services.map((service) => servicePath(service.slug)),
  ].map((path) => ({ url: absoluteUrl(path) }));
}
