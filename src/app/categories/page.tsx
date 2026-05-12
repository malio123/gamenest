import type { Metadata } from "next";
import { CategoryCard } from "@/components/CategoryCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PortalBrowseLayout } from "@/components/PortalBrowseLayout";
import { categories } from "@/data/categories";
import { getVisibleCategoryCount } from "@/data/games";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(
  "Categories | GameNest",
  "Browse GameNest categories and jump straight into action, puzzle, arcade, racing, sports, card, casual, and more browser games.",
  "/categories",
);

export default function CategoriesPage() {
  return (
    <div className="min-h-screen text-white">
      <Header />
      <PortalBrowseLayout>
        <main className="space-y-5">
          <section className="portal-panel space-y-3 p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
              Browse Genres
            </p>
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Categories
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-slate-400">
              Explore GameNest by genre and jump straight into the games that fit.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                count={getVisibleCategoryCount(category.slug)}
              />
            ))}
          </section>
        </main>
      </PortalBrowseLayout>
      <Footer />
    </div>
  );
}
