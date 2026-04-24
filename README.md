# fancy-portfolio

A developer portfolio built with Next.js 15, consuming content from [mattckissel.com](https://mattckissel.com) — a Hugo site that serves as the single source of truth for all posts.

Live: [portfolio.mattckissel.com/](https://portfolio.mattckissel.com/)

## How it works

The Hugo site manages all content. This Next.js site fetches Hugo's JSON feeds by tag, deduplicates and sorts the results, and renders them as richer project cards than the Hugo theme provides. No content lives here — if you want to add or edit a project, do it in Hugo.

```
Hugo (mattckissel.com)  →  JSON feed by tag  →  Next.js (this repo)
```

Posts are fetched at request time with a one-hour ISR revalidation window, so the portfolio stays in sync with Hugo without requiring a redeploy.

## Stack

- **Next.js 15** — App Router, Server Components, ISR
- **TypeScript**
- **Tailwind CSS**
- **Vercel** — auto-deploys on push to `main`

## Project structure

```
src/
  app/
    page.tsx              # Homepage — fetches and renders project cards
  components/
    ProjectCard.tsx       # Card with title, summary, tech badges, links
  lib/
    hugo.ts               # Fetches and types the Hugo JSON feed
  types/
    post.ts               # Post type
```

## Hugo post shape

Posts are expected to have this front matter shape:

```toml
title = "My Project"
date = 2026-01-01
summary = "A short description"
tags = ["portfolio", "react"]
tech = ["React", "Vite"]
github = "https://github.com/..."

links = [
    {label = "Live App", url = "https://..."},
    {label = "Scoreboard", url = "https://..."},
]

```

The `links` array replaces the single `demo` field and supports any number of labeled links per project. Declare any top-level fields (like `categories`) before the first `[[links]]` block in TOML.

## Local development

Requires a local Hugo server running on port 1313:

```bash
# In your Hugo repo
hugo server

# In this repo
npm install
npm run dev
```

The fetcher switches base URLs automatically:

| Environment | Hugo base |
|---|---|
| `development` | `http://localhost:1313` |
| `production` | `https://mattckissel.com` |

If you want to skip the local Hugo dependency and just hit the live site while developing:

```ts
// src/lib/hugo.ts — temporary, revert before shipping
const HUGO_BASE = "https://mattckissel.com";
```

To bust the Next.js fetch cache during development:

```bash
rm -rf .next/cache
```

Or set `cache: "no-store"` in the fetch call while iterating.

## Deployment

Connected to this repo on Vercel. Pushes to `main` deploy automatically. No environment variables required.