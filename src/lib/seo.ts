import type { Metadata } from "next";
import type { Category } from "@/data/categories";
import type { Game } from "@/data/games";

export const siteName = "GameNest";
const fallbackSiteUrl = "https://gamenest.example.com";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const isLocalhostUrl =
  configuredSiteUrl != null &&
  /^https?:\/\/(localhost|127(?:\.\d{1,3}){3})(:\d+)?/i.test(configuredSiteUrl);

export const siteUrl =
  configuredSiteUrl && !(process.env.NODE_ENV === "production" && isLocalhostUrl)
    ? configuredSiteUrl.replace(/\/+$/, "")
    : fallbackSiteUrl;

export const homeTitle = "Play Free Online Games Instantly | GameNest";
export const homeDescription =
  "Play free online games instantly on GameNest. Enjoy browser games across action, puzzle, arcade, racing, sports, card, casual, and more categories with no downloads.";

export function absoluteUrl(path = "/") {
  const normalizedPath = path === "/" ? "" : path;
  return `${siteUrl}${normalizedPath}`;
}

export function buildOpenGraph(
  title: string,
  description: string,
  path = "/",
): Metadata["openGraph"] {
  return {
    title,
    description,
    siteName,
    type: "website",
    url: absoluteUrl(path),
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
      canonical: path,
    },
    openGraph: buildOpenGraph(title, description, path),
  };
}

export function buildCategoryMetadata(category: Category, gameCount: number): Metadata {
  const title = `${category.name} Games | ${siteName}`;
  const description = `${category.seoDescription} Browse ${gameCount} instant-play browser games on ${siteName} with no downloads.`;

  return buildPageMetadata(title, description, category.href);
}

export function buildGameMetadata(game: Game): Metadata {
  const title = `Play ${game.title} Online for Free | ${siteName}`;
  const description = `Play ${game.title} online for free on ${siteName}. ${game.description}`;

  return buildPageMetadata(title, description, `/games/${game.slug}`);
}
