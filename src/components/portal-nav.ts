import { categories } from "@/data/categories";

export const primarySidebarNavLinks = [
  { label: "Home", href: "/", icon: "home" },
  { label: "All Games", href: "/games", icon: "gamepad-2" },
  { label: "Popular", href: "/popular", icon: "flame" },
  { label: "New", href: "/new", icon: "sparkles" },
] as const;

export const sidebarCategoryLinks = categories.map((category) => ({
  slug: category.slug,
  label: category.name,
  href: category.href,
  icon: category.icon,
}));
