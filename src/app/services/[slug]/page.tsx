import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/sections/cta-section";
import {
  RelatedServices,
  ServiceContext,
  ServiceDetailContent,
  ServiceDetailHero,
} from "@/components/services/service-detail";
import { getService, servicePath, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

// Only the slugs below exist; anything else is a 404 in the static export.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: service.name,
    path: servicePath(service.slug),
    description: service.description,
    image: service.image,
  });
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return (
    <>
      <ServiceDetailHero service={service} />
      <ServiceDetailContent service={service} />
      <ServiceContext service={service} />
      <RelatedServices current={service} />
      <CtaSection />
    </>
  );
}
