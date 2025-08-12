# Development quickstart

This repo is a Jekyll 3.10 site using minima (dark skin), kramdown(GFM), rouge, and plugins: jekyll-seo-tag, jekyll-sitemap, jekyll-lazy-load-image, jekyll-search.

## Run locally

```bash
bundle install
bundle exec jekyll serve
```

Or use VS Code Tasks: “Jekyll: Serve” / “Jekyll: Build”.

## Structure (non-content)

- `_config.yml`: collections, defaults, header_pages, excludes.
- `_layouts/*`: default/home/post/graph etc.
- `_includes/*`: head/header/footer and partials.
- `assets/main.scss` → `assets/main.css`; `assets/css/custom.css` overrides.

Content lives in `_articles`, `_studies`, `_projects`, `_obsidian`.

## Authoring rules

- All markdown files need front matter (`---`).
- `articles`: title, date, categories (list ok), author recommended.
- `studies/projects`: title required; folder path may imply grouping.
- `obsidian`: title required; graph links use `[[Exact Title]]` (normalized matching supported).

## Graph page notes

`_layouts/graph.html` builds a JSON of obsidian documents at build time, then renders with D3 v7 and Showdown on the client. Update Liquid (data emit) and JS (render/UX) together when changing schema.
