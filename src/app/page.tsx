import { AboutTeaser } from "@/components/home/about-teaser";
import { AreasTeaser } from "@/components/home/areas-teaser";
import { FaqSection } from "@/components/home/faq-section";
import { HeatPumpFeature } from "@/components/home/heat-pump-feature";
import { Hero } from "@/components/home/hero";
import { SeasonFeature } from "@/components/home/season-feature";
import { ServiceFinder } from "@/components/home/service-finder";
import { ServicesShowcase } from "@/components/home/services-showcase";
import { TrustBand } from "@/components/home/trust-band";
import { CtaSection } from "@/components/sections/cta-section";
import { LocalBusinessJsonLd } from "@/components/seo/local-business-json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBand />
      <ServiceFinder />
      <ServicesShowcase />
      <HeatPumpFeature />
      <SeasonFeature />
      <AboutTeaser />
      <AreasTeaser />
      <FaqSection />
      <CtaSection />
      <LocalBusinessJsonLd />
    </>
  );
}
