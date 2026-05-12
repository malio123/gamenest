import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { categories, getCategoryBySlug } from "@/data/categories";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  return category ? { alternates: { canonical: category.href } } : {};
}

export default async function LegacyCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  permanentRedirect(category?.href ?? "/categories");
}
