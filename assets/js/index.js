(async function () {
  const grid = document.querySelector("[data-grid]");
  const filters = document.querySelector("[data-filters]");

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  let projects = [];
  try {
    const manifest = await fetch("assets/data/projects/manifest.json").then(
      (r) => r.json()
    );
    projects = await Promise.all(
      manifest.map((slug) =>
        fetch(`assets/data/projects/${slug}.json`).then((r) => r.json())
      )
    );
  } catch (err) {
    console.error("Failed to load projects", err);
  }

  // Falls back to the project's first figure so a card doesn't need its own
  // artwork to show something.
  const thumbFor = (project) => {
    if (project.thumb) return project.thumb;
    for (const section of project.sections || [])
      for (const image of section.images || []) if (image.src) return image.src;
    return null;
  };

  projects.forEach((project, i) => {
    const card = el("a", "card reveal");
    card.href = `project.html?p=${encodeURIComponent(project.slug)}`;
    card.style.setProperty("--delay", `${Math.min(i * 60, 420)}ms`);
    card.dataset.themes = (project.themes || []).join("|");

    const meta = el("div", "card__meta mono");
    meta.append(
      el("span", "card__year", project.year || ""),
      el("span", null, project.domain || "")
    );

    const foot = el("div", "card__foot");
    foot.append(
      el("span", "card__stack", (project.stack || []).join(" · ")),
      el("span", "card__arrow mono", "→")
    );

    const thumbSrc = thumbFor(project);
    if (thumbSrc) {
      const thumb = el("div", "card__thumb");
      const img = el("img");
      img.src = thumbSrc;
      img.alt = "";
      img.loading = "lazy";
      thumb.append(img);
      card.append(thumb);
    }

    card.append(
      meta,
      el("h2", "card__title", project.title),
      el("p", "card__summary", project.summary),
      foot
    );
    grid.append(card);
  });

  // Methods first, then disciplines. Anything not listed sorts to the end,
  // so a newly coined theme still gets a filter.
  const THEME_ORDER = [
    "Machine Learning",
    "Deep Learning",
    "NLP & LLMs",
    "Computer Vision",
    "Reinforcement Learning",
    "Lab Automation",
    "Robotics & Embedded Systems",
    "Bioinformatics",
    "Software Engineering",
  ];
  const rank = (t) => {
    const i = THEME_ORDER.indexOf(t);
    return i === -1 ? THEME_ORDER.length : i;
  };
  const themes = [...new Set(projects.flatMap((p) => p.themes || []))].sort(
    (a, b) => rank(a) - rank(b) || a.localeCompare(b)
  );
  const buttons = [];

  const apply = (active) => {
    buttons.forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.tag === active))
    );
    grid.querySelectorAll(".card").forEach((card) => {
      const match =
        active === "all" || card.dataset.themes.split("|").includes(active);
      card.hidden = !match;
      // A card can be filtered back into view without ever having intersected,
      // so reveal it directly rather than leaving it at the animation's
      // starting opacity of 0.
      if (match) card.classList.add("reveal--in");
    });
  };

  // Cards sit below the fold, so reveal them as they come into view.
  // Without IntersectionObserver they are simply shown — never left hidden.
  const hidden = grid.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal--in");
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    hidden.forEach((card) => observer.observe(card));
  } else {
    hidden.forEach((card) => card.classList.add("reveal--in"));
  }

  // The cue belongs to the first screen only — retire it once you leave it
  const cue = document.querySelector("[data-cue]");
  if (cue) {
    const toggleCue = () =>
      cue.classList.toggle("cue--hidden", window.scrollY > 120);
    toggleCue();
    window.addEventListener("scroll", toggleCue, { passive: true });
  }

  ["all", ...themes].forEach((theme) => {
    const button = el("button", "filter", theme === "all" ? "All" : theme);
    button.type = "button";
    button.dataset.tag = theme;
    button.setAttribute("aria-pressed", String(theme === "all"));
    button.addEventListener("click", () => apply(theme));
    buttons.push(button);
    filters.append(button);
  });
})();
