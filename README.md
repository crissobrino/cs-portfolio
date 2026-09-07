# Portfolio

Static site, no build step. Served by GitHub Pages from `main`.

```
index.html                       landing page — name, degrees, project grid
project.html                     detail template, filled from ?p=<slug>
assets/data/projects/manifest.json   ordered list of project slugs
assets/data/projects/<slug>.json     one file per project, all its content
assets/js/index.js               fetches the manifest + project files, renders the grid + filters
assets/js/project.js             fetches one project file, renders the detail page
assets/css/style.css             design tokens and all styling
assets/img/<slug>/                images for each project
```

## Adding a project

Create `assets/data/projects/<slug>.json` and add `<slug>` to
`assets/data/projects/manifest.json` (order there is display order on the
homepage). The `slug` becomes the URL (`project.html?p=my-project`) and the
folder name for its images.

```json
{
  "slug": "flow-solver",
  "title": "Compressible flow solver",
  "year": "2025",
  "domain": "Engineering",
  "tags": ["Engineering", "Python"],
  "summary": "One sentence, shown on the card.",
  "stack": ["Python", "NumPy"],
  "role": "Solo project",
  "context": "MSc thesis",
  "repo": "https://github.com/user/flow-solver",
  "sections": [
    { "heading": "The problem", "body": ["..."], "list": ["optional bullets"] }
  ],
  "images": [
    { "src": "assets/img/flow-solver/mesh.png", "alt": "...", "caption": "..." }
  ]
}
```

`tags` drives the filter buttons on the homepage. `repo: ""` hides the repo
button. A `section` can also carry its own `images` array, rendered inline
right after that section's text (used for diagrams embedded mid-story, as
opposed to the closing `images` gallery). Leave the top-level `images`
empty and the detail page shows placeholder frames.

Since pages fetch these files, local preview needs an actual server (see
below) — opening `index.html` directly via `file://` won't load them.

## Local preview

```
python3 -m http.server 8000
```

Then open http://localhost:8000.
