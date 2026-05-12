"use client";

import { useState } from "react";
import Link from "next/link";
import { SidebarNav } from "@/components/SidebarNav";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-[60] border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-[1600px] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 shadow-[0_12px_28px_-20px_rgba(2,8,23,0.85)] transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>

          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="GameNest home">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[linear-gradient(135deg,#1d4ed8,#06b6d4_58%,#8b5cf6)] text-lg font-black text-white shadow-[0_12px_28px_-12px_rgba(29,78,216,0.55)]">
              G
            </span>
            <div className="hidden min-w-0 sm:block">
              <span className="block text-xl font-black tracking-tight text-white">
                GameNest
              </span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                Play instantly
              </span>
            </div>
          </Link>

          <form action="/games" method="get" className="flex min-w-0 flex-1 justify-center">
            <label className="sr-only" htmlFor="portal-search">
              Search games and categories
            </label>
            <div className="relative w-full max-w-3xl">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                🔎
              </span>
              <input
                id="portal-search"
                name="q"
                type="search"
                placeholder="Search games and categories"
                className="h-11 w-full rounded-full border border-white/10 bg-white/5 px-11 pr-4 text-sm font-semibold text-white shadow-[0_16px_36px_-24px_rgba(2,8,23,0.8)] outline-none transition placeholder:text-slate-400 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-500/10"
              />
            </div>
          </form>

          <div className="hidden items-center gap-2 sm:flex">
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 shadow-[0_10px_24px_-20px_rgba(2,8,23,0.8)] transition hover:bg-white/10">
              ⭐
            </span>
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 shadow-[0_10px_24px_-20px_rgba(2,8,23,0.8)] transition hover:bg-white/10">
              🎲
            </span>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[70] flex lg:hidden">
          <button
            type="button"
            className="flex-1 bg-slate-950/28 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="w-[min(88vw,360px)] border-l border-white/10 bg-slate-950/98 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-base font-black text-white">Browse</p>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <SidebarNav mobile onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
