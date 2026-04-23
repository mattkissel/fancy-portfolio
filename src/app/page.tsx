import Image from "next/image";
import { ProjectCard } from "@/components/ProjectCard";
import { getPostsByTag } from "@/lib/hugo";
import type { Post } from "@/types/post";


export default async function  Home() {
  const posts = await getPostsByTag("portfolio");

  // can call other post tags here
  // then merge into one deduplicated list.
  // posts have a `url` field that's unique per post.
  // Promise.all() lets you fire both fetches at the same time.

  posts.sort((a,b) => ( a.date < b.date ? 1 : -1 ))
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            Portfolio
          </p>
          <div className="mt-2 flex items-baseline gap-4 flex-wrap">
          <h1 className="mt-2 font-mono text-4xl font-bold text-zinc-100">
            Matt Kissel
          </h1>
          <span className="font-mono text-sm text-zinc-600">
            Developer · IT generalist
          </span>
          </div>
            <ul className="mt-4 font-mono text-zinc-400 flex gap-4 flex-wrap">
            <li><a href="mailto:hello@mattckissel.com" className="text-sm text-zinc-500 border-b border-zinc-700">
              hello@mattckissel.com
            </a></li>
            <li><a href="https://github.com/mattkissel" className="text-sm text-zinc-500 border-b border-zinc-700">
              Github
            </a></li>
            <li><a href="https://www.linkedin.com/in/matthew-kissel/" className="text-sm text-zinc-500 border-b border-zinc-700">
            LinkedIn
            </a></li>
            </ul>
          <p className="mt-4 text-sm text-zinc-600 border-t border-zinc-800 pt-4">
            Developer projects — React, web design, intermittent goofs and gaffs.
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
