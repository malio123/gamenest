import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { GameGrid } from "@/components/GameGrid";
import { Header } from "@/components/Header";
import { PortalBrowseLayout } from "@/components/PortalBrowseLayout";
import { popularGames } from "@/data/games";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(
  "Popular Games | GameNest",
  "Browse popular games on GameNest and jump into browser favorites players keep coming back to.",
  "/popular",
);

export default function PopularGamesPage() {
  const games = popularGames;

  return (
    <div className="min-h-screen text-white">
      <Header />
      <PortalBrowseLayout>
        <main className="space-y-5">
          <section className="portal-panel space-y-3 p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
              Most Played
            </p>
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Popular Games
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-slate-400">
              Player favorites, reliable quick-play picks, and games worth starting with.
            </p>
          </section>

          <GameGrid games={games} />
        </main>
      </PortalBrowseLayout>
      <Footer />
    </div>
  );
}
