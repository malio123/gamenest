import {
  Car,
  Castle,
  Compass,
  Crosshair,
  Dices,
  Joystick,
  Puzzle,
  Sparkles,
  Spade,
  Trophy,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Category = {
  slug: string;
  name: string;
  icon: LucideIcon;
  description: string;
  seoDescription: string;
  href: string;
};

export const categories: Category[] = [
  {
    slug: "action",
    name: "Action",
    icon: Zap,
    description: "Fast browser games focused on timing, movement, and quick reactions.",
    seoDescription:
      "Play free action games online with reflex challenges, endless runs, and fast-paced gameplay.",
    href: "/category/action",
  },
  {
    slug: "adventure",
    name: "Adventure",
    icon: Compass,
    description: "Explore mission-based games with discovery and progression.",
    seoDescription:
      "Play free adventure games online with exploration, missions, and instant browser gameplay.",
    href: "/category/adventure",
  },
  {
    slug: "arcade",
    name: "Arcade",
    icon: Joystick,
    description: "Quick rounds, simple controls, and classic instant-play energy.",
    seoDescription:
      "Play free arcade games online on GameNest with quick controls and no downloads.",
    href: "/category/arcade",
  },
  {
    slug: "racing",
    name: "Racing",
    icon: Car,
    description: "Drift, drive, and push speed-based challenges in the browser.",
    seoDescription:
      "Play free racing games online with cars, bikes, and speed-based browser challenges.",
    href: "/category/racing",
  },
  {
    slug: "sports",
    name: "Sports",
    icon: Trophy,
    description: "Jump into quick matches, score runs, and competitive sports play.",
    seoDescription:
      "Play free sports games online including quick football and basketball browser games.",
    href: "/category/sports",
  },
  {
    slug: "shooting",
    name: "Shooting",
    icon: Crosshair,
    description: "Target-focused games built around accuracy, speed, and pressure.",
    seoDescription:
      "Play free shooting games online with target practice, reaction tests, and quick browser matches.",
    href: "/category/shooting",
  },
  {
    slug: "puzzle",
    name: "Puzzle",
    icon: Puzzle,
    description: "Logic games, matching challenges, and clean brain-teaser sessions.",
    seoDescription:
      "Play free puzzle games online with instant access to number, matching, and logic challenges.",
    href: "/category/puzzle",
  },
  {
    slug: "card",
    name: "Card",
    icon: Spade,
    description: "Play solitaire-style runs, deck challenges, and table favorites.",
    seoDescription:
      "Play free card games online with solitaire, deck-based challenges, and instant browser play.",
    href: "/category/card",
  },
  {
    slug: "two-player",
    name: "Two Player",
    icon: Users,
    description: "Head-to-head browser games for shared keyboards and quick battles.",
    seoDescription:
      "Play free two player games online with local versus action and instant browser matches.",
    href: "/category/two-player",
  },
  {
    slug: "strategy",
    name: "Strategy",
    icon: Castle,
    description: "Plan ahead, manage pressure, and win with better decisions.",
    seoDescription:
      "Play free strategy games online with planning, tactics, and instant browser gameplay.",
    href: "/category/strategy",
  },
  {
    slug: "casual",
    name: "Casual",
    icon: Sparkles,
    description: "Easy-to-start games built for short sessions and low friction.",
    seoDescription:
      "Play free casual games online with simple controls and instant browser gameplay.",
    href: "/category/casual",
  },
  {
    slug: "board",
    name: "Board",
    icon: Dices,
    description: "Tabletop-inspired games with familiar rules and replayable turns.",
    seoDescription:
      "Play free board games online with tabletop-inspired rules and instant browser access.",
    href: "/category/board",
  },
];

export const categoryNames = categories.map((category) => category.name);

export function slugifyCategory(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function matchesCategoryValue(value: string, category: Category) {
  const normalizedValue = value.trim().toLowerCase();

  return (
    normalizedValue === category.slug ||
    normalizedValue === category.name.toLowerCase() ||
    slugifyCategory(value) === category.slug
  );
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryByValue(value: string) {
  return categories.find((category) => matchesCategoryValue(value, category));
}

export function categoryMatchesSlug(value: string, slug: string) {
  const category = getCategoryBySlug(slug);

  return category ? matchesCategoryValue(value, category) : false;
}

export function getCategoryHref(value: string) {
  const category = getCategoryByValue(value);

  return category ? category.href : null;
}
