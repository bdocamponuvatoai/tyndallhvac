import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/config/site";

/** Fixed call/plan bar shown on small screens (see layout/mobile-contact.css). */
export function MobileContactBar() {
  return (
    <div className="mobile-contact">
      <a href={site.phoneHref}>
        <Phone size={17} /> Call Tyndall
      </a>
      <Link href="/contact/">Plan your service</Link>
    </div>
  );
}
