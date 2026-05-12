"use client";

import { useEffect } from "react";
import { saveContinuePlaying } from "@/lib/continue-playing";

type GameHistoryTrackerProps = {
  game: {
    slug: string;
    title: string;
    thumbnail: string;
    categories: string[];
  };
};

export function GameHistoryTracker({ game }: GameHistoryTrackerProps) {
  useEffect(() => {
    saveContinuePlaying({
      ...game,
      playedAt: Date.now(),
    });
  }, [game]);

  return null;
}
