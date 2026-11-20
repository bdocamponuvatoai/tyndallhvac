import {
  Building2,
  RefreshCw,
  Snowflake,
  Sun,
  Wind,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconName } from "@/content/services";

const ICONS: Record<ServiceIconName, LucideIcon> = {
  snow: Snowflake,
  sun: Sun,
  cycle: RefreshCw,
  tool: Wrench,
  wind: Wind,
  building: Building2,
};

export function ServiceIcon({ name }: { name: ServiceIconName }) {
  const Icon = ICONS[name];
  return <Icon size={23} strokeWidth={1.5} aria-hidden="true" />;
}
