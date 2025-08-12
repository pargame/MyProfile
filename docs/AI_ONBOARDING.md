# AI onboarding guide

This guide gives future AI assistants a fast, actionable overview of the Graph (Obsidian) feature and how this Jekyll repo is wired. Follow it to avoid regressions and keep the page lightweight and maintainable.

## Scope and goals
- Visualize only the `_obsidian/**` knowledge base as a title-based graph (Obsidian-style wiki links).
- Keep the graph page small: no hardcoded document bodies in HTML. Metadata only; fetch content lazily on click.
- Make it GitHub Pages–friendly (Liquid only, no plugins).

## Canonical files (authoritative)
- Page: `graph.md` → layout `/_layouts/graph.html`
- Data generator: `/graph-data.json` → emits `/graph/data.json` at build time
- Runtime assets:
  - CSS: `/assets/css/graph.css`
  - JS: `/assets/js/graph.js` (loads `/graph/data.json` and renders with D3)

Note: There’s a legacy template at `/_layouts/graph_data.json`. Do not edit or rely on it. The canonical source for `/graph/data.json` is the root-level `graph-data.json` page.

## Data contract (JSON schema)
- Endpoint: `/graph/data.json`
- Shape:
  - `archives`: string[]
  - `documents`: { [url: string]: { title: string, url: string, archive: string, collection: 'obsidian', links: string[] } }
- Definitions:
  - title: filename without extension (case preserved) if no explicit front matter `title`.
  - archive: first folder under `_obsidian/` (e.g., `_obsidian/Unreal/...` → `Unreal`), else `Root`.
  - links: deduped list of internal document URLs derived from `[[Wiki Link]]`, `[[Title|alias]]`, `[[Title#section]]` → match by Title.

## Liquid generation rules (graph-data.json)
- Iterate only `site.obsidian`.
- Build a `title_to_url` map to resolve wiki links by Title → URL.
- Parse `doc.content` for `[[...]]` patterns, normalize target Title, lookup URL, exclude self-links, `uniq` the array.
- Output only metadata (no full content) to keep payload light.
- Always pass URLs through `relative_url` to respect `baseurl`.

## Runtime rules (assets/js/graph.js)
- Fetch JSON using a page-relative URL: `new URL('data.json', location.href)` so it works under any baseurl.
- Build nodes/edges from the JSON. Edge = `documents[url].links[]` where target exists in `documents`.
- Graph rendering: D3 v7 force layout; nodes sized by degree; zoom & drag enabled.
- Lazy content: on node click, fetch the document page (`doc.url`), extract `.post-content`, and render in the side panel. Cache content in-memory to avoid refetch.
- Internal links inside the fetched content that point to other known documents are intercepted and routed to the in-page viewer.

## UI expectations (assets/css/graph.css)
- Sections: archive selector, controls, graph canvas, document list, document content.
- Controls: node max size and charge strength; “Regenerate” nudges the simulation.

## What NOT to do
- Don’t inline large JSON or document bodies into `/_layouts/graph.html`.
- Don’t include other collections in the graph unless explicitly requested.
- Don’t hardcode absolute URLs; always use `relative_url` and page-relative fetch.

## Extend the graph to more collections (if requested)
1. In `graph-data.json`, union additional collections, e.g. `{% assign all_docs = site.obsidian | concat: site.studies %}` and update mapping logic.
2. Ensure the `collection` field reflects the origin so colors can differentiate.
3. Keep the metadata-only rule; do not embed content into the JSON.

## Build, serve, verify
- Build:
  - bundle exec jekyll build
- Serve:
  - bundle exec jekyll serve
- Verify:
  - Open `/graph/` → the page loads quickly; D3 is requested, `assets/js/graph.js` and `assets/css/graph.css` are loaded.
  - Request `/graph/data.json` → JSON includes `archives` and `documents`. Documents’ `url` values end with `/`.
  - Choose an archive → nodes render; clicking a node populates the right panel by fetching the page and extracting `.post-content`.

## Maintenance checklist
- When adding or renaming Obsidian notes:
  - Filename determines default Title; internal links must match Title.
  - If you change a Title, update backlinks in other notes.
- When changing JSON shape:
  - Update both `graph-data.json` (Liquid) and `/assets/js/graph.js` (consumer) together.
- When styling:
  - Keep graph styles in `/assets/css/graph.css`.

## Known assumptions and edge cases
- Trailing slashes: the viewer normalizes internal link HREFs to ensure `pathname` ends with `/` when matching `documents` keys.
- Broken links: `links` pointing to non-existent documents are ignored at runtime.
- Baseurl: all data and asset paths work when site is published under a project subpath on GitHub Pages.

## Quick file index (for AIs)
- `/_layouts/graph.html`: minimal HTML shell, includes D3, graph.css/js; no inline data.
- `/graph-data.json`: Liquid page that generates `/graph/data.json` (metadata only).
- `/assets/js/graph.js`: D3 graph, lazy loader, UI wiring.
- `/assets/css/graph.css`: styles for the graph page.

If in doubt, prefer making the JSON smaller and the JS smarter. Keep the page fast and cacheable.
