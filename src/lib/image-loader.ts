import type { ImageLoaderProps } from "next/image";
import { photos } from "@/content/photos";

/**
 * next/image loader for the static export.
 *
 * There is no image server, so photos are pre-sized at 640px and 1600px.
 * next.config.ts limits srcset widths to exactly those two (deviceSizes), and
 * this loader maps each requested width to the matching file.
 */
const SMALL_WIDTH = 640;

const smallVariantBySrc = new Map<string, string>(
  Object.values(photos).map(({ full, small }) => [full.src, small.src]),
);

export default function imageLoader({ src, width }: ImageLoaderProps): string {
  if (width <= SMALL_WIDTH) return smallVariantBySrc.get(src) ?? src;
  return src;
}
