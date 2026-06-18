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
    eyebrow: "Units Layer",
    title: "Individual, Community, Collective Body",
    description: "The anthropological layer. Each pole imagines society from a different unit of concern.",
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
    eyebrow: "Authority Figures Layer",
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

const state = {
  questions: [],
  byId: new Map(),
  seed: "",
  order: [],
  index: 0,
  answers: {},
  activeView: "virtues",
  selectedPointId: null,
  lastResult: null
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
  seedBadge: $("#seedBadge"),
  progressFill: $("#progressFill"),
  questionCategory: $("#questionCategory"),
  questionText: $("#questionText"),
  answerScale: $("#answerScale"),
  prevQuestion: $("#prevQuestion"),
  nextQuestion: $("#nextQuestion"),
  quizStatus: $("#quizStatus"),
  resultSummary: $("#resultSummary"),
  resultBars: $("#resultBars"),
  resultReading: $("#resultReading"),
  copyResultLink: $("#copyResultLink"),
  resumeQuiz: $("#resumeQuiz"),
  resumeHomeLink: $("#resumeHomeLink")
};

init();

async function init() {
  initTheme();
  initTriangle();
  initResumeLinks();

  const page = document.body.dataset.page || "home";
  if (page === "quiz") {
    await loadQuestions();
    initQuizPage();
  }
  if (page === "results") {
    await loadQuestions();
    initResultsPage();
  }
}

function initResumeLinks() {
  const latest = localStorage.getItem("prism-resume-url");
  if (latest && els.resumeHomeLink) els.resumeHomeLink.href = latest;
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
  $$("[data-theme-toggle]").forEach((button) => {
    button.setAttribute("aria-pressed", String(document.documentElement.dataset.theme === "dark"));
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
  renderLayer("units");
}

function initQuizPage() {
  if (!state.questions.length) return;
  const parsed = parseQuizUrl();
  state.seed = parsed.seed || randomSeed();
  state.order = shuffledQuestionIds(state.seed);
  state.index = clamp(parsed.index, 0, state.order.length - 1);
  state.answers = parsed.answers;

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
  state.answers = parsed.answers;
  state.lastResult = calculateResult();

  if (answeredCount() === 0) {
    renderNoResult();
    return;
  }

  replaceResultsUrl();
  renderResults(state.lastResult);
  renderLayer("virtues");
  if (els.resumeQuiz) els.resumeQuiz.href = quizHref(0);
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
      replaceQuizUrl();
      renderQuiz();
    });
  });
}

function renderQuiz() {
  const question = currentQuestion();
  if (!question) return;

  const answered = answeredCount();
  const progress = (answered / state.questions.length) * 100;
  if (els.questionCounter) els.questionCounter.textContent = `Question ${state.index + 1} of ${state.order.length} - ${answered} answered`;
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
  setStatus(answered ? `${answered} answer${answered === 1 ? "" : "s"} recorded.` : "No answers recorded yet.");

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
  replaceQuizUrl();
  renderQuiz();
}

function renderNoResult() {
  if (els.resultSummary) els.resultSummary.textContent = "No result state was found. Start the quiz to generate a shareable result.";
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
  const [first, second, third] = result.ranking;
  const name = result.isBalanced
    ? "Triangular Balancer"
    : (RESULT_NAMES[first.axis]?.[second.axis] || `${AXES[first.axis].label} First`);

  if (els.resultSummary) {
    els.resultSummary.textContent = `${name}: you protect ${AXES[first.axis].label} first, tolerate ${AXES[second.axis].label} second, and are most willing to sacrifice ${AXES[third.axis].label}.`;
  }

  if (els.resultBars) {
    els.resultBars.innerHTML = DISPLAY_ORDER.map((axis) => `
      <div class="score-row">
        <div class="score-top">
          <span>${AXES[axis].label}</span>
          <span>${Math.round(result.weights[axis] * 100)}%</span>
        </div>
        <div class="score-track">
          <span style="width:${Math.round(result.weights[axis] * 100)}%; background:${AXES[axis].color}"></span>
        </div>
      </div>
    `).join("");
  }

  if (els.resultReading) {
    els.resultReading.innerHTML = `
      <h2>${name}</h2>
      <p>${escapeHtml(result.isBalanced ? "Your answers sit near the center of the prism. You resist letting any single virtue devour the other two." : AXES[first.axis].summary)}</p>
      <dl>
        <dt>Protects first</dt>
        <dd>${AXES[first.axis].label}: ${escapeHtml(AXES[first.axis].summary)}</dd>
        <dt>Tolerates second</dt>
        <dd>${AXES[second.axis].label} remains a real concern, but usually after ${AXES[first.axis].label} is secured.</dd>
        <dt>Sacrifices most</dt>
        <dd>${AXES[third.axis].label} is the pole your answers most often trade away under pressure.</dd>
        <dt>Likely blind spot</dt>
        <dd>${escapeHtml(AXES[first.axis].blindSpot)}</dd>
        <dt>Answered</dt>
        <dd>${result.answered} of ${state.questions.length} questions using seed ${escapeHtml(state.seed)}.</dd>
      </dl>
    `;
  }

  els.copyResultLink?.addEventListener("click", () => copyLink(new URL(resultsHref(), window.location.href).href, "Result link copied."));
}

function renderLayer(view, selectedId) {
  if (!els.triangleCanvas) return;
  const layer = LAYERS[view] || LAYERS.virtues;
  state.activeView = view;
  state.selectedPointId = selectedId || state.selectedPointId || layer.points[0].id;
  if (!layer.points.some((point) => point.id === state.selectedPointId)) {
    state.selectedPointId = layer.points[0].id;
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
  const vertices = DISPLAY_ORDER.map((axis) => AXES[axis].vertex);
  const resultPoint = state.lastResult ? pointFromWeights(state.lastResult.weights) : null;
  const nodes = layer.points.map((point) => renderSvgNode(point)).join("");
  const resultMarkup = resultPoint ? `
    <g class="tri-result" transform="translate(${resultPoint.x} ${resultPoint.y})">
      <circle class="tri-result-ring" r="18"></circle>
      <circle r="8" fill="var(--ink)"></circle>
      <rect x="16" y="-20" width="82" height="26" rx="6" fill="var(--paper-strong)" stroke="var(--ink)"></rect>
      <text x="26" y="-3" class="tri-node-label">Your result</text>
    </g>
  ` : "";

  els.triangleCanvas.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${layer.title}">
      <defs>
        <linearGradient id="prismWash" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stop-color="${AXES.equality.color}" stop-opacity="0.2"></stop>
          <stop offset="48%" stop-color="${AXES.freedom.color}" stop-opacity="0.18"></stop>
          <stop offset="100%" stop-color="${AXES.stability.color}" stop-opacity="0.2"></stop>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="transparent"></rect>
      <polygon points="${pointsAttr(vertices)}" fill="url(#prismWash)"></polygon>
      ${buildGridLines()}
      <polygon class="tri-boundary" points="${pointsAttr(vertices)}"></polygon>
      ${renderAxisLabels()}
      ${nodes}
      ${resultMarkup}
    </svg>
  `;

  els.triangleCanvas.querySelectorAll(".tri-node").forEach((node) => {
    const id = node.dataset.point;
    node.addEventListener("click", () => renderLayer(state.activeView, id));
    node.addEventListener("mouseenter", () => renderSelectedPoint(layer.points.find((point) => point.id === id)));
    node.addEventListener("focus", () => renderSelectedPoint(layer.points.find((point) => point.id === id)));
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        renderLayer(state.activeView, id);
      }
    });
  });
}

function renderSvgNode(point) {
  const position = pointFromWeights(point.weights);
  const selected = point.id === state.selectedPointId ? " is-selected" : "";
  const color = AXES[point.tone]?.color || "var(--ink)";
  const labelWidth = Math.max(56, point.label.length * 7 + 18);
  const labelHeight = 24;
  const dx = point.dx ?? 12;
  const dy = point.dy ?? -12;

  return `
    <g class="tri-node${selected}" data-point="${point.id}" tabindex="0" role="button" aria-label="${escapeHtml(point.label)}" transform="translate(${position.x} ${position.y})">
      <line x1="0" y1="0" x2="${dx}" y2="${dy}" stroke="${color}" stroke-opacity="0.46" stroke-width="1"></line>
      <circle class="tri-node-dot" r="6.5" fill="${color}"></circle>
      <rect class="tri-node-label-bg" x="${dx}" y="${dy - labelHeight + 5}" width="${labelWidth}" height="${labelHeight}" rx="6"></rect>
      <text class="tri-node-label" x="${dx + 9}" y="${dy - 5}">${escapeHtml(point.label)}</text>
    </g>
  `;
}

function renderAxisLabels() {
  return DISPLAY_ORDER.map((axis) => {
    const data = AXES[axis];
    const v = data.vertex;
    const offsets = {
      freedom: { x: 42, y: -28, anchor: "end" },
      equality: { x: -54, y: -14, anchor: "start" },
      stability: { x: 42, y: 42, anchor: "end" }
    }[axis];
    const noteOffsets = {
      freedom: { x: 42, y: -8, anchor: "end" },
      equality: { x: -54, y: 6, anchor: "start" },
      stability: { x: 42, y: 62, anchor: "end" }
    }[axis];

    return `
      <g>
        <circle cx="${v.x}" cy="${v.y}" r="10" fill="${data.color}" stroke="var(--inverse)" stroke-width="3"></circle>
        <text class="tri-axis-label" x="${v.x + offsets.x}" y="${v.y + offsets.y}" text-anchor="${offsets.anchor}">${data.label}</text>
        <text class="tri-axis-note" x="${v.x + noteOffsets.x}" y="${v.y + noteOffsets.y}" text-anchor="${noteOffsets.anchor}">${data.note}</text>
      </g>
    `;
  }).join("");
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
  if (!point || !els.selectedPoint) return;
  const weights = DISPLAY_ORDER
    .map((axis) => `${AXES[axis].short} ${Math.round((point.weights[axis] || 0) * 100)}%`)
    .join(" / ");
  els.selectedPoint.innerHTML = `
    <p class="selected-label">Selected point</p>
    <h4>${escapeHtml(point.label)}</h4>
    <p>${escapeHtml(point.text)}</p>
    <p class="mix-line">${weights}</p>
  `;
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
    return {
      seed: normalizeSeed(legacySeed),
      index: Number(params.get("i") || 0),
      answers: decodeAnswers(params.get("a") || "")
    };
  }

  const raw = params.get("q") || "";
  const [seed, index, answers = ""] = raw.split(".");
  return {
    seed: seed ? normalizeSeed(seed) : "",
    index: Number(index || 0),
    answers: decodeAnswers(answers)
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
  const href = quizHref(state.index);
  localStorage.setItem("prism-resume-url", href);
  window.history.replaceState(null, "", href);
}

function replaceResultsUrl() {
  window.history.replaceState(null, "", resultsHref());
}

function quizHref(index) {
  const encoded = encodeAnswers(state.answers);
  const parts = [state.seed, String(clamp(index, 0, Math.max(0, state.order.length - 1)))];
  if (encoded) parts.push(encoded);
  return `quiz.html?q=${encodeURIComponent(parts.join("."))}`;
}

function resultsHref() {
  return `results.html?r=${encodeURIComponent([state.seed, encodeAnswers(state.answers)].join("."))}`;
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

async function copyLink(url, message) {
  try {
    await navigator.clipboard.writeText(url);
    setStatus(message);
  } catch {
    setStatus(url);
  }
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
