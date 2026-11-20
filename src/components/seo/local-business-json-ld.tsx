import { absoluteUrl } from "@/config/deployment";
import { site } from "@/config/site";

/**
 * schema.org structured data for the business. Only confirmed facts: no
 * street address, opening hours, ratings or prices (see docs/content-sources.md).
 */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: site.legalName,
    url: absoluteUrl("/"),
    telephone: site.phoneHref.replace("tel:", ""),
    email: site.email,
    foundingDate: site.foundedYear,
    founder: { "@type": "Person", name: site.founder },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${site.serviceArea}, California`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
