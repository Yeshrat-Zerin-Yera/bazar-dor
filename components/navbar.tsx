"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRound, LogOut, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

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
  const { data: session, isPending } = authClient.useSession();
  const [profileOpen, setProfileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();

  const banglaDate = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  async function handleSignOut() {
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      setProfileOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white">
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

        <div className="flex items-center gap-2 text-sm font-semibold">
          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-stone-100" />
          ) : session ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
                aria-label="প্রোফাইল মেনু"
                className="flex items-center gap-2 rounded-full border border-stone-200 py-1.5 pl-1.5 pr-3 transition hover:bg-emerald-50"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt="প্রোফাইল ছবি"
                    className="size-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex size-9 items-center justify-center rounded-full bg-emerald-800 font-bold text-white">
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                )}

                <span className="max-w-28 truncate text-stone-800">
                  {session.user.name || "প্রোফাইল"}
                </span>

                <ChevronDown
                  size={16}
                  className={`text-stone-500 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <>
                  <button
                    type="button"
                    aria-label="মেনু বন্ধ করুন"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setProfileOpen(false)}
                  />

                  <div className="absolute right-0 z-50 mt-3 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-stone-200 bg-white text-left shadow-xl">
                    <div className="border-b border-stone-100 px-4 py-4">
                      <p className="truncate font-semibold text-stone-900">
                        {session.user.name || "ব্যবহারকারী"}
                      </p>
                      <p className="mt-1 truncate text-sm font-normal text-stone-500">
                        {session.user.email}
                      </p>
                    </div>

                    <div className="space-y-1 p-2">
                      <Link
                        href="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-3 font-medium text-stone-700 transition hover:bg-stone-100"
                      >
                        <UserRound size={19} />
                        আমার প্রোফাইল
                      </Link>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={signingOut}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <LogOut size={19} />
                        {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
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