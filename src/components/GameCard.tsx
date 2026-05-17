import Link from "next/link";
import Image from "next/image";
import { getGameCategories, getGameThumbnail, type Game } from "@/data/games";

type GameCardProps = {
  game: Game;
};

export function GameCard({ game }: GameCardProps) {
  const visibleCategories = getGameCategories(game).slice(0, 2);

  return (
    <Link
      href={`/games/${game.slug}`}
      aria-label={`Play ${game.title}`}
      className="group block h-full overflow-hidden rounded-[22px] border border-white/10 bg-slate-950/88 shadow-[0_18px_42px_-26px_rgba(15,23,42,0.65)] transition duration-300 hover:-translate-y-1.5 hover:border-cyan-400/35 hover:shadow-[0_28px_56px_-28px_rgba(14,116,144,0.34)]"
    >
      <article className="flex h-full flex-col">
        <div className="relative aspect-[1.575] overflow-hidden bg-slate-900">
          <Image
            src={getGameThumbnail(game)}
            alt={`${game.title} online game thumbnail`}
            title={`Play ${game.title} online`}
            fill
            sizes="(min-width: 1536px) 16vw, (min-width: 1280px) 20vw, (min-width: 768px) 28vw, (min-width: 420px) 44vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/18 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-3.5">
          <div className="min-w-0 space-y-2">
            <p className="line-clamp-2 text-base font-black tracking-tight text-white">
              {game.title}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {visibleCategories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <span className="mt-auto inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-black text-white transition group-hover:border-cyan-400/35 group-hover:bg-cyan-400/12">
            Play Now
          </span>
        </div>
      </article>
    </Link>
  );
}
