/**
 * Communities listed in the service-area directory, taken from the service-area
 * navigation on the company's current website. Not an exhaustive promise of
 * availability: the UI asks visitors to confirm their address.
 */
export const serviceAreas: readonly string[] = [
  "Antioch",
  "Brentwood",
  "Oakley",
  "Pittsburg",
  "Concord",
  "Walnut Creek",
  "Pleasant Hill",
  "Martinez",
  "Lafayette",
  "Orinda",
  "Moraga",
  "Danville",
  "San Ramon",
  "Alamo",
  "Clayton",
  "Discovery Bay",
  "Bay Point",
  "Bethel Island",
  "Byron",
  "Hercules",
  "Pinole",
  "Crockett",
  "Rodeo",
];

/** Contact page link that pre-fills the city in the inquiry planner. */
export function cityInquiryPath(city: string) {
  return `/contact/?city=${encodeURIComponent(city)}`;
}
