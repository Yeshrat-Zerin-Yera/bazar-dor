"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/product-card";
import type { Product } from "@/lib/types";

interface CategoryProductsProps {
  products: Product[];
}

type SortOption = "default" | "low-to-high" | "high-to-low";

export default function CategoryProducts({
  products,
}: CategoryProductsProps) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low-to-high") {
      result.sort((a, b) => a.today - b.today);
    } else if (sort === "high-to-low") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  if (products.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-10 text-center">
        <p className="text-lg font-semibold text-stone-900">
          কোনো পণ্য পাওয়া যায়নি
        </p>

        <p className="mt-2 text-sm text-stone-500">
          এই বিভাগে বর্তমানে কোনো পণ্যের তথ্য নেই।
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-stone-600">
          এই বিভাগে পাওয়া গেছে{" "}
          <span className="font-bold text-stone-900">
            {products.length}
          </span>{" "}
          টি পণ্য
        </p>

        <label className="flex items-center gap-3 text-sm font-medium text-stone-700">
          সাজান

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
            className="rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">
              দাম: কম থেকে বেশি
            </option>
            <option value="high-to-low">
              দাম: বেশি থেকে কম
            </option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}