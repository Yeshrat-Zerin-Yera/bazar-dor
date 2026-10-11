"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserRound, LogOut, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  async function handleSignOut() {
    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error("সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  }

  if (isPending || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafaf7]">
        <p className="text-stone-500">প্রোফাইল লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafaf7] px-4 py-10 sm:py-14">
      <section className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900">
            আমার প্রোফাইল
          </h1>
          <p className="mt-3 text-stone-600">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center gap-3 border-b border-stone-100 pb-6 sm:flex-row sm:gap-5">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt="প্রোফাইল ছবি"
                className="size-20 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                {session.user.name ? (
                  <span className="text-3xl font-bold">
                    {session.user.name.charAt(0)}
                  </span>
                ) : (
                  <UserRound size={36} />
                )}
              </div>
            )}

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-stone-900">
                {session.user.name || "ব্যবহারকারী"}
              </h2>
              <p className="mt-1 text-sm text-stone-500">
                {session.user.email}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/profile/update"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-800 px-5 py-3 font-semibold text-white transition hover:bg-emerald-900"
            >
              <Pencil size={18} />
              নাম হালনাগাদ করুন
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={18} />
              সাইন আউট
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
