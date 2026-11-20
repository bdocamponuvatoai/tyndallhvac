import Link from "next/link";
import { Brand } from "@/components/ui/brand";
import { footerCompanyLinks, site } from "@/config/site";
import { servicePath, services } from "@/content/services";

/** Services listed in the footer (the first five; light commercial has its own link). */
const footerServices = services.slice(0, 5);

export function SiteFooter() {
  // Rendered at build time; the static export picks up the year of the build.
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container footer-top">
        <div className="footer-brand">
          <Link href="/" aria-label="Tyndall HVAC home">
            <Brand light />
          </Link>
          <p>
            Good air.
            <br />
            Good people.
            <br />A better place to come home to.
          </p>
          <a href={site.phoneHref}>{site.phone}</a>
          <a className="footer-email" href={site.emailHref}>
            {site.email}
          </a>
        </div>
        <div>
          <h3>Feel at home</h3>
          {footerServices.map((service) => (
            <Link key={service.slug} href={servicePath(service.slug)}>
              {service.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>Get to know us</h3>
          {footerCompanyLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="footer-location">
          <h3>Rooted in Antioch.</h3>
          <p>
            Serving homes and businesses throughout Contra Costa County,
            California.
          </p>
          <span className="footer-line" />
          <span>{`Family owned · Since ${site.foundedYear}`}</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {year}
          {` ${site.legalName}`}
        </span>
        <Link href="/privacy/">Privacy</Link>
      </div>
      <p className="container preview-note">
        Photography is AI-generated and illustrative; it does not depict
        Tyndall’s actual people or projects. Service inquiries open your email
        app and are not submitted by this website.
      </p>
    </footer>
  );
}
