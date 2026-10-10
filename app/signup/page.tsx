import Link from "next/link";
import Navbar from "@/components/navbar";
import PriceTicker from "@/components/price-ticker";
import SignupForm from "@/components/signup-form";
import { getProducts } from "@/lib/api";
import Footer from "@/components/footer";

export default async function SignUpPage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <PriceTicker products={products} />

      <main className="min-h-[65vh] bg-gray-50 px-4 py-12">
        <section className="mx-auto max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              অ্যাকাউন্ট তৈরি করুন
            </h1>

            <p className="mt-3 text-gray-600">
              বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <SignupForm />
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

      <Footer/>
    </>
  );
}
