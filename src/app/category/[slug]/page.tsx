import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryChips } from "@/components/CategoryChips";
import { CategoryIconTile } from "@/components/CategoryIcon";
import { Footer } from "@/components/Footer";
import { GameGrid } from "@/components/GameGrid";
import { Header } from "@/components/Header";
import { PortalBrowseLayout } from "@/components/PortalBrowseLayout";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getGamesByCategory } from "@/data/games";
import { buildCategoryMetadata, buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return buildPageMetadata(
      "Category Not Found | GameNest",
      "This game category could not be found on GameNest.",
      "/categories",
    );
  }

  return buildCategoryMetadata(category, getGamesByCategory(slug).length);
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryGames = getGamesByCategory(slug);

  return (
    <div className="min-h-screen text-white">
      <Header />
      <PortalBrowseLayout>
        <main className="space-y-5">
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
            <Link href="/" className="transition hover:text-cyan-300">
              Home
            </Link>
            <span>/</span>
            <Link href="/categories" className="transition hover:text-cyan-300">
              Categories
            </Link>
            <span>/</span>
            <span className="text-white">{category.name}</span>
          </nav>

          <section className="portal-panel space-y-4 p-5">
            <div className="flex items-start gap-4">
              <CategoryIconTile icon={category.icon} tileClassName="shrink-0" />
              <div className="space-y-2">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
                  Category
                </p>
                <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                  {category.name} Games
                </h1>
                <p className="max-w-3xl text-sm leading-6 text-slate-400">
                  {category.description}
                </p>
              </div>
            </div>
            <CategoryChips categories={categories} activeSlug={category.slug} />
          </section>

          {categoryGames.length > 0 ? (
            <GameGrid games={categoryGames} />
          ) : (
            <section className="portal-panel space-y-4 p-6 sm:p-8">
              <CategoryIconTile
                icon={category.icon}
                size={24}
                tileClassName="h-14 w-14 rounded-[20px] shadow-[0_16px_30px_-20px_rgba(37,99,235,0.55)]"
              />
              <div className="space-y-2">
                <h2 className="text-2xl font-black tracking-tight text-white">
                  Games in this category are coming soon.
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                  Browse the full library for more free online games, or keep exploring
                  the category directory.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/games"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2563eb,#0891b2_72%,#7c3aed)] px-5 text-sm font-black text-white shadow-[0_18px_32px_-18px_rgba(37,99,235,0.72)] transition hover:translate-y-[-1px]"
                >
                  Browse All Games
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 text-sm font-black text-slate-100 transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
                >
                  Back to Categories
                </Link>
              </div>
            </section>
          )}
        </main>
      </PortalBrowseLayout>
      <Footer />
    </div>
  );
}
