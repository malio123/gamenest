import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { GameGrid } from "@/components/GameGrid";
import { Header } from "@/components/Header";
import { PortalBrowseLayout } from "@/components/PortalBrowseLayout";
import { newGames } from "@/data/games";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(
  "New Games | GameNest",
  "Browse new games on GameNest and discover fresh browser titles ready to play instantly online.",
  "/new",
);

export default function NewGamesPage() {
  const games = newGames;

  return (
    <div className="min-h-screen text-white">
      <Header />
      <PortalBrowseLayout>
        <main className="space-y-5">
          <section className="portal-panel space-y-3 p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
              Just Added
            </p>
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              New Games
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-slate-400">
              Fresh additions and recent browser games ready to open instantly.
            </p>
          </section>

          <GameGrid games={games} />
        </main>
      </PortalBrowseLayout>
      <Footer />
    </div>
  );
}
