import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import {
  getGameControls,
  getGameFeatures,
  getGameHowToPlay,
  type Game,
} from "@/data/games";
import { getPrimaryCategoryName } from "@/lib/seo";

type GameContentSectionsProps = {
  game: Game;
};

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="portal-card p-6 sm:p-7">
      <h2 className="text-xl font-black tracking-tight text-white">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{children}</div>
    </section>
  );
}

export function GameContentSections({ game }: GameContentSectionsProps) {
  const primaryCategory = getPrimaryCategoryName(game) ?? "Game";
  const intro = game.shortDescription ?? game.description;
  const aboutCopy =
    game.longDescription ??
    game.overview ??
    `Play ${game.title} online on GameNest and jump into a browser ${primaryCategory.toLowerCase()} game built for instant sessions and quick restarts.`;
  const howToPlay = getGameHowToPlay(game);
  const controls = getGameControls(game);
  const objective = game.gameplayObjective
    ? [game.gameplayObjective, ...howToPlay]
    : howToPlay;
  const tips =
    game.tips && game.tips.length > 0
      ? game.tips
      : objective.length > 0
        ? objective.slice(0, 4)
        : [
            `Start with a short round in ${game.title} to learn the pace and controls.`,
            "Focus on clean decisions instead of rushing every move.",
          ];
  const features = [
    ...(getGameFeatures(game).length > 0
      ? getGameFeatures(game)
      : [
          `Instant browser access for ${game.title}.`,
          "No installation required to start playing.",
        ]),
    ...(game.gameModes?.length ? [`Game modes: ${game.gameModes.join(", ")}.`] : []),
    ...(game.version ? [`Current version: ${game.version}.`] : []),
    ...(game.updateNotes?.length ? [`Latest update: ${game.updateNotes[0]}`] : []),
  ];
  const faq =
    game.faq && game.faq.length > 0
      ? game.faq
      : [
          {
            question: `Can I play ${game.title} online for free?`,
            answer: `Yes. You can play ${game.title} online for free on GameNest directly in your browser.`,
          },
          {
            question: `What kind of game is ${game.title}?`,
            answer: `${game.title} fits into ${primaryCategory.toLowerCase()} gameplay and is designed for quick browser sessions.`,
          },
        ];

  return (
    <div className="space-y-4">
      <section className="portal-card p-6 sm:p-7">
        <p className="text-sm leading-7 text-slate-300 sm:text-base">{intro}</p>
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <div className="space-y-4">
          <SectionCard title={`About ${game.title}`}>
            <div className="space-y-4">
              <p>{aboutCopy}</p>
              {game.isOriginal ? (
                <p>
                  This is an original GameNest release
                  {game.developer ? ` by ${game.developer}` : ""}.
                  {game.releaseDate ? ` First published on ${game.releaseDate}.` : ""}
                  {game.updatedDate ? ` Last updated on ${game.updatedDate}.` : ""}
                </p>
              ) : null}
              {game.developer || game.releaseDate || game.updatedDate || game.version ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                  {game.developer ? <p>Developer: {game.developer}</p> : null}
                  {game.releaseDate ? <p>Release date: {game.releaseDate}</p> : null}
                  {game.updatedDate ? <p>Updated date: {game.updatedDate}</p> : null}
                  {game.version ? <p>Version: {game.version}</p> : null}
                </div>
              ) : null}
            </div>
          </SectionCard>

          <SectionCard title="How to Play">
            <ul className="space-y-2">
              {objective.length > 0 ? (
                objective.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-slate-300">
                  Start the game, learn the current objective, and adapt to each round as it
                  unfolds.
                </li>
              )}
            </ul>
          </SectionCard>

          <SectionCard title="Game Features">
            <ul className="space-y-2">
              {features.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        <div className="space-y-4">
          <SectionCard title="Controls">
            <ul className="space-y-2">
              {controls.length > 0 ? (
                controls.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-slate-300">
                  Use the on-screen instructions in the player to learn the controls for this
                  game.
                </li>
              )}
            </ul>
          </SectionCard>

          <SectionCard title="Tips and Strategy">
            <ul className="space-y-2">
              {tips.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </div>

      <SectionCard title="FAQ">
        <div className="space-y-4">
          {faq.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-white">
                <span>{item.question}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition duration-200 group-open:rotate-180 group-open:text-cyan-300" />
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">{item.answer}</p>
            </details>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
