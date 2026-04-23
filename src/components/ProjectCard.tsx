import type { Post } from "@/types/post";

type Props = { post: Post };

export function ProjectCard({ post }: Props) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  return (
    <article className="group relative flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-600">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-mono text-lg font-semibold text-zinc-100 group-hover:text-white">
          {post.title}
        </h2>
        <time className="shrink-0 font-mono text-xs text-zinc-500">
          {formattedDate}
        </time>
      </div>

      {/* Summary */}
      <p className="text-sm leading-relaxed text-zinc-400">{post.summary}</p>

      {/* Tech badges */}
      {post.tech && post.tech.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {post.tech.map((t) => (
            <li
              key={t}
              className="rounded-md bg-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-300"
            >
              {t}
            </li>
          ))}
        </ul>
      )}

      {/* Links */}
      <div className="mt-auto flex gap-4 pt-2">
        {post.github && (
          <a
            href={post.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-zinc-400 underline-offset-4 hover:text-zinc-100 hover:underline"
          >
            GitHub ↗
          </a>
        )}
        {post.demo && (
          <a
            href={post.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-zinc-400 underline-offset-4 hover:text-zinc-100 hover:underline"
          >
            Live demo ↗
          </a>
        )}
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto font-mono text-xs text-zinc-500 underline-offset-4 hover:text-zinc-300 hover:underline"
        >
          Full post ↗
        </a>
      </div>
    </article>
  );
}