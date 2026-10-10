"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserRound,
  LogOut,
  Save,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import type { Product } from "@/lib/types";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data: Product[]) => {
        if (active) setProducts(data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });

    return () => {
      active = false;
    };
  }, []);

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

      toast.success("নাম সফলভাবে হালনাগাদ হয়েছে");
      await authClient.getSession();
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);

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
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fafaf7]">
      <Navbar />

      {/* Moving product price ticker */}
      <div className="w-full overflow-hidden border-y border-emerald-100 bg-white py-3">
        {products.length > 0 ? (
          <div className="ticker-track flex w-max items-center">
            {[...products, ...products].map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="flex shrink-0 items-center gap-2 px-6 text-sm"
              >
                <span className="font-medium text-stone-700">
                  {product.nameBn}
                </span>

                <span className="font-bold text-stone-900">
                  ৳{product.today}
                  <span className="ml-1 font-normal text-stone-500">
                    /{product.unit}
                  </span>
                </span>

                <span
                  className={
                    product.change.dir === "up"
                      ? "flex items-center gap-1 font-semibold text-red-600"
                      : product.change.dir === "down"
                        ? "flex items-center gap-1 font-semibold text-emerald-700"
                        : "font-semibold text-stone-500"
                  }
                >
                  {product.change.dir === "up" ? (
                    <TrendingUp size={14} />
                  ) : product.change.dir === "down" ? (
                    <TrendingDown size={14} />
                  ) : null}

                  {product.change.dir === "flat"
                    ? "→"
                    : `${product.change.pct > 0 ? "+" : ""}${product.change.pct}%`}
                </span>

                <span className="ml-2 text-stone-300">•</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-stone-500">
            বাজারদরের তথ্য লোড হচ্ছে...
          </p>
        )}
      </div>

      <main className="flex-1 px-4 py-10 sm:py-14">
        {isPending || !session ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="text-stone-500">
              প্রোফাইল লোড হচ্ছে...
            </p>
          </div>
        ) : (
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
                        {session.user.name.charAt(0).toLowerCase()}
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

              <div className="pt-6">
                <h2 className="text-xl font-bold text-stone-900">
                  নাম হালনাগাদ করুন
                </h2>

                <form
                  onSubmit={handleUpdateName}
                  className="mt-5 space-y-4"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-stone-700"
                    >
                      নাম
                    </label>

                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      required
                      className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                      placeholder="আপনার নাম লিখুন"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-800 px-5 py-3 font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save size={18} />
                    {saving
                      ? "হালনাগাদ হচ্ছে..."
                      : "তথ্য হালনাগাদ করুন"}
                  </button>
                </form>
              </div>

              <div className="mt-8 border-t border-stone-100 pt-6">
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                >
                  <LogOut size={18} />
                  {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <style jsx>{`
        .ticker-track {
          animation: ticker-scroll 35s linear infinite;
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }

        @keyframes ticker-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
