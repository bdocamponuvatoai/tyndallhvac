import { House, MessageCircle, Wrench, type LucideIcon } from "lucide-react";

const VALUES: readonly { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: MessageCircle,
    title: "A clearer conversation.",
    text: "Talk through what’s happening, ask questions, and understand your options before deciding what comes next.",
  },
  {
    icon: House,
    title: "Your space comes first.",
    text: "A home and a business have different needs. Start with the way you use your space, not a one-size-fits-all answer.",
  },
  {
    icon: Wrench,
    title: "Care through the seasons.",
    text: "Repairs, installations, maintenance, and system improvements. Support for the different stages of your equipment’s life.",
  },
];

export function Values() {
  return (
    <section className="values">
      <div className="container">
        {VALUES.map(({ icon: Icon, title, text }) => (
          <div key={title}>
            <Icon size={29} strokeWidth={1.5} />
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
