(async function () {
  const slug = new URLSearchParams(location.search).get("p");
  const root = document.querySelector("[data-project]");

  let project = null;
  if (slug) {
    try {
      const res = await fetch(`assets/data/projects/${slug}.json`);
      if (res.ok) project = await res.json();
    } catch (err) {
      console.error("Failed to load project", err);
    }
  }

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  const renderFigure = (image) => {
    const figure = el("figure", "figure");
    if (image.src) {
      const frame = el("div", "figure__frame");
      const img = el("img");
      img.src = image.src;
      img.alt = image.alt || image.caption || "";
      img.loading = "lazy";
      frame.append(img);
      figure.append(frame);
    } else {
      const frame = el("div", "figure__frame figure__frame--empty");
      frame.append(el("span", "mono", "Image"));
      figure.append(frame);
    }
    if (image.caption) figure.append(el("figcaption", null, image.caption));
    return figure;
  };

  if (!project) {
    document.title = "Not found — Portfolio";
    root.append(
      el("h1", "project__title", "That project isn’t here"),
      el(
        "p",
        "project__summary",
        "The link may be out of date. Head back to the index to see everything."
      )
    );
    return;
  }

  document.title = `${project.title} — Portfolio`;

  const head = el("header", "project__head");
  const tags = el("div", "tags");
  (project.tags || []).forEach((t) => tags.append(el("span", "tag", t)));
  head.append(
    tags,
    el("h1", "project__title", project.title),
    el("p", "project__summary", project.summary)
  );

  const spec = el("dl", "spec");
  const rows = [
    ["Year", project.year, false],
    ["Type", project.domain, false],
    ["Role", project.role, false],
    ["Context", project.context, false],
    ["Stack", (project.stack || []).join(" · "), true],
  ];
  rows.forEach(([key, value, mono]) => {
    if (!value) return;
    const row = el("div", "spec__row");
    row.append(
      el("dt", "spec__key mono", key),
      el("dd", `spec__value${mono ? " spec__value--mono" : ""}`, value)
    );
    spec.append(row);
  });

  const prose = el("section", "prose");
  (project.sections || []).forEach((section) => {
    if (section.heading) prose.append(el("h2", null, section.heading));
    (section.body || []).forEach((p) => prose.append(el("p", null, p)));
    if (section.list) {
      const ul = el("ul");
      section.list.forEach((item) => ul.append(el("li", null, item)));
      prose.append(ul);
    }
    if (section.images && section.images.length) {
      const stack = el("div", "section-images");
      section.images.forEach((image) => stack.append(renderFigure(image)));
      prose.append(stack);
    }
  });

  const layout = el("div", "layout");
  layout.append(prose, spec);
  root.append(head, layout);

  if (project.images && project.images.length) {
    const gallery = el("section", "gallery");
    project.images.forEach((image) => gallery.append(renderFigure(image)));
    root.append(gallery);
  }

  if (project.repo) {
    const link = el("a", "repo", "View repository");
    link.href = project.repo;
    link.rel = "noopener";
    link.target = "_blank";
    root.append(link);
  }
})();
