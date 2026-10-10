import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PriceTicker from "@/components/price-ticker";
import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর | Bazar Dor",
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারদর দেখুন।",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to load products:", error);
  }

  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <PriceTicker products={products} />

        <div className="flex-1">{children}</div>

        <Footer />

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
