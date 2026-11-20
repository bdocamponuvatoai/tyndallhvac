import { Suspense } from "react";
import { ContactAside } from "@/components/contact/contact-aside";
import { InquiryPlanner } from "@/components/contact/inquiry-planner";
import { InquiryPlannerFromQuery } from "@/components/contact/inquiry-planner-from-query";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Let’s talk comfort — Contact Tyndall",
  path: "/contact/",
  description:
    "A repair, a tune-up, or a new system. Whatever brings you here, start with a conversation about your space.",
});

export default function ContactPage() {
  return (
    <section className="container contact-layout">
      <ContactAside />
      {/* The fallback keeps the form in the static HTML; presets apply on the client. */}
      <Suspense fallback={<InquiryPlanner />}>
        <InquiryPlannerFromQuery />
      </Suspense>
    </section>
  );
}
