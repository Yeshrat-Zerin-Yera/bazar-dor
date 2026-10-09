import Image from "next/image";
import Link from "next/link";

const categories = [
  { slug: "chal", name: "চাল", icon: "🍚" },
  { slug: "dal", name: "ডাল", icon: "🫘" },
  { slug: "tel", name: "তেল", icon: "🛢️" },
  { slug: "shobji", name: "সবজি", icon: "🥬" },
  { slug: "mach", name: "মাছ", icon: "🐟" },
  { slug: "mangsho", name: "মাংস", icon: "🍗" },
  { slug: "dim-dudh", name: "ডিম-দুধ", icon: "🥛" },
  { slug: "moshla", name: "মসলা", icon: "🌶️" },
];

export default function Navbar() {
  const banglaDate = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-icon.png"
            alt="বাজার দর লোগো"
            width={48}
            height={48}
            className="size-12 rounded-xl object-contain"
          />

          <span>
            <span className="block text-2xl font-extrabold text-emerald-900">
              বাজার দর
            </span>
            <span className="mt-1 block text-xs text-stone-500">
              {banglaDate}
            </span>
          </span>
        </Link>

        <div className="flex gap-2 text-sm font-semibold">
          <Link
            href="/signin"
            className="rounded-lg border border-stone-200 px-4 py-2 hover:bg-stone-50"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-emerald-800 px-4 py-2 text-white hover:bg-emerald-900"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      <nav
        aria-label="পণ্যের বিভাগ"
        className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-4"
      >
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="shrink-0 rounded-full px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-emerald-50 hover:text-emerald-900"
          >
            {category.icon} {category.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}