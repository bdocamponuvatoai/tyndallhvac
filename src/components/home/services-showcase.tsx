import Link from "next/link";
import { ServiceRail } from "@/components/home/service-rail";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Photo } from "@/components/ui/photo";
import { ServiceIcon } from "@/components/ui/service-icon";
import { TextLink } from "@/components/ui/text-link";
import { servicePath, services } from "@/content/services";

export function ServicesShowcase() {
  return (
    <section className="services-section">
      <div className="container section-heading">
        <div>
          <Eyebrow>A LITTLE MORE COMFORT, EVERY DAY</Eyebrow>
          <h2>
            Good air.
            <br />
            <span className="muted">Better days.</span>
          </h2>
        </div>
        <div className="heading-aside">
          <p>
            From the first hot day to the coldest morning.
            <br />
            Find the care your space needs.
          </p>
          <TextLink href="/services/">Explore all services</TextLink>
        </div>
      </div>
      <ServiceRail>
        {services.map((service) => (
          <Link
            className={`service-card service-${service.slug}`}
            href={servicePath(service.slug)}
            key={service.slug}
          >
            <Photo
              name={service.image}
              alt={`Illustrative ${service.name.toLowerCase()} scene`}
            />
            <div className="card-shade" />
            <div className="service-card-top">
              <span>{service.category}</span>
              <ServiceIcon name={service.icon} />
            </div>
            <div className="service-card-bottom">
              <h3>{service.name}</h3>
              <p>{service.short}</p>
              <span className="card-cta">
                Explore service <span aria-hidden="true">+</span>
              </span>
            </div>
          </Link>
        ))}
      </ServiceRail>
    </section>
  );
}
