"use client";

import { useEffect, useRef, useState } from "react";
import { Expand, RefreshCcw } from "lucide-react";
import {
  hasPlayableIframe,
  type GameAspectRatio,
  type IframeStatus,
} from "@/data/games";

type GamePlayerProps = {
  title: string;
  iframeUrl: string;
  iframeStatus?: IframeStatus;
  aspectRatio?: GameAspectRatio;
  thumbnail?: string;
};

export function GamePlayer({
  title,
  iframeUrl,
  iframeStatus,
  aspectRatio = "16/9",
  thumbnail,
}: GamePlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const [loadKey, setLoadKey] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const showPlaceholder = !hasPlayableIframe({ iframeUrl, iframeStatus });
  const showLoadFallback = hasStarted && isTimedOut && !isLoaded;
  const isLoading = hasStarted && !showPlaceholder && !isLoaded && !showLoadFallback;
  const usesAutoHeight = aspectRatio === "auto";
  const viewportStyle = usesAutoHeight ? undefined : { aspectRatio: aspectRatio.replace("/", " / ") };
  const viewportClassName = usesAutoHeight
    ? "min-h-[360px] sm:min-h-[460px] lg:min-h-[560px]"
    : "";

  useEffect(() => {
    if (showPlaceholder || !hasStarted) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsTimedOut(true);
    }, 10000);

    return () => window.clearTimeout(timeoutId);
  }, [hasStarted, iframeUrl, loadKey, showPlaceholder]);

  const shouldShowPreparedState = showPlaceholder;

  function enterFullscreen() {
    const fullscreenRequest = playerRef.current?.requestFullscreen?.();
    fullscreenRequest?.catch(() => undefined);
  }

  function reloadGame() {
    setHasStarted(true);
    setIsLoaded(false);
    setIsTimedOut(false);
    setLoadKey((currentKey) => currentKey + 1);
  }

  function startGame() {
    setHasStarted(true);
    setIsLoaded(false);
    setIsTimedOut(false);
  }

  return (
    <section
      className="self-start overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/80 text-white shadow-[0_24px_56px_-32px_rgba(2,8,23,0.88)] backdrop-blur-lg"
    >
      <div
        ref={playerRef}
        className="h-auto overflow-hidden rounded-[24px] bg-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
      >
        <div className="flex h-10 items-center justify-end gap-2 border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-3">
            <button
              type="button"
              onClick={enterFullscreen}
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 text-xs font-bold text-cyan-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/14"
            >
              <Expand className="h-3.5 w-3.5" />
              Fullscreen
            </button>
            <button
              type="button"
              onClick={reloadGame}
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 text-xs font-bold text-white transition hover:border-white/20 hover:bg-white/8"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              Reload
            </button>
        </div>

        {shouldShowPreparedState ? (
          <div
            className={`flex w-full flex-col items-center justify-center gap-4 bg-[linear-gradient(135deg,#1e1b4b,#0f172a_45%,#0f766e)] p-6 text-center text-white ${viewportClassName}`}
            style={viewportStyle}
          >
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-2xl font-black">
              GN
            </div>
            <div className="min-w-0">
              <p className="max-w-md text-sm leading-6 text-slate-200">
                This browser game is not available right now.
              </p>
            </div>
          </div>
        ) : (
          <div
            className={`relative w-full bg-slate-950 ${viewportClassName}`}
            style={viewportStyle}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-b-[24px] ring-1 ring-inset ring-white/8"
            />
            {!hasStarted ? (
              <button
                type="button"
                onClick={startGame}
                className="absolute inset-0 z-20 block text-left"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={thumbnail ? { backgroundImage: `url(${thumbnail})` } : undefined}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_35%),linear-gradient(180deg,rgba(2,6,23,0.36),rgba(2,6,23,0.92))]" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="max-w-xl space-y-3">
                    <span className="inline-flex rounded-full border border-cyan-400/20 bg-slate-950/65 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-cyan-300">
                      Instant Browser Play
                    </span>
                    <div className="space-y-2">
                      <p className="text-2xl font-black text-white sm:text-3xl">Play Now</p>
                      <p className="text-sm leading-6 text-slate-200 sm:text-base">
                        Launch the game in the browser with no download.
                      </p>
                    </div>
                    <span className="inline-flex h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2563eb,#0891b2_72%,#22c55e)] px-5 text-sm font-black text-white shadow-[0_18px_38px_-24px_rgba(6,182,212,0.7)]">
                      Start Game
                    </span>
                  </div>
                </div>
              </button>
            ) : null}

            {isLoading ? (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_35%),linear-gradient(180deg,rgba(8,17,34,0.74),rgba(2,6,23,0.92))] text-center">
                {thumbnail ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-25 blur-[2px]"
                    style={{ backgroundImage: `url(${thumbnail})` }}
                  />
                ) : null}
                <div className="grid h-14 w-14 animate-pulse place-items-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-lg font-black text-cyan-200">
                  GN
                </div>
                <div className="space-y-1 px-6">
                  <p className="text-base font-black text-white">Loading game</p>
                  <p className="text-sm text-slate-300">
                    Preparing the browser game.
                  </p>
                </div>
              </div>
            ) : null}

            {showLoadFallback ? (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-[linear-gradient(180deg,rgba(2,6,23,0.88),rgba(2,6,23,0.98))] p-6">
                <div className="max-w-md space-y-4 text-center">
                  <p className="text-lg font-black text-white">
                    Game is taking longer than expected to load.
                  </p>
                  <p className="text-sm leading-6 text-slate-300">
                    Try reloading or opening fullscreen.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={reloadGame}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 text-sm font-black text-cyan-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/14"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Reload
                    </button>
                    <button
                      type="button"
                      onClick={enterFullscreen}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-black text-white transition hover:border-white/20 hover:bg-white/8"
                    >
                      <Expand className="h-4 w-4" />
                      Fullscreen
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {hasStarted ? (
              <iframe
                key={loadKey}
                src={iframeUrl}
                title={title}
                className="absolute inset-0 h-full w-full border-0"
                allow="fullscreen; autoplay; gamepad"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setIsLoaded(true)}
              />
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
