import type { StaticImageData } from "next/image";
import heatPump from "@/assets/images/heatpump.webp";
import heatPumpSmall from "@/assets/images/heatpump-640.webp";
import home from "@/assets/images/home.webp";
import homeSmall from "@/assets/images/home-640.webp";
import technician from "@/assets/images/technician.webp";
import technicianSmall from "@/assets/images/technician-640.webp";

/**
 * Every photo ships in two pre-sized WebP files: 1600px (`full`) and 640px
 * (`small`). The custom image loader (src/lib/image-loader.ts) picks the small
 * file whenever the browser asks for 640px or less.
 *
 * All three photos are AI-generated illustrations, not pictures of Tyndall's
 * people, customers or projects.
 */
export const photos = {
  home: { full: home, small: homeSmall },
  technician: { full: technician, small: technicianSmall },
  heatpump: { full: heatPump, small: heatPumpSmall },
} satisfies Record<string, { full: StaticImageData; small: StaticImageData }>;

export type PhotoName = keyof typeof photos;
