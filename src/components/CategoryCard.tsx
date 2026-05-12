import Link from "next/link";
import { CategoryIconTile } from "@/components/CategoryIcon";
import type { Category } from "@/data/categories";

type CategoryCardProps = {
  category: Category;
  count?: number;
};

export function CategoryCard({ category, count = 0 }: CategoryCardProps) {
  const hasGames = count > 0;

  return (
    <article className="rounded-[24px] border border-white/10 bg-slate-900/78 p-4 shadow-[0_24px_56px_-32px_rgba(2,8,23,0.88)] transition hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-slate-900/88 hover:shadow-[0_34px_62px_-34px_rgba(8,145,178,0.28)]">
      <div className="flex items-start justify-between gap-3">
        <CategoryIconTile icon={category.icon} />
        <p className="rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
          {hasGames ? `${count} ${count === 1 ? "game" : "games"}` : "Coming soon"}
        </p>
      </div>
      <h3 className="mt-4 text-base font-black text-white">{category.name}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
        {category.description}
      </p>
      <div className="mt-4">
        <Link
          href={category.href}
          className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-black text-slate-100 transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
        >
          Explore
        </Link>
      </div>
    </article>
  );
}
