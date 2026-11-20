import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageNote, Photo } from "@/components/ui/photo";
import { TextLink } from "@/components/ui/text-link";

export function AboutTeaser() {
  return (
    <section className="about-section container">
      <div className="about-copy">
        <Eyebrow>LOCAL ROOTS. PERSONAL SERVICE.</Eyebrow>
        <h2>
          Good people.
          <br />
          Doing right
          <br />
          <span className="muted">by your home.</span>
        </h2>
        <p>
          Tyndall is a family-owned HVAC business based in Antioch. Since 2006,
          the focus has been simple: listen carefully, explain the options, and
          take care of the places people call home.
        </p>
        <p>
          From a repair that gets your day back on track to planning your next
          system, you deserve a conversation that makes sense.
        </p>
        <TextLink href="/about/">Get to know Tyndall</TextLink>
      </div>
      <div className="about-photo">
        <Photo
          name="technician"
          alt="Illustrative HVAC technician carefully inspecting equipment"
        />
        <ImageNote />
        <div className="about-caption">
          <span>Rooted here.</span>
          <strong>Ready to help.</strong>
        </div>
      </div>
    </section>
  );
}
