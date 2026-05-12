import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { GameGrid } from "@/components/GameGrid";
import { GameHistoryTracker } from "@/components/GameHistoryTracker";
import { GamePlayer } from "@/components/GamePlayer";
import { Header } from "@/components/Header";
import { getCategoryHref } from "@/data/categories";
import { games, getGameBySlug, getSimilarGames, languageSafeGames } from "@/data/games";
import { buildGameMetadata, buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    return buildPageMetadata(
      "Game Not Found | GameNest",
      "This game could not be found on GameNest.",
      "/games",
    );
  }

  return buildGameMetadata(game);
}

export default async function GameDetailPage({ params }: Props) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const recommendedGames =
    getSimilarGames(game, 4).length > 0
      ? getSimilarGames(game, 4)
      : languageSafeGames.filter((candidate) => candidate.id !== game.id).slice(0, 4);

  return (
    <div className="min-h-screen text-white">
      <Header />
      <GameHistoryTracker
        game={{
          slug: game.slug,
          title: game.title,
          thumbnail: game.thumbnail,
          categories: game.categories,
        }}
      />
      <main className="mx-auto max-w-[1360px] space-y-5 px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
          <Link href="/" className="transition hover:text-cyan-300">
            Home
          </Link>
          <span>/</span>
          <Link href="/games" className="transition hover:text-cyan-300">
            Games
          </Link>
          <span>/</span>
          <span className="text-white">{game.title}</span>
        </nav>

        <section className="portal-panel space-y-4 p-5 sm:p-6">
          <div className="space-y-2">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
              Game Detail
            </p>
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              {game.title}
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
              {game.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {game.categories.map((category) => {
              const href = getCategoryHref(category);

              if (!href) {
                return (
                  <span
                    key={category}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300"
                  >
                    {category}
                  </span>
                );
              }

              return (
                <Link
                  key={category}
                  href={href}
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/15 hover:text-cyan-200"
                >
                  {category}
                </Link>
              );
            })}
          </div>
        </section>

        <GamePlayer
          title={game.title}
          iframeUrl={game.iframeUrl}
          iframeStatus={game.iframeStatus}
          categories={game.categories}
        />

        <section className="portal-panel p-6">
          <h2 className="text-xl font-black text-white">About {game.title}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
            {game.description}
          </p>
        </section>

        <section className="portal-panel p-6">
          <h2 className="text-xl font-black text-white">How to Play</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-400 marker:text-cyan-400 sm:text-base">
            {game.howToPlay.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="portal-panel p-6">
          <h2 className="text-xl font-black text-white">Controls</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-400 marker:text-cyan-400 sm:text-base">
            {game.controls.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="portal-panel p-6">
          <h2 className="text-xl font-black text-white">Game Features</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-400 marker:text-cyan-400 sm:text-base">
            {game.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-black tracking-tight text-white sm:text-xl">
              Recommended Games
            </h2>
            <Link
              href="/games"
              className="text-sm font-bold text-cyan-300 transition hover:text-cyan-200"
            >
              Browse all
            </Link>
          </div>
          <GameGrid games={recommendedGames} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
