import Link from "next/link";
import { categories } from "@/data/categories";

type BrowseFilterBarProps = {
  activeHref?: string;
};

const filterLinks = [
  { label: "All", href: "/games" },
  { label: "Popular", href: "/popular" },
  ...categories.map((category) => ({
    label: category.name,
    href: category.href,
  })),
];

export function BrowseFilterBar({ activeHref }: BrowseFilterBarProps) {
  return (
    <section aria-label="Browse filters" className="space-y-3">
      <div className="flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filterLinks.map((item) => {
          const isActive = item.href === activeHref;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 rounded-full border px-3 py-2 text-sm font-semibold whitespace-nowrap transition ${
                isActive
                  ? "border-cyan-400/50 bg-[linear-gradient(135deg,#2563eb,#0891b2_72%,#22d3ee)] text-white shadow-[0_18px_32px_-22px_rgba(37,99,235,0.72)]"
                  : "border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
