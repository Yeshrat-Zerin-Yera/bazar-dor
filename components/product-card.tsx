import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatTaka, getChangeLabel, getUnitLabel } from "@/lib/utils";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const changeColor =
    product.change.dir === "up"
      ? "text-emerald-700 bg-emerald-50"
      : product.change.dir === "down"
        ? "text-red-700 bg-red-50"
        : "text-gray-600 bg-gray-100";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl border border-stone-200 bg-white p-4 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex size-14 items-center justify-center rounded-xl bg-emerald-50 text-3xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${changeColor}`}
        >
          {getChangeLabel(product.change.dir, product.change.pct)}
        </span>
      </div>

      <p className="mb-1 text-xs text-stone-500">
        {product.categoryNameBn}
      </p>

      <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800">
        {product.nameBn}
      </h3>

      <p className="mt-1 text-sm text-stone-500">
        {getUnitLabel(product.unit)}
      </p>

      <div className="mt-4 border-t border-stone-100 pt-3">
        <p className="text-xs text-stone-500">আজকের দাম</p>
        <p className="mt-1 text-xl font-extrabold text-stone-900">
          {formatTaka(product.today)}
        </p>
      </div>
    </Link>
  );
}