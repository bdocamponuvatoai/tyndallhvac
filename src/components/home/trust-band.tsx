import { House, MapPin, ShieldCheck } from "lucide-react";
import { site } from "@/config/site";

export function TrustBand() {
  return (
    <div className="trust-band">
      <div className="container">
        <span>
          <House size={18} />
          {`Family owned since ${site.foundedYear}`}
        </span>
        <span>
          <ShieldCheck size={18} />
          Residential &amp; light commercial
        </span>
        <span>
          <MapPin size={18} />
          Antioch &amp; Contra Costa County
        </span>
      </div>
    </div>
  );
}
