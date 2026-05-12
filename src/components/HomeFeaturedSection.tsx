"use client";

import { useState } from "react";
import Link from "next/link";
import { GameGrid } from "@/components/GameGrid";
import { type Category, categoryMatchesSlug, type Game } from "@/data/games";

type FeaturedFilter = "all" | "popular" | string;

type HomeFeaturedSectionProps = {
  games: Game[];
  categories: Category[];
};

export function HomeFeaturedSection({
  games,
  categories,
}: HomeFeaturedSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FeaturedFilter>("all");

  const filteredGames = games.filter((game) => {
    if (activeFilter === "all") {
      return true;
    }

    if (activeFilter === "popular") {
      return game.isPopular === true || game.popular === true;
    }

    return game.categories.some((category) => categoryMatchesSlug(category, activeFilter));
  });

  const visibleGames = filteredGames.slice(0, 8);
  const hasResults = visibleGames.length > 0;

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`shrink-0 rounded-full border px-3 py-2 text-sm font-semibold transition ${
            activeFilter === "all"
              ? "border-cyan-400/50 bg-[linear-gradient(135deg,#2563eb,#0891b2_72%,#22d3ee)] text-white shadow-[0_18px_32px_-22px_rgba(37,99,235,0.72)]"
              : "border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("popular")}
          className={`shrink-0 rounded-full border px-3 py-2 text-sm font-semibold transition ${
            activeFilter === "popular"
              ? "border-cyan-400/50 bg-[linear-gradient(135deg,#2563eb,#0891b2_72%,#22d3ee)] text-white shadow-[0_18px_32px_-22px_rgba(37,99,235,0.72)]"
              : "border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
          }`}
        >
          Popular
        </button>
        {categories.map((category) => {
          const isActive = activeFilter === category.slug;

          return (
            <button
              key={category.slug}
              type="button"
              onClick={() => setActiveFilter(category.slug)}
              className={`shrink-0 rounded-full border px-3 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-cyan-400/50 bg-[linear-gradient(135deg,#2563eb,#0891b2_72%,#22d3ee)] text-white shadow-[0_18px_32px_-22px_rgba(37,99,235,0.72)]"
                  : "border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-black tracking-tight text-white sm:text-xl">
            Popular Games
          </h2>
          <Link
            href="/games"
            className="text-sm font-bold text-cyan-300 transition hover:text-cyan-200"
          >
            View all
          </Link>
        </div>

        {hasResults ? (
          <GameGrid games={visibleGames} />
        ) : (
          <div className="portal-panel p-6 text-sm text-slate-400">
            No games found for this filter.
          </div>
        )}
      </div>
    </section>
  );
}
