import type { Game } from "@/data/games";
import { GameCard } from "./GameCard";

type GameGridProps = {
  games: Game[];
};

export function GameGrid({ games }: GameGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
