const AXES = {
  freedom: {
    label: "Freedom",
    short: "Freedom",
    color: "#307cff",
    vertex: { x: 548, y: 98 },
    note: "Individual, exit, trade",
    summary: "Do not make me a tool of society.",
    blindSpot: "May underweight unequal starting power, dependency, and the institutions that make voluntary choice possible."
  },
  equality: {
    label: "Equality",
    short: "Equality",
    color: "#e04432",
    vertex: { x: 82, y: 310 },
    note: "Moral standing, care",
    summary: "Do not let society divide people into masters and dependents.",
    blindSpot: "May underweight exit, excellence, pluralism, and the danger of care becoming control."
  },
  stability: {
    label: "Stability",
    short: "Stability",
    color: "#38a657",
    vertex: { x: 548, y: 522 },
    note: "Order, duty, continuity",
    summary: "Do not dissolve the order that lets a people survive.",
    blindSpot: "May underweight dissent, renewal, and the living people harmed when order protects itself."
  }
};

const VECTOR_ORDER = ["equality", "stability", "freedom"];
const DISPLAY_ORDER = ["freedom", "equality", "stability"];
const ANSWER_VALUES = [
  { value: -2, label: "Strongly oppose" },
  { value: -1, label: "Oppose" },
  { value: 0, label: "Unsure" },
  { value: 1, label: "Support" },
  { value: 2, label: "Strongly support" }
];
const QUIZ_PROGRESS_COOKIE_PREFIX = "prism-quiz-";
const QUIZ_PROGRESS_MAX_AGE = 60 * 60 * 24 * 180;
const EDITOR_STORAGE_KEY = "prism-editor-draft";
const EDITOR_EXPORT_SIZE = { width: 1400, height: 1400 };
const EDITOR_EXPORT_URL = "https://redeemedspoon.github.io/Political-Prism-Test";
const TRIANGLE_WASH_COLORS = {
  equality: [255, 45, 34],
  freedom: [48, 124, 255],
  stability: [40, 214, 92]
};
const EDITOR_DEFAULT_DRAFT = {
  title: "Custom Political Prism",
  subtitle: "Freedom, Equality, and Stability as a three-way coordinate.",
  exportDark: false,
  axes: {
    freedom: { label: AXES.freedom.label, note: AXES.freedom.note },
    equality: { label: AXES.equality.label, note: AXES.equality.note },
    stability: { label: AXES.stability.label, note: AXES.stability.note }
  },
  points: []
};

const LAYERS = {
  virtues: {
    eyebrow: "Virtues Layer",
    title: "Freedom, Equality, Stability",
    description: "The philosophical layer. Each pole is a real civic good, and the model begins when the goods demand different sacrifices.",
    points: [
      { id: "freedom-virtue", label: "Freedom", tone: "freedom", weights: { freedom: 0.92, equality: 0.04, stability: 0.04 }, dx: -64, dy: 20, text: "The individual is morally prior to the group. Agency, exit, ownership, speech, association, sexuality, contract, risk, and refusal matter most." },
      { id: "equality-virtue", label: "Equality", tone: "equality", weights: { freedom: 0.04, equality: 0.92, stability: 0.04 }, dx: 20, dy: 20, text: "People should meet as moral equals, not as masters and dependents. Fairness, dignity, anti-domination, and social provision matter most." },
      { id: "stability-virtue", label: "Stability", tone: "stability", weights: { freedom: 0.04, equality: 0.04, stability: 0.92 }, dx: -58, dy: -36, text: "Society is a collective body that must survive across time. Continuity, office, rank, borders, memory, and coordination matter most." },
      { id: "voluntary-exchange", label: "Voluntary exchange", tone: "freedom", weights: { freedom: 0.66, equality: 0.18, stability: 0.16 }, dx: -116, dy: -10, text: "Freedom's social logic: trade, contract, consent, competition, property, markets, and rule of law." },
      { id: "family-care", label: "Family and care", tone: "equality", weights: { freedom: 0.18, equality: 0.64, stability: 0.18 }, dx: 18, dy: -12, text: "Equality's social logic: sharing, mutual obligation, protection, moral inclusion, redistribution, and compassion." },
      { id: "command-continuity", label: "Command and continuity", tone: "stability", weights: { freedom: 0.18, equality: 0.18, stability: 0.64 }, dx: -88, dy: -22, text: "Stability's social logic: hierarchy, office, rank, law, bureaucracy, military structure, and collective discipline." }
    ]
  },
  units: {
    eyebrow: "Units and Coordination Systems",
    title: "Individual, Community, Collective Body",
    description: "The anthropological layer. Each pole imagines society from a different unit of concern and a different coordination system.",
    points: [
      { id: "individual", label: "Individual", tone: "freedom", weights: { freedom: 0.9, equality: 0.05, stability: 0.05 }, dx: -70, dy: 20, text: "The person as chooser, owner, speaker, trader, dissenter, and bearer of rights." },
      { id: "community", label: "Community", tone: "equality", weights: { freedom: 0.05, equality: 0.9, stability: 0.05 }, dx: 18, dy: 20, text: "The person as member of a moral community, entitled to dignity, care, and protection from domination." },
      { id: "collective-body", label: "Collective Body", tone: "stability", weights: { freedom: 0.05, equality: 0.05, stability: 0.9 }, dx: -86, dy: -36, text: "The society as a body with memory, offices, borders, discipline, identity, and long-term survival needs." },
      { id: "trade", label: "Trade", tone: "freedom", weights: { freedom: 0.7, equality: 0.15, stability: 0.15 }, dx: -52, dy: -20, text: "Exchange and contract coordinate strangers without making them one family or one command structure." },
      { id: "mutual-obligation", label: "Mutual obligation", tone: "equality", weights: { freedom: 0.18, equality: 0.62, stability: 0.2 }, dx: 18, dy: -10, text: "Care and reciprocity bind people through shared standing and protection against dependence." },
      { id: "institution", label: "Institution", tone: "stability", weights: { freedom: 0.17, equality: 0.23, stability: 0.6 }, dx: -66, dy: -22, text: "Offices and rules preserve memory, authority, and coordination beyond any single person." }
    ]
  },
  ideologies: {
    eyebrow: "Ideologies Layer",
    title: "Political systems as mixtures",
    description: "Ideologies are placed as approximate mixtures of the three virtues. The point is orientation, not final taxonomy.",
    points: [
      { id: "ancap", label: "Anarcho-capitalism", tone: "freedom", weights: { freedom: 0.9, equality: 0.04, stability: 0.06 }, dx: -138, dy: 18, text: "Freedom radicalized toward private order, exit, property, and market coordination." },
      { id: "libertarianism", label: "Libertarianism", tone: "freedom", weights: { freedom: 0.76, equality: 0.09, stability: 0.15 }, dx: -112, dy: -12, text: "Freedom with minimal enforced equality and a deliberately narrow state." },
      { id: "liberalism", label: "Liberalism", tone: "freedom", weights: { freedom: 0.45, equality: 0.32, stability: 0.23 }, dx: -104, dy: 14, text: "Freedom balanced with legal equality, pluralism, rights, and institutional constraint." },
      { id: "republicanism", label: "Republicanism", tone: "stability", weights: { freedom: 0.43, equality: 0.22, stability: 0.35 }, dx: -110, dy: -26, text: "Freedom joined to civic duty, public virtue, and resistance to domination by private or public masters." },
      { id: "social-democracy", label: "Social democracy", tone: "equality", weights: { freedom: 0.26, equality: 0.52, stability: 0.22 }, dx: 18, dy: -6, text: "Equality pursued through welfare, labor power, and democratic institutions while preserving pluralism and markets." },
      { id: "marx-leninism", label: "Marx-Leninism", tone: "equality", weights: { freedom: 0.05, equality: 0.68, stability: 0.27 }, dx: 18, dy: 4, text: "Equality radicalized through party, state, and centralized enforcement." },
      { id: "conservatism", label: "Conservatism", tone: "stability", weights: { freedom: 0.27, equality: 0.13, stability: 0.6 }, dx: -122, dy: -18, text: "Stability with room for property, local order, inherited institutions, and gradual reform." },
      { id: "nationalism", label: "Nationalism", tone: "stability", weights: { freedom: 0.14, equality: 0.25, stability: 0.61 }, dx: 18, dy: -18, text: "Stability through shared peoplehood, borders, loyalty, and collective identity." },
      { id: "monarchy", label: "Monarchy", tone: "stability", weights: { freedom: 0.12, equality: 0.08, stability: 0.8 }, dx: -88, dy: -24, text: "Stability through inherited hierarchy, continuity, office, and symbolic unity." },
      { id: "fascism", label: "Fascism", tone: "stability", weights: { freedom: 0.03, equality: 0.12, stability: 0.85 }, dx: 16, dy: -36, text: "The collective body and command principle taken into domination." }
    ]
  },
  figures: {
    eyebrow: "Historical and Modern Figures",
    title: "Approximate reference points",
    description: "These placements orient different traditions. They are not endorsements, rankings, or final judgments.",
    points: [
      { id: "locke", label: "John Locke", tone: "freedom", weights: { freedom: 0.7, equality: 0.15, stability: 0.15 }, dx: -92, dy: -8, text: "Natural rights, property, consent, and limited government near the Freedom pole." },
      { id: "smith", label: "Adam Smith", tone: "freedom", weights: { freedom: 0.65, equality: 0.18, stability: 0.17 }, dx: -96, dy: 18, text: "Commercial society and voluntary exchange, tempered by moral sentiment and law." },
      { id: "mill", label: "J. S. Mill", tone: "freedom", weights: { freedom: 0.68, equality: 0.2, stability: 0.12 }, dx: -80, dy: -34, text: "Individuality, speech, experiments in living, and liberty against social coercion." },
      { id: "friedman", label: "Milton Friedman", tone: "freedom", weights: { freedom: 0.76, equality: 0.08, stability: 0.16 }, dx: -112, dy: 20, text: "Market freedom, limited state action, and suspicion of enforced provision." },
      { id: "marx", label: "Karl Marx", tone: "equality", weights: { freedom: 0.12, equality: 0.72, stability: 0.16 }, dx: 16, dy: -30, text: "Anti-domination through class analysis, social ownership, and equality against capital." },
      { id: "lenin", label: "Vladimir Lenin", tone: "equality", weights: { freedom: 0.04, equality: 0.62, stability: 0.34 }, dx: 18, dy: -2, text: "Revolutionary equality joined to party command and state capacity." },
      { id: "mandela", label: "Nelson Mandela", tone: "equality", weights: { freedom: 0.35, equality: 0.48, stability: 0.17 }, dx: 18, dy: 22, text: "Anti-caste equality, civic reconciliation, and constitutional pluralism." },
      { id: "fdr", label: "F. D. Roosevelt", tone: "equality", weights: { freedom: 0.3, equality: 0.45, stability: 0.25 }, dx: -106, dy: -20, text: "Social provision and economic security within a durable democratic state." },
      { id: "burke", label: "Edmund Burke", tone: "stability", weights: { freedom: 0.28, equality: 0.12, stability: 0.6 }, dx: -112, dy: -22, text: "Institutional memory, inheritance, gradualism, and skepticism toward abstract rupture." },
      { id: "confucius", label: "Confucius", tone: "stability", weights: { freedom: 0.12, equality: 0.25, stability: 0.63 }, dx: 18, dy: -22, text: "Ritual, hierarchy, duty, cultivated order, and relational moral obligation." },
      { id: "bismarck", label: "Otto von Bismarck", tone: "stability", weights: { freedom: 0.16, equality: 0.26, stability: 0.58 }, dx: 18, dy: 10, text: "State capacity, national consolidation, and welfare as social integration." },
      { id: "lee", label: "Lee Kuan Yew", tone: "stability", weights: { freedom: 0.18, equality: 0.2, stability: 0.62 }, dx: -110, dy: -2, text: "Order, development, administrative competence, and collective discipline." },
      { id: "louis", label: "Louis XIV", tone: "stability", weights: { freedom: 0.05, equality: 0.06, stability: 0.89 }, dx: -76, dy: -36, text: "Absolutist monarchy and concentrated royal authority near the Stability pole." }
    ]
  }
};

const RESULT_NAMES = {
  freedom: { equality: "Liberal Egalitarian", stability: "Ordered Liberty" },
  equality: { freedom: "Emancipatory Egalitarian", stability: "Institutional Egalitarian" },
  stability: { freedom: "Conservative Liberal", equality: "Communitarian Order" }
};

const RESULT_AXIS_DETAILS = {
  freedom: {
    question: "What can the individual do?",
    subject: "the individual as chooser, owner, speaker, trader, dissenter, and bearer of rights",
    socialLogic: "voluntary exchange: consent, contract, property, competition, markets, and rule of law",
    fear: "being absorbed into a collective purpose that treats personal agency as expendable",
    first: "Your first political reflex is to keep the person from becoming a tool of society. When a question forces a tradeoff, you usually begin by asking whether people retain exit, ownership, speech, association, refusal, and room for self-direction.",
    second: "As a secondary virtue, Freedom still matters, but it functions more as a limit on how far care or order may go. You may accept social provision or hierarchy, but you resist arrangements that remove choice entirely.",
    sacrificed: "When Freedom is your sacrificed pole, your answers show a willingness to limit exit, private choice, market freedom, or individual refusal when another civic good seems more urgent.",
    compass: "You read politics from the individual outward: society is legitimate when people can act, dissent, trade, refuse, and leave.",
    warning: "Freedom without balancing forces can fragment into oligarchy, predation, weak solidarity, and formal choice that leaves the weak exposed to the strong."
  },
  equality: {
    question: "What is the individual's standing among others?",
    subject: "the person as a member of a moral community, protected from domination and inherited dependence",
    socialLogic: "family and care: sharing, mutual obligation, moral inclusion, redistribution, compassion, and protection",
    fear: "domination by wealth, birth, class, race, tribe, market power, inheritance, or private hierarchy",
    first: "Your first political reflex is to prevent society from dividing people into masters and dependents. When values collide, you usually ask who is being dominated, who begins with inherited advantage, and whether people meet each other as moral equals.",
    second: "As a secondary virtue, Equality remains a strong corrective. You may allow markets, hierarchy, or inherited institutions, but you expect them to justify themselves before the claims of dignity and anti-domination.",
    sacrificed: "When Equality is your sacrificed pole, your answers show a willingness to tolerate unequal outcomes, rank, inherited structure, or different social standing when Freedom or Stability seems more important.",
    compass: "You read politics through standing: a society is legitimate when people are not reduced to dependents, servants, castes, or disposable outsiders.",
    warning: "Equality without balancing forces can become enforced sameness, dependency, moral coercion, suppression of excellence, and care that hardens into control."
  },
  stability: {
    question: "What can society preserve, coordinate, and become?",
    subject: "society as a collective body with memory, institutions, borders, offices, duties, and long-term survival needs",
    socialLogic: "command and continuity: hierarchy, office, law, bureaucracy, military discipline, borders, rank, and inherited structure",
    fear: "collapse, chaos, rootlessness, decadence, civil fragmentation, and loss of the ability to act as one people",
    first: "Your first political reflex is to protect the order that lets a society survive across time. When a tradeoff appears, you usually ask whether institutions, continuity, duty, borders, social trust, and collective capacity will endure.",
    second: "As a secondary virtue, Stability gives your politics a concern for consequences and durability. You may support liberty or equality, but you prefer reforms that preserve institutional memory and social coherence.",
    sacrificed: "When Stability is your sacrificed pole, your answers show a willingness to disrupt order, weaken inherited authority, or accept institutional instability when Freedom or Equality seems morally necessary.",
    compass: "You read politics historically: a society is not only a set of individuals or equal claimants, but a body that must coordinate, remember, and survive.",
    warning: "Stability without balancing forces can become tyranny, caste, stagnation, corruption, repression, and sacrifice of living people to the system."
  }
};

const RESULT_DOMAINS = [
  {
    id: "economics",
    label: "Economics",
    keywords: ["market", "corporate", "property", "labor", "wage", "monopoly", "bailout", "protectionism", "financial", "tax", "licensing", "developer"]
  },
  {
    id: "personal_autonomy",
    label: "Personal autonomy",
    keywords: ["speech", "body", "bodily", "medicine", "drug", "personal", "optout", "risk"]
  },
  {
    id: "welfare",
    label: "Welfare and provision",
    keywords: ["welfare", "housing", "utility", "health", "school", "transit", "educational", "infrastructure equity", "universal provision"]
  },
  {
    id: "institutions",
    label: "Institutions and order",
    keywords: ["institution", "bureaucracy", "justice", "security", "law", "merit", "fiscal", "infrastructure", "public order", "systemic"]
  },
  {
    id: "culture",
    label: "Culture and belonging",
    keywords: ["tradition", "assimilation", "community", "zoning", "loyalty", "protest", "noise", "cultural", "generational"]
  }
];

const state = {
  questions: [],
  byId: new Map(),
  seed: "",
  order: [],
  index: 0,
  answers: {},
  activeView: "virtues",
  selectedPointId: null,
  lastResult: null,
  editor: {
    draft: null,
    selectedPointId: null
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const els = {
  triangleCanvas: $("#triangleCanvas"),
  layerEyebrow: $("#layerEyebrow"),
  layerTitle: $("#layerTitle"),
  layerDescription: $("#layerDescription"),
  selectedPoint: $("#selectedPoint"),
  pointList: $("#pointList"),
  viewTabs: $$("[data-view]"),
  questionCounter: $("#questionCounter"),
  answeredCounter: $("#answeredCounter"),
  seedBadge: $("#seedBadge"),
  progressFill: $("#progressFill"),
  questionCategory: $("#questionCategory"),
  questionText: $("#questionText"),
  answerScale: $("#answerScale"),
  prevQuestion: $("#prevQuestion"),
  nextQuestion: $("#nextQuestion"),
  quizStatus: $("#quizStatus"),
  resultSummary: $("#resultSummary"),
  resultOverview: $("#resultOverview"),
  resultBars: $("#resultBars"),
  resultReading: $("#resultReading"),
  copyResultLink: $("#copyResultLink"),
  resumeQuiz: $("#resumeQuiz"),
  selectionConnector: $("#selectionConnector"),
  editorCanvas: $("#editorCanvas"),
  editorTitleInput: $("#editorTitleInput"),
  editorSubtitleInput: $("#editorSubtitleInput"),
  editorAxisSelect: $("#editorAxisSelect"),
  editorAxisLabel: $("#editorAxisLabel"),
  editorAxisNote: $("#editorAxisNote"),
  editorExportDarkMode: $("#editorExportDarkMode"),
  editorPointLabel: $("#editorPointLabel"),
  editorPointTone: $("#editorPointTone"),
  editorPointList: $("#editorPointList"),
  editorPointCount: $("#editorPointCount"),
  editorStatus: $("#editorStatus"),
  addEditorPoint: $("#addEditorPoint"),
  removeEditorPoint: $("#removeEditorPoint"),
  clearEditorDraft: $("#clearEditorDraft"),
  exportEditorPng: $("#exportEditorPng")
};

init();

async function init() {
  initTheme();
  initHeroPrismMap();
  initTriangle();

  const page = document.body.dataset.page || "home";
  if (page === "quiz") {
    await loadQuestions();
    initQuizPage();
  }
  if (page === "results") {
    await loadQuestions();
    initResultsPage();
  }
  if (page === "editor") {
    initEditor();
  }
}

function initHeroPrismMap() {
  const canvas = document.querySelector("[data-prism-map]");
  if (!canvas?.getContext) return;

  const width = Number(canvas.getAttribute("width")) || 410;
  const height = Number(canvas.getAttribute("height")) || 486;
  const scale = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);

  const ctx = canvas.getContext("2d");
  const image = ctx.createImageData(canvas.width, canvas.height);
  const vertices = {
    equality: { x: 0, y: height * 0.54878 },
    freedom: { x: width, y: 0 },
    stability: { x: width, y: height }
  };
  const colors = {
    equality: [255, 45, 34],
    freedom: [48, 124, 255],
    stability: [40, 214, 92]
  };
  const denominator =
    (vertices.freedom.y - vertices.stability.y) * (vertices.equality.x - vertices.stability.x) +
    (vertices.stability.x - vertices.freedom.x) * (vertices.equality.y - vertices.stability.y);

  for (let pixelY = 0; pixelY < canvas.height; pixelY += 1) {
    for (let pixelX = 0; pixelX < canvas.width; pixelX += 1) {
      const x = (pixelX + 0.5) / scale;
      const y = (pixelY + 0.5) / scale;
      const equality =
        ((vertices.freedom.y - vertices.stability.y) * (x - vertices.stability.x) +
          (vertices.stability.x - vertices.freedom.x) * (y - vertices.stability.y)) / denominator;
      const freedom =
        ((vertices.stability.y - vertices.equality.y) * (x - vertices.stability.x) +
          (vertices.equality.x - vertices.stability.x) * (y - vertices.stability.y)) / denominator;
      const stability = 1 - equality - freedom;
      const index = (pixelY * canvas.width + pixelX) * 4;

      if (equality < -0.002 || freedom < -0.002 || stability < -0.002) {
        image.data[index + 3] = 0;
        continue;
      }

      let red = equality * colors.equality[0] + freedom * colors.freedom[0] + stability * colors.stability[0];
      let green = equality * colors.equality[1] + freedom * colors.freedom[1] + stability * colors.stability[1];
      let blue = equality * colors.equality[2] + freedom * colors.freedom[2] + stability * colors.stability[2];
      const average = (red + green + blue) / 3;
      red = average + (red - average) * 1.28;
      green = average + (green - average) * 1.28;
      blue = average + (blue - average) * 1.28;

      image.data[index] = Math.max(0, Math.min(255, Math.round(red)));
      image.data[index + 1] = Math.max(0, Math.min(255, Math.round(green)));
      image.data[index + 2] = Math.max(0, Math.min(255, Math.round(blue)));
      image.data[index + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
}

function initTheme() {
  const stored = localStorage.getItem("prism-theme");
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const theme = stored || (prefersDark ? "dark" : "light");
  setTheme(theme);

  $$("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("prism-theme", next);
      setTheme(next);
    });
  });

}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme === "dark" ? "dark" : "light";
  const isDark = document.documentElement.dataset.theme === "dark";
  $$("[data-theme-toggle]").forEach((button) => {
    button.setAttribute("aria-pressed", String(isDark));
  });
}

async function loadQuestions() {
  try {
    const response = await fetch("questions.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const questions = await response.json();
    state.questions = questions.slice().sort((a, b) => Number(a.id) - Number(b.id));
    state.byId = new Map(state.questions.map((question) => [String(question.id), question]));
  } catch (error) {
    setStatus("Questions could not be loaded.");
    console.error(error);
  }
}

function initTriangle() {
  if (!els.triangleCanvas) return;
  els.viewTabs.forEach((button) => {
    button.addEventListener("click", () => renderLayer(button.dataset.view));
  });
  window.addEventListener("resize", () => {
    const point = currentLayerPoint();
    if (point) renderSelectionConnector(point);
  });
  renderLayer(document.body.dataset.page === "results" ? "virtues" : "units");
}

function initEditor() {
  if (!els.editorCanvas) return;

  state.editor.draft = readEditorDraft();
  state.editor.selectedPointId = state.editor.draft.points[0]?.id || null;
  bindEditorEvents();
  renderEditor();
}

function bindEditorEvents() {
  els.addEditorPoint?.addEventListener("click", () => {
    const point = createEditorPoint();
    state.editor.draft.points.push(point);
    state.editor.selectedPointId = point.id;
    persistEditorDraft();
    renderEditor();
    setEditorStatus("Point added.");
  });

  els.removeEditorPoint?.addEventListener("click", () => {
    const point = selectedEditorPoint();
    if (!point) return;
    state.editor.draft.points = state.editor.draft.points.filter((candidate) => candidate.id !== point.id);
    state.editor.selectedPointId = state.editor.draft.points[0]?.id || null;
    persistEditorDraft();
    renderEditor();
    setEditorStatus("Point removed.");
  });

  els.clearEditorDraft?.addEventListener("click", () => {
    if (!window.confirm("Clear the current prism draft?")) return;
    state.editor.draft = cloneEditorDefaultDraft();
    state.editor.selectedPointId = null;
    persistEditorDraft();
    renderEditor();
    setEditorStatus("Draft cleared.");
  });

  els.exportEditorPng?.addEventListener("click", () => {
    exportEditorPng();
  });

  els.editorTitleInput?.addEventListener("input", () => {
    state.editor.draft.title = els.editorTitleInput.value;
    persistEditorDraft();
    renderEditorTriangle();
  });

  els.editorSubtitleInput?.addEventListener("input", () => {
    state.editor.draft.subtitle = els.editorSubtitleInput.value;
    persistEditorDraft();
    renderEditorTriangle();
  });

  els.editorExportDarkMode?.addEventListener("change", () => {
    state.editor.draft.exportDark = Boolean(els.editorExportDarkMode.checked);
    persistEditorDraft();
    setEditorStatus(state.editor.draft.exportDark ? "Dark export enabled." : "Light export enabled.");
  });

  els.editorAxisSelect?.addEventListener("change", () => {
    renderEditorForm();
  });

  els.editorAxisLabel?.addEventListener("input", () => {
    const axis = selectedEditorAxis();
    if (!axis) return;
    state.editor.draft.axes[axis].label = els.editorAxisLabel.value;
    persistEditorDraft();
    renderEditorTriangle();
  });

  els.editorAxisNote?.addEventListener("input", () => {
    const axis = selectedEditorAxis();
    if (!axis) return;
    state.editor.draft.axes[axis].note = els.editorAxisNote.value;
    persistEditorDraft();
    renderEditorTriangle();
  });

  els.editorPointLabel?.addEventListener("input", () => {
    const point = selectedEditorPoint();
    if (!point) return;
    point.label = els.editorPointLabel.value;
    persistEditorDraft();
    renderEditorTriangle();
    renderEditorPointList();
  });

  els.editorPointTone?.addEventListener("change", () => {
    const point = selectedEditorPoint();
    if (!point) return;
    point.tone = sanitizeEditorTone(els.editorPointTone.value);
    persistEditorDraft();
    renderEditorTriangle();
    renderEditorPointList();
  });
}

function renderEditor() {
  renderEditorForm();
  renderEditorTriangle();
  renderEditorPointList();
}

function renderEditorForm() {
  const draft = state.editor.draft || cloneEditorDefaultDraft();
  const point = selectedEditorPoint();

  if (els.editorTitleInput) els.editorTitleInput.value = draft.title;
  if (els.editorSubtitleInput) els.editorSubtitleInput.value = draft.subtitle;
  if (els.editorExportDarkMode) els.editorExportDarkMode.checked = Boolean(draft.exportDark);
  const axis = selectedEditorAxis() || "freedom";
  const axisData = getEditorAxisData(axis);
  if (els.editorAxisSelect) els.editorAxisSelect.value = axis;
  if (els.editorAxisLabel) els.editorAxisLabel.value = axisData.label;
  if (els.editorAxisNote) els.editorAxisNote.value = axisData.note;
  if (els.editorPointCount) {
    const count = draft.points.length;
    els.editorPointCount.textContent = `${count} ${count === 1 ? "point" : "points"}`;
  }

  [els.editorPointLabel, els.editorPointTone, els.removeEditorPoint].forEach((control) => {
    if (control) control.disabled = !point;
  });

  if (els.editorPointLabel) els.editorPointLabel.value = point?.label || "";
  if (els.editorPointTone) els.editorPointTone.value = point?.tone || "freedom";
}

function renderEditorTriangle() {
  if (!els.editorCanvas || !state.editor.draft) return;

  const width = 620;
  const height = 620;
  const verticesByAxis = DISPLAY_ORDER.reduce((collection, axis) => {
    collection[axis] = AXES[axis].vertex;
    return collection;
  }, {});
  const vertices = DISPLAY_ORDER.map((axis) => verticesByAxis[axis]);
  const nodes = state.editor.draft.points.map((point) => renderEditorSvgNode(point)).join("");

  els.editorCanvas.innerHTML = `
    <canvas class="tri-gradient-canvas" width="${width}" height="${height}" data-editor-gradient aria-hidden="true"></canvas>
    <div class="editor-canvas-copy" aria-hidden="true">
      <p>${escapeHtml(state.editor.draft.title || "Custom Political Prism")}</p>
      <span>${escapeHtml(state.editor.draft.subtitle || "")}</span>
    </div>
    <svg class="editor-triangle-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Editable Political Prism triangle">
      <defs>
        <linearGradient id="editorEdgeEqualityFreedom" x1="${verticesByAxis.equality.x}" y1="${verticesByAxis.equality.y}" x2="${verticesByAxis.freedom.x}" y2="${verticesByAxis.freedom.y}" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="${AXES.equality.color}"></stop>
          <stop offset="100%" stop-color="${AXES.freedom.color}"></stop>
        </linearGradient>
        <linearGradient id="editorEdgeFreedomStability" x1="${verticesByAxis.freedom.x}" y1="${verticesByAxis.freedom.y}" x2="${verticesByAxis.stability.x}" y2="${verticesByAxis.stability.y}" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="${AXES.freedom.color}"></stop>
          <stop offset="100%" stop-color="${AXES.stability.color}"></stop>
        </linearGradient>
        <linearGradient id="editorEdgeEqualityStability" x1="${verticesByAxis.equality.x}" y1="${verticesByAxis.equality.y}" x2="${verticesByAxis.stability.x}" y2="${verticesByAxis.stability.y}" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="${AXES.equality.color}"></stop>
          <stop offset="100%" stop-color="${AXES.stability.color}"></stop>
        </linearGradient>
        <filter id="edgeGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur"></feGaussianBlur>
          <feMerge>
            <feMergeNode in="blur"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
        <filter id="nodeGlow" x="-160%" y="-160%" width="420%" height="420%">
          <feGaussianBlur stdDeviation="7" result="blur"></feGaussianBlur>
          <feMerge>
            <feMergeNode in="blur"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
      </defs>
      <rect class="editor-hit-surface" width="${width}" height="${height}" fill="transparent"></rect>
      ${buildGridLines()}
      <line class="tri-edge" x1="${verticesByAxis.equality.x}" y1="${verticesByAxis.equality.y}" x2="${verticesByAxis.freedom.x}" y2="${verticesByAxis.freedom.y}" stroke="url(#editorEdgeEqualityFreedom)"></line>
      <line class="tri-edge" x1="${verticesByAxis.freedom.x}" y1="${verticesByAxis.freedom.y}" x2="${verticesByAxis.stability.x}" y2="${verticesByAxis.stability.y}" stroke="url(#editorEdgeFreedomStability)"></line>
      <line class="tri-edge" x1="${verticesByAxis.equality.x}" y1="${verticesByAxis.equality.y}" x2="${verticesByAxis.stability.x}" y2="${verticesByAxis.stability.y}" stroke="url(#editorEdgeEqualityStability)"></line>
      <polygon class="tri-boundary" points="${pointsAttr(vertices)}"></polygon>
      ${renderAxisLabels(state.editor.draft.axes)}
      ${nodes}
    </svg>
  `;

  drawTriangleGradient(els.editorCanvas.querySelector("[data-editor-gradient]"), verticesByAxis);

  const svg = els.editorCanvas.querySelector(".editor-triangle-svg");
  svg?.addEventListener("pointerdown", handleEditorCanvasPointer);
  els.editorCanvas.querySelectorAll(".editor-tri-node").forEach((node) => {
    const id = node.dataset.point;
    node.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
      selectEditorPoint(id);
    });
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectEditorPoint(id);
      }
    });
  });
}

function renderEditorSvgNode(point) {
  const position = pointFromWeights(point.weights);
  const selected = point.id === state.editor.selectedPointId ? " is-selected" : "";
  const color = AXES[point.tone]?.color || AXES.freedom.color;

  return `
    <g class="tri-node editor-tri-node${selected}" data-point="${point.id}" tabindex="0" role="button" aria-label="${escapeHtml(point.label || "Point")}" transform="translate(${position.x} ${position.y})">
      ${renderDot(color)}
      ${renderSvgLabel(point.label || "Point")}
    </g>
  `;
}

function renderEditorPointList() {
  if (!els.editorPointList || !state.editor.draft) return;
  const points = state.editor.draft.points;
  if (!points.length) {
    els.editorPointList.innerHTML = `<p class="empty-editor-list">No points</p>`;
    return;
  }

  els.editorPointList.innerHTML = points.map((point) => `
    <button type="button" class="${point.id === state.editor.selectedPointId ? "is-selected" : ""}" data-point="${point.id}">
      <span>${escapeHtml(point.label || "Point")}</span>
      <small>${escapeHtml(AXES[point.tone]?.label || "Freedom")}</small>
    </button>
  `).join("");

  els.editorPointList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => selectEditorPoint(button.dataset.point));
  });
}

function handleEditorCanvasPointer(event) {
  const weights = editorWeightsFromEvent(event);
  if (!weights) return;

  let point = selectedEditorPoint();
  if (!point) {
    point = createEditorPoint(weights);
    state.editor.draft.points.push(point);
    state.editor.selectedPointId = point.id;
  } else {
    point.weights = weights;
  }

  persistEditorDraft();
  renderEditor();
  setEditorStatus("Draft saved.");
}

function editorWeightsFromEvent(event) {
  const svg = event.currentTarget;
  const rect = svg.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  const point = {
    x: ((event.clientX - rect.left) / rect.width) * 620,
    y: ((event.clientY - rect.top) / rect.height) * 620
  };
  const weights = weightsFromPoint(point);
  return weightsAreInsideTriangle(weights) ? normalizeEditorWeights(weights) : null;
}

function weightsFromPoint(point) {
  const vertices = {
    equality: AXES.equality.vertex,
    freedom: AXES.freedom.vertex,
    stability: AXES.stability.vertex
  };
  const denominator =
    (vertices.freedom.y - vertices.stability.y) * (vertices.equality.x - vertices.stability.x) +
    (vertices.stability.x - vertices.freedom.x) * (vertices.equality.y - vertices.stability.y);
  const equality =
    ((vertices.freedom.y - vertices.stability.y) * (point.x - vertices.stability.x) +
      (vertices.stability.x - vertices.freedom.x) * (point.y - vertices.stability.y)) / denominator;
  const freedom =
    ((vertices.stability.y - vertices.equality.y) * (point.x - vertices.stability.x) +
      (vertices.equality.x - vertices.stability.x) * (point.y - vertices.stability.y)) / denominator;
  const stability = 1 - equality - freedom;

  return { freedom, equality, stability };
}

function weightsAreInsideTriangle(weights) {
  return DISPLAY_ORDER.every((axis) => weights[axis] >= -0.002 && weights[axis] <= 1.002);
}

function selectedEditorPoint() {
  const points = state.editor.draft?.points || [];
  return points.find((point) => point.id === state.editor.selectedPointId);
}

function selectedEditorAxis() {
  const axis = els.editorAxisSelect?.value || "freedom";
  return DISPLAY_ORDER.includes(axis) ? axis : "freedom";
}

function getEditorAxisData(axis) {
  return getAxisDisplay(axis, state.editor.draft?.axes);
}

function getAxisDisplay(axis, axes) {
  const base = AXES[axis] || AXES.freedom;
  const custom = axes?.[axis] || {};
  return {
    ...base,
    label: sanitizeText(custom.label, base.label, 28).trim() || base.label,
    note: sanitizeText(custom.note, base.note, 72).trim() || base.note
  };
}

function selectEditorPoint(id) {
  state.editor.selectedPointId = id || null;
  renderEditor();
}

function createEditorPoint(weights = { freedom: 0.34, equality: 0.33, stability: 0.33 }) {
  const index = (state.editor.draft?.points?.length || 0) + 1;
  return {
    id: editorPointId(),
    label: `Point ${index}`,
    tone: "freedom",
    weights: normalizeEditorWeights(weights)
  };
}

function readEditorDraft() {
  try {
    const raw = localStorage.getItem(EDITOR_STORAGE_KEY);
    if (raw) return sanitizeEditorDraft(JSON.parse(raw));
  } catch (error) {
    console.error(error);
  }
  return cloneEditorDefaultDraft();
}

function persistEditorDraft() {
  try {
    localStorage.setItem(EDITOR_STORAGE_KEY, JSON.stringify(state.editor.draft));
  } catch (error) {
    console.error(error);
  }
}

function cloneEditorDefaultDraft() {
  return JSON.parse(JSON.stringify(EDITOR_DEFAULT_DRAFT));
}

function sanitizeEditorDraft(value) {
  const fallback = cloneEditorDefaultDraft();
  if (!value || typeof value !== "object") return fallback;
  const points = Array.isArray(value.points) ? value.points.slice(0, 24).map(sanitizeEditorPoint).filter(Boolean) : [];
  return {
    title: sanitizeText(value.title, fallback.title, 80),
    subtitle: sanitizeText(value.subtitle, fallback.subtitle, 180),
    exportDark: Boolean(value.exportDark),
    axes: sanitizeEditorAxes(value.axes),
    points
  };
}

function sanitizeEditorAxes(axes = {}) {
  return DISPLAY_ORDER.reduce((collection, axis) => {
    const fallback = EDITOR_DEFAULT_DRAFT.axes[axis];
    const value = axes?.[axis] || {};
    collection[axis] = {
      label: sanitizeText(value.label, fallback.label, 28).trim() || fallback.label,
      note: sanitizeText(value.note, fallback.note, 72).trim() || fallback.note
    };
    return collection;
  }, {});
}

function sanitizeEditorPoint(point) {
  if (!point || typeof point !== "object") return null;
  return {
    id: sanitizeText(point.id, editorPointId(), 80),
    label: sanitizeText(point.label, "Point", 48),
    tone: sanitizeEditorTone(point.tone),
    weights: normalizeEditorWeights(point.weights)
  };
}

function sanitizeEditorTone(tone) {
  return DISPLAY_ORDER.includes(tone) ? tone : "freedom";
}

function sanitizeText(value, fallback, maxLength) {
  const text = typeof value === "string" ? value : fallback;
  return text.slice(0, maxLength);
}

function normalizeEditorWeights(weights = {}) {
  const clean = DISPLAY_ORDER.reduce((collection, axis) => {
    collection[axis] = Math.max(0, Number(weights[axis]) || 0);
    return collection;
  }, {});
  const total = DISPLAY_ORDER.reduce((sum, axis) => sum + clean[axis], 0);
  if (total <= 0.0001) return { freedom: 1 / 3, equality: 1 / 3, stability: 1 / 3 };
  return DISPLAY_ORDER.reduce((collection, axis) => {
    collection[axis] = clean[axis] / total;
    return collection;
  }, {});
}

function editorPointId() {
  return `point-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function setEditorStatus(message) {
  if (!els.editorStatus) return;
  els.editorStatus.textContent = message;
}

async function exportEditorPng() {
  if (!state.editor.draft) return;
  const button = els.exportEditorPng;
  const label = button?.querySelector("span");
  const original = label?.textContent || "Export PNG";
  if (button) button.disabled = true;
  if (label) label.textContent = "Exporting";

  try {
    await document.fonts?.ready;
    const canvas = document.createElement("canvas");
    canvas.width = EDITOR_EXPORT_SIZE.width;
    canvas.height = EDITOR_EXPORT_SIZE.height;
    const ctx = canvas.getContext("2d");
    drawEditorExport(ctx, state.editor.draft);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.96));
    if (!blob) throw new Error("PNG export failed.");
    downloadBlob(blob, editorExportFilename());
    setEditorStatus("PNG exported.");
  } catch (error) {
    console.error(error);
    setEditorStatus("Export failed.");
  } finally {
    if (button) button.disabled = false;
    if (label) label.textContent = original;
  }
}

function drawEditorExport(ctx, draft) {
  const colors = editorThemeColors(Boolean(draft.exportDark));
  const layout = {
    left: 118,
    top: 126,
    scale: 1.85
  };
  layout.vertices = DISPLAY_ORDER.reduce((collection, axis) => {
    collection[axis] = exportPointFromBase(AXES[axis].vertex, layout);
    return collection;
  }, {});

  drawExportBackground(ctx, colors);
  drawExportHeading(ctx, draft, colors);
  drawExportTriangle(ctx, layout, colors, draft.axes);
  draft.points.forEach((point) => drawExportPoint(ctx, point, layout));
  drawExportFooter(ctx, colors);
}

function drawExportBackground(ctx, colors) {
  ctx.fillStyle = colors.paper;
  ctx.fillRect(0, 0, EDITOR_EXPORT_SIZE.width, EDITOR_EXPORT_SIZE.height);
  ctx.save();
  ctx.strokeStyle = colors.grid;
  ctx.lineWidth = 1;
  for (let x = 0.5; x <= EDITOR_EXPORT_SIZE.width; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, EDITOR_EXPORT_SIZE.height);
    ctx.stroke();
  }
  for (let y = 0.5; y <= EDITOR_EXPORT_SIZE.height; y += 48) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(EDITOR_EXPORT_SIZE.width, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawExportHeading(ctx, draft, colors) {
  const x = 64;
  let y = 108;
  ctx.save();
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = colors.ink;
  ctx.font = "750 46px Fraunces, Georgia, serif";
  y = drawWrappedCanvasText(ctx, draft.title || "Custom Political Prism", x, y, 390, 54, 3);
  ctx.fillStyle = colors.exportSubtitle;
  ctx.font = "400 22px 'Source Serif 4', Georgia, serif";
  drawWrappedCanvasText(ctx, draft.subtitle || "", x, y + 22, 580, 36, 4);
  ctx.restore();
}

function drawExportTriangle(ctx, layout, colors, axes) {
  drawExportTriangleGradient(ctx, layout.vertices);
  drawExportGrid(ctx, layout, colors);
  drawExportEdges(ctx, layout);
  drawExportAxisLabels(ctx, layout, colors, axes);
}

function drawExportTriangleGradient(ctx, vertices) {
  const bounds = triangleBounds(vertices);
  const temp = document.createElement("canvas");
  temp.width = bounds.width;
  temp.height = bounds.height;
  const tempCtx = temp.getContext("2d");
  const image = tempCtx.createImageData(bounds.width, bounds.height);

  for (let pixelY = 0; pixelY < bounds.height; pixelY += 1) {
    for (let pixelX = 0; pixelX < bounds.width; pixelX += 1) {
      const x = bounds.left + pixelX + 0.5;
      const y = bounds.top + pixelY + 0.5;
      const weights = weightsFromVertices({ x, y }, vertices);
      const index = (pixelY * bounds.width + pixelX) * 4;
      if (!weightsAreInsideTriangle(weights)) {
        image.data[index + 3] = 0;
        continue;
      }

      const strengths = DISPLAY_ORDER.reduce((collection, axis) => {
        collection[axis] = Math.pow(Math.max(0, weights[axis]), 0.72) * 0.96;
        return collection;
      }, {});
      const red = screenColorChannel(0, strengths);
      const green = screenColorChannel(1, strengths);
      const blue = screenColorChannel(2, strengths);
      const centerLift = Math.min(weights.equality, weights.freedom, weights.stability) * 3;
      const enhanced = enhanceColor(red, green, blue, 1.12 + (1 - centerLift) * 0.16, 1.04 + centerLift * 0.15);

      image.data[index] = enhanced.red;
      image.data[index + 1] = enhanced.green;
      image.data[index + 2] = enhanced.blue;
      image.data[index + 3] = 246;
    }
  }

  tempCtx.putImageData(image, 0, 0);
  ctx.drawImage(temp, bounds.left, bounds.top);
}

function drawExportGrid(ctx, layout, colors) {
  ctx.save();
  ctx.strokeStyle = colors.triangleGrid;
  ctx.lineWidth = 1.4;
  [0.25, 0.5, 0.75].forEach((value) => {
    const f1 = exportPointFromWeights({ freedom: value, equality: 0, stability: 1 - value }, layout);
    const f2 = exportPointFromWeights({ freedom: value, equality: 1 - value, stability: 0 }, layout);
    const e1 = exportPointFromWeights({ freedom: 0, equality: value, stability: 1 - value }, layout);
    const e2 = exportPointFromWeights({ freedom: 1 - value, equality: value, stability: 0 }, layout);
    const s1 = exportPointFromWeights({ freedom: 0, equality: 1 - value, stability: value }, layout);
    const s2 = exportPointFromWeights({ freedom: 1 - value, equality: 0, stability: value }, layout);
    drawCanvasLine(ctx, f1, f2);
    drawCanvasLine(ctx, e1, e2);
    drawCanvasLine(ctx, s1, s2);
  });
  ctx.restore();
}

function drawExportEdges(ctx, layout) {
  const edges = [
    ["equality", "freedom"],
    ["freedom", "stability"],
    ["equality", "stability"]
  ];
  ctx.save();
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.shadowBlur = 18;
  ctx.shadowColor = "rgba(255, 250, 240, 0.22)";
  edges.forEach(([from, to]) => {
    const start = layout.vertices[from];
    const end = layout.vertices[to];
    const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
    gradient.addColorStop(0, AXES[from].color);
    gradient.addColorStop(1, AXES[to].color);
    ctx.strokeStyle = gradient;
    drawCanvasLine(ctx, start, end);
  });
  ctx.restore();
}

function drawExportAxisLabels(ctx, layout, colors, axes) {
  const labelOffsets = {
    freedom: { x: 42, y: -56, align: "right" },
    equality: { x: -132, y: -72, align: "left" },
    stability: { x: 42, y: 42, align: "right" }
  };
  const noteOffsets = {
    freedom: { x: 42, y: -36, align: "right" },
    equality: { x: -132, y: -50, align: "left" },
    stability: { x: 42, y: 62, align: "right" }
  };

  DISPLAY_ORDER.forEach((axis) => {
    const vertex = layout.vertices[axis];
    const data = getAxisDisplay(axis, axes);
    drawExportDot(ctx, vertex.x, vertex.y, data.color, true);

    const labelOffset = labelOffsets[axis];
    const labelY = vertex.y + labelOffset.y * layout.scale;
    ctx.save();
    ctx.textAlign = labelOffset.align;
    ctx.fillStyle = data.color;
    ctx.font = "750 44px Fraunces, Georgia, serif";
    ctx.shadowBlur = 14;
    ctx.shadowColor = data.color;
    const labelLines = drawCanvasAxisText(ctx, data.label, vertex.x + labelOffset.x * layout.scale, labelY, labelOffset.align, 240, 44, 2, 24);
    ctx.restore();

    const noteOffset = noteOffsets[axis];
    ctx.save();
    ctx.textAlign = noteOffset.align;
    ctx.fillStyle = colors.axisNote;
    ctx.font = "400 23px 'Source Serif 4', Georgia, serif";
    const noteY = Math.max(vertex.y + noteOffset.y * layout.scale, labelY + labelLines * 34);
    const noteMaxWidth = axis === "equality" ? 260 : 520;
    const noteMaxLines = axis === "equality" ? 2 : 1;
    const noteMaxChars = axis === "equality" ? 25 : 80;
    drawCanvasAxisText(ctx, data.note, vertex.x + noteOffset.x * layout.scale, noteY, noteOffset.align, noteMaxWidth, 30, noteMaxLines, noteMaxChars);
    ctx.restore();
  });
}

function drawExportPoint(ctx, point, layout) {
  const position = exportPointFromWeights(point.weights, layout);
  const color = AXES[point.tone]?.color || AXES.freedom.color;
  drawExportDot(ctx, position.x, position.y, color, false);

  const lines = splitLabel(point.label || "Point");
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.font = "700 25px 'Source Serif 4', Georgia, serif";
  lines.forEach((line, index) => {
    const y = position.y + 43 + index * 27;
    ctx.lineWidth = 7;
    ctx.strokeStyle = "rgba(8, 12, 16, 0.78)";
    ctx.strokeText(line, position.x, y);
    ctx.fillStyle = "#fffaf0";
    ctx.fillText(line, position.x, y);
  });
  ctx.restore();
}

function drawExportDot(ctx, x, y, color, selected) {
  ctx.save();
  const rgb = hexToRgb(color);
  const glow = ctx.createRadialGradient(x, y, 0, x, y, selected ? 58 : 45);
  glow.addColorStop(0, `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, ${selected ? 0.48 : 0.36})`);
  glow.addColorStop(1, `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0)`);
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, selected ? 58 : 45, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = color;
  ctx.globalAlpha = selected ? 0.54 : 0.38;
  ctx.beginPath();
  ctx.arc(x, y, selected ? 25 : 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 1;
  ctx.fillStyle = color;
  ctx.strokeStyle = "#fffaf0";
  ctx.lineWidth = selected ? 6 : 5;
  ctx.beginPath();
  ctx.arc(x, y, selected ? 14 : 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function exportPointFromBase(point, layout) {
  return {
    x: layout.left + point.x * layout.scale,
    y: layout.top + point.y * layout.scale
  };
}

function exportPointFromWeights(weights, layout) {
  return exportPointFromBase(pointFromWeights(weights), layout);
}

function weightsFromVertices(point, vertices) {
  const denominator =
    (vertices.freedom.y - vertices.stability.y) * (vertices.equality.x - vertices.stability.x) +
    (vertices.stability.x - vertices.freedom.x) * (vertices.equality.y - vertices.stability.y);
  const equality =
    ((vertices.freedom.y - vertices.stability.y) * (point.x - vertices.stability.x) +
      (vertices.stability.x - vertices.freedom.x) * (point.y - vertices.stability.y)) / denominator;
  const freedom =
    ((vertices.stability.y - vertices.equality.y) * (point.x - vertices.stability.x) +
      (vertices.equality.x - vertices.stability.x) * (point.y - vertices.stability.y)) / denominator;
  return { equality, freedom, stability: 1 - equality - freedom };
}

function triangleBounds(vertices) {
  const xs = DISPLAY_ORDER.map((axis) => vertices[axis].x);
  const ys = DISPLAY_ORDER.map((axis) => vertices[axis].y);
  const left = Math.floor(Math.min(...xs));
  const right = Math.ceil(Math.max(...xs));
  const top = Math.floor(Math.min(...ys));
  const bottom = Math.ceil(Math.max(...ys));
  return {
    left,
    top,
    width: right - left + 1,
    height: bottom - top + 1
  };
}

function drawCanvasLine(ctx, start, end) {
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

function drawWrappedCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const lines = canvasTextLines(ctx, text, maxWidth).slice(0, maxLines);
  lines.forEach((line) => {
    ctx.fillText(line, x, y);
    y += lineHeight;
  });
  return y;
}

function canvasTextLines(ctx, text, maxWidth, font) {
  ctx.save();
  if (font) ctx.font = font;
  const words = String(text || "").split(/\s+/).filter(Boolean);
  if (!words.length) {
    ctx.restore();
    return [];
  }

  const lines = [];
  let line = "";
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth || !line) {
      line = test;
    } else {
      lines.push(line);
      line = word;
    }
  });
  if (line) lines.push(line);
  ctx.restore();
  return lines;
}

function drawCanvasAxisText(ctx, text, x, y, align, maxWidth, lineHeight, maxLines, maxChars) {
  const lines = clampTextLines(canvasTextLines(ctx, text, maxWidth), maxLines, maxChars);
  ctx.textAlign = align;
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
  return lines.length;
}

function wrapTextByChars(text, maxChars) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  if (!words.length) return [""];
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (test.length <= maxChars || !line) {
      line = test;
    } else {
      lines.push(line);
      line = word;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function clampTextLines(lines, maxLines, maxChars) {
  const clean = lines.filter(Boolean);
  if (clean.length <= maxLines) return clean.map((line) => ellipsizeText(line, maxChars));
  const kept = clean.slice(0, maxLines).map((line) => ellipsizeText(line, maxChars));
  kept[kept.length - 1] = ellipsizeText(kept[kept.length - 1], Math.max(1, maxChars - 1));
  if (!kept[kept.length - 1].endsWith("...")) kept[kept.length - 1] += "...";
  return kept;
}

function ellipsizeText(text, maxChars) {
  const value = String(text || "");
  if (value.length <= maxChars) return value;
  return `${value.slice(0, Math.max(0, maxChars - 3)).trimEnd()}...`;
}

function roundRectPath(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawExportFooter(ctx, colors) {
  ctx.save();
  ctx.fillStyle = colors.footer;
  ctx.font = "400 18px 'Source Serif 4', Georgia, serif";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(EDITOR_EXPORT_URL, 64, EDITOR_EXPORT_SIZE.height - 48);
  ctx.restore();
}

function hexToRgb(hex) {
  const normalized = String(hex).replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((char) => `${char}${char}`).join("")
    : normalized;
  const number = Number.parseInt(value, 16);
  return {
    red: (number >> 16) & 255,
    green: (number >> 8) & 255,
    blue: number & 255
  };
}

function editorThemeColors(forceDark) {
  const dark = typeof forceDark === "boolean" ? forceDark : document.documentElement.dataset.theme === "dark";
  return {
    paper: dark ? "#0f1114" : "#f4f1e8",
    ink: dark ? "#f5f0e8" : "#171512",
    muted: dark ? "#aeb4bd" : "#5f6268",
    softText: dark ? "#d7dbe0" : "#36383b",
    exportSubtitle: dark ? "#c6cbd3" : "#5f6268",
    footer: dark ? "rgba(174, 180, 189, 0.78)" : "rgba(95, 98, 104, 0.82)",
    grid: dark ? "rgba(108, 116, 128, 0.16)" : "rgba(118, 124, 132, 0.14)",
    triangleGrid: "rgba(255, 250, 240, 0.18)",
    axisNote: dark ? "rgba(246, 241, 232, 0.72)" : "rgba(255, 250, 240, 0.78)",
    panel: dark ? "rgba(24, 27, 31, 0.9)" : "rgba(255, 250, 240, 0.9)",
    panelBorder: dark ? "rgba(98, 106, 116, 0.9)" : "rgba(154, 156, 159, 0.9)"
  };
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function editorExportFilename() {
  const slug = (state.editor.draft?.title || "political-prism")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 42) || "political-prism";
  return `${slug}.png`;
}

function initQuizPage() {
  if (!state.questions.length) return;
  const parsed = parseQuizUrl();
  state.seed = parsed.seed || randomSeed();
  state.order = shuffledQuestionIds(state.seed);
  const saved = parsed.hasUrlProgress ? parsed : readQuizProgress(state.seed);
  state.index = clamp(saved.index, 0, state.order.length - 1);
  state.answers = sanitizeAnswers(saved.answers);

  renderAnswerButtons();
  bindQuizEvents();
  replaceQuizUrl();
  renderQuiz();
}

function initResultsPage() {
  if (!state.questions.length) return;
  const parsed = parseResultsUrl();
  if (!parsed.seed) {
    renderNoResult();
    return;
  }

  state.seed = parsed.seed;
  state.order = shuffledQuestionIds(state.seed);
  state.index = 0;
  state.answers = sanitizeAnswers(parsed.answers);
  state.lastResult = calculateResult();

  if (answeredCount() === 0) {
    renderNoResult();
    return;
  }

  state.index = clamp(readQuizProgress(state.seed).index, 0, state.order.length - 1);
  persistQuizProgress();
  replaceResultsUrl();
  renderResults(state.lastResult);
  renderLayer("virtues");
  if (els.resumeQuiz) els.resumeQuiz.href = quizHref();
}

function bindQuizEvents() {
  els.prevQuestion?.addEventListener("click", () => moveQuestion(-1));
  els.nextQuestion?.addEventListener("click", () => moveQuestion(1));
}

function renderAnswerButtons() {
  if (!els.answerScale) return;
  els.answerScale.innerHTML = ANSWER_VALUES.map((choice) => (
    `<button type="button" data-answer="${choice.value}">${choice.label}</button>`
  )).join("");

  els.answerScale.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const id = currentQuestionId();
      if (!id) return;
      state.answers[id] = Number(button.dataset.answer);
      persistQuizProgress();
      renderQuiz();
    });
  });
}

function renderQuiz() {
  const question = currentQuestion();
  if (!question) return;

  const answered = answeredCount();
  const progress = (answered / state.questions.length) * 100;
  if (els.questionCounter) els.questionCounter.textContent = `Question ${state.index + 1}`;
  if (els.answeredCounter) els.answeredCounter.textContent = `${answered}/${state.questions.length}`;
  if (els.seedBadge) els.seedBadge.textContent = `Seed ${state.seed}`;
  if (els.progressFill) els.progressFill.style.width = `${progress}%`;
  if (els.questionCategory) els.questionCategory.textContent = `${question.meta_category} / ${question.primary_subtype}`;
  if (els.questionText) els.questionText.textContent = question.text;
  if (els.prevQuestion) els.prevQuestion.disabled = state.index === 0;
  const currentAnswered = Number.isFinite(state.answers[String(question.id)]);
  if (els.nextQuestion) {
    els.nextQuestion.disabled = !currentAnswered;
    els.nextQuestion.querySelector("span:first-child").textContent = state.index >= state.order.length - 1 ? "Results" : "Next";
  }
  setStatus("");

  const selected = state.answers[String(question.id)];
  els.answerScale?.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("is-selected", Number(button.dataset.answer) === selected);
  });
}

function moveQuestion(delta) {
  if (delta > 0 && !Number.isFinite(state.answers[currentQuestionId()])) return;
  if (delta > 0 && state.index >= state.order.length - 1) {
    window.location.href = resultsHref();
    return;
  }
  state.index = clamp(state.index + delta, 0, state.order.length - 1);
  persistQuizProgress();
  renderQuiz();
}

function renderNoResult() {
  if (els.resultSummary) els.resultSummary.textContent = "No result state was found. Start the quiz to generate a shareable result.";
  if (els.resultOverview) els.resultOverview.innerHTML = "";
  if (els.resultBars) els.resultBars.innerHTML = "";
  if (els.resultReading) {
    els.resultReading.innerHTML = `
      <h2>No result yet</h2>
      <p>The results page expects a compact result URL from the quiz.</p>
      <a class="command primary" href="quiz.html">Start quiz</a>
    `;
  }
}

function renderResults(result) {
  const analysis = buildResultAnalysis(result);

  if (els.resultSummary) {
    els.resultSummary.textContent = analysis.summary;
  }

  if (els.resultOverview) {
    els.resultOverview.innerHTML = renderResultOverview(result, analysis);
  }

  if (els.resultBars) {
    els.resultBars.innerHTML = renderEvidencePanel(analysis);
  }

  if (els.resultReading) {
    els.resultReading.innerHTML = renderResultReading(result, analysis);
  }

  els.copyResultLink?.addEventListener("click", () => copyResultLink(new URL(resultsHref(), window.location.href).href));
}

function buildResultAnalysis(result) {
  const [first, second, third] = result.ranking;
  const records = answeredQuestionRecords();
  const name = resultName(result);
  const domains = buildDomainStats(records);
  const pairShifts = buildPairShifts(records);
  const changedPairShifts = pairShifts.filter((shift) => shift.changed);
  const costSignals = records
    .filter((record) => record.question.meta_category === "Cost of Principle")
    .sort((a, b) => {
      const aDifferent = a.supportedAxis !== first.axis ? 1 : 0;
      const bDifferent = b.supportedAxis !== first.axis ? 1 : 0;
      return bDifferent - aDifferent || b.strength - a.strength;
    })
    .slice(0, 3);
  const strongestSignals = records
    .filter((record) => record.supportedAxis)
    .sort((a, b) => b.strength - a.strength)
    .slice(0, 4);
  const axisEvidence = DISPLAY_ORDER.reduce((collection, axis) => {
    collection[axis] = {
      positive: records
        .filter((record) => record.contributions[axis] > 0)
        .sort((a, b) => b.contributions[axis] - a.contributions[axis]),
      negative: records
        .filter((record) => record.contributions[axis] < 0)
        .sort((a, b) => a.contributions[axis] - b.contributions[axis])
    };
    return collection;
  }, {});
  const nearbyIdeologies = nearestLayerPoints("ideologies", result.weights, 4);
  const tension = buildInternalTension(first.axis, second.axis, domains, changedPairShifts, costSignals);
  const blindSpot = buildBlindSpot(third.axis, axisEvidence[third.axis], domains);
  const orderLine = result.ranking
    .map((item) => `${AXES[item.axis].label} ${formatPercent(result.weights[item.axis])}`)
    .join(" > ");
  const summary = result.isBalanced
    ? `${name}: ${orderLine}. Your answers keep all three virtues in play, with ${AXES[first.axis].label} only narrowly ahead.`
    : `${name}: ${orderLine}. The report reads this as ${AXES[first.axis].label} first, ${AXES[second.axis].label} as the main restraint, and ${AXES[third.axis].label} least protected.`;

  return {
    name,
    records,
    domains,
    pairShifts,
    changedPairShifts,
    costSignals,
    strongestSignals,
    axisEvidence,
    nearbyIdeologies,
    tension,
    blindSpot,
    orderLine,
    summary,
    roles: [
      { label: "Dominant virtue", axis: first.axis, value: first.value },
      { label: "Secondary restraint", axis: second.axis, value: second.value },
      { label: "Least-protected", axis: third.axis, value: third.value }
    ]
  };
}

function resultName(result) {
  const [first, second] = result.ranking;
  return result.isBalanced
    ? "Triangular Balancer"
    : (RESULT_NAMES[first.axis]?.[second.axis] || `${AXES[first.axis].label} First`);
}

function renderResultOverview(result, analysis) {
  return `
    <article class="result-name-card">
      <p class="kicker">Result name</p>
      <h2>${escapeHtml(analysis.name)}</h2>
      <p>${escapeHtml(resultOpeningSentence(result, analysis))}</p>
    </article>
    <article class="result-score-card">
      <p class="kicker">Score order</p>
      <ol class="result-score-order">
        ${analysis.roles.map((role, index) => `
          <li>
            <span class="order-rank">${index + 1}</span>
            <span>
              <strong>${escapeHtml(AXES[role.axis].label)}</strong>
              <small>${escapeHtml(role.label)}</small>
            </span>
            <em>${formatPercent(role.value)}</em>
          </li>
        `).join("")}
      </ol>
    </article>
  `;
}

function resultOpeningSentence(result, analysis) {
  const [dominant, secondary, least] = analysis.roles;
  if (result.isBalanced) {
    return `The coordinate is close to the center, so the order matters less than the refusal to let one virtue consume the others. ${AXES[dominant.axis].label} still edges ahead in the answered tradeoffs.`;
  }
  return `Your answers most often protect ${AXES[dominant.axis].label}, use ${AXES[secondary.axis].label} as the nearest check on that instinct, and leave ${AXES[least.axis].label} with the thinnest protection.`;
}

function renderEvidencePanel(analysis) {
  return `
    <p class="kicker">Answer evidence</p>
    <h2>What shaped this</h2>
    <p class="score-note">Built from ${analysis.records.length} answered questions, including vectors, pair IDs, subtypes, and meta categories.</p>
    <div class="evidence-block">
      <h3>Strongest signals</h3>
      <ul class="evidence-list">
        ${analysis.strongestSignals.map(renderEvidenceItem).join("") || "<li>No non-neutral answers were available.</li>"}
      </ul>
    </div>
    <div class="evidence-block">
      <h3>Question frames</h3>
      <ul class="mini-stat-list">
        ${renderMetaCounts(analysis.records)}
      </ul>
    </div>
  `;
}

function renderEvidenceItem(record) {
  return `
    <li>
      <strong>${escapeHtml(record.question.primary_subtype)}</strong>
      <span>${escapeHtml(answerLabel(record.answerValue))}; ${escapeHtml(record.question.meta_category)}; ${escapeHtml(recordDirection(record))}.</span>
    </li>
  `;
}

function renderMetaCounts(records) {
  const counts = countBy(records, (record) => record.question.meta_category);
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([label, count]) => `<li><span>${escapeHtml(label)}</span><strong>${count}</strong></li>`)
    .join("");
}

function renderResultReading(result, analysis) {
  return `
    <div class="report-heading">
      <p class="kicker">Answer-derived interpretation</p>
      <h2>${escapeHtml(analysis.name)}</h2>
      <p class="report-lead">${escapeHtml(analysis.summary)}</p>
    </div>

    <section class="report-section report-section-marked report-section-protected">
      <div class="report-section-heading">
        <span class="report-section-index" aria-hidden="true">01</span>
        <h3>Protected, restrained, exposed</h3>
      </div>
      <div class="report-roles">
        ${analysis.roles.map((role) => renderRoleCard(role, result, analysis)).join("")}
      </div>
    </section>

    <section class="report-section report-section-marked report-section-principles">
      <div class="report-section-heading">
        <span class="report-section-index" aria-hidden="true">02</span>
        <h3>Principles under pressure</h3>
      </div>
      ${renderPrinciplePressure(analysis)}
    </section>

    <section class="report-section report-section-marked report-section-domains">
      <div class="report-section-heading">
        <span class="report-section-index" aria-hidden="true">03</span>
        <h3>Domain differences</h3>
      </div>
      <div class="domain-grid">
        ${analysis.domains.map((domain) => renderDomainCard(domain, analysis.roles[0].axis)).join("")}
      </div>
    </section>

    <section class="report-section report-section-marked report-section-ideologies">
      <div class="report-section-heading">
        <span class="report-section-index" aria-hidden="true">04</span>
        <h3>Nearby ideological traditions</h3>
      </div>
      <p class="section-note">These are nearby reference traditions, not an absolute ideology label.</p>
      <div class="ideology-neighbors">
        ${analysis.nearbyIdeologies.map(renderIdeologyNeighbor).join("")}
      </div>
    </section>

    <section class="report-section report-section-marked report-section-tensions">
      <div class="report-section-heading">
        <span class="report-section-index" aria-hidden="true">05</span>
        <h3>Pressure points</h3>
      </div>
      <div class="insight-pair">
        <article>
          <p class="role-label">Internal tension</p>
          <h3>${escapeHtml(analysis.tension.title)}</h3>
          <p>${escapeHtml(analysis.tension.text)}</p>
        </article>
        <article>
          <p class="role-label">Likely blind spot</p>
          <h3>${escapeHtml(AXES[analysis.roles[2].axis].label)} underprotection</h3>
          <p>${escapeHtml(analysis.blindSpot)}</p>
        </article>
      </div>
    </section>

    ${renderTechnicalDetails(result, analysis)}
  `;
}

function renderRoleCard(role, result, analysis) {
  const evidence = analysis.axisEvidence[role.axis];
  const record = role.label === "Least-protected"
    ? evidence.negative[0]
    : evidence.positive[0];
  const evidenceText = record
    ? `${record.question.primary_subtype} (${record.question.meta_category})`
    : "the answered set as a whole";
  const copy = {
    "Dominant virtue": `${AXES[role.axis].summary} This was strongest around ${evidenceText}.`,
    "Secondary restraint": `${AXES[role.axis].label} does not lead, but it repeatedly limits how far ${AXES[analysis.roles[0].axis].label} can go. Its clearest evidence is ${evidenceText}.`,
    "Least-protected": `${AXES[role.axis].label} is the virtue your answers most readily trade away. The clearest pressure against it appears around ${evidenceText}.`
  }[role.label];

  return `
    <div>
      <p class="role-label">${escapeHtml(role.label)}</p>
      <h3>${escapeHtml(AXES[role.axis].label)} <span>${formatPercent(result.weights[role.axis])}</span></h3>
      <p>${escapeHtml(copy)}</p>
    </div>
  `;
}

function renderPrinciplePressure(analysis) {
  const shifts = analysis.changedPairShifts.slice(0, 2);
  const stablePressure = analysis.pairShifts.find((shift) => !shift.changed);
  const costSignals = analysis.costSignals.slice(0, 2);

  return `
    <div class="pressure-list">
      ${shifts.map(renderPairShift).join("")}
      ${!shifts.length && stablePressure ? renderStablePairPressure(stablePressure) : ""}
      ${!shifts.length && !stablePressure ? "<p>No answered abstract/practical pair was available to compare.</p>" : ""}
      ${costSignals.map(renderCostSignal).join("")}
    </div>
  `;
}

function renderPairShift(shift) {
  return `
    <article class="pressure-item">
      <p class="role-label">${escapeHtml(formatPairId(shift.pairId))}</p>
      <h4>${escapeHtml(AXES[shift.abstract.supportedAxis].label)} abstractly, ${escapeHtml(AXES[shift.applied.supportedAxis].label)} in application</h4>
      <p>Your ${escapeHtml(shift.abstract.question.meta_category.toLowerCase())} answer on ${escapeHtml(shift.abstract.question.primary_subtype)} moved toward ${escapeHtml(AXES[shift.abstract.supportedAxis].label)}, but the ${escapeHtml(shift.applied.question.meta_category.toLowerCase())} case moved toward ${escapeHtml(AXES[shift.applied.supportedAxis].label)}.</p>
    </article>
  `;
}

function renderStablePairPressure(shift) {
  return `
    <article class="pressure-item">
      <p class="role-label">${escapeHtml(formatPairId(shift.pairId))}</p>
      <h4>No reversal in the strongest paired comparison</h4>
      <p>Your abstract answer and applied case both leaned toward ${escapeHtml(AXES[shift.abstract.supportedAxis].label)}. The report still treats this as evidence because it shows the principle survived a practical frame.</p>
    </article>
  `;
}

function renderCostSignal(record) {
  return `
    <article class="pressure-item">
      <p class="role-label">Explicit cost</p>
      <h4>${escapeHtml(record.question.primary_subtype)}</h4>
      <p>When the prompt named a cost, your ${escapeHtml(answerLabel(record.answerValue).toLowerCase())} answer moved ${escapeHtml(recordDirection(record))}.</p>
    </article>
  `;
}

function renderDomainCard(domain, overallAxis) {
  const [top, middle, bottom] = domain.ranking;
  const contrast = top.axis === overallAxis
    ? "Matches the overall lead."
    : `Contrasts with the overall ${AXES[overallAxis].label}-first result.`;
  return `
    <article class="domain-card">
      <p class="role-label">${escapeHtml(domain.label)}</p>
      <h4>${escapeHtml(AXES[top.axis].label)} leads <span>${formatPercent(domain.weights[top.axis])}</span></h4>
      <p>${escapeHtml(contrast)} ${escapeHtml(AXES[bottom.axis].label)} is least protected here at ${formatPercent(domain.weights[bottom.axis])}.</p>
      <small>${domain.count} answered; next is ${escapeHtml(AXES[middle.axis].label)} at ${formatPercent(domain.weights[middle.axis])}.</small>
    </article>
  `;
}

function renderIdeologyNeighbor(item) {
  return `
    <article>
      <h4>${escapeHtml(item.point.label)}</h4>
      <p>${escapeHtml(item.point.text)}</p>
    </article>
  `;
}

function renderTechnicalDetails(result, analysis) {
  return `
    <details class="technical-details">
      <summary>Seed, raw scores, scoring details, and methodology</summary>
      <dl class="result-facts">
        <dt>Seed</dt>
        <dd>${escapeHtml(state.seed)}</dd>
        <dt>Answered</dt>
        <dd>${result.answered} of ${state.questions.length}</dd>
        <dt>Score order</dt>
        <dd>${escapeHtml(analysis.orderLine)}</dd>
        ${DISPLAY_ORDER.map((axis) => `
          <dt>${escapeHtml(AXES[axis].label)} raw</dt>
          <dd>${formatRawScore(result.raw[axis])}</dd>
        `).join("")}
      </dl>
      <p>Each answer multiplies the question vector by the answer value from -2 to +2. Vectors are stored as [Equality, Stability, Freedom], then normalized into the displayed triangle percentages.</p>
      <p>Pair analysis groups answered questions by <code>pair_id</code>; domain analysis uses <code>primary_subtype</code>, <code>meta_category</code>, and prompt text.</p>
    </details>
  `;
}

function answeredQuestionRecords() {
  return state.questions
    .map((question) => {
      const answerValue = state.answers[String(question.id)];
      if (!Number.isFinite(answerValue)) return null;
      const contributions = answerContributions(question, answerValue);
      const ranking = contributionRanking(contributions);
      const supportedAxis = answerValue === 0 ? null : ranking[0].axis;
      const sacrificedAxis = answerValue === 0 ? null : ranking[ranking.length - 1].axis;
      return {
        question,
        answerValue,
        contributions,
        ranking,
        supportedAxis,
        sacrificedAxis,
        domainId: questionDomain(question),
        strength: ranking[0].value - ranking[ranking.length - 1].value
      };
    })
    .filter(Boolean);
}

function answerContributions(question, answerValue) {
  return VECTOR_ORDER.reduce((scores, axis, index) => {
    scores[axis] = Number(question.vector[index] || 0) * answerValue;
    return scores;
  }, { freedom: 0, equality: 0, stability: 0 });
}

function contributionRanking(contributions) {
  return DISPLAY_ORDER
    .map((axis) => ({ axis, value: contributions[axis] || 0 }))
    .sort((a, b) => b.value - a.value);
}

function buildDomainStats(records) {
  return RESULT_DOMAINS.map((domain) => {
    const domainRecords = records.filter((record) => record.domainId === domain.id);
    const raw = sumContributions(domainRecords);
    const weights = normalizeRawScores(raw, domainRecords.length);
    return {
      id: domain.id,
      label: domain.label,
      count: domainRecords.length,
      records: domainRecords,
      raw,
      weights,
      ranking: DISPLAY_ORDER
        .map((axis) => ({ axis, value: weights[axis] }))
        .sort((a, b) => b.value - a.value)
    };
  }).filter((domain) => domain.count > 0);
}

function buildPairShifts(records) {
  const groups = records.reduce((collection, record) => {
    const key = record.question.pair_id || `question_${record.question.id}`;
    if (!collection.has(key)) collection.set(key, []);
    collection.get(key).push(record);
    return collection;
  }, new Map());

  return Array.from(groups.entries()).map(([pairId, group]) => {
    const abstract = group.find((record) => record.question.meta_category === "Abstract Principle" && record.supportedAxis);
    const applied = group.filter((record) => record !== abstract && record.supportedAxis);
    if (!abstract || !applied.length) return null;
    const bestApplied = applied
      .map((record) => ({
        record,
        changed: record.supportedAxis !== abstract.supportedAxis,
        distance: contributionDistance(abstract.contributions, record.contributions)
      }))
      .sort((a, b) => Number(b.changed) - Number(a.changed) || b.distance - a.distance || b.record.strength - a.record.strength)[0];
    return {
      pairId,
      abstract,
      applied: bestApplied.record,
      changed: bestApplied.changed,
      distance: bestApplied.distance
    };
  }).filter(Boolean).sort((a, b) => Number(b.changed) - Number(a.changed) || b.distance - a.distance);
}

function buildInternalTension(firstAxis, secondAxis, domains, changedPairShifts, costSignals) {
  const changed = changedPairShifts[0];
  if (changed) {
    return {
      title: `${AXES[changed.abstract.supportedAxis].label} principle, ${AXES[changed.applied.supportedAxis].label} case`,
      text: `The clearest tension is ${formatPairId(changed.pairId)}: your abstract answer protected ${AXES[changed.abstract.supportedAxis].label}, but the applied question protected ${AXES[changed.applied.supportedAxis].label}. That makes the boundary between principle and enforcement politically important for you.`
    };
  }

  const contrast = firstDomainContrast(domains);
  if (contrast) {
    return {
      title: `${contrast.a.label} versus ${contrast.b.label}`,
      text: `Your answers lead with ${AXES[contrast.a.ranking[0].axis].label} in ${contrast.a.label.toLowerCase()}, but with ${AXES[contrast.b.ranking[0].axis].label} in ${contrast.b.label.toLowerCase()}. Mixed cases between those domains are where your own rules will be hardest to apply.`
    };
  }

  const cost = costSignals.find((record) => record.supportedAxis !== firstAxis);
  if (cost) {
    return {
      title: `${AXES[firstAxis].label} checked by explicit costs`,
      text: `The cost-framed ${cost.question.primary_subtype} prompt moved ${recordDirection(cost)}, even though your overall result begins with ${AXES[firstAxis].label}. Costs can therefore redirect your first instinct rather than merely soften it.`
    };
  }

  return {
    title: `${AXES[firstAxis].label} with ${AXES[secondAxis].label} as a check`,
    text: `No answered pair showed a clean reversal, so the main tension is between your first two virtues: how much ${AXES[secondAxis].label} must restrain ${AXES[firstAxis].label} before the restraint becomes the actual rule.`
  };
}

function buildBlindSpot(leastAxis, evidence, domains) {
  const record = evidence.negative[0];
  const domain = record ? domainLabel(record.domainId).toLowerCase() : "the answered set";
  const subtype = record ? `, especially ${record.question.primary_subtype}` : "";
  return `${AXES[leastAxis].label} receives the least protection in this coordinate. In your answer pattern that weakness appears most in ${domain}${subtype}. The risk is not that ${AXES[leastAxis].label} is false, but that its warning arrives too late: ${AXES[leastAxis].blindSpot}`;
}

function nearestLayerPoints(layerId, weights, limit) {
  const layer = LAYERS[layerId];
  if (!layer) return [];
  return layer.points
    .map((point) => ({
      point,
      distance: DISPLAY_ORDER.reduce((sum, axis) => sum + Math.pow((weights[axis] || 0) - (point.weights[axis] || 0), 2), 0)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

function firstDomainContrast(domains) {
  for (let firstIndex = 0; firstIndex < domains.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < domains.length; secondIndex += 1) {
      if (domains[firstIndex].ranking[0].axis !== domains[secondIndex].ranking[0].axis) {
        return { a: domains[firstIndex], b: domains[secondIndex] };
      }
    }
  }
  return null;
}

function sumContributions(records) {
  return records.reduce((scores, record) => {
    DISPLAY_ORDER.forEach((axis) => {
      scores[axis] += record.contributions[axis] || 0;
    });
    return scores;
  }, { freedom: 0, equality: 0, stability: 0 });
}

function contributionDistance(a, b) {
  return DISPLAY_ORDER.reduce((sum, axis) => sum + Math.abs((a[axis] || 0) - (b[axis] || 0)), 0);
}

function questionDomain(question) {
  const haystack = [
    question.pair_id,
    question.primary_subtype,
    question.meta_category,
    question.text
  ].join(" ").toLowerCase();
  const scored = RESULT_DOMAINS.map((domain, index) => ({
    domain,
    index,
    score: domain.keywords.reduce((sum, keyword) => sum + (haystack.includes(keyword) ? 1 : 0), 0)
  })).sort((a, b) => b.score - a.score || a.index - b.index);
  return scored[0]?.score > 0 ? scored[0].domain.id : "institutions";
}

function domainLabel(domainId) {
  return RESULT_DOMAINS.find((domain) => domain.id === domainId)?.label || "Institutions and order";
}

function recordDirection(record) {
  if (!record.supportedAxis || !record.sacrificedAxis) return "stayed neutral";
  return `toward ${AXES[record.supportedAxis].label} over ${AXES[record.sacrificedAxis].label}`;
}

function answerLabel(value) {
  return ANSWER_VALUES.find((answer) => answer.value === value)?.label || "Answered";
}

function formatPairId(pairId) {
  return String(pairId || "paired prompt")
    .replace(/_\d+$/g, "")
    .replace(/_/g, " ");
}

function formatRawScore(value) {
  return Number(value || 0).toFixed(2).replace(/\.00$/g, "");
}

function countBy(items, getKey) {
  return items.reduce((counts, item) => {
    const key = getKey(item);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function formatPercent(value) {
  return `${Math.round(value * 100)}%`;
}

function resultIntro(result, name, firstAxis, secondAxis, thirdAxis) {
  if (result.isBalanced) {
    return `${name} means your answers do not let any single pole dominate the others. You are closest to the center of the triangle: liberty, standing, and social order all retain moral weight, even when the quiz pushes them into conflict.`;
  }

  return `${name} means your answers begin with ${AXES[firstAxis].label}, borrow from ${AXES[secondAxis].label}, and most readily sacrifice ${AXES[thirdAxis].label}. In plain terms, your political instinct is not a team label. It is a priority order under pressure.`;
}

function balancedInstinct() {
  return "Your first political reflex is balance rather than conquest by one pole. You tend to see Freedom, Equality, and Stability as mutually necessary checks: a society needs individual agency, equal moral standing, and enough order to endure.";
}

function axisWarning(axis, targetAxis) {
  const warnings = {
    freedom: {
      equality: "do not sacrifice the person to make everyone the same.",
      stability: "do not sacrifice the person to preserve order."
    },
    equality: {
      freedom: "formal freedom can abandon the weak to the strong.",
      stability: "order can preserve unjust hierarchy and call it continuity."
    },
    stability: {
      freedom: "unchecked individualism can dissolve the common world.",
      equality: "compassion can weaken excellence, hierarchy, discipline, and inherited structure."
    }
  };
  return warnings[axis]?.[targetAxis] || RESULT_AXIS_DETAILS[axis].fear;
}

function axisModeration(axis, dominantAxis) {
  const details = RESULT_AXIS_DETAILS[axis];
  return `${AXES[axis].label} does not lead your result, but it still restrains ${AXES[dominantAxis].label}. It asks whether your dominant instinct can survive contact with ${details.subject}.`;
}

function renderLayer(view, selectedId) {
  if (!els.triangleCanvas) return;
  const layer = LAYERS[view] || LAYERS.virtues;
  const previousView = state.activeView;
  const previousPointId = state.selectedPointId;
  const hasSelection = typeof selectedId === "string";
  state.activeView = view;

  if (hasSelection && previousView === view && previousPointId === selectedId) {
    state.selectedPointId = null;
  } else if (hasSelection && layer.points.some((point) => point.id === selectedId)) {
    state.selectedPointId = selectedId;
  } else {
    state.selectedPointId = null;
  }

  els.viewTabs.forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.view === view));
  });

  if (els.layerEyebrow) els.layerEyebrow.textContent = layer.eyebrow;
  if (els.layerTitle) els.layerTitle.textContent = layer.title;
  if (els.layerDescription) els.layerDescription.textContent = layer.description;
  renderTriangle(layer);
  renderPointList(layer);
  renderSelectedPoint(layer.points.find((point) => point.id === state.selectedPointId));
}

function renderTriangle(layer) {
  const width = 620;
  const height = 620;
  const verticesByAxis = DISPLAY_ORDER.reduce((collection, axis) => {
    collection[axis] = AXES[axis].vertex;
    return collection;
  }, {});
  const vertices = DISPLAY_ORDER.map((axis) => verticesByAxis[axis]);
  const resultPoint = state.lastResult ? pointFromWeights(state.lastResult.weights) : null;
  const nodes = layer.points.map((point) => renderSvgNode(point)).join("");
  const resultMarkup = resultPoint ? `
    <g class="tri-result" transform="translate(${resultPoint.x} ${resultPoint.y})">
      <circle class="tri-result-ring" r="18"></circle>
      ${renderDot("var(--ink)")}
      <text x="22" y="-10" class="tri-node-label">Your result</text>
    </g>
  ` : "";

  els.triangleCanvas.innerHTML = `
    <canvas class="tri-gradient-canvas" width="${width}" height="${height}" data-triangle-gradient aria-hidden="true"></canvas>
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${layer.title}">
      <defs>
        <linearGradient id="edgeEqualityFreedom" x1="${verticesByAxis.equality.x}" y1="${verticesByAxis.equality.y}" x2="${verticesByAxis.freedom.x}" y2="${verticesByAxis.freedom.y}" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="${AXES.equality.color}"></stop>
          <stop offset="100%" stop-color="${AXES.freedom.color}"></stop>
        </linearGradient>
        <linearGradient id="edgeFreedomStability" x1="${verticesByAxis.freedom.x}" y1="${verticesByAxis.freedom.y}" x2="${verticesByAxis.stability.x}" y2="${verticesByAxis.stability.y}" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="${AXES.freedom.color}"></stop>
          <stop offset="100%" stop-color="${AXES.stability.color}"></stop>
        </linearGradient>
        <linearGradient id="edgeEqualityStability" x1="${verticesByAxis.equality.x}" y1="${verticesByAxis.equality.y}" x2="${verticesByAxis.stability.x}" y2="${verticesByAxis.stability.y}" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="${AXES.equality.color}"></stop>
          <stop offset="100%" stop-color="${AXES.stability.color}"></stop>
        </linearGradient>
        <filter id="edgeGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur"></feGaussianBlur>
          <feMerge>
            <feMergeNode in="blur"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
        <filter id="nodeGlow" x="-160%" y="-160%" width="420%" height="420%">
          <feGaussianBlur stdDeviation="7" result="blur"></feGaussianBlur>
          <feMerge>
            <feMergeNode in="blur"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
      </defs>
      <rect width="${width}" height="${height}" fill="transparent"></rect>
      ${buildGridLines()}
      <line class="tri-edge" x1="${verticesByAxis.equality.x}" y1="${verticesByAxis.equality.y}" x2="${verticesByAxis.freedom.x}" y2="${verticesByAxis.freedom.y}" stroke="url(#edgeEqualityFreedom)"></line>
      <line class="tri-edge" x1="${verticesByAxis.freedom.x}" y1="${verticesByAxis.freedom.y}" x2="${verticesByAxis.stability.x}" y2="${verticesByAxis.stability.y}" stroke="url(#edgeFreedomStability)"></line>
      <line class="tri-edge" x1="${verticesByAxis.equality.x}" y1="${verticesByAxis.equality.y}" x2="${verticesByAxis.stability.x}" y2="${verticesByAxis.stability.y}" stroke="url(#edgeEqualityStability)"></line>
      <polygon class="tri-boundary" points="${pointsAttr(vertices)}"></polygon>
      ${renderAxisLabels()}
      ${nodes}
      ${resultMarkup}
    </svg>
  `;

  drawTriangleGradient(els.triangleCanvas.querySelector("[data-triangle-gradient]"), verticesByAxis);

  els.triangleCanvas.querySelectorAll(".tri-node").forEach((node) => {
    const id = node.dataset.point;
    node.addEventListener("click", () => renderLayer(state.activeView, id));
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        renderLayer(state.activeView, id);
      }
    });
  });
}

function drawTriangleGradient(canvas, verticesByAxis) {
  if (!canvas?.getContext) return;
  const width = 620;
  const height = 620;
  const scale = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);

  const ctx = canvas.getContext("2d");
  const image = ctx.createImageData(canvas.width, canvas.height);
  const vertices = {
    equality: verticesByAxis.equality,
    freedom: verticesByAxis.freedom,
    stability: verticesByAxis.stability
  };
  const denominator =
    (vertices.freedom.y - vertices.stability.y) * (vertices.equality.x - vertices.stability.x) +
    (vertices.stability.x - vertices.freedom.x) * (vertices.equality.y - vertices.stability.y);

  for (let pixelY = 0; pixelY < canvas.height; pixelY += 1) {
    for (let pixelX = 0; pixelX < canvas.width; pixelX += 1) {
      const x = (pixelX + 0.5) / scale;
      const y = (pixelY + 0.5) / scale;
      const equality =
        ((vertices.freedom.y - vertices.stability.y) * (x - vertices.stability.x) +
          (vertices.stability.x - vertices.freedom.x) * (y - vertices.stability.y)) / denominator;
      const freedom =
        ((vertices.stability.y - vertices.equality.y) * (x - vertices.stability.x) +
          (vertices.equality.x - vertices.stability.x) * (y - vertices.stability.y)) / denominator;
      const stability = 1 - equality - freedom;
      const index = (pixelY * canvas.width + pixelX) * 4;

      if (equality < -0.002 || freedom < -0.002 || stability < -0.002) {
        image.data[index + 3] = 0;
        continue;
      }

      const weights = { equality, freedom, stability };
      const strengths = DISPLAY_ORDER.reduce((collection, axis) => {
        collection[axis] = Math.pow(Math.max(0, weights[axis]), 0.72) * 0.96;
        return collection;
      }, {});
      let red = screenColorChannel(0, strengths);
      let green = screenColorChannel(1, strengths);
      let blue = screenColorChannel(2, strengths);
      const centerLift = Math.min(equality, freedom, stability) * 3;
      const saturation = 1.12 + (1 - centerLift) * 0.16;
      const light = 1.04 + centerLift * 0.15;
      const enhanced = enhanceColor(red, green, blue, saturation, light);

      image.data[index] = enhanced.red;
      image.data[index + 1] = enhanced.green;
      image.data[index + 2] = enhanced.blue;
      image.data[index + 3] = 246;
    }
  }

  ctx.putImageData(image, 0, 0);
}

function screenColorChannel(channel, strengths) {
  const remaining = DISPLAY_ORDER.reduce((product, axis) => {
    const color = TRIANGLE_WASH_COLORS[axis][channel] / 255;
    return product * (1 - color * strengths[axis]);
  }, 1);
  return (1 - remaining) * 255;
}

function enhanceColor(red, green, blue, saturation, light) {
  const average = (red + green + blue) / 3;
  return {
    red: clampColor((average + (red - average) * saturation) * light),
    green: clampColor((average + (green - average) * saturation) * light),
    blue: clampColor((average + (blue - average) * saturation) * light)
  };
}

function clampColor(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function renderSvgNode(point) {
  const position = pointFromWeights(point.weights);
  const selected = point.id === state.selectedPointId ? " is-selected" : "";
  const color = AXES[point.tone]?.color || "var(--ink)";

  return `
    <g class="tri-node${selected}" data-point="${point.id}" tabindex="0" role="button" aria-label="${escapeHtml(point.label)}" transform="translate(${position.x} ${position.y})">
      ${renderDot(color)}
      ${renderSvgLabel(point.label)}
    </g>
  `;
}

function renderDot(color) {
  return `
    <circle class="tri-dot-aura" r="24" fill="${color}"></circle>
    <circle class="tri-dot-glow" r="15" fill="${color}"></circle>
    <circle class="tri-dot-core" r="7.5" fill="${color}"></circle>
  `;
}

function renderSvgLabel(label) {
  const lines = splitLabel(label);
  const x = 0;
  const y = 24;
  return `
    <text class="tri-node-label" x="${x}" y="${y}" text-anchor="middle">
      ${lines.map((line, index) => `<tspan x="${x}" dy="${index ? 17 : 0}">${escapeHtml(line)}</tspan>`).join("")}
    </text>
  `;
}

function splitLabel(label) {
  if (label.length <= 15 || !label.includes(" ")) return [label];
  const words = label.split(" ");
  const midpoint = Math.ceil(words.length / 2);
  return [
    words.slice(0, midpoint).join(" "),
    words.slice(midpoint).join(" ")
  ].filter(Boolean);
}

function renderAxisLabels(axes) {
  return DISPLAY_ORDER.map((axis) => {
    const data = getAxisDisplay(axis, axes);
    const v = AXES[axis].vertex;
    const offsets = {
      freedom: { x: 42, y: -56, anchor: "end" },
      equality: { x: -84, y: -72, anchor: "start" },
      stability: { x: 42, y: 42, anchor: "end" }
    }[axis];
    const noteOffsets = {
      freedom: { x: 42, y: -36, anchor: "end" },
      equality: { x: -84, y: -50, anchor: "start" },
      stability: { x: 42, y: 62, anchor: "end" }
    }[axis];
    const labelLines = axisTextLines(data.label, 15, 2);
    const noteLines = axisNoteTextLines(data.note, axis);
    const labelY = v.y + offsets.y - (axis === "stability" ? (labelLines.length - 1) * 18 : 0);
    const noteY = Math.max(v.y + noteOffsets.y, labelY + labelLines.length * 24);

    return `
      <g>
        <g class="tri-axis-node" transform="translate(${v.x} ${v.y})">
          ${renderDot(data.color)}
        </g>
        ${renderSvgAxisTextLines(labelLines, `tri-axis-label tri-axis-${axis}`, v.x + offsets.x, labelY, offsets.anchor, 30)}
        ${renderSvgAxisTextLines(noteLines, "tri-axis-note", v.x + noteOffsets.x, noteY, noteOffsets.anchor, 17)}
      </g>
    `;
  }).join("");
}

function axisTextLines(text, maxChars, maxLines) {
  return clampTextLines(wrapTextByChars(text, maxChars), maxLines, maxChars);
}

function axisNoteTextLines(text, axis) {
  if (axis === "freedom" || axis === "stability") return [String(text || "")];
  return axisTextLines(text, 22, 2);
}

function renderSvgAxisTextLines(lines, className, x, y, anchor, lineHeight) {
  return `
    <text class="${className}" x="${x}" y="${y}" text-anchor="${anchor}">
      ${lines.map((line, index) => `<tspan x="${x}" dy="${index ? lineHeight : 0}">${escapeHtml(line)}</tspan>`).join("")}
    </text>
  `;
}

function renderPointList(layer) {
  if (!els.pointList) return;
  els.pointList.innerHTML = layer.points.map((point) => `
    <button type="button" class="${point.id === state.selectedPointId ? "is-selected" : ""}" data-point="${point.id}">
      ${escapeHtml(point.label)}
    </button>
  `).join("");
  els.pointList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => renderLayer(state.activeView, button.dataset.point));
  });
}

function renderSelectedPoint(point) {
  if (!els.selectedPoint) return;
  const panel = els.selectedPoint.closest(".layer-panel");
  if (!point) {
    if (panel) panel.hidden = true;
    hideSelectionConnector();
    els.selectedPoint.innerHTML = "";
    return;
  }

  if (panel) panel.hidden = false;
  els.selectedPoint.innerHTML = `
    <p class="selected-label">Selected point</p>
    <h4>${escapeHtml(point.label)}</h4>
    <p>${escapeHtml(point.text)}</p>
  `;
  renderSelectionConnector(point);
  window.requestAnimationFrame(() => renderSelectionConnector(point));
}

function currentLayerPoint() {
  const layer = LAYERS[state.activeView] || LAYERS.virtues;
  return layer.points.find((point) => point.id === state.selectedPointId);
}

function hideSelectionConnector() {
  if (!els.selectionConnector) return;
  els.selectionConnector.hidden = true;
  els.selectionConnector.innerHTML = "";
}

function renderSelectionConnector(point) {
  if (!els.selectionConnector || !els.triangleCanvas || !els.selectedPoint) return;
  const panel = els.selectedPoint.closest(".layer-panel");
  const stage = els.selectionConnector.closest(".triangle-stage");
  const svg = els.triangleCanvas.querySelector("svg");
  if (!panel || !stage || !svg || panel.hidden) {
    hideSelectionConnector();
    return;
  }

  const stageRect = stage.getBoundingClientRect();
  const panelRect = panel.getBoundingClientRect();
  const svgRect = svg.getBoundingClientRect();
  if (!stageRect.width || !stageRect.height || !svgRect.width || !svgRect.height) {
    hideSelectionConnector();
    return;
  }

  const position = pointFromWeights(point.weights);
  const pointX = svgRect.left - stageRect.left + (position.x / 620) * svgRect.width;
  const pointY = svgRect.top - stageRect.top + (position.y / 620) * svgRect.height;
  const box = {
    left: panelRect.left - stageRect.left,
    right: panelRect.right - stageRect.left,
    top: panelRect.top - stageRect.top,
    bottom: panelRect.bottom - stageRect.top
  };
  const start = pointOnBoxEdge(box, pointX, pointY);
  const end = shortenLine(start.x, start.y, pointX, pointY, 16);

  els.selectionConnector.hidden = false;
  els.selectionConnector.setAttribute("viewBox", `0 0 ${stageRect.width} ${stageRect.height}`);
  els.selectionConnector.innerHTML = `
    <defs>
      <marker id="selectionConnectorArrow" markerWidth="9" markerHeight="9" refX="7.5" refY="4.5" orient="auto">
        <path d="M0 0 9 4.5 0 9 2.5 4.5Z" class="selection-connector-arrow"></path>
      </marker>
    </defs>
    <path class="selection-connector-line" d="M${start.x.toFixed(1)} ${start.y.toFixed(1)} L${end.x.toFixed(1)} ${end.y.toFixed(1)}" marker-end="url(#selectionConnectorArrow)"></path>
  `;
}

function pointOnBoxEdge(box, pointX, pointY) {
  const centerX = (box.left + box.right) / 2;
  const centerY = (box.top + box.bottom) / 2;
  const dx = pointX - centerX;
  const dy = pointY - centerY;
  if (Math.abs(dx) < 0.0001 && Math.abs(dy) < 0.0001) {
    return { x: box.right, y: centerY };
  }

  const scaleX = dx === 0 ? Infinity : Math.abs((dx > 0 ? box.right - centerX : centerX - box.left) / dx);
  const scaleY = dy === 0 ? Infinity : Math.abs((dy > 0 ? box.bottom - centerY : centerY - box.top) / dy);
  const scale = Math.min(scaleX, scaleY);
  return {
    x: centerX + dx * scale,
    y: centerY + dy * scale
  };
}

function shortenLine(startX, startY, endX, endY, amount) {
  const dx = endX - startX;
  const dy = endY - startY;
  const length = Math.hypot(dx, dy);
  if (length <= amount || length < 0.0001) return { x: endX, y: endY };
  const ratio = (length - amount) / length;
  return {
    x: startX + dx * ratio,
    y: startY + dy * ratio
  };
}

function buildGridLines() {
  const lines = [];
  [0.25, 0.5, 0.75].forEach((value) => {
    const f1 = pointFromWeights({ freedom: value, equality: 0, stability: 1 - value });
    const f2 = pointFromWeights({ freedom: value, equality: 1 - value, stability: 0 });
    const e1 = pointFromWeights({ freedom: 0, equality: value, stability: 1 - value });
    const e2 = pointFromWeights({ freedom: 1 - value, equality: value, stability: 0 });
    const s1 = pointFromWeights({ freedom: 0, equality: 1 - value, stability: value });
    const s2 = pointFromWeights({ freedom: 1 - value, equality: 0, stability: value });
    lines.push(`<line class="tri-grid" x1="${f1.x}" y1="${f1.y}" x2="${f2.x}" y2="${f2.y}"></line>`);
    lines.push(`<line class="tri-grid" x1="${e1.x}" y1="${e1.y}" x2="${e2.x}" y2="${e2.y}"></line>`);
    lines.push(`<line class="tri-grid" x1="${s1.x}" y1="${s1.y}" x2="${s2.x}" y2="${s2.y}"></line>`);
  });
  return lines.join("");
}

function calculateResult() {
  const raw = { freedom: 0, equality: 0, stability: 0 };
  let answered = 0;

  Object.entries(state.answers).forEach(([id, value]) => {
    const question = state.byId.get(String(id));
    if (!question || !Number.isFinite(value)) return;
    answered += 1;
    VECTOR_ORDER.forEach((axis, index) => {
      raw[axis] += Number(question.vector[index]) * value;
    });
  });

  const weights = normalizeRawScores(raw, answered);
  const ranking = DISPLAY_ORDER
    .map((axis) => ({ axis, value: weights[axis] }))
    .sort((a, b) => b.value - a.value);
  return {
    raw,
    weights,
    ranking,
    answered,
    isBalanced: ranking[0].value - ranking[2].value < 0.09
  };
}

function normalizeRawScores(raw, answered) {
  if (!answered) return { freedom: 1 / 3, equality: 1 / 3, stability: 1 / 3 };
  const average = DISPLAY_ORDER.map((axis) => raw[axis] / answered);
  if (Math.max(...average.map((value) => Math.abs(value))) < 0.000001) {
    return { freedom: 1 / 3, equality: 1 / 3, stability: 1 / 3 };
  }
  const min = Math.min(...average);
  const max = Math.max(...average);
  const floor = Math.max(0.08, (max - min) * 0.16);
  const shifted = average.map((value) => value - min + floor);
  const total = shifted.reduce((sum, value) => sum + value, 0);
  return {
    freedom: shifted[DISPLAY_ORDER.indexOf("freedom")] / total,
    equality: shifted[DISPLAY_ORDER.indexOf("equality")] / total,
    stability: shifted[DISPLAY_ORDER.indexOf("stability")] / total
  };
}

function parseQuizUrl() {
  const params = new URLSearchParams(window.location.search);
  const legacySeed = params.get("seed");
  if (legacySeed) {
    const hasUrlProgress = params.has("i") || params.has("a");
    return {
      seed: normalizeSeed(legacySeed),
      index: Number(params.get("i") || 0),
      answers: decodeAnswers(params.get("a") || ""),
      hasUrlProgress
    };
  }

  const raw = params.get("q") || "";
  const [seed, index, answers = ""] = raw.split(".");
  return {
    seed: seed ? normalizeSeed(seed) : "",
    index: Number(index || 0),
    answers: decodeAnswers(answers),
    hasUrlProgress: Boolean(raw)
  };
}

function parseResultsUrl() {
  const params = new URLSearchParams(window.location.search);
  const legacySeed = params.get("seed");
  if (legacySeed) {
    return {
      seed: normalizeSeed(legacySeed),
      answers: decodeAnswers(params.get("a") || "")
    };
  }

  const raw = params.get("r") || "";
  const [seed, answers = ""] = raw.split(".");
  return {
    seed: seed ? normalizeSeed(seed) : "",
    answers: decodeAnswers(answers)
  };
}

function replaceQuizUrl() {
  persistQuizProgress();
  const href = quizHref();
  localStorage.setItem("prism-resume-url", href);
  if (window.location.pathname.split("/").pop() + window.location.search !== href) {
    window.history.replaceState(null, "", href);
  }
}

function replaceResultsUrl() {
  window.history.replaceState(null, "", resultsHref());
}

function quizHref() {
  return `quiz.html?seed=${encodeURIComponent(state.seed)}`;
}

function resultsHref() {
  return `results.html?r=${encodeURIComponent([state.seed, encodeAnswers(state.answers)].join("."))}`;
}

function persistQuizProgress() {
  if (!state.seed) return;
  const progress = `${clamp(state.index, 0, Math.max(0, state.order.length - 1))}.${encodeAnswers(state.answers)}`;
  setCookie(quizProgressCookieName(state.seed), progress, QUIZ_PROGRESS_MAX_AGE);
  localStorage.setItem("prism-resume-url", quizHref());
}

function readQuizProgress(seed) {
  const raw = getCookie(quizProgressCookieName(seed));
  if (!raw) return { index: 0, answers: {} };
  const [index, answers = ""] = raw.split(".");
  return {
    index: Number(index || 0),
    answers: decodeAnswers(answers)
  };
}

function quizProgressCookieName(seed) {
  return `${QUIZ_PROGRESS_COOKIE_PREFIX}${seed}`;
}

function setCookie(name, value, maxAge) {
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; SameSite=Lax`;
}

function getCookie(name) {
  const prefix = `${name}=`;
  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));
  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : "";
}

function encodeAnswers(answers) {
  const byValue = new Map([[-2, "0"], [-1, "1"], [0, "2"], [1, "3"], [2, "4"]]);
  return state.questions
    .map((question) => byValue.get(answers[String(question.id)]) || "x")
    .join("")
    .replace(/x+$/, "");
}

function decodeAnswers(encoded) {
  const byChar = new Map([["0", -2], ["1", -1], ["2", 0], ["3", 1], ["4", 2]]);
  const answers = {};
  state.questions.forEach((question, index) => {
    const value = byChar.get(encoded[index]);
    if (Number.isFinite(value)) answers[String(question.id)] = value;
  });
  return answers;
}

function sanitizeAnswers(answers = {}) {
  return Object.entries(answers).reduce((clean, [id, value]) => {
    if (state.byId.has(String(id)) && Number.isFinite(value)) clean[String(id)] = value;
    return clean;
  }, {});
}

function currentQuestionId() {
  return state.order[state.index] ? String(state.order[state.index]) : null;
}

function currentQuestion() {
  return state.byId.get(currentQuestionId());
}

function answeredCount() {
  return Object.keys(state.answers).filter((id) => Number.isFinite(state.answers[id])).length;
}

function shuffledQuestionIds(seed) {
  const ids = state.questions.map((question) => String(question.id));
  const rng = mulberry32(hashSeed(seed));
  for (let index = ids.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(rng() * (index + 1));
    [ids[index], ids[swap]] = [ids[swap], ids[index]];
  }
  return ids;
}

function pointFromWeights(weights) {
  const total = DISPLAY_ORDER.reduce((sum, axis) => sum + (weights[axis] || 0), 0) || 1;
  return DISPLAY_ORDER.reduce((point, axis) => {
    const share = (weights[axis] || 0) / total;
    point.x += AXES[axis].vertex.x * share;
    point.y += AXES[axis].vertex.y * share;
    return point;
  }, { x: 0, y: 0 });
}

function pointsAttr(points) {
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}

async function copyResultLink(url) {
  const button = els.copyResultLink;
  const label = button?.querySelector("span");
  if (!button || !label) return;

  const original = button.dataset.originalLabel || label.textContent;
  button.dataset.originalLabel = original;
  button.disabled = true;

  try {
    await navigator.clipboard.writeText(url);
    label.textContent = "Copied";
  } catch {
    label.textContent = "Copy failed";
  }

  window.setTimeout(() => {
    label.textContent = original;
    button.disabled = false;
  }, 1600);
}

function setStatus(message) {
  if (els.quizStatus) els.quizStatus.textContent = message;
}

function randomSeed() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

function normalizeSeed(seed) {
  return String(seed || "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 32) || randomSeed();
}

function hashSeed(seed) {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  return function rng() {
    let value = seed += 0x6D2B79F5;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
