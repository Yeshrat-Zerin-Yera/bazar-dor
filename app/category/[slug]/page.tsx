import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import {
  getCategories,
  getProductsByCategory,
  getProducts,
} from "@/lib/api";
import CategoryProducts from "@/components/category-products";
import PriceTicker from "@/components/price-ticker";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [categories, products, allProducts] = await Promise.all([
    getCategories(),
    getProductsByCategory(slug),
    getProducts(),
  ]);

  const category = categories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fafaf7]">
      <Navbar />
      <PriceTicker products={allProducts} />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <nav className="mb-6 text-sm text-stone-500">
          <Link href="/" className="hover:text-emerald-700">
            হোম
          </Link>

          <span className="mx-2">/</span>

          <span className="text-stone-900">
            {category.nameBn}
          </span>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-4xl">
            {category.icon}
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-stone-900">
              {category.nameBn}
            </h1>

            <p className="mt-2 text-stone-600">
              এই বিভাগের{" "}
              <span className="font-bold text-stone-900">
              {products.length}
              </span>{" "} টি পণ্যের আজকের বাজারদর
            </p>
          </div>
        </div>

        <CategoryProducts products={products} />
      </section>
    </main>
  );
}
