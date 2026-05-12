import type { Game } from "@/data/games";
import { GameGrid } from "./GameGrid";
import { SectionHeader } from "./SectionHeader";

type GameGridSectionProps = {
  id?: string;
  title: string;
  games: Game[];
  description?: string;
  href?: string;
  linkLabel?: string;
};

export function GameGridSection({
  id,
  title,
  games,
  description,
  href = "/games",
  linkLabel,
}: GameGridSectionProps) {
  return (
    <section id={id} className="space-y-4">
      <SectionHeader
        title={title}
        description={description}
        href={href}
        linkLabel={linkLabel}
      />
      <GameGrid games={games} />
    </section>
  );
}
