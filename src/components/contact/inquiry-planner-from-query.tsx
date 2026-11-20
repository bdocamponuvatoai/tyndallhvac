"use client";

import { useSearchParams } from "next/navigation";
import { InquiryPlanner } from "@/components/contact/inquiry-planner";
import { getService } from "@/content/services";

/**
 * Reads ?service=<slug> and ?city=<name> and presets the planner. Render it
 * inside <Suspense fallback={<InquiryPlanner />}> so the static HTML still
 * contains the (empty) form. The key remounts the planner when the preset
 * changes during client-side navigation.
 */
export function InquiryPlannerFromQuery() {
  const searchParams = useSearchParams();
  const service = getService(searchParams.get("service"))?.name ?? "";
  const city = searchParams.get("city") ?? "";
  return (
    <InquiryPlanner
      key={`${service}|${city}`}
      initialService={service}
      initialCity={city}
    />
  );
}
