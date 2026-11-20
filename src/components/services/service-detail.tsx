import Link from "next/link";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageNote, Photo } from "@/components/ui/photo";
import { TextLink } from "@/components/ui/text-link";
import {
  serviceInquiryPath,
  servicePath,
  services,
  type Service,
} from "@/content/services";

const RELATED_LIMIT = 4;

export function ServiceDetailHero({ service }: { service: Service }) {
  const lowerName = service.name.toLowerCase();
  return (
    <section className="detail-hero">
      <div className="detail-intro">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/services/">Services</Link>
          <span>/</span>
          <span>{service.name}</span>
        </nav>
        <Eyebrow>{service.category} · TYNDALL HVAC</Eyebrow>
        <h1>{service.intro}</h1>
        <p>{service.description}</p>
        <ButtonLink href={serviceInquiryPath(service.slug)}>
          Let’s talk {lowerName}
        </ButtonLink>
      </div>
      <div className="detail-photo">
        <Photo
          name={service.image}
          alt={`Illustrative ${lowerName} scene`}
          priority
        />
        <ImageNote />
      </div>
    </section>
  );
}

export function ServiceDetailContent({ service }: { service: Service }) {
  return (
    <section className="container detail-content">
      <div>
        <Eyebrow>THE RIGHT CARE FOR YOUR SPACE</Eyebrow>
        <h2>
          {service.name},
          <br />
          with your home in mind.
        </h2>
        <p>{service.details}</p>
      </div>
      <ul className="included-list">
        {service.includes.map((item) => (
          <li key={item}>
            <Check size={19} />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ServiceContext({ service }: { service: Service }) {
  return (
    <section className="service-context">
      <div className="container">
        <div>
          <h2>Sound familiar?</h2>
          <ul>
            {service.signs.map((sign) => (
              <li key={sign}>{sign}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>What comes next.</h2>
          <p>{service.expect}</p>
          <TextLink href={serviceInquiryPath(service.slug)}>
            Prepare your service inquiry
          </TextLink>
        </div>
      </div>
    </section>
  );
}

export function RelatedServices({ current }: { current: Service }) {
  const related = services
    .filter((service) => service.slug !== current.slug)
    .slice(0, RELATED_LIMIT);
  return (
    <section className="container related">
      <h2>Explore more ways to feel at home.</h2>
      <div className="related-links">
        {related.map((service) => (
          <Link key={service.slug} href={servicePath(service.slug)}>
            {service.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
