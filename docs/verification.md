# Migration verification

Records how the Next.js rebuild was checked against the original
ChatGPT-generated site. Measured on 20–21 November 2026.

- **Baseline:** the original project, copied before any change and built with
  its own settings (Next.js 16.3.4, webpack). Its `out/` export is the
  reference.
- **Candidate:** this repository (Next.js 16.4.6, Turbopack), `npm run build`.
- **Browser:** Google Chrome 157.0.8103.80 (headless, driven by
  `playwright-core` 1.65), Windows 11. Chrome only: no Firefox, Safari or real
  phones were tested.
- **Capture settings:** reduced motion, device scale factor 1, every image
  forced eager and `decode()`d, `document.fonts.ready` awaited.
- **Routes (14):** `/`, `/services/`, the 6 service pages, `/about/`,
  `/service-areas/`, `/contact/`, `/contact/?service=heat-pumps&city=Walnut%20Creek`,
  `/privacy/`, and an unknown URL (404 page).
- **Widths (6):** 1600, 1280, 1024, 768, 390 and 320 px. Together they cover
  every CSS breakpoint band (≤560, 561–800, 801–1100, 1101–1599, ≥1600).

## 1. Build and static checks

| Check                                       | Result                                      |
| ------------------------------------------- | ------------------------------------------- |
| `npm run build`                             | Pass; 17 static outputs                     |
| `npm run check` (typecheck, lint, Prettier) | Pass                                        |
| `npm run check:links`                       | 550 internal links in 15 pages: all resolve |
| `npm audit --omit=dev` / `npm audit`        | 0 vulnerabilities / 0 vulnerabilities       |

## 2. Pixel parity (before removing disclaimers)

Full-page screenshots, compared with `pixelmatch` at threshold 0, with
anti-aliased pixels counted: any changed pixel is a difference.

| Comparison                                         | Identical | Different                 |
| -------------------------------------------------- | --------- | ------------------------- |
| Legacy vs this code built with webpack             | 84 / 84   | 0                         |
| Legacy vs this code built with Turbopack (shipped) | 78 / 84   | 6 (home page, all widths) |

**The 6 home-page differences:** 521–6,857 pixels per capture, at most 0.1%
of the page. **Every differing pixel is off by exactly 1/255** in one colour
channel. They sit inside two gradient overlays (the hero shade and the service
card shade). Cause: Turbopack minifies CSS with Lightning CSS. It rewrites
`rgba(4, 17, 27, .96)` as `#04111bf5`, which rounds alpha to 1/255 steps, and it
rewrites `0deg` gradients as top-to-bottom with the stops reversed. The legacy
build used webpack's minifier, which keeps the original form. The same source
built with webpack is pixel-identical (84/84), so the port itself is exact.
No source spelling survives Lightning CSS unchanged, and disabling it would
also disable JavaScript minification. Turbopack is kept as the Next.js 16
default. To get bit-exact output, build with `next build --webpack`.

**Capture determinism.** Two capture problems were found and fixed before these
numbers were taken:

1. Playwright's `fullPage` mode resized the viewport at capture time. While
   Chrome re-rasterised images, the same page could differ from itself by up to
   about 1M pixels. Fix: set the viewport to the document height, let it settle,
   then take a normal screenshot.
2. Chrome's asynchronous image decoding ("checker imaging") still caused
   occasional photo noise. Fix: launch with `--disable-checker-imaging
--run-all-compositor-stages-before-draw --disable-partial-raster
--force-color-profile=srgb`.

After the fixes, the same page captured 8 times in a row was identical every
time, on both builds. One rare case remains: Chrome sometimes rasterises a
photo from a lower-resolution decode. So a difference only counts if it
reproduces when both pages are captured again (up to 2 retakes). Each run below
states how many retakes it needed.

## 3. CSS split and cleanup

The legacy stylesheet was one 33 KB minified file. It was split into 33
partials under `src/styles/`, imported in order from `globals.css`.

- **Split:** the multiset of (media, selector, property, value) entries is
  identical before and after (1,390 = 1,390). 467 selector pairs changed
  relative order across partials. For each pair, a browser check looked for an
  element matching both selectors, across all 14 routes, at 1280 and 390 px,
  and in every interactive state (menu open, heating season, FAQ open, no-match
  search, form steps 2 and 3). It found **0** such elements, so the reordering
  cannot change which rule wins.
- **Computed styles, legacy vs the new build:** every element on every route at
  every width. The DOM structure matched everywhere (0 mismatches), and **no
  element's box position or size changed**. The property differences are all
  explained:
  - `color` on `<img>`: next/image adds `style="color:transparent"`, which only
    affects alt text on broken images.
  - `background-position` `0% 0%` → `0px 0px`: Lightning CSS serialisation; the
    rendered position is the same.
  - The new `--font` token, and the breadcrumb changed from `div` to
    `nav aria-label="Breadcrumb"`.
  - The two re-encoded gradients described above.
- **Cleanup (Phase 5):** the legacy file ended with "readability overrides".
  These re-set font sizes after all breakpoints, leaving many dead
  declarations. They were folded into the rules they override: 41 shadowed
  declarations and 14 redundant re-declarations were removed, and 28 overrides
  moved into their own rules (1,332 → 1,277 declarations; 0 trailing rules
  left). Every deletion and move was checked by rule, or in the browser, so
  that nothing that could compete for the same element was affected.
- **Fold result, before vs after (same DOM):** computed styles: **0
  differences**. Pixels: **84/84 identical** (1 retake).

## 4. Behaviour parity

The same scripted interactions ran on both sites, and the JSON outcomes were
compared: 41 checks.

- **Identical (36):** service-need toggles and keyboard use; season toggle
  (copy, link, icon, background); service rail Previous/Next (0 → 392 → 784 →
  392 px); FAQ open; city search (home teaser, full directory, no-match message
  with call link); city link to a pre-filled contact form.
- **Inquiry planner, also identical:** native validation (missing service and
  city, missing name, invalid email); the 3 steps with focus moving to each
  step heading; the review summary; Edit and Back keep every value. The
  **`mailto:` href matches byte for byte**, as do the copied clipboard text
  and the downloaded `tyndall-service-inquiry.txt`. `?service=` and `?city=`
  presets work, including an unknown slug and the service page's call to
  action.
- **Different (5), all intended improvements:**

| Check                                        | Legacy                                  | New                              |
| -------------------------------------------- | --------------------------------------- | -------------------------------- |
| Escape closes the mobile menu                | Focus falls to `<body>`                 | Focus returns to the menu button |
| Resize to desktop with menu open             | Stays open; reappears when resized back | Closes                           |
| "Plan a repair" / "Explore an upgrade" links | `/contact/?service=` (empty)            | `/contact/` (same form state)    |

- **Screenshots of open states:** the finder, warm season, open FAQ, no-match
  search, form step 1, form step 2 and review are identical. The open mobile
  menu differs by 132 px, all delta 1, in the hero gradient behind it (the
  Lightning CSS rounding above).

## 5. Navigation (client-side)

A 14-step click path: header, service tile, related link, breadcrumb, hero hash
link, footer links, city link with preset, Back twice, Privacy, logo, header
call to action.

| Metric                                | Legacy              | New                              |
| ------------------------------------- | ------------------- | -------------------------------- |
| Steps kept JS state (no full reload)  | 14 / 14             | 14 / 14                          |
| Titles and `aria-current` update      | Yes                 | Yes                              |
| Hash link scrolls; Back restores page | Yes                 | Yes                              |
| Unexpected 4xx responses              | 22 (prefetch files) | **0**                            |
| Console errors / hydration warnings   | 23 / 0              | 1 (the deliberate 404 visit) / 0 |

Over the full pixel run (168 page loads per site), the legacy server logged
909 prefetch 404s and the new one logged 0. The cause is a Next.js bug on
Windows: static export writes nested prefetch folders. In this project,
`scripts/fix-export-segments.mjs` repairs the output after every build.

## 6. `<head>` changes

| Tag                  | Legacy                                                               | New                                                              |
| -------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `<title>`            | As listed                                                            | Unchanged; the 404 page is now "Page not found \| Tyndall HVAC"  |
| Description          | One site-wide (service pages had their own)                          | One per page, taken from each page's existing copy               |
| robots               | `noindex, nofollow`                                                  | Same until `SITE_INDEXABLE=true`                                 |
| Canonical            | None                                                                 | Absolute, per page (from `SITE_URL`)                             |
| Open Graph / Twitter | Same title and image on every page, on the old `chatgpt.site` domain | Per-page title, description, URL and photo; site name, locale    |
| Icon                 | `/brand/favicon.svg`                                                 | `/icon.svg` (same artwork, content-hashed)                       |
| theme-color          | None                                                                 | `#ffffff`                                                        |
| JSON-LD              | None                                                                 | `HVACBusiness` on the home page; confirmed facts only            |
| robots.txt / sitemap | None                                                                 | Generated; robots disallows everything until indexing is enabled |

## 7. After removing disclaimers (Phase 5)

The owner-facing "design concept" framing was removed (option A):

- footer "Design concept by Nuvato";
- "Private design concept." in the footer note;
- the meta description suffix;
- the form's "This preview does not submit forms or confirm appointments.";
- the Privacy page's concept wording. The page was renamed "Privacy" and still
  states that the photos are AI-generated.

The AI-photo labels and the "inquiries open your email app" note were kept.

- **Region check (legacy vs final):** every route at every width was compared
  down to the first changed element (the footer, or the form disclosure on
  Contact, or the article on Privacy). Above that point, all 84 captures match
  legacy, apart from the known delta-1 home gradients and two capture effects.
  `/services/`@320 flickers between 0 and 4 px from capture to capture.
  `/services/heat-pumps/`@390 showed 1 px only because the shorter page meant
  a different viewport height; at equal viewport heights it is 0 px on every
  attempt.
- **Changed regions**, reviewed side by side:
  - Footer: the bottom row loses "Design concept by Nuvato", so "Privacy" now
    sits at the right edge on desktop.
  - The footer note is one sentence shorter. Its bottom padding still clears
    the fixed mobile call bar, because the note itself was kept.
  - The Contact form note is one line shorter.
  - The Privacy page has reworded copy in the same structure and styles.
- **Behaviour and navigation re-run:** the same results as sections 4 and 5.
  The form screenshots are about 21 px shorter (one sentence removed).

## 8. Lighthouse (local production build)

Lighthouse 13.6.0, default mobile preset: a 412×823 viewport at DPR 1.75,
simulated slow 4G (150 ms RTT, about 1.6 Mbps) and 4× CPU slowdown. There were
3 runs per page. The site was served from `out/` by `serve@14` (gzip) on the
local machine. **This is not the live site.** Re-measure on the deployed URL.

| Page        | Performance | Accessibility | Best practices | SEO\* | LCP       | CLS | Page weight |
| ----------- | ----------- | ------------- | -------------- | ----- | --------- | --- | ----------- |
| `/`         | 80–82       | 96            | 100            | 69    | 4.6–4.7 s | 0   | 1,038 KiB   |
| `/contact/` | 93–99       | 96            | 100            | 66    | 0.8–2.2 s | 0   | 183 KiB     |

\* SEO is low on purpose. The preview is `noindex` and `robots.txt` blocks
crawling until the owner approves the launch; Lighthouse's "is-crawlable" audit
fails until then.

**What holds the scores back:**

- **Home LCP.** The LCP is the hero photo. At the emulated device's 721 px need,
  the browser picks the 1600 px file (262 KiB), because the next size down is
  640 px. Fix: add an intermediate (~1080 px) variant. It is not done, because
  it changes which file renders at some widths.
- **Home page weight.** About 850 KiB of the 1,038 KiB is three photos.
- **Accessibility 96.** This is colour contrast, which is a design change and
  needs owner approval:
  - CTA band: light-blue text on brand blue, 3.99–4.32:1;
  - contact form: two 12 px grey labels on pale grey, 4.22–4.28:1;
  - the target is 4.5:1.

**Fixed after the first audit:** the logo links' accessible name ("Tyndall
HVAC home") did not contain the visible text. They are now "Tyndall Heating &
Air home", with a collapsing space between "TYNDALL" and "HEATING & AIR".
Lighthouse `label-content-name-mismatch` now passes. A pixel check against the
previous build showed 84/84 identical (2 retakes).

## Known gaps

- No physical iPhone or Android devices, and no Safari or Firefox. All phone
  results come from Chrome at phone widths.
- Lighthouse has only been measured locally so far (section 8). Live numbers
  are added once the site is deployed.
