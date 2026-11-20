import { Eyebrow } from "@/components/ui/eyebrow";
import { site } from "@/config/site";

export function ContactAside() {
  return (
    <div className="contact-aside">
      <Eyebrow>A GOOD NEXT STEP</Eyebrow>
      <h1>
        Let’s get
        <br />
        comfortable.
      </h1>
      <p>
        A repair, a tune-up, or a new system. Whatever brings you here, start
        with a conversation about your space.
      </p>
      <div className="contact-method">
        <span>Talk to Tyndall</span>
        <a href={site.phoneHref}>{site.phone}</a>
      </div>
      <div className="contact-method">
        <span>Email the team</span>
        <a className="email-link" href={site.emailHref}>
          {site.email}
        </a>
      </div>
      <div className="contact-method">
        <span>Where we work</span>
        <p>
          Antioch &amp; Contra Costa County
          <br />
          Residential and light commercial
        </p>
      </div>
      <p className="small-note">
        Need prompt assistance? Please call the team to discuss the issue and
        current availability.
      </p>
    </div>
  );
}
