import Image from "next/image";
import Link from "next/link";
import { getGameCategories, getGameThumbnail, type Game } from "@/data/games";

type RelatedGamesGridProps = {
  title: string;
  subtitle: string;
  games: Game[];
};

export function RelatedGamesGrid({ title, subtitle, games }: RelatedGamesGridProps) {
  if (games.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight text-white">{title}</h2>
          <p className="text-sm text-slate-400">{subtitle}</p>
        </div>
        <Link
          href="/games"
          className="text-sm font-bold text-cyan-300 transition hover:text-cyan-200"
        >
          Browse all
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {games.map((game) => (
          <Link
            key={game.id}
            href={`/games/${game.slug}`}
            aria-label={`Play ${game.title} online on GameNest`}
            className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-slate-950 shadow-[0_26px_56px_-34px_rgba(2,8,23,0.88)] transition duration-300 hover:-translate-y-1.5 hover:border-cyan-400/35 hover:shadow-[0_30px_60px_-30px_rgba(6,182,212,0.32)]"
          >
            <article className="flex h-full flex-col">
              <div className="relative aspect-[1.5] overflow-hidden">
                <Image
                  src={getGameThumbnail(game)}
                  alt={`${game.title} online game thumbnail`}
                  fill
                  sizes="(min-width: 1536px) 20vw, (min-width: 1024px) 30vw, (min-width: 480px) 46vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.12),rgba(2,6,23,0.9))]" />
                <span className="absolute right-4 top-4 rounded-full border border-cyan-400/20 bg-slate-950/70 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-cyan-300">
                  Play Now
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-4">
                <p className="line-clamp-2 text-lg font-black tracking-tight text-white">
                  {game.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  {getGameCategories(game).slice(0, 2).map((category) => (
                    <span
                      key={category}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-200"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
