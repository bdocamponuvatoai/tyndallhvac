import { CtaSection } from "@/components/sections/cta-section";
import { PageIntro } from "@/components/sections/page-intro";
import { ServiceTile } from "@/components/services/service-tile";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

const LEAD =
  "Heating, cooling, and the details that make a space feel right. Explore services for your home or light commercial property.";

export const metadata = pageMetadata({
  title: "Heating, cooling & home comfort services",
  path: "/services/",
  description: LEAD,
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="CARE FOR THE SPACE YOU’RE IN"
        title={
          <>
            Every season.
            <br />
            Everyday comfort.
          </>
        }
        lead={LEAD}
      />
      <div className="container all-services">
        {services.map((service) => (
          <ServiceTile key={service.slug} service={service} />
        ))}
      </div>
      <CtaSection />
    </>
  );
}
