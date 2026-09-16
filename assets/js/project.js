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

  const renderFigure = (image, inRow) => {
    const figure = el("figure", "figure");
    if (image.src) {
      const frame = el("div", "figure__frame");
      const img = el("img");
      img.src = image.src;
      img.alt = image.alt || image.caption || "";
      // Row figures need their real dimensions to size correctly, so they
      // can't wait for a lazy load to tell us the aspect ratio.
      img.loading = inRow ? "eager" : "lazy";
      // Row layouts size each figure by its aspect ratio to equalise heights.
      const setAspect = () => {
        if (img.naturalHeight)
          figure.style.setProperty(
            "--aspect",
            img.naturalWidth / img.naturalHeight
          );
      };
      if (img.complete) setAspect();
      else img.addEventListener("load", setAspect, { once: true });
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

  const renderTable = (table) => {
    const wrap = el("div", "table-wrap");
    const node = el("table", "table");
    // <caption> has to be the table's first child to be valid, even though
    // caption-side puts it underneath.
    if (table.caption) node.append(el("caption", null, table.caption));
    if (table.columns && table.columns.length) {
      const thead = el("thead");
      const row = el("tr");
      table.columns.forEach((c) => row.append(el("th", null, c)));
      thead.append(row);
      node.append(thead);
    }
    const tbody = el("tbody");
    (table.rows || []).forEach((cells) => {
      const row = el("tr");
      cells.forEach((cell) => row.append(el("td", null, cell)));
      tbody.append(row);
    });
    node.append(tbody);
    wrap.append(node);
    return wrap;
  };

  const renderVideo = (video) => {
    const figure = el("figure", "figure");
    const frame = el("div", "figure__frame");
    const vid = document.createElement("video");
    vid.src = video.src;
    vid.controls = true;
    vid.preload = "metadata";
    if (video.poster) vid.poster = video.poster;
    frame.append(vid);
    figure.append(frame);
    if (video.caption) figure.append(el("figcaption", null, video.caption));
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
    if (section.subheading) prose.append(el("h3", null, section.subheading));
    (section.body || []).forEach((p) => prose.append(el("p", null, p)));
    if (section.list) {
      const ul = el("ul");
      section.list.forEach((item) => ul.append(el("li", null, item)));
      prose.append(ul);
    }
    if (section.note) prose.append(el("p", "prose__note", section.note));
    if (section.table) prose.append(renderTable(section.table));
    if (section.images && section.images.length) {
      const perRow = { pair: 2, triple: 3 }[section.imageLayout];
      const stack = el(
        "div",
        `section-images${perRow ? ` section-images--${section.imageLayout}` : ""}`
      );
      if (perRow) {
        for (let i = 0; i < section.images.length; i += perRow) {
          const row = el("div", "section-images__row");
          section.images
            .slice(i, i + perRow)
            .forEach((image) => row.append(renderFigure(image, true)));
          stack.append(row);
        }
      } else {
        section.images.forEach((image) => stack.append(renderFigure(image)));
      }
      prose.append(stack);
    }
    if (section.video) {
      const stack = el("div", "section-images");
      stack.append(renderVideo(section.video));
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

  const linkHref = project.link || project.repo;
  if (linkHref) {
    const link = el("a", "repo", project.linkLabel || "View repository");
    link.href = linkHref;
    link.rel = "noopener";
    link.target = "_blank";
    root.append(link);
  }
})();
