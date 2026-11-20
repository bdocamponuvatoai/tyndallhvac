import type { PhotoName } from "@/content/photos";

export type ServiceIconName =
  "snow" | "sun" | "cycle" | "tool" | "wind" | "building";

export type Service = {
  slug: string;
  name: string;
  /** One-line hook on the home page service cards. */
  short: string;
  category: string;
  image: PhotoName;
  icon: ServiceIconName;
  description: string;
  /** Detail page headline. */
  intro: string;
  details: string;
  includes: readonly string[];
  signs: readonly string[];
  expect: string;
};

export const services: readonly Service[] = [
  {
    slug: "air-conditioning",
    name: "Air conditioning",
    short: "A cooler kind of summer.",
    category: "COOLING",
    image: "home",
    icon: "snow",
    description:
      "From an AC that won’t keep up to a complete cooling upgrade, find the right next step for your space.",
    intro: "Bring the temperature down. Keep the day going.",
    details:
      "Warm rooms, weak airflow, or a system that keeps cycling deserve a closer look. Tyndall provides AC repair, installation, replacement, and maintenance for local homes and light commercial spaces.",
    includes: [
      "AC diagnostics and repairs",
      "New system installation",
      "Equipment replacement",
      "Seasonal cooling maintenance",
    ],
    signs: [
      "Your system runs but the room stays warm.",
      "Airflow feels weaker than it used to.",
      "You’re planning an upgrade or replacing older equipment.",
    ],
    expect:
      "Start with your current system, the rooms you use, and what feels different. A professional assessment helps you compare a repair with replacement when appropriate.",
  },
  {
    slug: "heating",
    name: "Heating & furnaces",
    short: "Warmth, without the worry.",
    category: "HEATING",
    image: "technician",
    icon: "sun",
    description:
      "Repair, replacement, and thoughtful installation for the days that call for a little more warmth.",
    intro: "Make the cold mornings comfortable.",
    details:
      "A heating system should fit the home around it. Tyndall works on furnace and heater repairs, installations, and replacements, with a focus on understanding what your space needs.",
    includes: [
      "Heater and furnace repair",
      "Furnace installation",
      "Heating system replacement",
      "Heating performance checks",
    ],
    signs: [
      "Your heater isn’t reaching the set temperature.",
      "Some rooms feel noticeably colder.",
      "You want to understand your replacement options.",
    ],
    expect:
      "Share the equipment type and any changes you have noticed. Tyndall can assess the system and explain the available repair or installation options.",
  },
  {
    slug: "heat-pumps",
    name: "Heat pumps",
    short: "One system. Every season.",
    category: "HEATING + COOLING",
    image: "heatpump",
    icon: "cycle",
    description:
      "Explore an electric system that can handle both heating and cooling, designed around your home.",
    intro: "A fresh way to feel at home.",
    details:
      "Heat pumps move heat to provide both heating and cooling. Tyndall offers heat pump installation and can help you explore equipment, sizing, and the considerations for your property.",
    includes: [
      "Heat pump installation",
      "System selection and sizing review",
      "Replacement planning",
      "Heat pump water heater options",
    ],
    signs: [
      "You’re exploring electric heating and cooling.",
      "Your existing equipment is nearing replacement.",
      "You want to compare a heat pump with your current setup.",
    ],
    expect:
      "The right choice depends on the home, existing ductwork, electrical capacity, and comfort goals. Discuss those details before choosing equipment. Efficiency and costs vary by installation and usage.",
  },
  {
    slug: "maintenance",
    name: "Maintenance & tune-ups",
    short: "A little care goes a long way.",
    category: "SYSTEM CARE",
    image: "technician",
    icon: "tool",
    description:
      "Seasonal attention to help you understand your system and prepare for the weather ahead.",
    intro: "Give your system a little attention.",
    details:
      "Routine maintenance is a chance to spot changes in performance and understand the condition of your equipment. Tyndall provides seasonal maintenance, tune-ups, and system inspections.",
    includes: [
      "Seasonal HVAC maintenance",
      "System inspections",
      "Cooling and heating tune-ups",
      "Performance observations",
    ],
    signs: [
      "It’s time for a seasonal service visit.",
      "You don’t know when the system was last checked.",
      "You would like a clearer picture of its condition.",
    ],
    expect:
      "Tell the team about the equipment you have and your service history. The visit scope and any recommended work should be discussed with you before proceeding.",
  },
  {
    slug: "indoor-air",
    name: "Airflow & indoor air",
    short: "Comfort in every corner.",
    category: "AIR + COMFORT",
    image: "home",
    icon: "wind",
    description:
      "Ductwork, zoning, ventilation, and indoor air quality solutions that look beyond the thermostat.",
    intro: "There’s more to comfort than temperature.",
    details:
      "Uneven rooms and airflow concerns can have several causes. Tyndall offers ductwork repair and installation, HVAC zoning, whole-house fan installation, and indoor air quality services.",
    includes: [
      "Ductwork repair and installation",
      "HVAC zoning options",
      "Whole-house and attic fans",
      "Indoor air quality services",
    ],
    signs: [
      "Comfort changes from one room to the next.",
      "You’re considering ventilation improvements.",
      "Your ductwork needs an assessment.",
    ],
    expect:
      "Start with the rooms that feel different. A system-level assessment can help identify whether equipment, distribution, or ventilation needs attention.",
  },
  {
    slug: "light-commercial",
    name: "Light commercial",
    short: "Keep business comfortable.",
    category: "FOR BUSINESS",
    image: "heatpump",
    icon: "building",
    description:
      "Heating, cooling, and maintenance for the places your team and customers spend their day.",
    intro: "A comfortable space to do your best work.",
    details:
      "From everyday heating and cooling needs to equipment replacement planning, Tyndall serves local light commercial customers as well as homeowners.",
    includes: [
      "Heating and cooling repairs",
      "Equipment installation planning",
      "Maintenance and system checks",
      "Comfort and airflow assessment",
    ],
    signs: [
      "Your workspace isn’t staying comfortable.",
      "You’re planning an equipment replacement.",
      "You need to discuss ongoing system care.",
    ],
    expect:
      "Share the property type, equipment, and access requirements. The team can confirm the project scope and scheduling directly.",
  },
];

export function getService(slug: string | null | undefined) {
  return services.find((service) => service.slug === slug);
}

export function servicePath(slug: string) {
  return `/services/${slug}/`;
}

/** Contact page link that preselects a service in the inquiry planner. */
export function serviceInquiryPath(slug: string) {
  return `/contact/?service=${slug}`;
}
