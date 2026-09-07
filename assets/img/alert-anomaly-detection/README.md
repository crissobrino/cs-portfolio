Images for this project, already in place:

- `cover.png`    — system architecture: alerts split into Track A / Track B,
  fuse into a ranked score, then characterisation. First image in the
  gallery on the project page.
- `track-a.png`  — Track A diagram: embed alert text, cluster by disease,
  score by distance from the cluster centre. Shown inline in the Approach
  section.
- `track-b.png`  — Track B diagram: Isolation Forest + autoencoder over nine
  structural features, fused by percentile rank. Shown inline in the
  Approach section, under track-a.png.
- `scatter.png`  — Track A vs. Track B score scatter (only 23 of 2,282
  alerts scored highly on both). Second image in the gallery — also the
  designated source for a future project-card thumbnail, once that feature
  is built (no separate thumb file needed, reuse this one).
- `result.png`   — Spearman correlation heatmap across all scores, showing
  the semantic track is nearly uncorrelated with the structural sub-scores.
  Third image in the gallery.

Paths and captions are set in `assets/js/projects.js`. To swap an image,
replace the file here (same filename) or update the `src` there.
