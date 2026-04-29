# SEO & AI Crawler Setup

## Audit Problem Identified

The SEO audit found that the site is a client-side React SPA and initial HTML response is mostly a root container. This causes:

- weak crawler visibility for AI retrieval engines
- limited route-level metadata discoverability
- same/insufficient metadata across routes
- reduced branded search performance

## Changes Implemented

### 1) Root crawler files copied from source repository

Source location used: `files ttt/` (same workspace, source-of-truth repository content).

Copied (verbatim) into `public/`:

- `files ttt/robots.txt` -> `public/robots.txt`
- `files ttt/llms.txt` -> `public/llms.txt`
- `files ttt/llms-full.txt` -> `public/llms-full.txt`
- `files ttt/sitemap.xml` -> `public/sitemap.xml`

No content edits were made during copy.

### 2) Helmet setup (`react-helmet-async`)

- Dependency already present in `package.json`: `react-helmet-async`
- App tree configured so Helmet provider wraps router and routes:
  - `AuthProvider`
    - `HelmetProvider`
      - `Router`
        - route-rendering content

Implementation files:

- `src/App.tsx` (provider placement + SEO component mount)
- `src/seo/RouteSeo.tsx` (route-aware metadata/JSON-LD injection)

### 3) Route-specific metadata (title/description/canonical/OG/Twitter)

Implemented in `src/seo/RouteSeo.tsx` for:

- Home: `/`
- Contact state (home hash): `/#contact`
- About: `/aboutUs`
- Services:
  - `/services/ai-chatbots`
  - `/services/agentic-ai-workflows`
  - `/services/smart-process-automation`
  - `/services/ai-apps-micro-saas`

Each route now injects:

- `<title>`
- `meta name="description"`
- canonical URL
- OpenGraph tags
- Twitter card tags

### 4) JSON-LD schema injection from schema bundle

Schema source: `files ttt/schema-bundle.md`.

Injected in `src/seo/RouteSeo.tsx`:

- Homepage Organization + WebSite + ProfessionalService graph
- About page AboutPage + Person
- Service schema blocks for each core service route

All schema JSON content was copied from the source bundle and inserted as JSON-LD scripts via Helmet.

### 5) Prerender compatibility preparation

To support prerender middleware and crawler detection:

- base metadata added to `index.html` (canonical, OG, Twitter, robots defaults)
- route-level metadata and JSON-LD injected via Helmet
- crawler/static files served from `public/` at root paths

This keeps the existing SPA/routing/business logic intact while making metadata crawler-visible and prerender-ready.

## Validation Checklist

After run/deploy, verify:

- `/robots.txt` loads
- `/llms.txt` loads
- `/llms-full.txt` loads
- `/sitemap.xml` loads

Also verify in browser DevTools -> Elements -> `<head>`:

- route-specific title/description/canonical
- OpenGraph/Twitter tags
- JSON-LD script for current route

## Final Folder Structure (SEO/Crawler-related)

```text
public/
  robots.txt
  llms.txt
  llms-full.txt
  sitemap.xml

src/
  seo/
    RouteSeo.tsx
  App.tsx

index.html
docs/
  seo-ai-crawler-setup.md
```

