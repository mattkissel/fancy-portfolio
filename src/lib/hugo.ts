import type { Post } from "@/types/post"

const HUGO_BASE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1313"
    : "https://mattckissel.com";

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const url = `${HUGO_BASE}/categories/${category}/index.json`;

  const res = await fetch(url, {
    next: { revalidate: 3600 }, // ISR: revalidate every hour
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();

  // Hugo JSON feeds put posts under `items`
  return (data ?? []) as Post[];
}