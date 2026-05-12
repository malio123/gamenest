"use client";

import { useEffect, useRef, useState } from "react";

type GamePlayerProps = {
  title: string;
  iframeUrl: string;
  categories?: string[];
};

function isPlaceholderUrl(url: string) {
  return !url || url.includes("example.com");
}

export function GamePlayer({ title, iframeUrl, categories = [] }: GamePlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
  const [timedOutUrl, setTimedOutUrl] = useState<string | null>(null);
  const showPlaceholder = isPlaceholderUrl(iframeUrl);
  const showLoadFallback = timedOutUrl === iframeUrl && loadedUrl !== iframeUrl;
  const isLoading = !showPlaceholder && loadedUrl !== iframeUrl && !showLoadFallback;

  useEffect(() => {
    if (showPlaceholder) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setTimedOutUrl(iframeUrl);
    }, 10000);

    return () => window.clearTimeout(timeoutId);
  }, [iframeUrl, showPlaceholder]);

  const shouldShowPreparedState = showPlaceholder || showLoadFallback;

  function enterFullscreen() {
    playerRef.current?.requestFullscreen?.();
  }

  return (
    <section className="portal-panel overflow-hidden bg-[linear-gradient(180deg,#081225,#0f172a_42%,#020617)] p-2 text-white sm:p-3">
      <div
        ref={playerRef}
        className="overflow-hidden rounded-[24px] border border-white/10 bg-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_50px_-28px_rgba(15,23,42,0.95)]"
      >
        <div className="flex flex-col gap-3 border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="min-w-0">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
              Arcade Cabinet
            </p>
            <h2 className="truncate text-xl font-black text-white sm:text-2xl">
              {title}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-cyan-400/15 bg-white/8 px-3 py-1 text-xs font-bold text-slate-100"
              >
                {category}
              </span>
            ))}
            <button
              type="button"
              onClick={enterFullscreen}
              className="inline-flex h-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2563eb,#0891b2_72%,#7c3aed)] px-4 text-sm font-black text-white shadow-[0_14px_26px_-18px_rgba(37,99,235,0.72)] transition hover:translate-y-[-1px]"
            >
              Fullscreen
            </button>
          </div>
        </div>

        {shouldShowPreparedState ? (
          <div className="flex h-[420px] flex-col items-center justify-center gap-4 bg-[linear-gradient(135deg,#1e1b4b,#0f172a_45%,#0f766e)] p-6 text-center text-white md:h-[520px] lg:h-[600px]">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-2xl font-black">
              GN
            </div>
            <div className="space-y-2">
              <p className="text-xl font-black">{title}</p>
              <p className="max-w-md text-sm leading-6 text-slate-200">
                Game preview is being prepared.
              </p>
            </div>
          </div>
        ) : (
          <div className="relative">
            {isLoading ? (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_35%),linear-gradient(180deg,rgba(8,17,34,0.96),rgba(2,6,23,0.98))] text-center">
                <div className="grid h-14 w-14 animate-pulse place-items-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-lg font-black text-cyan-200">
                  GN
                </div>
                <div className="space-y-1 px-6">
                  <p className="text-base font-black text-white">Loading game…</p>
                  <p className="text-sm text-slate-300">
                    Preparing the arcade cabinet.
                  </p>
                </div>
              </div>
            ) : null}
            <iframe
              src={iframeUrl}
              title={title}
              className="h-[420px] w-full border-0 md:h-[520px] lg:h-[600px]"
              allow="fullscreen; autoplay; gamepad"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setLoadedUrl(iframeUrl)}
            />
          </div>
        )}
      </div>
    </section>
  );
}
