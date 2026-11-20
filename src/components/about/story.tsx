import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageNote, Photo } from "@/components/ui/photo";

export function Story() {
  return (
    <section className="container story-lead">
      <div className="story-photo">
        <Photo
          name="technician"
          alt="AI-generated illustrative HVAC service technician"
          priority
        />
        <ImageNote />
      </div>
      <div className="story-copy">
        <Eyebrow>ROOTED IN ANTIOCH</Eyebrow>
        <h2>
          Built around
          <br />
          doing right.
        </h2>
        <p>
          Peter Tyndall started Tyndall HVAC to put his trade experience to work
          helping people make informed decisions about their systems. The
          company has served local homes and businesses since 2006.
        </p>
        <p>
          Today, this family-owned business provides heating, cooling, and
          related HVAC services across Contra Costa County. From everyday
          repairs to planning an installation, the starting point is
          understanding your space.
        </p>
        <p>
          Good service begins with listening. What isn’t working? Which rooms
          feel different? What would make your home more comfortable? Those are
          the details that make the next step clearer.
        </p>
      </div>
    </section>
  );
}
