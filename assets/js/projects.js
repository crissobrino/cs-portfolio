/*
  Add a project by appending one object to PROJECTS.
  `slug` becomes the URL: project.html?p=<slug>
  Images live in assets/img/<slug>/ — leave `images` empty to show placeholders.
*/

window.PROJECTS = [
  {
    slug: "placeholder-one",
    title: "Project title goes here",
    year: "2025",
    domain: "Data science",
    tags: ["Data science", "Python"],
    summary: "One sentence on what the project does and who it was for.",
    stack: ["Python", "pandas", "scikit-learn"],
    role: "Solo project",
    context: "University coursework",
    repo: "https://github.com/your-username/your-repo",
    sections: [
      {
        heading: "The problem",
        body: [
          "Two or three sentences on what needed solving and why it mattered. Written for someone who has never seen this domain before.",
        ],
      },
      {
        heading: "Approach",
        body: [
          "What you built and the decisions behind it. Name the tradeoff you made and why you made it that way.",
        ],
        list: [
          "A step, method, or component worth calling out",
          "Another one",
          "A third",
        ],
      },
      {
        heading: "Result",
        body: [
          "What came out of it. Numbers belong here if you have them — accuracy, runtime, cost, scale.",
        ],
      },
    ],
    images: [],
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
