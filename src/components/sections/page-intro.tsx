import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";

type PageIntroProps = {
  eyebrow: string;
  title: ReactNode;
  lead: string;
};

/** Pale page header used by the services, about and service-area pages. */
export function PageIntro({ eyebrow, title, lead }: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="container">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
      </div>
    </section>
  );
}
