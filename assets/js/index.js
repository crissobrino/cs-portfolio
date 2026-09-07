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

  projects.forEach((project, i) => {
    const card = el("a", "card reveal");
    card.href = `project.html?p=${encodeURIComponent(project.slug)}`;
    card.style.setProperty("--delay", `${Math.min(i * 60, 420)}ms`);
    card.dataset.tags = (project.tags || []).join("|");

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

    card.append(
      meta,
      el("h2", "card__title", project.title),
      el("p", "card__summary", project.summary),
      foot
    );
    grid.append(card);
  });

  const tags = [...new Set(projects.flatMap((p) => p.tags || []))].sort();
  const buttons = [];

  const apply = (active) => {
    buttons.forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.tag === active))
    );
    grid.querySelectorAll(".card").forEach((card) => {
      const match =
        active === "all" || card.dataset.tags.split("|").includes(active);
      card.classList.toggle("card--dimmed", !match);
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

  ["all", ...tags].forEach((tag) => {
    const button = el("button", "filter", tag === "all" ? "All" : tag);
    button.type = "button";
    button.dataset.tag = tag;
    button.setAttribute("aria-pressed", String(tag === "all"));
    button.addEventListener("click", () => apply(tag));
    buttons.push(button);
    filters.append(button);
  });
})();
