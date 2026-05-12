import type { Metadata } from "next";
import { CategoryChips } from "@/components/CategoryChips";
import { Footer } from "@/components/Footer";
import { GameGrid } from "@/components/GameGrid";
import { Header } from "@/components/Header";
import { PortalBrowseLayout } from "@/components/PortalBrowseLayout";
import { categories } from "@/data/categories";
import { languageSafeGames } from "@/data/games";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(
  "All Games | GameNest",
  "Browse free online browser games on GameNest, including puzzle, arcade, action, sports, racing, and casual games with instant play and no downloads.",
  "/games",
);

type GamesPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

function getSearchQuery(q: string | string[] | undefined) {
  if (Array.isArray(q)) {
    return q[0]?.trim() ?? "";
  }

  return q?.trim() ?? "";
}

function matchesGameQuery(game: (typeof languageSafeGames)[number], query: string) {
  if (!query) {
    return true;
  }

  const haystack = [
    game.title,
    game.description,
    game.categories.join(" "),
    game.tags.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

export default async function GamesPage({ searchParams }: GamesPageProps) {
  const { q } = await searchParams;
  const query = getSearchQuery(q);
  const filteredGames = languageSafeGames.filter((game) => matchesGameQuery(game, query));

  return (
    <div className="min-h-screen text-white">
      <Header />
      <PortalBrowseLayout>
        <main className="space-y-5">
          <section className="portal-panel space-y-4 p-5">
            <div className="space-y-2">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
                Game Library
              </p>
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                All Games
              </h1>
              <p className="max-w-3xl text-sm leading-6 text-slate-400">
                Browse the full GameNest library and jump straight into free browser
                games.
              </p>
            </div>
            <form action="/games" method="get">
              <label className="sr-only" htmlFor="games-search">
                Search games
              </label>
              <input
                id="games-search"
                name="q"
                type="search"
                placeholder="Search games and categories"
                defaultValue={query}
                className="h-11 w-full rounded-full border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-500/10"
              />
            </form>
            <CategoryChips categories={categories} />
          </section>

          {filteredGames.length > 0 ? (
            <GameGrid games={filteredGames} />
          ) : (
            <div className="portal-panel space-y-2 p-6 text-sm text-slate-400">
              <p className="text-base font-bold text-white">No games found</p>
              <p>Try another keyword or browse by category.</p>
            </div>
          )}
        </main>
      </PortalBrowseLayout>
      <Footer />
    </div>
  );
}
