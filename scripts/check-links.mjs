// Verifies that every root-relative href/src in the exported HTML resolves to a
// file in out/ (directories must contain index.html). Run after `npm run build`.
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve("out");

async function listHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((e) => {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) return listHtml(p);
      return p.endsWith(".html") ? [p] : [];
    }),
  );
  return nested.flat();
}

async function exists(target) {
  try {
    const info = await stat(target);
    if (info.isDirectory()) await stat(path.join(target, "index.html"));
    return true;
  } catch {
    return false;
  }
}

const pages = await listHtml(OUT_DIR);
const failures = [];
let checked = 0;
for (const page of pages) {
  const html = await readFile(page, "utf8");
  const refs = html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g);
  for (const [, ref] of refs) {
    checked++;
    if (!(await exists(path.join(OUT_DIR, decodeURIComponent(ref))))) {
      failures.push(`${path.relative(OUT_DIR, page)} -> ${ref}`);
    }
  }
}

if (failures.length) {
  console.error(`Broken internal links:\n${failures.join("\n")}`);
  process.exit(1);
}
console.log(
  `Checked ${checked} internal links in ${pages.length} pages: all resolve.`,
);
