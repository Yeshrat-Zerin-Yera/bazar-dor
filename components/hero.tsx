import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:py-16 md:grid-cols-2 md:py-20">
      <div>
        <p className="mb-4 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
          আপনার প্রতিদিনের বাজার, এখন আরও সহজ
        </p>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          আজকের বাজারের দাম
          <span className="mt-2 block text-emerald-800">
            এক নজরে দেখুন
          </span>
        </h1>

        <p className="mt-5 max-w-lg text-base leading-8 text-stone-600">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস ও নিত্যপ্রয়োজনীয় পণ্যের
          বাজারদর, দামের পরিবর্তন এবং বাজারভিত্তিক তথ্য দেখুন এক জায়গায়।
        </p>

        <Link
          href="#সব-পণ্য"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-6 py-3 font-semibold text-white transition hover:bg-emerald-900"
        >
          সব পণ্য দেখুন
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="relative mx-auto w-full max-w-lg">
        <Image
          src="/bazar-hero.png"
          alt="তাজা বাজারের পণ্যের ঝুড়ি"
          width={600}
          height={500}
          priority
          className="h-auto w-full object-contain"
        />
      </div>
    </section>
  );
}