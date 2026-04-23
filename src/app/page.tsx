import Image from "next/image";
import { ProjectCard } from "@/components/ProjectCard";
import { getPostsByTag } from "@/lib/hugo";
import type { Post } from "@/types/post";


export default async function  Home() {
  const posts = await getPostsByTag("portfolio");
  console.log("get posts response:", JSON.stringify(posts, null, 2));

  // can call other post tags here
  // then merge into one deduplicated list.
  // posts have a `url` field that's unique per post.
  // Promise.all() lets you fire both fetches at the same time.

  // ── PUZZLE 2 ──────────────────────────────────────────────────
  // Sort `posts` so the newest posts come first.
  // Hint: post.date is a "YYYY-MM-DD" string — how does string comparison work here?
  posts.sort((a,b) => ( a.date < b.date ? 1 : -1 ))
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            Portfolio
          </p>
          <h1 className="mt-2 font-mono text-4xl font-bold text-zinc-100">
            Matt Kissel
          </h1>
          <p className="mt-4 text-zinc-400">
            Developer projects — React, web design, and the occasional weird idea.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="font-mono text-sm text-zinc-600">No projects found.</p>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <ProjectCard key={post.url} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
