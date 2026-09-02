# Portfolio

Static site, no build step. Served by GitHub Pages from `main`.

```
index.html          landing page — name, degrees, project grid
project.html        detail template, filled from ?p=<slug>
assets/js/projects.js   all project content lives here
assets/js/index.js      renders the grid + tag filters
assets/js/project.js    renders a detail page
assets/css/style.css    design tokens and all styling
assets/img/<slug>/      images for each project
```

## Adding a project

Append one object to `PROJECTS` in `assets/js/projects.js`. The `slug` becomes
the URL (`project.html?p=my-project`) and the folder name for its images.

```js
{
  slug: "flow-solver",
  title: "Compressible flow solver",
  year: "2025",
  domain: "Engineering",
  tags: ["Engineering", "Python"],      // drive the filter buttons
  summary: "One sentence, shown on the card.",
  stack: ["Python", "NumPy"],
  role: "Solo project",
  context: "MSc thesis",
  repo: "https://github.com/user/flow-solver",   // "" hides the button
  sections: [
    { heading: "The problem", body: ["..."], list: ["optional bullets"] }
  ],
  images: [
    { src: "assets/img/flow-solver/mesh.png", alt: "...", caption: "..." }
  ]
}
```

Leave `images` empty and the detail page shows placeholder frames.

## Local preview

```
python3 -m http.server 8000
```

Then open http://localhost:8000.
