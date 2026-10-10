import Link from "next/link";
import Navbar from "@/components/navbar";
import PriceTicker from "@/components/price-ticker";
import SigninForm from "@/components/signin-form";
import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/types";

export default async function SigninPage() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to load products:", error);
  }

  return (
    <>
      <main className="min-h-[65vh] bg-[#fafaf7] px-4 py-12">
        <section className="mx-auto max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-stone-900">
              সাইন ইন
            </h1>
            <p className="mt-3 text-stone-600">
              বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <SigninForm />
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-emerald-800 hover:underline"
            >
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}