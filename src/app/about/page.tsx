import { Story } from "@/components/about/story";
import { Values } from "@/components/about/values";
import { CtaSection } from "@/components/sections/cta-section";
import { PageIntro } from "@/components/sections/page-intro";
import { pageMetadata } from "@/lib/metadata";

const LEAD =
  "A local business. A practical approach. People who take the time to help you understand your heating and cooling options.";

export const metadata = pageMetadata({
  title: "Our story",
  path: "/about/",
  description: LEAD,
  image: "technician",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="TYNDALL HVAC · LOCAL SINCE 2006"
        title={
          <>
            It’s your home.
            <br />
            It should feel personal.
          </>
        }
        lead={LEAD}
      />
      <Story />
      <Values />
      <CtaSection />
    </>
  );
}
