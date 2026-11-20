import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `Page not found | ${site.name}` },
};

export default function NotFound() {
  return (
    <section className="container not-found">
      <Eyebrow>LET’S GET YOU BACK HOME</Eyebrow>
      <h1>This page isn’t here.</h1>
      <p>Explore our services or return home to find the right next step.</p>
      <ButtonLink href="/">Back to home</ButtonLink>
    </section>
  );
}
