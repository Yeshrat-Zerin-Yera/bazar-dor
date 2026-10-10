import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";

import Navbar from "@/components/navbar";
import PriceTicker from "@/components/price-ticker";

import { auth } from "@/auth";

import {
  getProduct,
  getProducts,
} from "@/lib/api";

import {
  formatTaka,
  getUnitLabel,
  getChangeLabel,
} from "@/lib/utils";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check whether the user is signed in.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      `/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`
    );
  }

  const [product, allProducts] = await Promise.all([
    getProduct(slug),
    getProducts(),
  ]);

  if (!product) {
    notFound();
  }

  const markets = product.markets;

  const minPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : product.today;

  const maxPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : product.today;

  const avgPrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) =>
            total + (market.min + market.max) / 2,
          0
        ) / markets.length
      : product.today;

  const cheapestMarket = markets.reduce<
    (typeof markets)[number] | null
  >(
    (cheapest, market) =>
      !cheapest || market.min < cheapest.min
        ? market
        : cheapest,
    null
  );

  const expensiveMarket = markets.reduce<
    (typeof markets)[number] | null
  >(
    (expensive, market) =>
      !expensive || market.max > expensive.max
        ? market
        : expensive,
    null
  );

  const changeText =
    product.change.dir === "up"
      ? "বেড়েছে"
      : product.change.dir === "down"
        ? "কমেছে"
        : "অপরিবর্তিত";

  return (
    <main className="min-h-screen bg-[#fafaf7] text-stone-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-stone-500">
          <Link href="/" className="hover:text-emerald-700">
            হোম
          </Link>

          <span>/</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-emerald-700"
          >
            {product.categoryNameBn}
          </Link>

          <span>/</span>

          <span className="font-medium text-stone-900">
            {product.nameBn}
          </span>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
                {product.categoryIcon || "🛒"}
              </span>

              <span className="font-semibold text-emerald-800">
                {product.categoryNameBn}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              {product.nameBn}
            </h1>

            <p className="mt-3 text-stone-500">
              {getUnitLabel(product.unit)} · {product.categoryNameBn}
            </p>

            <p className="mt-6 text-sm text-stone-600">
              গতকালের তুলনায় আজ দাম{" "}
              <span
                className={
                  product.change.dir === "up"
                    ? "font-bold text-red-600"
                    : product.change.dir === "down"
                      ? "font-bold text-emerald-700"
                      : "font-bold text-stone-600"
                }
              >
                {changeText}{" "}
                {new Intl.NumberFormat("bn-BD", {
                  maximumFractionDigits: 1,
                }).format(product.change.pct)}%
              </span>
            </p>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-medium text-stone-500">
              আজকের দাম
            </p>

            <div className="mt-3 flex flex-wrap items-baseline gap-3">
              <span className="text-4xl font-extrabold text-emerald-800 sm:text-5xl">
                {new Intl.NumberFormat("bn-BD", {
                  maximumFractionDigits: 2,
                }).format(product.today)}
              </span>

              <span className="text-base text-stone-500">
                টাকা / {product.unit}
              </span>
            </div>

            <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3">
              <span
                className={
                  product.change.dir === "up"
                    ? "font-bold text-red-600"
                    : product.change.dir === "down"
                      ? "font-bold text-emerald-700"
                      : "font-bold text-stone-600"
                }
              >
                {getChangeLabel(
                  product.change.dir,
                  product.change.pct
                )}
              </span>

              <span className="text-sm text-stone-600">
                গতকালের তুলনায়
              </span>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-white p-5">
              <p className="text-sm text-stone-500">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-2 text-2xl font-extrabold text-emerald-800">
                {formatTaka(minPrice)}
              </p>

              <p className="mt-2 text-sm text-stone-500">
                {cheapestMarket
                  ? `সবচেয়ে কম দামের বাজার: ${cheapestMarket.market}`
                  : "বাজারের তথ্য নেই"}
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5">
              <p className="text-sm text-stone-500">
                সর্বাধিক দাম
              </p>

              <p className="mt-2 text-2xl font-extrabold text-red-700">
                {formatTaka(maxPrice)}
              </p>

              <p className="mt-2 text-sm text-stone-500">
                {expensiveMarket
                  ? `সবচেয়ে বেশি দামের বাজার: ${expensiveMarket.market}`
                  : "বাজারের তথ্য নেই"}
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5">
              <p className="text-sm text-stone-500">
                গড় দাম
              </p>

              <p className="mt-2 text-2xl font-extrabold text-stone-900">
                {formatTaka(avgPrice)}
              </p>

              <p className="mt-2 text-sm text-stone-500">
                {getUnitLabel(product.unit)}-এর হিসাবে
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length > 0 ? (
            <div className="mt-4 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-stone-50">
                  <tr className="border-b border-stone-200 text-stone-600">
                    <th className="px-4 py-4 font-semibold">বাজার</th>
                    <th className="px-4 py-4 font-semibold">বিভাগ</th>
                    <th className="px-4 py-4 text-right font-semibold">
                      সর্বনিম্ন
                    </th>
                    <th className="px-4 py-4 text-right font-semibold">
                      সর্বাধিক
                    </th>
                    <th className="px-4 py-4 text-right font-semibold">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => {
                    const marketAverage =
                      (market.min + market.max) / 2;

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className="border-b border-stone-100 last:border-0 hover:bg-stone-50"
                      >
                        <td className="px-4 py-4 font-semibold text-stone-900">
                          {market.market}
                        </td>
                        <td className="px-4 py-4 text-stone-600">
                          {market.division}
                        </td>
                        <td className="px-4 py-4 text-right text-emerald-700">
                          {formatTaka(market.min)}
                        </td>
                        <td className="px-4 py-4 text-right text-stone-700">
                          {formatTaka(market.max)}
                        </td>
                        <td className="px-4 py-4 text-right font-semibold text-stone-900">
                          {formatTaka(marketAverage)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-8 text-center text-stone-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </div>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">
            আগের দামের তথ্য
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-white p-5">
              <p className="text-sm text-stone-500">গতকালের দাম</p>
              <p className="mt-2 text-xl font-bold">
                {formatTaka(product.yesterday)}
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5">
              <p className="text-sm text-stone-500">
                গত সপ্তাহের দাম
              </p>
              <p className="mt-2 text-xl font-bold">
                {formatTaka(product.lastWeek)}
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5">
              <p className="text-sm text-stone-500">
                গত মাসের দাম
              </p>
              <p className="mt-2 text-xl font-bold">
                {formatTaka(product.lastMonth)}
              </p>
            </div>
          </div>
        </section>

        <Link
          href={`/category/${product.category}`}
          className="mt-8 inline-flex rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white transition hover:bg-emerald-900"
        >
          ← সব {product.categoryNameBn} দেখুন
        </Link>
      </div>
    </main>
  );
}
