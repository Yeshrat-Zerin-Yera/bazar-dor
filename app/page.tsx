import ProductCard from "@/components/product-card";
import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/types";
import Navbar from "@/components/navbar";
import PriceTicker from "@/components/price-ticker";
import Hero from "@/components/hero";
import Footer from "@/components/footer";

export default async function HomePage() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#fafaf7] text-stone-900">
      <Hero />

      <div className="mx-auto max-w-6xl space-y-14 px-4 pb-16">
        <ProductSection
          title="আজ দাম বেড়েছে ▲"
          subtitle="যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে"
          products={risers}
        />

        <ProductSection
          title="আজ দাম কমেছে ▼"
          subtitle="যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে"
          products={fallers}
        />

        <section id="সব-পণ্য" className="scroll-mt-6">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              সব পণ্য
            </h2>
            <p className="mt-2 text-stone-600">
              মোট {products.length}টি পণ্যের বর্তমান বাজারদর
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center">
              <p className="font-semibold">
                পণ্যের তথ্য লোড করা যায়নি।
              </p>
              <p className="mt-2 text-sm text-stone-500">
                আপনার ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function ProductSection({
  title,
  subtitle,
  products,
}: {
  title: string;
  subtitle: string;
  products: Product[];
}) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-stone-600">{subtitle}</p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-stone-500">
          এই মুহূর্তে কোনো তথ্য নেই।
        </p>
      )}
    </section>
  );
}