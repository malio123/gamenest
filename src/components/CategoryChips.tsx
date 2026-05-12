import Link from "next/link";
import type { Category } from "@/data/categories";

type CategoryChipsProps = {
  categories: Category[];
  activeSlug?: string;
  compact?: boolean;
};

export function CategoryChips({
  categories,
  activeSlug,
  compact = false,
}: CategoryChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = category.slug === activeSlug;

        return (
          <Link
            key={category.slug}
            href={category.href}
            className={`rounded-full border font-bold shadow-[0_12px_26px_-22px_rgba(15,23,42,0.18)] transition ${
              compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
            } ${
              isActive
                ? "border-cyan-400/50 bg-[linear-gradient(135deg,#2563eb,#0891b2_72%,#22d3ee)] text-white shadow-[0_18px_32px_-22px_rgba(37,99,235,0.72)]"
                : "border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
            }`}
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  );
}
