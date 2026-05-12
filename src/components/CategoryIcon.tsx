import type { LucideIcon } from "lucide-react";

type CategoryIconProps = {
  icon: LucideIcon;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

type CategoryIconTileProps = CategoryIconProps & {
  tileClassName?: string;
};

export function CategoryIcon({
  icon: Icon,
  size = 22,
  strokeWidth = 2.2,
  className = "text-white",
}: CategoryIconProps) {
  return (
    <Icon
      aria-hidden="true"
      size={size}
      strokeWidth={strokeWidth}
      className={`shrink-0 ${className}`}
    />
  );
}

export function CategoryIconTile({
  icon,
  size = 22,
  strokeWidth = 2.2,
  className = "text-white",
  tileClassName = "",
}: CategoryIconTileProps) {
  return (
    <div
      className={`grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,#2563eb,#0891b2_72%,#7c3aed)] shadow-[0_14px_28px_-18px_rgba(37,99,235,0.58)] ${tileClassName}`}
    >
      <CategoryIcon icon={icon} size={size} strokeWidth={strokeWidth} className={className} />
    </div>
  );
}
