import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { games } from "@/data/games";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes: Array<{
    route: string;
    changeFrequency: "daily" | "weekly";
    priority: number;
  }> = [
    { route: "", changeFrequency: "daily", priority: 1 },
    { route: "/games", changeFrequency: "weekly", priority: 0.8 },
    { route: "/popular", changeFrequency: "weekly", priority: 0.8 },
    { route: "/new", changeFrequency: "weekly", priority: 0.7 },
    { route: "/categories", changeFrequency: "weekly", priority: 0.8 },
  ];

  return [
    ...staticRoutes.map((item) => ({
      url: `${siteUrl}${item.route}`,
      lastModified,
      changeFrequency: item.changeFrequency,
      priority: item.priority,
    })),
    ...categories.map((category) => ({
      url: `${siteUrl}${category.href}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...games.map((game) => ({
      url: `${siteUrl}/games/${game.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
