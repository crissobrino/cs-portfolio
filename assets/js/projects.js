/*
  Add a project by appending one object to PROJECTS.
  `slug` becomes the URL: project.html?p=<slug>
  Images live in assets/img/<slug>/ — leave `images` empty to show placeholders.
*/

window.PROJECTS = [
  {
    slug: "alert-anomaly-detection",
    title: "Anomaly detection for epidemiological alert prioritisation",
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
          "Built an end-to-end pipeline: an ETL layer consolidating alert text, epidemiological data, geography and timing into a structured data model, feeding both a Power BI dashboard and an unsupervised anomaly-ranking layer. No labelled 'priority' data exists for this task, so the whole system is unsupervised.",
          "The ranking combined two independent signals. Track A (semantic) embedded each alert's text and scored how far it sat from the centre of its disease cluster. Track B (structural) combined an Isolation Forest and an autoencoder over nine features covering severity, geographic spread and recent activity. The two scores were percentile-ranked and fused into a single hybrid ranking, then cross-checked against WHO risk criteria with a zero-shot classifier.",
        ],
        images: [
          {
            src: "assets/img/alert-anomaly-detection/track-a.png",
            alt: "Diagram of Track A: embedding alert text, clustering by disease, and scoring distance from the cluster centre",
            caption:
              "Track A — embed, cluster, then score each alert by its distance from its cluster centre.",
          },
          {
            src: "assets/img/alert-anomaly-detection/track-b.png",
            alt: "Diagram of Track B: an Isolation Forest and an autoencoder over nine structural features, fused by percentile rank",
            caption:
              "Track B — an Isolation Forest and an autoencoder over nine structural features, fused by percentile rank.",
          },
        ],
      },
      {
        heading: "Result",
        body: [
          "The two tracks turned out to catch almost entirely different alerts — of the 2,282 analysed, only 23 scored highly on both. That independence is the whole point: fusing them surfaced 68 confirmed outbreaks (yellow fever, Lassa fever, cholera) that scored moderately but never extremely on any single method, so no detector running alone would have flagged them.",
          "The pipeline also replaced a manual weekly compilation an analyst previously did by hand.",
        ],
      },
    ],
    images: [
      {
        src: "assets/img/alert-anomaly-detection/cover.png",
        alt: "System architecture diagram: alerts splitting into Track A and Track B, fusing into a ranked score, then characterisation",
        caption:
          "System architecture — alerts split into Track A and Track B, then fuse into a single ranked score.",
      },
      {
        src: "assets/img/alert-anomaly-detection/scatter.png",
        alt: "Scatter plot showing Track A and Track B scores are nearly uncorrelated across alerts",
        caption:
          "Each dot is an alert. Only 23 of 2,282 scored highly on both tracks — the two signals are almost independent.",
      },
      {
        src: "assets/img/alert-anomaly-detection/result.png",
        alt: "Correlation heatmap across the semantic score, structural sub-scores, zero-shot score, and the fused hybrid score",
        caption:
          "Spearman correlation across scores — the semantic track (score_A) barely correlates with the structural sub-scores, which is what fusing captures.",
      },
    ],
  },
  {
    slug: "diabetes-vae",
    title: "Multimodal VAEs for diabetes representation learning",
    year: "2026",
    domain: "Deep Learning",
    tags: [
      "Deep Learning",
      "Generative Models",
      "Representation Learning",
      "Health Data",
    ],
    summary:
      "Two variational autoencoders trained on 380,000 patient-days of continuous glucose data, testing whether adding insulin and wearable signals produces a better representation than glucose alone.",
    stack: ["Python", "PyTorch", "UMAP", "NumPy", "pandas"],
    role: "",
    context:
      "Coursework project for a Probabilistic & Generative ML course (MSc), data from MetaboNet, a public harmonised dataset consolidating 21 Type 1 diabetes clinical studies",
    repo: "https://github.com/crissobrino/diabetes-vae",
    sections: [
      {
        heading: "The problem",
        body: [
          "Diabetes care is assessed episodically — HbA1c, periodic clinical review — while a patient's metabolic state changes hour by hour. The question was whether unsupervised representation learning could organise patient-days by metabolic similarity without any clinical labels, and whether adding insulin and wearable physiology to glucose data produces a richer representation than glucose alone.",
        ],
      },
      {
        heading: "Approach",
        body: [
          "Built a CGM-only convolutional VAE as a baseline, then a multimodal VAE fusing three modalities — glucose, insulin, wearable physiology — through a Product-of-Experts layer, which combines per-modality posteriors into a single shared latent distribution and handles missing modalities natively. That mattered: wearable data existed for only a small subset of patients.",
          "Trained on 379,849 patient-days from 13 studies, evaluated on 69,894 held-out days across 305 patients. Posterior collapse was the main modelling difficulty, addressed with a 32-dimensional latent space, KL annealing, and a per-dimension free-bits threshold.",
        ],
      },
      {
        heading: "Result",
        body: [
          "Both models independently learned the same clinically interpretable axis: a single latent dimension correlating strongly with time-in-range and inversely with mean glucose, with no clinical labels used in training.",
          "But the multimodal model did not clearly beat the baseline. Patient-centroid distances aligned less well with glucose-derived clinical metrics (+0.448 vs +0.593 on time-in-range). Rather than claim a win, I diagnosed why: every evaluation metric was derived from CGM, so they structurally favoured the CGM-only model; and insulin reconstruction failed on sharp bolus events, because MSE loss rewards predicting a smooth average over sparse spikes.",
        ],
      },
      {
        heading: "What the loss curves didn't show",
        body: [
          "Several early models had healthy-looking train and validation curves while being quietly broken. None of it showed up in the loss curves — catching it meant inspecting reconstructed traces, per-dimension KL values, and latent structure directly.",
        ],
        list: [
          "One decoder reconstructed only the first few hours of each day",
          "One checkpoint was selected before the KL term activated, giving good reconstruction loss but an unregularised latent space",
          "The insulin encoder was partly responding to a normalisation artefact",
        ],
      },
    ],
    images: [
      {
        src: "assets/img/diabetes-vae/cover.jpg",
        alt: "Product-of-Experts architecture: three encoders fusing into one shared latent distribution, then three decoders",
        caption:
          "Product-of-Experts architecture — three encoders fuse into one shared latent, then three decoders reconstruct each modality.",
      },
    ],
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
