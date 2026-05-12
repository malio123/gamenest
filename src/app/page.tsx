import type { Metadata } from "next";
import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { ContinuePlayingSection } from "@/components/ContinuePlayingSection";
import { Footer } from "@/components/Footer";
import { GameGridSection } from "@/components/GameGridSection";
import { Header } from "@/components/Header";
import { PortalBrowseLayout } from "@/components/PortalBrowseLayout";
import {
  getHomeCategoryGames,
  getVisibleCategoryCount,
  homePopularGames,
  newGames,
} from "@/data/games";
import { categories } from "@/data/categories";
import { buildPageMetadata, homeDescription, homeTitle } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(homeTitle, homeDescription, "/");

export default function Home() {
  const popularSectionGames = homePopularGames;
  const newReleaseGames = newGames;
  const actionGames = getHomeCategoryGames("action", 3);
  const puzzleGames = getHomeCategoryGames("puzzle", 5);
  const racingGames = getHomeCategoryGames("racing", 2);
  const sportsGames = getHomeCategoryGames("sports", 3);

  return (
    <div className="min-h-screen text-white">
      <Header />

      <PortalBrowseLayout>
        <main className="space-y-5">
          <section className="space-y-2 rounded-[24px] border border-white/8 bg-white/[0.03] px-4 py-4 shadow-[0_18px_48px_-32px_rgba(2,8,23,0.72)] sm:px-5">
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Play Free Online Games on GameNest
            </h1>
          </section>

          <ContinuePlayingSection />

          <GameGridSection
            title="Popular Games"
            games={popularSectionGames}
            href="/popular"
            linkLabel="View All"
          />

          <GameGridSection
            id="new-games"
            title="New Games"
            games={newReleaseGames}
            href="/new"
            linkLabel="View More"
          />

          <GameGridSection
            title="Action Games"
            games={actionGames}
            href="/category/action"
            linkLabel="View All"
          />

          <GameGridSection
            title="Puzzle Games"
            games={puzzleGames}
            href="/category/puzzle"
            linkLabel="View All"
          />

          <GameGridSection
            title="Racing Games"
            games={racingGames}
            href="/category/racing"
            linkLabel="View All"
          />

          <GameGridSection
            title="Sports Games"
            games={sportsGames}
            href="/category/sports"
            linkLabel="View All"
          />

          <section className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-black tracking-tight text-white sm:text-xl">
                Browse by Category
              </h2>
              <Link
                href="/categories"
                className="text-sm font-bold text-cyan-300 transition hover:text-cyan-200"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard
                  key={category.slug}
                  category={category}
                  count={getVisibleCategoryCount(category.slug)}
                />
              ))}
            </div>
          </section>
        </main>
      </PortalBrowseLayout>

      <Footer />
    </div>
  );
}
