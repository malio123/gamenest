import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { GameContentSections } from "@/components/GameContentSections";
import { Footer } from "@/components/Footer";
import { GameHistoryTracker } from "@/components/GameHistoryTracker";
import { GameInfoSidebar } from "@/components/GameInfoSidebar";
import { GamePlayer } from "@/components/GamePlayer";
import { Header } from "@/components/Header";
import { RelatedGamesGrid } from "@/components/RelatedGamesGrid";
import { getCategoryHref } from "@/data/categories";
import {
  getGameCategories,
  getGameThumbnail,
  getVisibleGameBySlug,
  languageSafeGames,
  popularGames,
  visibleGames,
} from "@/data/games";
import {
  absoluteUrl,
  buildGameMetadata,
  buildPageMetadata,
  getGameCanonicalUrl,
  getGameMetaDescription,
  getPrimaryCategoryName,
} from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return visibleGames.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getVisibleGameBySlug(slug);

  if (!game) {
    return buildPageMetadata(
      "Game Not Found | GameNest",
      "This game could not be found on GameNest.",
      "/games",
    );
  }

  return buildGameMetadata(game);
}

export default async function GameDetailPage({ params }: Props) {
  const { slug } = await params;
  const game = getVisibleGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const categories = getGameCategories(game);
  const primaryCategory = getPrimaryCategoryName(game);
  const breadcrumbCategory = primaryCategory ?? "Games";
  const primaryCategoryHref = primaryCategory ? getCategoryHref(primaryCategory) : null;
  const allOtherGames = languageSafeGames.filter((candidate) => candidate.slug !== game.slug);
  const moreCategoryGames = primaryCategory
    ? allOtherGames
        .filter((candidate) => getGameCategories(candidate).includes(primaryCategory))
        .slice(0, 12)
    : [];
  const popularExcludingCurrent = popularGames.filter((candidate) => candidate.slug !== game.slug);
  const popularGamesWithoutCategoryDuplicates = popularExcludingCurrent.filter(
    (candidate) => !moreCategoryGames.some((relatedGame) => relatedGame.slug === candidate.slug),
  );
  const broaderPopularGames =
    popularGamesWithoutCategoryDuplicates.length > 0
      ? popularGamesWithoutCategoryDuplicates.slice(0, 12)
      : allOtherGames
          .filter(
            (candidate) => !moreCategoryGames.some((relatedGame) => relatedGame.slug === candidate.slug),
          )
          .slice(0, 12);
  const relatedTitle = primaryCategory ? `More ${primaryCategory} Games` : null;
  const relatedSubtitle = primaryCategory
    ? `More ${primaryCategory.toLowerCase()} browser games related to ${game.title}.`
    : null;
  const gameUrl = getGameCanonicalUrl(game);
  const gameDescription = getGameMetaDescription(game);
  const gameImage = game.thumbnail ? absoluteUrl(getGameThumbnail(game)) : undefined;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Games",
        item: absoluteUrl("/games"),
      },
      ...(primaryCategoryHref
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: primaryCategory,
              item: absoluteUrl(primaryCategoryHref),
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: primaryCategoryHref ? 4 : 3,
        name: game.title,
        item: gameUrl,
      },
    ],
  };
  const videoGameJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: gameDescription,
    image: gameImage,
    url: gameUrl,
    genre: categories,
    applicationCategory: "Game",
    operatingSystem: "Web Browser",
    gamePlatform: "Web Browser",
    playMode: game.playMode ?? game.gameModes,
    author: game.author ?? game.developer,
    developer: game.developer,
    datePublished: game.releaseDate,
    dateModified: game.updatedDate,
    aggregateRating:
      game.rating != null && game.votes != null
        ? {
            "@type": "AggregateRating",
            ratingValue: game.rating,
            ratingCount: game.votes,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
  };
  const jsonLd = JSON.stringify([breadcrumbJsonLd, videoGameJsonLd]).replace(
    /</g,
    "\\u003c",
  );

  return (
    <div className="min-h-screen text-white">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <GameHistoryTracker
        game={{
          slug: game.slug,
          title: game.title,
          thumbnail: getGameThumbnail(game),
          categories,
        }}
      />
      <main className="mx-auto max-w-[1360px] space-y-5 px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500"
        >
          <Link href="/" className="transition hover:text-cyan-300">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-slate-600" />
          <Link href="/games" className="transition hover:text-cyan-300">
            Games
          </Link>
          <ChevronRight className="h-4 w-4 text-slate-600" />
          {primaryCategoryHref ? (
            <Link href={primaryCategoryHref} className="transition hover:text-cyan-300">
              {primaryCategory}
            </Link>
          ) : (
            <span>{breadcrumbCategory}</span>
          )}
          <ChevronRight className="h-4 w-4 text-slate-600" />
          <span className="text-white">{game.title}</span>
        </nav>

        <section className="portal-panel relative space-y-3 overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(8,18,37,0.92),rgba(15,23,42,0.82))] p-4 sm:p-5">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
          <div className="space-y-2">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
              Free Browser Game
            </p>
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-[2rem]">
              {game.title}
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-slate-400 sm:text-[15px]">
              {game.shortDescription ??
                `Play ${game.title} online for free on GameNest with instant access and no download.`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const href = getCategoryHref(category);

              if (!href) {
                return (
                  <span
                    key={category}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-slate-300"
                  >
                    {category}
                  </span>
                );
              }

              return (
                <Link
                  key={category}
                  href={href}
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-bold text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/15 hover:text-cyan-200"
                >
                  {category}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <GamePlayer
            title={game.title}
            iframeUrl={game.iframeUrl}
            iframeStatus={game.iframeStatus}
            aspectRatio={game.aspectRatio}
            thumbnail={getGameThumbnail(game)}
          />
          <GameInfoSidebar game={game} />
        </section>

        <GameContentSections game={game} />

        {relatedTitle && relatedSubtitle && moreCategoryGames.length > 0 ? (
          <RelatedGamesGrid
            title={relatedTitle}
            subtitle={relatedSubtitle}
            games={moreCategoryGames}
          />
        ) : null}

        <RelatedGamesGrid
          title="Popular Games"
          subtitle="Broader hits across GameNest when you want something else after this match."
          games={broaderPopularGames}
        />
      </main>
      <Footer />
    </div>
  );
}
