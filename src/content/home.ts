import { serviceInquiryPath } from "@/content/services";

/** "What brings you here?" options on the home page. */
export const serviceNeeds = [
  {
    label: "Something needs fixing",
    title: "Let’s get things working again.",
    text: "Cooling, heating, or airflow trouble? Tell us what you’re noticing and we’ll help you start in the right place.",
    cta: "Plan a repair",
    href: "/contact/",
  },
  {
    label: "Time for a tune-up",
    title: "Make room for a little maintenance.",
    text: "Give your system seasonal attention and get a clearer picture of how it’s performing.",
    cta: "Plan maintenance",
    href: serviceInquiryPath("maintenance"),
  },
  {
    label: "Ready for an upgrade",
    title: "Find your next level of comfort.",
    text: "Explore heating, cooling, and heat pump options with your home and priorities in mind.",
    cta: "Explore an upgrade",
    href: "/contact/",
  },
] as const;

/** Seasonal switcher copy on the home page. */
export const seasons = {
  cool: {
    buttonLabel: "Cooling season",
    heading: "Summer outside.",
    subheading: "Your kind of cool inside.",
    text: "Long afternoons, open calendars, and a place to cool down. Make sure your home is ready for the days ahead.",
    linkLabel: "Explore air conditioning",
    href: "/services/air-conditioning/",
    tag: "Made for summer days.",
  },
  warm: {
    buttonLabel: "Heating season",
    heading: "A cooler forecast.",
    subheading: "A warmer welcome.",
    text: "Slow mornings and evenings in. Keep the warmth where it belongs with heating care made for your home.",
    linkLabel: "Explore heating services",
    href: "/services/heating/",
    tag: "Ready for cozy evenings.",
  },
} as const;

export type Season = keyof typeof seasons;
