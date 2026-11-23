import {
  Accessibility,
  BadgeCheck,
  ClipboardCheck,
  Clock,
  HeartHandshake,
  Home,
  Hospital,
  Landmark,
  Medal,
  School,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/config/types";

const ICONS: Record<IconName, LucideIcon> = {
  hospital: Hospital,
  school: School,
  truck: Truck,
  landmark: Landmark,
  "heart-handshake": HeartHandshake,
  home: Home,
  medal: Medal,
  accessibility: Accessibility,
  clipboard: ClipboardCheck,
  shield: ShieldCheck,
  badge: BadgeCheck,
  clock: Clock,
};

export default function SectorIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon aria-hidden className={className} strokeWidth={1.75} />;
}
