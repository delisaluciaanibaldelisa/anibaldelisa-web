import {
  Wrench,
  SprayCan,
  Gauge,
  ClipboardCheck,
  BadgeCheck,
  Disc3,
  Cog,
  MoveVertical,
  Disc,
  TriangleAlert,
  Snowflake,
  CircleDot,
  type LucideProps,
} from "lucide-react";

// Mapa de nombres de ícono (string en lib/site) a componentes lucide.
const icons = {
  Wrench,
  SprayCan,
  Gauge,
  ClipboardCheck,
  BadgeCheck,
  Disc3,
  Cog,
  MoveVertical,
  Disc,
  TriangleAlert,
  Snowflake,
  CircleDot,
} as const;

export type ServiceIconName = keyof typeof icons;

export default function ServiceIcon({
  name,
  ...props
}: { name: ServiceIconName } & LucideProps) {
  const Icon = icons[name] ?? Wrench;
  return <Icon {...props} />;
}
