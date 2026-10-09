import Link from "next/link";
import ProductCard from "@/components/product-card";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  let products = [];

  try {
    products = await getProducts();
  } catch {
    // Keep the page usable if the API is temporarily unavailable.
  }

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#fafaf7] text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5">
          <Link href="/" className="text-2xl font-extrabold text-emerald-900">
            🛒 বাজার দর
            <span className="mt-1 block text-xs font-normal text-stone-500">
              প্রতিদিনের বাজারদর
            </span>
          </Link>

          <div className="flex gap-3 text-sm font-semibold">
            <Link href="/signin" className="rounded-lg border px-4 py-2">
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-emerald-800 px-4 py-2 text-white"
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        <nav className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 pb-4 text-sm font-medium">
          <Link href="/">সব পণ্য</Link>
          <Link href="/category/chal">🍚 চাল</Link>
          <Link href="/category/dal">🫘 ডাল</Link>
          <Link href="/category/tel">🛢️ তেল</Link>
          <Link href="/category/shobji">🥬 সবজি</Link>
          <Link href="/category/mach">🐟 মাছ</Link>
          <Link href="/category/mangsho">🍗 মাংস</Link>
          <Link href="/category/dim-dudh">🥛 ডিম-দুধ</Link>
          <Link href="/category/moshla">🌶️ মসলা</Link>
        </nav>
      </header>

      <section className="border-b border-emerald-100 bg-emerald-50">
        <div className="mx-auto max-w-6xl px-4 py-2">
          <p className="overflow-hidden whitespace-nowrap text-sm text-emerald-950">
            {products.slice(0, 8).map((product) => (
              <span key={product.id} className="mr-8 inline-block">
                {product.image} {product.nameBn} · {product.today} টাকা
                {product.change.dir === "up"
                  ? ` ▲ ${product.change.pct}%`
                  : product.change.dir === "down"
                    ? ` ▼ ${product.change.pct}%`
                    : ""}
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-4 font-semibold text-emerald-800">
            আপনার প্রতিদিনের বাজার, এখন আরও সহজ
          </p>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            আজকের বাজারের দাম
            <span className="block text-emerald-800">এক নজরে দেখুন</span>
          </h1>

          <p className="mt-5 max-w-lg leading-7 text-stone-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস ও নিত্যপ্রয়োজনীয় পণ্যের
            বাজারদর, দামের পরিবর্তন এবং বাজারভিত্তিক তথ্য দেখুন এক জায়গায়।
          </p>

          <Link
            href="#সব-পণ্য"
            className="mt-7 inline-flex rounded-xl bg-emerald-800 px-6 py-3 font-semibold text-white transition hover:bg-emerald-900"
          >
            সব পণ্য দেখুন →
          </Link>
        </div>

        <div className="flex min-h-64 items-center justify-center rounded-3xl bg-[#e8f2df] p-8">
          <div className="text-center">
            <div className="text-8xl">🧺</div>
            <p className="mt-4 font-semibold text-emerald-950">
              সঠিক বাজারদর, সহজ সিদ্ধান্ত
            </p>
          </div>
        </div>
      </section>

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
              <p className="font-semibold">পণ্যের তথ্য লোড করা যায়নি।</p>
              <p className="mt-2 text-sm text-stone-500">
                আপনার ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
              </p>
            </div>
          )}
        </section>
      </div>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-stone-600 sm:flex-row sm:justify-between">
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </footer>
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
  products: Awaited<ReturnType<typeof getProducts>>;
}) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
        <p className="mt-2 text-stone-600">{subtitle}</p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-stone-500">এই মুহূর্তে কোনো তথ্য নেই।</p>
      )}
    </section>
  );
}