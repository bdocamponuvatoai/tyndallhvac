/**
 * Business details and navigation.
 *
 * Safe to import from client components: nothing here reads the environment.
 * Every fact below comes from the owner brief or the company's current
 * website (see docs/content-sources.md). Do not add details that have not been
 * confirmed by the owner.
 */
export const site = {
  name: "Tyndall HVAC",
  legalName: "Tyndall HVAC, Inc.",
  founder: "Peter Tyndall",
  foundedYear: "2006",
  phone: "(925) 998-9909",
  phoneHref: "tel:+19259989909",
  email: "tyndallhvac@gmail.com",
  emailHref: "mailto:tyndallhvac@gmail.com",
  locality: "Antioch",
  region: "CA",
  serviceArea: "Contra Costa County",
  defaultTitle: "Tyndall HVAC | Comfort lives here.",
  description:
    "Heating, cooling, heat pumps, and thoughtful system care for homes and businesses in Antioch and Contra Costa County.",
  themeColor: "#ffffff",
} as const;

type NavItem = {
  href: string;
  label: string;
  /** Also mark the item current on nested routes (e.g. /services/heating/). */
  matchNested?: boolean;
};

export const mainNav: readonly NavItem[] = [
  { href: "/services/", label: "Our services", matchNested: true },
  { href: "/about/", label: "Why Tyndall" },
  { href: "/service-areas/", label: "Service areas" },
];

export const footerCompanyLinks: readonly NavItem[] = [
  { href: "/about/", label: "Our story" },
  { href: "/service-areas/", label: "Where we work" },
  { href: "/services/light-commercial/", label: "For your business" },
  { href: "/contact/", label: "Plan your service" },
];

export function isCurrentNavItem(pathname: string, item: NavItem): boolean {
  return item.matchNested
    ? pathname.startsWith(item.href)
    : pathname === item.href;
}
