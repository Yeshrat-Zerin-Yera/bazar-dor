import type { Product } from "@/lib/types";
import { formatTaka, getUnitLabel } from "@/lib/utils";

export default function PriceTicker({
  products,
}: {
  products: Product[];
}) {
  if (products.length === 0) return null;

  const items = [...products, ...products];

  return (
    <div
      className="overflow-hidden border-b border-emerald-100 bg-emerald-50 py-3"
      aria-label="আজকের পণ্যের দাম"
    >
      <div className="price-ticker-track flex w-max items-center">
        {items.map((product, index) => (
          <span
            key={`${product.id}-${index}`}
            className="mx-5 inline-flex items-center gap-2 whitespace-nowrap text-sm"
          >
            <span>{product.image || product.categoryIcon || "🛒"}</span>
            <span className="font-semibold text-stone-800">
              {product.nameBn}
            </span>
            <span className="text-stone-600">
              {formatTaka(product.today)} / {getUnitLabel(product.unit)}
            </span>

            <span
              className={
                product.change.dir === "up"
                  ? "font-semibold text-emerald-700"
                  : product.change.dir === "down"
                    ? "font-semibold text-red-600"
                    : "font-semibold text-stone-500"
              }
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {new Intl.NumberFormat("bn-BD", {
                maximumFractionDigits: 1,
              }).format(product.change.pct)}
              %
            </span>

            <span className="text-emerald-300">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}