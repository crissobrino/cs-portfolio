/*
  Add a project by appending one object to PROJECTS.
  `slug` becomes the URL: project.html?p=<slug>
  Images live in assets/img/<slug>/ — leave `images` empty to show placeholders.
*/

window.PROJECTS = [
  {
    slug: "alert-anomaly-detection",
    title: "Surfacing outbreaks buried in thousands of unreviewed health alerts",
    year: "2026",
    domain: "Data Science",
    tags: ["Data Science", "NLP", "Unsupervised Learning", "Anomaly Detection"],
    summary:
      "A hybrid unsupervised system that ranks public-health alerts by how unusual they are — catching outbreaks no single method would flag alone.",
    stack: [
      "Python",
      "sentence-transformers",
      "scikit-learn",
      "PyTorch",
      "SHAP",
      "Hugging Face Transformers",
      "SQL Server",
      "Power BI",
    ],
    role: "Solo project",
    context:
      "MSc thesis (Machine Learning for Health), built alongside full-time work as a health data scientist",
    repo: "",
    sections: [
      {
        heading: "The problem",
        body: [
          "Public health surveillance teams get more open-source alerts than they can manually review, most from informal, unverified sources. The bottleneck isn't collecting information anymore — it's knowing which of thousands of already-consolidated alerts deserve expert attention. Most existing NLP work in this space focuses on generating or filtering alerts, not ranking the ones that already exist.",
        ],
      },
      {
        heading: "Approach",
        body: [
          "Built an end-to-end pipeline: an ETL layer consolidated alert text, epidemiological data, geography, and timing into a structured data model, feeding both a Power BI dashboard and an unsupervised anomaly-ranking layer. No labeled 'priority' data existed for this, so the whole system is unsupervised.",
          "The ranking combined two independent signals, fused into a single hybrid score and cross-checked against WHO risk criteria using a zero-shot classifier:",
        ],
        list: [
          "A semantic track using multilingual sentence embeddings to flag alerts whose language was atypical for their disease category",
          "A structural track combining an Isolation Forest and an autoencoder over severity, spread, and recency features",
          "Zero-shot cross-check of the fused score against WHO risk criteria",
        ],
      },
      {
        heading: "Result",
        body: [
          "Applied to 2,282 real alerts over a six-month window, it surfaced 68 confirmed outbreaks that no single detector caught alone — including real cases of yellow fever, Lassa fever, and cholera.",
          "The two signal tracks turned out to be almost completely statistically independent (near-zero correlation), which is exactly why fusing them worked: it caught outbreaks that scored moderately, but never extremely, on any one method by itself. The pipeline also replaced a manual weekly compilation an analyst previously did by hand.",
        ],
      },
    ],
    images: [
      {
        src: "assets/img/alert-anomaly-detection/cover.jpg",
        alt: "Scatter plot comparing the semantic and structural anomaly scores across alerts",
        caption: "The two independent signal tracks, plotted against each other.",
      },
      {
        src: "assets/img/alert-anomaly-detection/result.jpg",
        alt: "Correlation heatmap showing the semantic and structural tracks are nearly uncorrelated",
        caption: "Near-zero correlation between tracks — why fusing them catches more.",
      },
    ],
  },
  {
    slug: "placeholder-two",
    title: "Second placeholder project",
    year: "2025",
    domain: "Software",
    tags: ["Software", "Web"],
    summary: "One sentence on what the project does and who it was for.",
    stack: ["TypeScript", "React", "PostgreSQL"],
    role: "Team of three",
    context: "Personal project",
    repo: "",
    sections: [
      {
        heading: "The problem",
        body: ["Placeholder copy — replace with the real story."],
      },
    ],
    images: [],
  },
  {
    slug: "placeholder-three",
    title: "Third placeholder project",
    year: "2024",
    domain: "Engineering",
    tags: ["Engineering", "Simulation"],
    summary: "One sentence on what the project does and who it was for.",
    stack: ["MATLAB", "Simulink"],
    role: "Solo project",
    context: "Final year project",
    repo: "",
    sections: [
      {
        heading: "The problem",
        body: ["Placeholder copy — replace with the real story."],
      },
    ],
    images: [],
  },
  {
    slug: "placeholder-four",
    title: "Fourth placeholder project",
    year: "2024",
    domain: "Data science",
    tags: ["Data science", "Visualisation"],
    summary: "One sentence on what the project does and who it was for.",
    stack: ["Python", "Plotly"],
    role: "Solo project",
    context: "Internship",
    repo: "",
    sections: [
      {
        heading: "The problem",
        body: ["Placeholder copy — replace with the real story."],
      },
    ],
    images: [],
  },
];
