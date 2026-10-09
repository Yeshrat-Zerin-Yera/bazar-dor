import type { Category, Product } from "./types";

const API_BASE =
  "https://api.api-store.workers.dev/api/bazardor";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getProducts(): Promise<Product[]> {
  return fetchJson<Product[]>(`${API_BASE}/products`);
}

export async function getProduct(
  slug: string,
): Promise<Product | null> {
  const products = await getProducts();

  return products.find((product) => product.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  return fetchJson<Category[]>(`${API_BASE}/categories`);
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const url = new URL(`${API_BASE}/products`);
  url.searchParams.set("category", category);

  return fetchJson<Product[]>(url.toString());
}