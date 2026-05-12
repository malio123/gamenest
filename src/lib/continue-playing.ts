import { getGameBySlug, isGameVisible } from "@/data/games";

export const CONTINUE_PLAYING_STORAGE_KEY = "gamenest:continue-playing";
export const CONTINUE_PLAYING_LIMIT = 6;
export const CONTINUE_PLAYING_TTL_MS = 24 * 60 * 60 * 1000;

export type ContinuePlayingEntry = {
  slug: string;
  title: string;
  thumbnail: string;
  categories: string[];
  playedAt: number;
};

function isValidEntry(value: unknown): value is ContinuePlayingEntry {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const entry = value as Record<string, unknown>;

  return (
    typeof entry.slug === "string" &&
    typeof entry.title === "string" &&
    typeof entry.thumbnail === "string" &&
    Array.isArray(entry.categories) &&
    entry.categories.every((category) => typeof category === "string") &&
    typeof entry.playedAt === "number" &&
    Number.isFinite(entry.playedAt)
  );
}

export function readContinuePlaying(): ContinuePlayingEntry[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CONTINUE_PLAYING_STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    const now = Date.now();
    const nextEntries = parsed
      .filter(isValidEntry)
      .filter((entry) => now - entry.playedAt < CONTINUE_PLAYING_TTL_MS)
      .map((entry) => {
        const game = getGameBySlug(entry.slug);

        if (!game || !isGameVisible(game)) {
          return null;
        }

        return {
          slug: game.slug,
          title: game.title,
          thumbnail: game.thumbnail,
          categories: game.categories,
          playedAt: entry.playedAt,
        };
      })
      .filter((entry): entry is ContinuePlayingEntry => entry !== null)
      .sort((left, right) => right.playedAt - left.playedAt)
      .slice(0, CONTINUE_PLAYING_LIMIT);

    window.localStorage.setItem(CONTINUE_PLAYING_STORAGE_KEY, JSON.stringify(nextEntries));

    return nextEntries;
  } catch {
    return [];
  }
}

export function saveContinuePlaying(entry: ContinuePlayingEntry) {
  if (typeof window === "undefined") {
    return;
  }

  const nextEntries = [
    entry,
    ...readContinuePlaying().filter((item) => item.slug !== entry.slug),
  ].slice(0, CONTINUE_PLAYING_LIMIT);

  window.localStorage.setItem(CONTINUE_PLAYING_STORAGE_KEY, JSON.stringify(nextEntries));
}
