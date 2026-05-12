import { categoryMatchesSlug } from "@/data/categories";

export type GameCollection = "launch";

export type { Category } from "@/data/categories";
export {
  categories,
  categoryMatchesSlug,
  categoryNames,
  getCategoryBySlug,
  getCategoryByValue,
  getCategoryHref,
  slugifyCategory,
} from "@/data/categories";

export type Game = {
  id: string;
  slug: string;
  title: string;
  description: string;
  iframeUrl: string;
  thumbnail: string;
  categories: string[];
  tags: string[];
  source: string;
  controls: string[];
  howToPlay: string[];
  features: string[];
  isNew?: boolean;
  isPopular?: boolean;
  popular?: boolean;
  featured?: boolean;
  languageSafe?: boolean;
  collection?: GameCollection;
};

export const games: Game[] = [
  {
    id: "game-001",
    slug: "assault-time",
    title: "Assault Time",
    description:
      "A fast-paced action shooter where quick aim and sharp reactions are the key to survival.",
    iframeUrl: "https://1000webgames.com/games/assaulttime/html5/",
    thumbnail: "/game-covers/assault-time.jpg",
    categories: ["Action", "Shooting"],
    tags: ["action", "shooter", "combat", "reflex"],
    source: "1000 WebGames",
    isPopular: true,
    popular: true,
    languageSafe: true,
    collection: "launch",
    controls: [
      "Use your mouse to aim and fire.",
      "Move with the keyboard to dodge incoming attacks and reposition quickly.",
    ],
    howToPlay: [
      "Push through enemy waves and stay mobile while lining up fast shots.",
      "Use accurate fire to clear threats before they overwhelm your position.",
      "Survive each encounter to keep the mission moving forward.",
    ],
    features: [
      "Fast browser shooting with immediate action.",
      "Dark military-style presentation built for short, intense sessions.",
      "Simple controls that reward precision and reaction speed.",
    ],
  },
  {
    id: "game-002",
    slug: "warfare-area-3",
    title: "Warfare Area 3",
    description:
      "Jump into intense first-person action and clear hostile zones in this browser shooter.",
    iframeUrl: "https://1000webgames.com/games/warfarearea3/html5/",
    thumbnail: "/game-covers/warfare-area-3.jpg",
    categories: ["Action", "Shooting"],
    tags: ["fps", "shooter", "combat", "tactical"],
    source: "1000 WebGames",
    isPopular: true,
    popular: true,
    isNew: true,
    languageSafe: true,
    collection: "launch",
    controls: [
      "Use the mouse to aim and shoot.",
      "Move and take cover with the keyboard while tracking enemy positions.",
    ],
    howToPlay: [
      "Enter each combat zone and eliminate hostile targets as they appear.",
      "Stay alert, manage your positioning, and avoid taking unnecessary damage.",
      "Clear the area to complete the mission and advance to the next firefight.",
    ],
    features: [
      "First-person browser shooting with a strong combat theme.",
      "Mission-based encounters that keep the pace high.",
      "Action-focused gameplay that fits the GameNest audience.",
    ],
  },
  {
    id: "game-003",
    slug: "bullet-fury-2",
    title: "Bullet Fury 2",
    description:
      "Fight through dangerous corridors, track enemy movement, and stay accurate under pressure.",
    iframeUrl: "https://1000webgames.com/games/bulletfury2/html5/",
    thumbnail: "/game-covers/bullet-fury-2.jpg",
    categories: ["Action", "Shooting"],
    tags: ["fps", "sci-fi", "shooter", "reaction"],
    source: "1000 WebGames",
    isPopular: true,
    popular: true,
    languageSafe: true,
    collection: "launch",
    controls: [
      "Use the mouse to aim and fire at enemy units.",
      "Move with the keyboard and keep distance when the room gets crowded.",
    ],
    howToPlay: [
      "Sweep each area, spot enemies early, and fire before they close in.",
      "Use quick movement to control the angle of each encounter.",
      "Keep advancing until the facility is secure.",
    ],
    features: [
      "Fast corridor combat with a futuristic edge.",
      "Clean shooter setup designed for instant browser play.",
      "High-pressure action that matches the title and cover art exactly.",
    ],
  },
  {
    id: "game-004",
    slug: "connect-2-cars",
    title: "Connect 2 Cars",
    description:
      "Link matching vehicles, clear the board efficiently, and enjoy a light puzzle challenge.",
    iframeUrl: "https://1000webgames.com/games/connect2cars/html5/",
    thumbnail: "/game-covers/connect-2-cars.jpg",
    categories: ["Puzzle", "Casual"],
    tags: ["matching", "cars", "casual", "logic"],
    source: "1000 WebGames",
    isNew: true,
    languageSafe: true,
    collection: "launch",
    controls: [
      "Use the mouse or touch input to select matching car tiles.",
      "Connect pairs quickly before the board becomes difficult to read.",
    ],
    howToPlay: [
      "Find two identical cars that can be connected with a valid path.",
      "Clear pairs one after another to open up more routes.",
      "Remove every tile from the board to finish the level.",
    ],
    features: [
      "Easy-to-read puzzle layout with vehicle-themed tiles.",
      "Short rounds that work well on desktop and mobile.",
      "Bright casual styling while keeping the site's darker card shell.",
    ],
  },
  {
    id: "game-005",
    slug: "jewel-legend",
    title: "Jewel Legend",
    description:
      "Match colorful gems, complete puzzle objectives, and enjoy relaxing brain-teasing gameplay.",
    iframeUrl: "https://1000webgames.com/games/jewellegend/html5/",
    thumbnail: "/game-covers/jewel-legend.jpg",
    categories: ["Puzzle", "Casual"],
    tags: ["match-3", "gems", "casual", "puzzle"],
    source: "1000 WebGames",
    isPopular: true,
    popular: true,
    languageSafe: true,
    collection: "launch",
    controls: [
      "Swap neighboring gems with the mouse or touch controls.",
      "Create matches efficiently to complete each level objective.",
    ],
    howToPlay: [
      "Match three or more gems of the same color to clear them.",
      "Work toward the target score or level objective shown in the puzzle.",
      "Chain matches and special pieces to finish more efficiently.",
    ],
    features: [
      "Classic gem-matching gameplay with colorful board feedback.",
      "Relaxed puzzle pacing that still rewards smart moves.",
      "A clear fit for the Puzzle and Casual sections on the homepage.",
    ],
  },
  {
    id: "game-006",
    slug: "gummy-blocks-evolution",
    title: "Gummy Blocks Evolution",
    description:
      "Place soft-colored block shapes carefully and keep your board open for bigger clears.",
    iframeUrl: "https://1000webgames.com/games/gummyblocksevolution/html5/",
    thumbnail: "/game-covers/gummy-blocks-evolution.jpg",
    categories: ["Puzzle", "Board"],
    tags: ["blocks", "board", "placement", "strategy"],
    source: "1000 WebGames",
    isNew: true,
    languageSafe: true,
    collection: "launch",
    controls: [
      "Drag each gummy block onto the board.",
      "Place pieces in open spaces and plan for the next shapes.",
    ],
    howToPlay: [
      "Fit the available shapes onto the board without blocking future moves.",
      "Complete rows or columns to clear space and keep playing.",
      "Last longer by protecting large open sections for awkward pieces.",
    ],
    features: [
      "Bright block-based puzzle design with board-game structure.",
      "Simple drag-and-place controls suited to quick sessions.",
      "Consistent cover and metadata for a puzzle-board experience.",
    ],
  },
  {
    id: "game-007",
    slug: "truck-loader-5",
    title: "Truck Loader 5",
    description:
      "Use clever movement and magnetic loading mechanics to solve cargo puzzles stage by stage.",
    iframeUrl: "https://1000webgames.com/games/truckloader5/html5/",
    thumbnail: "/game-covers/truck-loader-5.jpg",
    categories: ["Puzzle", "Strategy"],
    tags: ["truck", "cargo", "physics", "strategy"],
    source: "1000 WebGames",
    isPopular: true,
    popular: true,
    languageSafe: true,
    collection: "launch",
    controls: [
      "Move the loader with the keyboard.",
      "Use the magnet control to lift, carry, and place cargo boxes.",
    ],
    howToPlay: [
      "Pick up crates and move them through each warehouse layout.",
      "Use the magnet to position cargo safely inside the truck.",
      "Solve the stage by delivering the required boxes in the right way.",
    ],
    features: [
      "Physics-flavored puzzle stages with machinery and cargo themes.",
      "Clear strategy gameplay centered on movement and planning.",
      "Strong visual match between the cover, title, and embedded game.",
    ],
  },
  {
    id: "game-008",
    slug: "construct-a-bridge",
    title: "Construct A Bridge",
    description:
      "Design stable paths, test your build, and guide vehicles across tricky gaps.",
    iframeUrl: "https://1000webgames.com/games/constructabridge/html5/",
    thumbnail: "/game-covers/construct-a-bridge.jpg",
    categories: ["Puzzle", "Strategy"],
    tags: ["bridge", "construction", "physics", "strategy"],
    source: "1000 WebGames",
    languageSafe: true,
    collection: "launch",
    controls: [
      "Use the mouse or touch controls to place bridge segments.",
      "Adjust your construction and test whether it can support the vehicle.",
    ],
    howToPlay: [
      "Build a bridge across the obstacle using the available materials.",
      "Check your structure and make improvements where it looks weak.",
      "Send the vehicle across safely to complete the level.",
    ],
    features: [
      "Engineering-style puzzle gameplay with clear bridge-building themes.",
      "Strategy-oriented stages that reward balance and structure.",
      "A custom cover that directly reflects the game concept.",
    ],
  },
  {
    id: "game-009",
    slug: "the-cargo-2",
    title: "The Cargo 2",
    description:
      "Drive rough routes, protect your load, and balance speed with control on every delivery.",
    iframeUrl: "https://1000webgames.com/games/thecargo2/html5/",
    thumbnail: "/game-covers/the-cargo-2.jpg",
    categories: ["Racing", "Strategy"],
    tags: ["driving", "cargo", "delivery", "balance"],
    source: "1000 WebGames",
    isNew: true,
    languageSafe: true,
    collection: "launch",
    controls: [
      "Use the keyboard to accelerate, brake, and keep the truck stable.",
      "Adjust your speed carefully to stop the cargo from falling out.",
    ],
    howToPlay: [
      "Drive to the destination while keeping your cargo in the truck bed.",
      "Use smooth acceleration on hills, bumps, and rough terrain.",
      "Complete deliveries without losing too much of the load.",
    ],
    features: [
      "Delivery-focused driving with a strategic cargo-management layer.",
      "A strong fit for both Racing and Strategy categories.",
      "Blue-green racing cover style aligned with the embedded game.",
    ],
  },
  {
    id: "game-010",
    slug: "park-the-taxi-3",
    title: "Park The Taxi 3",
    description:
      "Steer through tight city spaces, avoid collisions, and park with clean precision.",
    iframeUrl: "https://1000webgames.com/games/parkthetaxi3/html5/",
    thumbnail: "/game-covers/park-the-taxi-3.jpg",
    categories: ["Racing", "Casual"],
    tags: ["parking", "taxi", "driving", "casual"],
    source: "1000 WebGames",
    isPopular: true,
    popular: true,
    languageSafe: true,
    collection: "launch",
    controls: [
      "Use the keyboard to steer, accelerate, and brake.",
      "Slow down before corners so you can line up clean parking entries.",
    ],
    howToPlay: [
      "Follow the route markers and reach the highlighted parking spot.",
      "Avoid hitting obstacles, curbs, and other vehicles on the way.",
      "Park neatly to clear the stage and move to the next challenge.",
    ],
    features: [
      "Accessible driving gameplay with compact city-style levels.",
      "Casual racing energy focused on control instead of raw speed.",
      "Consistent title, slug, cover, and iframe source with no mock reuse.",
    ],
  },
  {
    id: "game-011",
    slug: "lob-master-2021",
    title: "Lob Master 2021",
    description:
      "Arc the ball with touch and timing, then drop perfect shots through the hoop.",
    iframeUrl: "https://1000webgames.com/games/lobmaster2021/html5/",
    thumbnail: "/game-covers/lob-master-2021.jpg",
    categories: ["Sports", "Casual"],
    tags: ["basketball", "arc", "timing", "casual"],
    source: "1000 WebGames",
    languageSafe: true,
    collection: "launch",
    controls: [
      "Aim with the mouse or touch controls and release to shoot.",
      "Adjust your arc and power to land clean baskets consistently.",
    ],
    howToPlay: [
      "Set the right angle and loft for each basketball shot.",
      "Read the distance to the hoop before releasing the ball.",
      "Score repeatedly to keep your run alive and improve your result.",
    ],
    features: [
      "Light sports gameplay centered on shot arcs and rhythm.",
      "Orange-blue sports cover language tailored for GameNest.",
      "Short sessions that work well for casual players.",
    ],
  },
  {
    id: "game-012",
    slug: "basket-swooshes",
    title: "Basket Swooshes",
    description:
      "Line up your aim, follow the arc, and outshoot opponents in quick basketball battles.",
    iframeUrl: "https://1000webgames.com/games/basketswooshes/html5/",
    thumbnail: "/game-covers/basket-swooshes.jpg",
    categories: ["Sports", "Arcade"],
    tags: ["basketball", "arcade", "aim", "competition"],
    source: "1000 WebGames",
    isPopular: true,
    popular: true,
    languageSafe: true,
    collection: "launch",
    controls: [
      "Aim and release with the mouse or touch controls.",
      "Fine-tune angle and strength to beat the defender and score first.",
    ],
    howToPlay: [
      "Take turns shooting and try to sink more baskets than your opponent.",
      "Judge the arc carefully and release with controlled power.",
      "Win the matchup by staying consistent under pressure.",
    ],
    features: [
      "Arcade basketball presentation with competitive round-based play.",
      "Strong visual tie between the sports cover and the in-game action.",
      "A clear homepage anchor for the Sports section.",
    ],
  },
];

export const languageSafeGames = games.filter((game) => game.languageSafe !== false);

export function getGameBySlug(slug: string) {
  return games.find((game) => game.slug === slug);
}

export function getGamesByCategory(slug: string) {
  return languageSafeGames.filter((game) =>
    game.categories.some((category) => categoryMatchesSlug(category, slug)),
  );
}

export function getVisibleCategoryCount(slug: string) {
  return getGamesByCategory(slug).length;
}

const homeSectionSlugOrder = {
  action: ["assault-time", "warfare-area-3", "bullet-fury-2"],
  puzzle: [
    "connect-2-cars",
    "jewel-legend",
    "gummy-blocks-evolution",
    "truck-loader-5",
    "construct-a-bridge",
  ],
  racing: ["the-cargo-2", "park-the-taxi-3"],
  sports: ["lob-master-2021", "basket-swooshes"],
} as const;

function getGamesBySlugOrder(slugs: readonly string[]) {
  return slugs
    .map((slug) => getGameBySlug(slug))
    .filter((game): game is Game => Boolean(game));
}

export function getHomeCategoryGames(slug: string, limit = 6) {
  const orderedSlugs = homeSectionSlugOrder[slug as keyof typeof homeSectionSlugOrder];

  if (orderedSlugs) {
    return getGamesBySlugOrder(orderedSlugs).slice(0, limit);
  }

  return getGamesByCategory(slug).slice(0, limit);
}

export const featuredGames = languageSafeGames.filter((game) => game.featured);
export const newGames = getGamesBySlugOrder([
  "warfare-area-3",
  "connect-2-cars",
  "gummy-blocks-evolution",
  "the-cargo-2",
]);
export const popularGames = getGamesBySlugOrder([
  "assault-time",
  "warfare-area-3",
  "bullet-fury-2",
  "jewel-legend",
  "truck-loader-5",
  "park-the-taxi-3",
  "basket-swooshes",
]);
export const homePopularGames = getGamesBySlugOrder([
  "warfare-area-3",
  "bullet-fury-2",
  "jewel-legend",
  "truck-loader-5",
  "park-the-taxi-3",
  "basket-swooshes",
]);

export function withFallbackGames(primaryGames: Game[], minimumCount = 8) {
  if (primaryGames.length >= minimumCount) {
    return primaryGames;
  }

  const fallbackGames = languageSafeGames.filter(
    (game) => !primaryGames.some((primaryGame) => primaryGame.id === game.id),
  );

  return [...primaryGames, ...fallbackGames].slice(0, minimumCount);
}

export function getSimilarGames(game: Game, limit = 4) {
  return languageSafeGames
    .filter(
      (candidate) =>
        candidate.id !== game.id &&
        candidate.categories.some((category) => game.categories.includes(category)),
    )
    .slice(0, limit);
}
