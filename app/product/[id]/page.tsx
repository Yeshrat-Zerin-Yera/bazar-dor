import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import {
  getProduct,
} from "@/lib/api";
import {
  formatTaka,
  getUnitLabel,
  getChangeLabel,
} from "@/lib/utils";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fafaf7]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <nav className="mb-8 text-sm text-stone-500">
          <Link href="/" className="hover:text-emerald-700">
            হোম
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-emerald-700"
          >
            {product.categoryNameBn}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-stone-900">{product.nameBn}</span>
        </nav>

        <div className="grid gap-8 rounded-3xl border border-stone-200 bg-white p-5 sm:p-8 md:grid-cols-2">
          <div className="flex min-h-72 items-center justify-center rounded-2xl bg-stone-50 p-6">
            
            {product.image &&
typeof product.image === "string" &&
product.image.startsWith("https://") ? (
  <Image
    src={product.image}
    alt={product.nameBn}
    width={400}
    height={400}
    unoptimized
    className="max-h-80 w-full object-contain"
  />
) : (
  <span className="text-8xl">
    {product.categoryIcon || "🛒"}
  </span>
)}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold text-emerald-700">
              {product.categoryNameBn}
            </p>

            <h1 className="mt-3 text-3xl font-extrabold text-stone-900 sm:text-4xl">
              {product.nameBn}
            </h1>

            <p className="mt-3 text-stone-500">
              {getUnitLabel(product.unit)}
            </p>

            <p className="mt-6 text-3xl font-extrabold text-emerald-800">
              {formatTaka(product.today)}
            </p>

            <p className="mt-2 text-sm text-stone-600">
              গতকালের তুলনায়{" "}
              <span
                className={
                  product.change.dir === "up"
                    ? "font-semibold text-red-600"
                    : product.change.dir === "down"
                      ? "font-semibold text-emerald-700"
                      : "font-semibold text-stone-600"
                }
              >
                {getChangeLabel(
                  product.change.dir,
                  product.change.pct
                )}
              </span>
            </p>

            <div className="mt-8 border-t border-stone-200 pt-6">
              <h2 className="text-lg font-bold text-stone-900">
                দামের তুলনা
              </h2>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-stone-50 p-4">
                  <span className="text-stone-600">আজকের দাম</span>
                  <span className="font-bold text-stone-900">
                    {formatTaka(product.today)}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-stone-50 p-4">
                  <span className="text-stone-600">গতকালের দাম</span>
                  <span className="font-semibold text-stone-800">
                    {formatTaka(product.yesterday)}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-stone-50 p-4">
                  <span className="text-stone-600">গত সপ্তাহের দাম</span>
                  <span className="font-semibold text-stone-800">
                    {formatTaka(product.lastWeek)}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-stone-50 p-4">
                  <span className="text-stone-600">গত মাসের দাম</span>
                  <span className="font-semibold text-stone-800">
                    {formatTaka(product.lastMonth)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-stone-200 bg-white p-5 sm:p-8">
          <h2 className="text-xl font-bold text-stone-900">
            বিভিন্ন বাজারে দাম
          </h2>

          {product.markets.length > 0 ? (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500">
                    <th className="px-3 py-3">বাজার</th>
                    <th className="px-3 py-3">বিভাগ</th>
                    <th className="px-3 py-3">সর্বনিম্ন দাম</th>
                    <th className="px-3 py-3">সর্বোচ্চ দাম</th>
                  </tr>
                </thead>

                <tbody>
                  {product.markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${index}`}
                      className="border-b border-stone-100 last:border-0"
                    >
                      <td className="px-3 py-4 font-medium text-stone-900">
                        {market.market}
                      </td>
                      <td className="px-3 py-4 text-stone-600">
                        {market.division}
                      </td>
                      <td className="px-3 py-4 text-emerald-700">
                        {formatTaka(market.min)}
                      </td>
                      <td className="px-3 py-4 text-stone-700">
                        {formatTaka(market.max)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 text-sm text-stone-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white transition hover:bg-emerald-900"
        >
          ← সব পণ্যে ফিরে যান
        </Link>
      </section>
    </main>
  );
}
