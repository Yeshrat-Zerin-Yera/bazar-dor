import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#fafaf7] px-4 text-center">
      <div className="text-7xl">🛒</div>

      <h1 className="mt-6 text-5xl font-extrabold text-emerald-900">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold text-stone-900">
        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
      </h2>

      <p className="mt-3 max-w-md text-stone-600">
        দুঃখিত! আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি পাওয়া যায়নি।
      </p>

      <Link
        href="/"
        className="mt-7 rounded-xl bg-emerald-800 px-6 py-3 font-semibold text-white transition hover:bg-emerald-900"
      >
        হোমপেজে ফিরে যান
      </Link>
    </main>
  );
}