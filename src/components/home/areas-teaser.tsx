import { MapPin } from "lucide-react";
import { AreaSearch } from "@/components/sections/area-search";
import { Eyebrow } from "@/components/ui/eyebrow";

export function AreasTeaser() {
  return (
    <section className="areas-section">
      <div className="container areas-grid">
        <div>
          <Eyebrow>CLOSE TO HOME</Eyebrow>
          <h2>
            Your neighborhood.
            <br />
            <span className="muted">Our kind of place.</span>
          </h2>
          <p>
            Based in Antioch. Working throughout Contra Costa County. Here for
            the homes and local businesses that make this community feel like
            home.
          </p>
          <div className="location-label">
            <MapPin size={23} />
            <div>
              Antioch, California<small>Our home base</small>
            </div>
          </div>
        </div>
        <AreaSearch compact />
      </div>
    </section>
  );
}
