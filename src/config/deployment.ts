import "server-only";

/**
 * Deployment settings, read from the environment at build time.
 * Server-only: never import this from a client component.
 *
 *   SITE_URL        Canonical origin, e.g. https://www.example.com
 *   SITE_INDEXABLE  "true" to allow search engines (requires a real SITE_URL)
 *
 * Falls back to Vercel's production domain, then to localhost for local builds.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const url =
    explicit ||
    (vercelProduction
      ? `https://${vercelProduction}`
      : "http://localhost:3000");
  return url.replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl();

export const isIndexable = process.env.SITE_INDEXABLE === "true";

const { hostname } = new URL(siteUrl);
if (isIndexable && (hostname === "localhost" || hostname === "127.0.0.1")) {
  throw new Error(
    `SITE_INDEXABLE is "true" but the site URL is still ${siteUrl}. Set SITE_URL to the public domain before enabling indexing.`,
  );
}

/** Absolute URL for a root-relative path ("/services/" -> "https://…/services/"). */
export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
