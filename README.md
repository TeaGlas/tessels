# tessels.

Simple recipes, no life stories.

A recipe website for home cooks — modern, approachable, and to the point. Built with React, Vite, and Tailwind CSS per [BUILD_SPEC.md](./BUILD_SPEC.md).

## Stack

- **React 18 + Vite** — dev server and static build
- **Tailwind CSS** — design tokens mapped in `tailwind.config.js`
- **React Router** — 5 routes (home, browse, recipe detail, search, basics stub)
- **Static JSON** (`src/data/recipes.json`) behind a small data layer (`src/lib/data.js`) — no backend

## Getting started

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

### Other scripts

```bash
npm run build     # production build to dist/
npm run preview   # serve the production build locally
npm test          # run the quantity/formatting unit tests (vitest)
npm run lint      # eslint
```

## Project structure

```
src/
  main.jsx, App.jsx, index.css
  data/recipes.json          # recipe content
  lib/
    data.js                  # getRecipes / getRecipe / getFeatured / getByCategory / searchRecipes
    quantity.js              # servings scaling + metric/cups formatting (unit-tested)
  components/                # NavBar, Footer, RecipeCard, Chip, IngredientsCard, etc.
  pages/                     # Home, Browse, RecipeDetail, Search, Basics
public/
  icons/                     # favicons, app icons, site.webmanifest
  images/                    # recipe photography goes here (see below)
```

## Adding a recipe

Add an entry to `src/data/recipes.json` following the existing shape (ingredient quantities carry both `us` and `metric` values so the servings/unit toggles work), then drop a matching image at `public/images/<id>.jpg`. Everything else — routing, cards, search — picks it up automatically through `src/lib/data.js`.

## Images

The site ships with placeholder tiles (a sage-gradient box with the recipe title) wherever `public/images/<id>.jpg` doesn't exist yet. Drop real photography — landscape, 1200px+ wide — into `public/images/` using the `image` path set on each recipe in `recipes.json`, and the placeholders are replaced automatically.

## Deploying to Netlify

This repo includes a `netlify.toml` with the build command, publish directory, and an SPA fallback redirect (so client-side routes like `/recipes/:slug` don't 404 on refresh).

**Option A — Netlify UI:** Push this repo to GitHub/GitLab/Bitbucket, then in Netlify: **Add new site → Import an existing project**, pick the repo. Build command and publish directory are picked up from `netlify.toml` automatically.

**Option B — Netlify CLI:**

```bash
npm install -g netlify-cli
netlify deploy --build          # preview deploy
netlify deploy --build --prod   # production deploy
```

No environment variables or backend services are required — it's a fully static build.

## Out of scope (v1)

See [BUILD_SPEC.md](./BUILD_SPEC.md) §11 — auth, CMS integration, SSR, and persisted ingredient/servings state are intentionally left for later.
