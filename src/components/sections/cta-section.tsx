import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { site } from "@/config/site";

/** Closing call-to-action band shared by most pages. */
export function CtaSection() {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <Eyebrow>LET’S MAKE HOME FEEL RIGHT</Eyebrow>
          <h2>
            Comfort starts with
            <br />a conversation.
          </h2>
          <p>Tell us what’s happening. We’ll take it from there.</p>
        </div>
        <div className="cta-actions">
          <ButtonLink href="/contact/" variant="white">
            Plan your service
          </ButtonLink>
          <a className="cta-phone" href={site.phoneHref}>
            {site.phone}
          </a>
          <span>Antioch &amp; Contra Costa County</span>
        </div>
      </div>
    </section>
  );
}
