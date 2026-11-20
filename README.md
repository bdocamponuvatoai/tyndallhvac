# Tyndall HVAC website

Marketing website for Tyndall HVAC, Inc. (Antioch, California): heating, cooling,
heat pumps and system care for homes and light commercial properties in Contra
Costa County.

Built with Next.js 16 (App Router) and React 19, exported as a fully static site
(`out/`). No server, database or third-party scripts. The contact page builds an
email draft in the visitor's own mail app; nothing is submitted or booked.

> **Status:** preview, not launched. Search engines are blocked until the owner
> approves the content (see [Before launch](#before-launch)).

## Getting started

Requires Node.js 20.9 or newer (CI uses the version in `.nvmrc`).

```bash
npm ci          # install exact dependencies from the lockfile
npm run dev     # http://localhost:3000
```

Production build and local preview:

```bash
npm run build   # writes the static site to out/
npm run preview # serves out/ at http://localhost:3000
```

## Scripts

| Script                 | What it does                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `npm run dev`          | Development server with hot reload.                                                         |
| `npm run build`        | Static export to `out/`. Runs `postbuild` automatically.                                    |
| `postbuild`            | `scripts/fix-export-segments.mjs`: fixes prefetch file names on Windows builds (see below). |
| `npm run preview`      | Serves `out/` with `serve@14` (fetched on demand, not a dependency).                        |
| `npm run lint`         | ESLint (Next.js core-web-vitals + TypeScript rules).                                        |
| `npm run typecheck`    | Generates Next.js route types, then `tsc --noEmit`.                                         |
| `npm run format`       | Formats everything with Prettier.                                                           |
| `npm run format:check` | Fails if any file is not formatted.                                                         |
| `npm run check:links`  | After a build: verifies every internal `href`/`src` in `out/` resolves to a file.           |
| `npm run check`        | `typecheck` + `lint` + `format:check`. CI runs this on every push and pull request.         |

## Project structure

```
src/
  app/                    Routes (one folder per URL), metadata files
    layout.tsx            Root layout: header, footer, global metadata
    page.tsx              Home
    services/             /services/ and /services/[slug]/ (static params only)
    about/ service-areas/ contact/ privacy/
    not-found.tsx         Styled 404
    icon.svg              Favicon
    robots.ts sitemap.ts  Generated at build time from config + content
  components/
    layout/               Utility bar, header (client), footer, mobile contact bar
    sections/             Shared sections: CTA band, FAQ list, page intro, area search
    home/ services/ about/ contact/   Page-specific sections
    ui/                   Brand, Photo, Eyebrow, ButtonLink, TextLink, SmartLink, icons
    seo/                  JSON-LD structured data
  config/
    site.ts               Business details + navigation (safe for client code)
    deployment.ts         SITE_URL / SITE_INDEXABLE (server only)
  content/                Typed copy: services, FAQs, service areas, home widgets, photos
  lib/                    Framework-free helpers: metadata, inquiry email, image loader
  styles/                 globals.css imports ordered partials (base, components, layout, sections, pages)
  assets/images/          Photos (static imports, 640px and 1600px WebP)
scripts/                  Build helpers (see Scripts)
docs/                     Content sources and verification records
```

## Conventions

- **Server Components by default.** Client components (`"use client"`) are
  limited to real interactivity: the mobile menu, the service-need and season
  toggles, the service rail, the area search and the inquiry planner.
- **Content lives in `src/content/`, business facts in `src/config/site.ts`.**
  Never add hours, prices, reviews, ratings, certifications, warranties or
  addresses that the owner has not confirmed (see `docs/content-sources.md`).
- **Links:** use `SmartLink`/`ButtonLink`/`TextLink`. Root-relative hrefs use
  `next/link`; `tel:`, `mailto:`, hash and external links stay plain anchors.
  Internal URLs keep the trailing slash (`/about/`).
- **Images:** `Photo` wraps `next/image` with static imports. Each photo has a
  640px and a 1600px file; the custom loader (`src/lib/image-loader.ts`) and
  `images.deviceSizes` in `next.config.ts` map `srcset` widths onto them. Mark
  the above-the-fold image with `priority`.
- **CSS:** plain global CSS, split into partials by component. **Import order in
  `src/styles/globals.css` matters**: later partials override earlier ones at
  equal specificity. Fonts use the `--font` token (system stack, no web fonts).
- **Metadata:** every page exports `pageMetadata({ title, path, description })`
  for an absolute title, canonical URL and Open Graph tags.
- **Query presets:** `/contact/?service=<slug>` and `?city=<name>` prefill the
  inquiry planner (read inside a `Suspense` boundary so the static HTML still
  contains the form).

## Routes

| Path                          | Page                                                                                         |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| `/`                           | Home                                                                                         |
| `/services/`                  | All services                                                                                 |
| `/services/<slug>/`           | `air-conditioning`, `heating`, `heat-pumps`, `maintenance`, `indoor-air`, `light-commercial` |
| `/about/`                     | Company story                                                                                |
| `/service-areas/`             | Searchable list of communities                                                               |
| `/contact/`                   | Contact details + 3-step inquiry planner (`?service=`, `?city=` presets)                     |
| `/privacy/`                   | Privacy (how the site handles inquiry details)                                               |
| `/robots.txt`, `/sitemap.xml` | Generated at build time                                                                      |

Any other path serves the styled 404 page.

## Configuration

Set these in the Vercel project (or `.env.local`; see `.env.example`). They are
read at build time and baked into the static files.

| Variable         | Default                                                                | Purpose                                                                                                      |
| ---------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `SITE_URL`       | `https://$VERCEL_PROJECT_PRODUCTION_URL`, else `http://localhost:3000` | Canonical origin for canonical URLs, Open Graph, sitemap and JSON-LD. No trailing slash.                     |
| `SITE_INDEXABLE` | `false`                                                                | `true` removes `noindex` and opens `robots.txt`. The build fails if `true` while the URL is still localhost. |

## Before launch

- [ ] Owner confirms every business fact on the site (phone, email, founding
      year, service list, service-area list).
- [ ] Replace the AI-generated photos with real photography where possible.
      Until then, keep the "AI-generated illustrative image" labels.
- [ ] Owner approves the brand mark (currently a proposed design treatment).
- [ ] Replace `/privacy/` (which describes how the site behaves today) with a
      business-approved privacy policy.
- [ ] Decide how inquiries should be handled (today: email draft only).
- [ ] Connect the custom domain, set `SITE_URL`, then `SITE_INDEXABLE=true` and
      redeploy.
- [ ] Run Lighthouse on the live site and submit `/sitemap.xml` in Google
      Search Console.

## Continuous integration

`.github/workflows/ci.yml` runs on pushes to `main` and on pull requests:
`npm ci` → `npm run check` → `npm run build` → `npm run check:links`, then
uploads `out/` as a build artifact. Dependabot (`.github/dependabot.yml`) opens
weekly npm updates (Next.js/React grouped) and monthly GitHub Actions updates.

## Hosting

Any static host works: deploy the contents of `out/`. Directory index files
(`about/index.html`) must be served for `/about/`, and unknown paths should
serve `404.html`.

On **Vercel**, import the repository with the Next.js framework preset; the
static export is detected automatically. `vercel.json` adds security headers
(`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
`Permissions-Policy`, `Strict-Transport-Security`).

### Windows builds

On Windows, `next build` writes some prefetch files into nested folders
(`__next.about/__PAGE__.txt`) instead of flat names
(`__next.about.__PAGE__.txt`), which makes link prefetches 404.
`scripts/fix-export-segments.mjs` runs after every build and flattens them; it
is a no-op on Linux/macOS.

### Deployment

Not deployed yet.
