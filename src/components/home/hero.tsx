import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageNote, Photo } from "@/components/ui/photo";

export function Hero() {
  return (
    <section className="hero">
      <Photo
        name="home"
        alt="An inviting California home with warm light at dusk, AI-generated"
        priority
      />
      <div className="hero-shade" />
      <div className="container hero-content">
        <Eyebrow>TYNDALL HVAC · CONTRA COSTA COUNTY</Eyebrow>
        <h1>
          Comfort
          <br />
          lives here.
        </h1>
        <p className="hero-description">
          The right temperature.
          <br />
          The right people to get you there.
        </p>
        <div className="hero-buttons">
          <ButtonLink href="/contact/" variant="white">
            Let’s get comfortable
          </ButtonLink>
          <ButtonLink href="#find-service" variant="glass">
            Find your service
          </ButtonLink>
        </div>
        <div className="hero-bottom">
          <span>Heating. Cooling. A better feeling at home.</span>
          <ImageNote />
        </div>
      </div>
    </section>
  );
}
