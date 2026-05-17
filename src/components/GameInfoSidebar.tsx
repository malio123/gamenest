"use client";

import {
  Gamepad2,
  Monitor,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { getGameCategories, getGameTags, type Game } from "@/data/games";

type GameInfoSidebarProps = {
  game: Game;
};

function formatTag(tag: string) {
  return tag
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => {
      if (part.toUpperCase() === part) {
        return part;
      }

      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join(" ");
}

function formatRating(rating?: number) {
  if (rating == null) {
    return "New";
  }

  return `${rating.toFixed(1)}/5`;
}

export function GameInfoSidebar({ game }: GameInfoSidebarProps) {
  const categories = getGameCategories(game);
  const tags = getGameTags(game);
  const controlItems =
    game.controlItems ??
    (game.controls ?? []).map((item, index) => ({
      label: `Control ${index + 1}`,
      value: item,
    }));

  return (
    <aside className="space-y-4">
      <section className="portal-card p-5">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-cyan-300" />
          <p className="text-base font-black text-white">Game Info</p>
        </div>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex items-start justify-between gap-4 border-b border-white/6 pb-3">
            <dt className="text-slate-400">Rating</dt>
            <dd className="font-bold text-white">{formatRating(game.rating)}</dd>
          </div>
          {game.plays ? (
            <div className="flex items-start justify-between gap-4 border-b border-white/6 pb-3">
              <dt className="text-slate-400">Plays</dt>
              <dd className="font-bold text-white">{game.plays}</dd>
            </div>
          ) : null}
          <div className="flex items-start justify-between gap-4 border-b border-white/6 pb-3">
            <dt className="inline-flex items-center gap-2 text-slate-400">
              <Monitor className="h-4 w-4" />
              Platform
            </dt>
            <dd className="font-bold text-white">{game.platform ?? "Browser"}</dd>
          </div>
          <div className="flex items-start justify-between gap-4 border-b border-white/6 pb-3">
            <dt className="inline-flex items-center gap-2 text-slate-400">
              <Wrench className="h-4 w-4" />
              Technology
            </dt>
            <dd className="font-bold text-white">{game.technology ?? "HTML5"}</dd>
          </div>
          <div className="flex items-start justify-between gap-4 border-b border-white/6 pb-3">
            <dt className="text-slate-400">Category</dt>
            <dd className="text-right font-bold text-white">
              {categories.length > 0 ? categories.join(", ") : "Browser Game"}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="inline-flex items-center gap-2 text-slate-400">
              <ShieldCheck className="h-4 w-4" />
              Status
            </dt>
            <dd className="text-right font-bold text-white">
              {game.statusLabel ?? "Play instantly, no download"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="portal-card p-5">
        <div className="flex items-center gap-2">
          <Gamepad2 className="h-4 w-4 text-cyan-300" />
          <p className="text-base font-black text-white">Controls</p>
        </div>
        <ul className="mt-4 space-y-3">
          {controlItems.map((item) => (
            <li key={item.label} className="flex items-start justify-between gap-4 text-sm">
              <span className="text-slate-400">{item.label}</span>
              <span className="text-right font-bold text-white">{item.value}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="portal-card p-5">
        <p className="text-base font-black text-white">Tags</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-cyan-400/18 bg-cyan-400/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-cyan-300"
            >
              {formatTag(tag)}
            </span>
          ))}
        </div>
      </section>
    </aside>
  );
}
