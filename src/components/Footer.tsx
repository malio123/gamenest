import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-slate-400 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div className="space-y-3">
          <Link href="/" className="inline-flex items-center gap-3 text-base font-black text-white">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-[linear-gradient(135deg,#1d4ed8,#06b6d4_58%,#8b5cf6)] text-white shadow-[0_12px_26px_-16px_rgba(29,78,216,0.55)]">
              G
            </span>
            GameNest
          </Link>
        </div>

        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
            Browse
          </p>
          <div className="grid gap-2">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <Link href="/games" className="transition hover:text-white">
              All Games
            </Link>
            <Link href="/popular" className="transition hover:text-white">
              Popular
            </Link>
            <Link href="/new" className="transition hover:text-white">
              New
            </Link>
            <Link href="/categories" className="transition hover:text-white">
              Categories
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
            Categories
          </p>
          <div className="grid gap-2">
            <Link href="/category/action" className="transition hover:text-white">
              Action
            </Link>
            <Link href="/category/puzzle" className="transition hover:text-white">
              Puzzle
            </Link>
            <Link href="/category/racing" className="transition hover:text-white">
              Racing
            </Link>
            <Link href="/category/sports" className="transition hover:text-white">
              Sports
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl border-t border-white/10 px-4 py-4 text-xs text-slate-500 sm:px-6 lg:px-8">
        <p>Copyright 2026 GameNest. All rights reserved.</p>
      </div>
    </footer>
  );
}
