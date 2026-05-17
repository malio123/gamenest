import type { Metadata } from "next";
import type { Category } from "@/data/categories";
import { getCategoryByValue } from "@/data/categories";
import { getGameThumbnail, type Game } from "@/data/games";

export const siteName = "GameNest";
const fallbackSiteUrl = "http://localhost:3000";
const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.NEXT_PUBLIC_APP_URL?.trim();

export const siteUrl = (configuredSiteUrl || fallbackSiteUrl).replace(/\/+$/, "");

export const homeTitle = "Play Free Online Games Instantly | GameNest";
export const homeDescription =
  "Play free online games instantly on GameNest. Enjoy browser games across action, puzzle, arcade, racing, sports, card, casual, and more categories with no downloads.";

export function absoluteUrl(path = "/") {
  const normalizedPath = path === "/" ? "" : path;
  return `${siteUrl}${normalizedPath}`;
}

function compactWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function stripTrailingSentencePunctuation(value: string) {
  return value.replace(/[.!?\s]+$/g, "").trim();
}

function trimDescription(value: string, maxLength = 160) {
  const normalized = compactWhitespace(value);

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const shortened = normalized.slice(0, maxLength - 1);
  const lastBreak = shortened.lastIndexOf(" ");
  return `${(lastBreak > 110 ? shortened.slice(0, lastBreak) : shortened).trimEnd()}.`;
}

export function getPrimaryCategoryName(game: Pick<Game, "categories">) {
  return game.categories?.[0] ?? null;
}

export function getGameCanonicalPath(game: Pick<Game, "slug">) {
  return `/games/${game.slug}`;
}

export function getGameCanonicalUrl(game: Pick<Game, "slug">) {
  return absoluteUrl(getGameCanonicalPath(game));
}

export function getGameMetaTitle(game: Game) {
  const primaryCategory = getPrimaryCategoryName(game);
  const canonicalCategory = primaryCategory ? getCategoryByValue(primaryCategory)?.name : null;

  return (
    game.metaTitle ??
    game.seoTitle ??
    (canonicalCategory
      ? `Play ${game.title} - Free ${canonicalCategory} Game | ${siteName}`
      : `Play ${game.title} Online for Free | ${siteName}`)
  );
}

export function getGameMetaDescription(game: Game) {
  const baseDescription =
    game.metaDescription ??
    game.seoDescription ??
    `Play ${game.title} online for free on ${siteName}. ${
      stripTrailingSentencePunctuation(game.shortDescription ?? game.description)
    } Enjoy instant browser gameplay with no downloads.`;

  return trimDescription(baseDescription, 160);
}

export function buildOpenGraph(
  title: string,
  description: string,
  path = "/",
  imagePath?: string,
): Metadata["openGraph"] {
  return {
    title,
    description,
    siteName,
    type: "website",
    url: absoluteUrl(path),
    images: imagePath
      ? [
          {
            url: absoluteUrl(imagePath),
            alt: `${title} preview image`,
          },
        ]
      : undefined,
  };
}

export function buildPageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: buildOpenGraph(title, description, path),
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildCategoryMetadata(category: Category, gameCount: number): Metadata {
  const title = `${category.name} Games | ${siteName}`;
  const description = `${category.seoDescription} Browse ${gameCount} instant-play browser games on ${siteName} with no downloads.`;

  return buildPageMetadata(title, description, category.href);
}

export function buildGameMetadata(game: Game): Metadata {
  const title = getGameMetaTitle(game);
  const description = getGameMetaDescription(game);
  const path = getGameCanonicalPath(game);
  const imagePath = game.thumbnail ? getGameThumbnail(game) : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: getGameCanonicalUrl(game),
    },
    openGraph: buildOpenGraph(title, description, path, imagePath),
    twitter: {
      card: imagePath ? "summary_large_image" : "summary",
      title,
      description,
      images: imagePath ? [absoluteUrl(imagePath)] : undefined,
    },
  };
}
