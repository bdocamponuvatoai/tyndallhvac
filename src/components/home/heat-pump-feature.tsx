import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageNote, Photo } from "@/components/ui/photo";
import { servicePath } from "@/content/services";

export function HeatPumpFeature() {
  return (
    <section className="heatpump-feature container">
      <div className="feature-photo">
        <Photo
          name="heatpump"
          alt="Modern heat pump outside a California home, AI-generated"
        />
        <ImageNote />
      </div>
      <div className="feature-copy">
        <Eyebrow>MEET YOUR ALL-SEASON OPTION</Eyebrow>
        {/* The second <br> is hidden on phones (see heat-pump-feature.css). */}
        <h2>
          Less thinking
          <br />
          about the weather.
          <br />
          <span className="muted">More living.</span>
        </h2>
        <p>
          A heat pump brings heating and cooling together in one electric
          system. Let’s explore what that could look like for your home.
        </p>
        <ButtonLink href={servicePath("heat-pumps")}>
          Explore heat pumps
        </ButtonLink>
        <span className="feature-footnote">
          Thoughtful sizing. Clear options. Your home in mind.
        </span>
      </div>
    </section>
  );
}
