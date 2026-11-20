import { Eyebrow } from "@/components/ui/eyebrow";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy",
  path: "/privacy/",
  description:
    "What happens to the details you enter on the Tyndall HVAC website, and what the site does not collect.",
});

/*
 * Describes how this website actually behaves. Before launch, replace it with
 * a privacy policy approved by the business (see README "Before launch").
 */
export default function PrivacyPage() {
  return (
    <article className="container legal">
      <Eyebrow>TYNDALL HVAC, INC.</Eyebrow>
      <h1>Privacy.</h1>
      <p>
        This page explains what happens to the details you enter on this
        website.
      </p>
      <h2>Your service inquiry</h2>
      <p>
        The inquiry planner keeps your entries in the current browser page. It
        does not send the entries to a server, create a customer record, or book
        an appointment. Refreshing or leaving the page may clear your entries.
      </p>
      <p>
        If you select “Open email to send inquiry,” your device’s email
        application opens a draft addressed to {site.email}. Sending that email
        is a separate action you control, and your email provider’s policies
        apply. Copying or downloading an inquiry keeps it under your control.
      </p>
      <h2>Imagery and business information</h2>
      <p>
        All photography on this website is AI-generated illustrative imagery. It
        does not show actual Tyndall employees, customers, equipment
        installations, or completed projects.
      </p>
      <p>
        Please confirm service availability, project scope, pricing, and
        scheduling directly with Tyndall. No appointment is confirmed by this
        website.
      </p>
      <h2>Website technology</h2>
      <p>
        This website does not include advertising trackers or an analytics
        integration. Hosting providers may process routine technical data
        necessary to deliver the website.
      </p>
      <h2>Get in touch</h2>
      <p>
        For service inquiries, call <a href={site.phoneHref}>{site.phone}</a>
        {" or email "}
        <a href={site.emailHref}>{site.email}</a>.
      </p>
    </article>
  );
}
