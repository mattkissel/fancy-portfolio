import type { Post } from "@/types/post"

const HUGO_BASE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1313"
    : "https://mattckissel.com";

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const url = `${HUGO_BASE}/tags/${tag}/index.json`;

  const res = await fetch(url, {
    next: { revalidate: 60 }, // ISR: revalidate every hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Hugo feed for tag "${tag}": ${res.status}`);
  }

  const data = await res.json();

  // Hugo JSON feeds put posts under `items`
  return (data ?? []) as Post[];
}