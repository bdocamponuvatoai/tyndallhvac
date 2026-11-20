import { AreaSearch } from "@/components/sections/area-search";
import { CtaSection } from "@/components/sections/cta-section";
import { PageIntro } from "@/components/sections/page-intro";
import { pageMetadata } from "@/lib/metadata";

const LEAD =
  "Based in Antioch, Tyndall serves homeowners and light commercial customers across Contra Costa County. Find your community to start an inquiry.";

export const metadata = pageMetadata({
  title: "Antioch & Contra Costa County service areas",
  path: "/service-areas/",
  description: LEAD,
});

export default function ServiceAreasPage() {
  return (
    <>
      <PageIntro
        eyebrow="CLOSE TO HOME"
        title={
          <>
            Local care.
            <br />
            Across the county.
          </>
        }
        lead={LEAD}
      />
      <section className="container areas-full">
        <AreaSearch />
      </section>
      <CtaSection />
    </>
  );
}
