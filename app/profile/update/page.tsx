"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }

    if (session?.user.name) {
      setName(session.user.name);
    }
  }, [isPending, session, router]);

  async function handleUpdateName(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    setSaving(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        toast.error(
          result.error.message || "নাম হালনাগাদ করা যায়নি"
        );
        return;
      }

      await authClient.getSession();

      toast.success("নাম সফলভাবে হালনাগাদ হয়েছে");
      router.replace("/profile");
      router.refresh();
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
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
      <section className="mx-auto max-w-2xl">
        <Link
          href="/profile"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-800 hover:text-emerald-900"
        >
          <ArrowLeft size={18} />
          প্রোফাইলে ফিরে যান
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900">
            নাম হালনাগাদ করুন
          </h1>
          <p className="mt-3 text-stone-600">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleUpdateName} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                আপনার নাম
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                maxLength={100}
                autoComplete="name"
                className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                placeholder="আপনার নাম লিখুন"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                ইমেইল
              </label>
              <p className="rounded-lg bg-stone-50 px-4 py-3 text-stone-600">
                {session.user.email}
              </p>
              <p className="mt-2 text-xs text-stone-500">
                এই পৃষ্ঠা থেকে শুধু নাম পরিবর্তন করা যাবে।
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-800 px-5 py-3 font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <Save size={18} />
              {saving ? "হালনাগাদ হচ্ছে..." : "নাম সংরক্ষণ করুন"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}