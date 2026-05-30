const POLES = ["Equity", "Stability", "Freedom"];
const VERTICES = {
  Equity: { x: 120, y: 520 },
  Stability: { x: 778, y: 900 },
  Freedom: { x: 778, y: 140 }
};
const ANSWER_VALUES = [-2, -1, 0, 1, 2];
const ANSWER_LABELS = [
  "Strongly disagree",
  "Disagree",
  "Neutral/unsure",
  "Agree",
  "Strongly agree"
];
const STORE_KEY = "political-prism-state";
const THEME_KEY = "political-prism-theme";
const SOURCE_URL = "https://github.com/RedeemedSpoon/Political-Prism-Test";

let questions = [];
let bounds = { min: [0, 0, 0], max: [0, 0, 0] };
let state = {
  seed: "",
  order: [],
  answers: {},
  index: 0,
  screen: "landing"
};

const app = document.querySelector("#app");

initTheme();
init();

async function init() {
  try {
    questions = await fetchQuestions();
    bounds = computeBounds(questions);
    state = makeInitialState();
    render();
    window.addEventListener("keydown", onKeydown);
    window.addEventListener("popstate", () => {
      state = makeInitialState();
      render();
    });
  } catch (error) {
    app.innerHTML = `<section class="question-panel"><h1>Political Prism Test</h1><p class="plain-copy">Could not load <code>questions.json</code>. ${escapeHtml(error.message)}</p></section>`;
  }
}

async function fetchQuestions() {
  const response = await fetch("questions.json", { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data.slice().sort((a, b) => a.id - b.id);
}

function makeInitialState() {
  const params = new URLSearchParams(location.search);
  const stored = readStoredState();
  const seed = params.get("seed") || stored.seed || makeSeed();
  const order = seededOrder(seed, questions);
  const encoded = params.get("a");
  const answers = encoded ? decodeAnswers(encoded, questions) : (stored.seed === seed ? stored.answers || {} : {});
  const hasFullUrlAnswers = encoded && Object.keys(answers).length === questions.length;
  return {
    seed,
    order,
    answers,
    index: clamp(Number(stored.index) || 0, 0, questions.length - 1),
    screen: hasFullUrlAnswers ? "results" : "landing"
  };
}

function readStoredState() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  } catch {
    return {};
  }
}

function persist() {
  localStorage.setItem(STORE_KEY, JSON.stringify({
    seed: state.seed,
    answers: state.answers,
    index: state.index
  }));
}

function render() {
  if (state.screen === "test") renderTest();
  else if (state.screen === "results") renderResults();
  else renderLanding();
}

function renderFrame(content) {
  app.innerHTML = `
    <a class="github-corner" href="${SOURCE_URL}" target="_blank" rel="noopener" aria-label="View source on GitHub">
      <svg width="80" height="80" viewBox="0 0 250 250" aria-hidden="true">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" class="octo-arm"></path>
        <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
      </svg>
    </a>
    <button class="theme-corner" data-action="theme" aria-label="Toggle dark mode" aria-pressed="${document.documentElement.dataset.theme === "dark"}">
      <span class="theme-icon" aria-hidden="true"><span></span></span>
    </button>
    <header class="topline">
      ${state.screen === "test" || state.screen === "results" ? `<a class="back-chip" href="/">&larr; Back to homepage</a>` : ""}
      <div class="brand" aria-label="Political Prism Test">
        <strong>Political Prism Test</strong>
        <span>Map your ideology and the society your instincts point toward.</span>
      </div>
    </header>
    ${content}
    <footer class="site-footer">
      <p>&copy; 2026 Political Prism Test. Made by RedeemedSpoon.</p>
    </footer>
  `;
  bindChrome();
}

function makeLogo() {
  return `
    <svg class="site-logo" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <linearGradient id="logo-fill" x1="0%" y1="20%" x2="100%" y2="90%">
          <stop offset="0%" stop-color="#b9473f"></stop>
          <stop offset="52%" stop-color="#5c8558"></stop>
          <stop offset="100%" stop-color="#426a9e"></stop>
        </linearGradient>
      </defs>
      <polygon points="16,60 94,15 94,105" fill="url(#logo-fill)"></polygon>
      <path d="M16 60 94 15 94 105 16 60Z" fill="none" stroke="currentColor" stroke-width="4"></path>
      <path d="M68 60 16 60M68 60 94 15M68 60 94 105" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2"></path>
      <circle cx="68" cy="60" r="6" fill="currentColor"></circle>
    </svg>
  `;
}

function icon(name) {
  const paths = {
    equity: `<path d="M12 4v16M7 8h10M8 8l-4 7h8L8 8Zm8 0-4 7h8l-4-7Z"></path>`,
    stability: `<path d="M4 20h16M6 20V9l6-5 6 5v11M9 20v-7h6v7"></path>`,
    freedom: `<path d="M7 11V7a5 5 0 0 1 10 0v4M6 11h12v9H6zM12 15v2"></path>`,
    triangle: `<path d="M12 3 3 20h18L12 3Zm0 5v7M12 18h.01"></path>`,
    tension: `<path d="M12 3v18M4 7h16M6 7l-3 6h6L6 7Zm12 0-3 6h6l-3-6Z"></path>`,
    mirror: `<path d="M12 3a7 7 0 0 0-7 7c0 5 7 11 7 11s7-6 7-11a7 7 0 0 0-7-7Zm0 4v6l4 2"></path>`
  };
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
}

function bindChrome() {
  app.querySelector("[data-action='theme']").addEventListener("click", toggleTheme);
}

function initTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  const preference = window.matchMedia?.("(prefers-color-scheme: dark)");
  const prefersDark = preference?.matches;
  document.documentElement.dataset.theme = stored || (prefersDark ? "dark" : "light");
  preference?.addEventListener("change", event => {
    if (!localStorage.getItem(THEME_KEY)) {
      document.documentElement.dataset.theme = event.matches ? "dark" : "light";
    }
  });
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem(THEME_KEY, next);
  app.querySelector("[data-action='theme']").setAttribute("aria-pressed", next === "dark");
}

function renderLanding() {
  renderFrame(`
    <section class="hero">
      <div>
        <p class="eyebrow">A political prism for ideal societies</p>
        <h1>Political Prism Test</h1>
        <p class="lede">Political beliefs are not only party preferences. They are pictures of the kind of society a person thinks would be just, durable, and humane.</p>
        <p class="plain-copy">This test maps your answers onto a triangular prism of Equity, Stability, and Freedom, then explains the wing, philosophical family, and ideal society your answers most resemble.</p>
        <div class="button-row">
          <button class="btn" data-action="start">Start the test</button>
          <button class="btn secondary" data-action="resume" ${Object.keys(state.answers).length ? "" : "disabled"}>Resume</button>
        </div>
      </div>
      <div class="prism-wrap">${makePrism()}</div>
    </section>
    <section class="axis-rows" aria-label="Three prism axes">
      <article>${icon("equity")}<div><b style="color: var(--equity)">Equity</b><p>Measures how strongly you want society to correct domination, deprivation, inherited advantage, exclusion, and unequal access.</p></div></article>
      <article>${icon("stability")}<div><b style="color: var(--stability)">Stability</b><p>Measures how strongly you value law, continuity, institutions, social trust, public order, competence, and shared norms.</p></div></article>
      <article>${icon("freedom")}<div><b style="color: var(--freedom)">Freedom</b><p>Measures how strongly you protect speech, property, bodily authority, exit rights, voluntary exchange, and decentralization.</p></div></article>
    </section>
    <section class="explain-section">
      <p class="eyebrow">What the result shows</p>
      <h2>The result is meant to answer five questions.</h2>
      <div class="question-list">
        <p>${icon("triangle")}<span>Where do I land on the Equity, Stability, Freedom prism?</span></p>
        <p>${icon("tension")}<span>Which wing or mix am I closest to?</span></p>
        <p>${icon("mirror")}<span>Which philosophies do I resemble?</span></p>
        <p>${icon("stability")}<span>Am I idealist, conditional, or conflicted?</span></p>
        <p>${icon("freedom")}<span>What does my worldview protect, and what does it sacrifice?</span></p>
      </div>
    </section>
    <section class="text-section">
      <p class="eyebrow">Why another political test?</p>
      <h2>A triangle catches what one-line maps miss.</h2>
      <p>Most political tests inherit the limits of the left-right line. They can tell you whether you sound more progressive, conservative, libertarian, or authoritarian, but they often blur together different reasons for reaching the same answer.</p>
      <p>The Political Prism separates three old political questions: Who deserves protection from hierarchy? What institutions and customs keep a society from falling apart? Where must the individual remain sovereign? Those questions have appeared in arguments about republics, monarchies, markets, socialism, liberalism, nationalism, and civic order for centuries.</p>
      <p>This project began from the old <a href="original-inspiration.png" target="_blank" rel="noopener">Political Triangle diagram</a> and rebuilds that idea as a browser-based test. The labels are interpretive, not definitive; they are there to orient you on the map, not to pronounce a final identity.</p>
    </section>
    <section class="selling-cards" aria-label="Other details">
      <article>${icon("triangle")}<b>Open source</b><p>The model can be inspected, criticized, forked, and improved.</p></article>
      <article>${icon("mirror")}<b>Local only</b><p>Your answers are calculated in the browser. The site does not need an account or backend.</p></article>
      <article>${icon("freedom")}<b>Sharable</b><p>Result links preserve the same prism location so you can compare maps with others.</p></article>
    </section>
    <section class="final-cta">
      ${makeLogo()}
      <p class="eyebrow">Ready to map your ideal society?</p>
      <h2>Take the test and see where your politics lands.</h2>
      <button class="btn" data-action="start-bottom">Start the test</button>
    </section>
  `);
  app.querySelector("[data-action='start']").addEventListener("click", startNewTest);
  app.querySelector("[data-action='start-bottom']").addEventListener("click", startNewTest);
  app.querySelector("[data-action='resume']").addEventListener("click", () => {
    state.screen = "test";
    render();
  });
}

function startNewTest() {
  state.seed = makeSeed();
  state.order = seededOrder(state.seed, questions);
  state.answers = {};
  state.index = 0;
  state.screen = "test";
  history.replaceState(null, "", `?seed=${encodeURIComponent(state.seed)}`);
  persist();
  render();
}

function renderTest() {
  const answeredCount = Object.keys(state.answers).length;
  const question = questions.find(q => q.id === state.order[state.index]);
  const selected = state.answers[question.id];
  const progress = Math.round((answeredCount / questions.length) * 100);
  renderFrame(`
    <section class="test-shell">
      <div class="progress-row">
        <span>Question ${state.index + 1} of ${questions.length}</span>
        <span>${answeredCount} answered</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
      <article class="question-panel">
        <p class="eyebrow">Use keys 1-5, or select an answer</p>
        <h2 class="question-text">${escapeHtml(question.text)}</h2>
        <div class="scale" role="radiogroup" aria-label="Answer scale">
          ${ANSWER_VALUES.map((value, index) => `
            <button class="choice ${selected === value ? "selected" : ""}" data-value="${value}" role="radio" aria-checked="${selected === value}">
              ${ANSWER_LABELS[index]}
            </button>
          `).join("")}
        </div>
        <div class="nav-row">
          <button class="btn secondary" data-action="previous" ${state.index === 0 ? "disabled" : ""}>&larr; Previous</button>
          <button class="btn" data-action="next" ${Number.isFinite(selected) ? "" : "disabled"}>${state.index === questions.length - 1 ? "See result" : "Next &rarr;"}</button>
        </div>
      </article>
    </section>
  `);

  app.querySelectorAll(".choice").forEach(button => {
    button.addEventListener("click", () => answerCurrent(Number(button.dataset.value)));
  });
  app.querySelector("[data-action='previous']").addEventListener("click", () => {
    transitionQuestion("back", () => {
      state.index = Math.max(0, state.index - 1);
      persist();
      render();
    });
  });
  app.querySelector("[data-action='next']").addEventListener("click", nextQuestion);
}

function answerCurrent(value) {
  const id = state.order[state.index];
  const wasAnswered = Number.isFinite(state.answers[id]);
  state.answers[id] = value;
  persist();
  app.querySelectorAll(".choice").forEach(button => {
    const selected = Number(button.dataset.value) === value;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-checked", selected);
  });
  app.querySelector("[data-action='next']")?.removeAttribute("disabled");
  if (!wasAnswered) {
    const answeredCount = Object.keys(state.answers).length;
    const fill = app.querySelector(".progress-fill");
    const counters = app.querySelectorAll(".progress-row span");
    if (fill) fill.style.width = `${Math.round((answeredCount / questions.length) * 100)}%`;
    if (counters[1]) counters[1].textContent = `${answeredCount} answered`;
  }
}

function nextQuestion() {
  const id = state.order[state.index];
  if (!Number.isFinite(state.answers[id])) return;
  if (state.index < questions.length - 1) {
    transitionQuestion("forward", () => {
      state.index += 1;
      persist();
      render();
    });
    return;
  }
  showResults();
}

function transitionQuestion(direction, callback) {
  const panel = app.querySelector(".question-panel");
  if (!panel) {
    callback();
    return;
  }
  panel.classList.add(direction === "back" ? "slide-out-right" : "slide-out-left");
  window.setTimeout(callback, 180);
}

function showResults() {
  if (Object.keys(state.answers).length < questions.length) {
    const unanswered = state.order.findIndex(id => !Number.isFinite(state.answers[id]));
    state.index = Math.max(0, unanswered);
    state.screen = "test";
    persist();
    render();
    return;
  }
  state.screen = "results";
  state.index = questions.length - 1;
  const url = makeShareUrl();
  history.replaceState(null, "", url);
  persist();
  render();
}

function renderResults() {
  const result = calculateResult();
  renderFrame(`
    <section class="results-layout">
      <div>
        <div class="result-summary">
          <p class="result-kicker">Dominant wing or mix</p>
          <h1 class="result-title">${escapeHtml(result.wing)}</h1>
          <p class="lede">${escapeHtml(result.summary)}</p>
        </div>
        <div class="prism-wrap">${makePrism(result.point)}</div>
        <div class="weights">
          ${POLES.map((pole, index) => `
            <div class="weight">
              <span>${pole}</span>
              <span class="meter"><span class="${pole[0].toLowerCase()}" style="width:${Math.round(result.weights[index] * 100)}%"></span></span>
              <b>${Math.round(result.weights[index] * 100)}%</b>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="result-panels">
        <section class="panel">
          <h3>Closest philosophy labels</h3>
          <p>Your answers ${escapeHtml(result.labelVerb)} these labels. They are approximations, not objective identities.</p>
          <div class="tag-list">${result.labels.map(label => `<span class="tag">${escapeHtml(label)}</span>`).join("")}</div>
        </section>
        <section class="panel">
          <h3>Subtype drivers</h3>
          <ul>${result.drivers.map(driver => `<li>${escapeHtml(driver)}</li>`).join("")}</ul>
        </section>
        <section class="panel">
          <h3>Commitment profile</h3>
          <p><b>${escapeHtml(result.profile.title)}.</b> ${escapeHtml(result.profile.text)}</p>
          <p>${escapeHtml(result.giveUp)}</p>
        </section>
        <section class="panel">
          <h3>Strengths, costs, blind spots</h3>
          <p>${escapeHtml(result.tradeoff)}</p>
        </section>
        <section class="panel">
          <h3>Share</h3>
          <p>Share this result as a snapshot of your answers. Anyone who opens the link sees the same prism location.</p>
          <div class="button-row">
            <button class="btn" data-action="share">Share result</button>
            <button class="btn secondary" data-action="edit">Edit answers</button>
            <button class="btn secondary" data-action="restart">Retake</button>
          </div>
          <p class="toast" id="toast"></p>
        </section>
      </div>
    </section>
  `);

  app.querySelector("[data-action='share']").addEventListener("click", shareResult);
  app.querySelector("[data-action='edit']").addEventListener("click", () => {
    state.screen = "test";
    state.index = 0;
    persist();
    render();
  });
  app.querySelector("[data-action='restart']").addEventListener("click", startNewTest);
}

function calculateResult() {
  const raw = [0, 0, 0];
  const subtypeScores = new Map();
  const answered = questions.filter(q => Number.isFinite(state.answers[q.id]));

  answered.forEach(question => {
    const answer = state.answers[question.id];
    question.vector.forEach((value, index) => {
      raw[index] += answer * value;
    });
    const contribution = answer * Math.max(...question.vector.map(Math.abs));
    subtypeScores.set(question.primary_subtype, (subtypeScores.get(question.primary_subtype) || 0) + contribution);
  });

  const weights = normalizeRaw(raw, bounds);
  const point = {
    x: weights[0] * VERTICES.Equity.x + weights[1] * VERTICES.Stability.x + weights[2] * VERTICES.Freedom.x,
    y: weights[0] * VERTICES.Equity.y + weights[1] * VERTICES.Stability.y + weights[2] * VERTICES.Freedom.y
  };
  const wing = classifyWing(weights);
  const drivers = topDrivers(subtypeScores);
  const profile = classifyProfile(answered);
  const labels = chooseLabels(wing, drivers, weights);
  return {
    raw,
    weights,
    point,
    wing,
    drivers,
    profile,
    labels,
    labelVerb: labelVerb(weights),
    giveUp: detectGiveUp(answered, wing),
    summary: makeSummary(wing, weights),
    tradeoff: makeTradeoff(wing)
  };
}

function normalizeRaw(raw, computedBounds) {
  const shifted = raw.map((value, index) => {
    const range = computedBounds.max[index] - computedBounds.min[index];
    return range ? (value - computedBounds.min[index]) / range : 0.5;
  });
  const total = shifted.reduce((sum, value) => sum + value, 0) || 1;
  return shifted.map(value => value / total);
}

function computeBounds(items) {
  const min = [0, 0, 0];
  const max = [0, 0, 0];
  items.forEach(question => {
    question.vector.forEach((value, index) => {
      const a = -2 * value;
      const b = 2 * value;
      min[index] += Math.min(a, b);
      max[index] += Math.max(a, b);
    });
  });
  return { min, max };
}

function classifyWing(weights) {
  const ranked = weights.map((value, index) => ({ value, pole: POLES[index] })).sort((a, b) => b.value - a.value);
  if (ranked[0].value - ranked[2].value < 0.12) return "Center / mixed";
  if (ranked[0].value - ranked[1].value >= 0.12) return ranked[0].pole;
  if (ranked[0].value - ranked[1].value <= 0.12 && ranked[1].value - ranked[2].value >= 0.10) {
    return [ranked[0].pole, ranked[1].pole].sort(byPoleOrder).join("-");
  }
  return "Center / mixed";
}

function byPoleOrder(a, b) {
  return POLES.indexOf(a) - POLES.indexOf(b);
}

function topDrivers(scores) {
  const ranked = [...scores.entries()]
    .filter(([, score]) => Math.abs(score) > 0.01)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, 6);
  if (!ranked.length) return ["Neutral answers muted the subtype signals."];
  return ranked.map(([name, score]) => `${score >= 0 ? "High" : "Low"} ${name}`);
}

function classifyProfile(answered) {
  const pairs = groupBy(answered, q => q.pair_id).filter(group => group.length > 1);
  let aligned = 0;
  let reversed = 0;
  pairs.forEach(group => {
    for (let i = 0; i < group.length; i += 1) {
      for (let j = i + 1; j < group.length; j += 1) {
        const a = contributionVector(group[i]);
        const b = contributionVector(group[j]);
        const similarity = cosine(a, b);
        if (similarity > 0.35) aligned += 1;
        if (similarity < -0.25) reversed += 1;
      }
    }
  });

  const costQuestions = answered.filter(q => q.meta_category === "Cost of Principle");
  const costStrength = costQuestions.reduce((sum, q) => sum + Math.abs(state.answers[q.id]), 0) / Math.max(1, costQuestions.length * 2);

  if (reversed > aligned * 0.75 && reversed >= 3) {
    return {
      title: "Conflicted profile",
      text: "Several paired answers reverse direction across principle, enforcement, and cost scenarios. The result is real, but your internal constraints are doing a lot of work."
    };
  }
  if (reversed >= 2 || costStrength < 0.42) {
    return {
      title: "Conditional pragmatist",
      text: "You hold identifiable commitments, but they weaken when enforcement, crisis, fiscal cost, public health, or security pressure enters the case."
    };
  }
  return {
    title: "Idealist / high cost-tolerance",
    text: "Your paired answers tend to point in the same direction, including on uglier cost-of-principle questions."
  };
}

function contributionVector(question) {
  const answer = state.answers[question.id] || 0;
  return question.vector.map(value => value * answer);
}

function detectGiveUp(answered, wing) {
  if (wing === "Center / mixed") {
    return "No single wing dominates enough to identify one clean sacrifice point. Your answers distribute constraint across the prism.";
  }
  const dominant = wing.split("-")[0];
  const dominantIndex = POLES.indexOf(dominant);
  const reversals = answered
    .map(question => ({ question, contribution: state.answers[question.id] * question.vector[dominantIndex] }))
    .filter(item => item.contribution < -0.5)
    .sort((a, b) => a.contribution - b.contribution)
    .slice(0, 2);
  if (!reversals.length) {
    return `Your ${dominant} commitments rarely reverse hard in the answered set; the main sacrifice is carried by the other poles rather than a specific exception.`;
  }
  const contexts = reversals.map(item => item.question.meta_category.toLowerCase()).join(" and ");
  return `Your ${dominant} commitments give ground most visibly under ${contexts} pressure.`;
}

function chooseLabels(wing, drivers, weights) {
  const text = drivers.join(" ").toLowerCase();
  const lowEquity = weights[0] < 0.29;
  const lowStability = weights[1] < 0.29;
  const lowFreedom = weights[2] < 0.29;
  const labels = [];

  if (wing === "Freedom" && /property|market|corporate|financial/.test(text) && lowEquity) {
    labels.push("right-libertarian", "market radical", "anarcho-capitalist-leaning");
  } else if (wing === "Freedom" && /speech|bodily|personal/.test(text)) {
    labels.push("civil libertarian", "anti-paternalist", "left-libertarian-leaning");
  } else if (wing === "Equity" && /economic|housing|labor|tax|educational/.test(text)) {
    labels.push("social democrat", "democratic socialist-leaning", "welfare-statist egalitarian");
  } else if (wing === "Equity" && /activism|systemic/.test(text) && lowStability) {
    labels.push("radical progressive", "egalitarian disruptor", "anti-institutional left");
  } else if (wing === "Stability" && /cultural|law|social trust|community/.test(text)) {
    labels.push("traditional conservative", "communitarian conservative", "order-first conservative");
  } else if (wing === "Stability" && /systemic|infrastructure|public health|fiscal/.test(text)) {
    labels.push("technocratic institutionalist", "developmentalist", "state-capacity-oriented");
  } else if (wing === "Stability" && lowFreedom) {
    labels.push("authoritarian-leaning", "security-statist", "order maximalist");
  } else if (wing === "Equity-Stability" || (weights[0] > .35 && weights[1] > .35 && lowFreedom)) {
    labels.push("paternalist social democrat", "state-centered egalitarian", "technocratic welfare-statist");
  } else if (wing === "Stability-Freedom" || (weights[1] > .35 && weights[2] > .35 && lowEquity)) {
    labels.push("conservative libertarian", "localist right", "property-order fusionist");
  } else if (wing === "Equity-Freedom" || (weights[0] > .35 && weights[2] > .35 && lowStability)) {
    labels.push("libertarian socialist-leaning", "civil-libertarian progressive", "anti-gatekeeping egalitarian");
  } else {
    labels.push("mixed institutionalist", "conditional pluralist", "pragmatic centrist");
  }

  return labels.slice(0, 3);
}

function labelVerb(weights) {
  const spread = Math.max(...weights) - Math.min(...weights);
  if (spread < 0.12) return "loosely resemble";
  if (spread < 0.22) return "share traits with";
  return "are closest to";
}

function makeSummary(wing, weights) {
  if (wing === "Center / mixed") {
    return "Your answers stay near the central cluster. That usually means either balanced pluralism, strong context-dependence, or unresolved tension between the three teloi.";
  }
  const sacrifice = POLES[weights.indexOf(Math.min(...weights))];
  return `Your map leans toward ${wing}. In this answer set, ${sacrifice} is the pole most often subordinated when priorities conflict.`;
}

function makeTradeoff(wing) {
  const copy = {
    Equity: "This orientation protects people against inherited advantage, deprivation, and exclusion. Its cost is a higher tolerance for overriding property, local continuity, or voluntary sorting when those produce unequal outcomes.",
    Stability: "This orientation protects continuity, public order, institutional competence, and shared norms. Its blind spot is that safety and cohesion can become excuses for hierarchy, surveillance, or blocked reform.",
    Freedom: "This orientation protects speech, exit, property, bodily autonomy, and voluntary exchange. Its cost is a greater willingness to accept unequal, unstable, or harsh outcomes as the price of agency.",
    "Equity-Stability": "This mix protects material security and institutional order together. It can build state capacity, but it risks paternalism when autonomy is treated as the negotiable value.",
    "Equity-Freedom": "This mix protects access and autonomy while distrusting gatekeeping institutions. It can be emancipatory, but it may underestimate coordination problems and public-order costs.",
    "Stability-Freedom": "This mix protects property, local authority, continuity, and exit rights. It can preserve trust and agency, but may tolerate inherited inequality or exclusion as acceptable background conditions.",
    "Center / mixed": "The center protects optionality and context. Its strength is caution; its weakness is that hard scarcity can force choices that moderation prefers to postpone."
  };
  return copy[wing] || copy["Center / mixed"];
}

function makeShareUrl() {
  const params = new URLSearchParams();
  params.set("seed", state.seed);
  params.set("a", encodeAnswers(state.answers, questions));
  return `${location.pathname}?${params.toString()}`;
}

function shareResult() {
  const fullUrl = `${location.origin}${makeShareUrl()}`;
  const toast = app.querySelector("#toast");
  if (navigator.share) {
    navigator.share({ title: "Political Prism Test result", url: fullUrl }).catch(() => {});
  }
  navigator.clipboard?.writeText(fullUrl).then(() => {
    toast.textContent = "Result link copied.";
  }).catch(() => {
    toast.textContent = fullUrl;
  });
}

function makePrism(point) {
  const template = document.querySelector("#prism-template");
  const fragment = template.content.cloneNode(true);
  if (point) {
    const group = fragment.querySelector(".result-point");
    group.removeAttribute("hidden");
    group.querySelector(".point-guide").setAttribute("x1", point.x);
    group.querySelector(".point-guide").setAttribute("y1", point.y);
    group.querySelector(".point-guide").setAttribute("x2", 559);
    group.querySelector(".point-guide").setAttribute("y2", 520);
    group.querySelectorAll("circle").forEach(circle => {
      circle.setAttribute("cx", point.x);
      circle.setAttribute("cy", point.y);
    });
    const label = group.querySelector(".point-label");
    const labelOnLeft = point.x > 700;
    label.setAttribute("x", labelOnLeft ? point.x - 38 : point.x + 38);
    label.setAttribute("y", point.y + 8);
    label.setAttribute("text-anchor", labelOnLeft ? "end" : "start");
  }
  const wrapper = document.createElement("div");
  wrapper.append(fragment);
  return wrapper.innerHTML;
}

function onKeydown(event) {
  if (state.screen !== "test") return;
  const key = Number(event.key);
  if (key >= 1 && key <= 5) {
    answerCurrent(ANSWER_VALUES[key - 1]);
  } else if (event.key === "ArrowLeft") {
    transitionQuestion("back", () => {
      state.index = Math.max(0, state.index - 1);
      persist();
      render();
    });
  } else if (event.key === "ArrowRight") {
    nextQuestion();
  }
}

function seededOrder(seed, items) {
  const rng = mulberry32(hashString(seed));
  return items.map(item => item.id)
    .map(id => ({ id, sort: rng() }))
    .sort((a, b) => a.sort - b.sort)
    .map(item => item.id);
}

function hashString(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  return function random() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function makeSeed() {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return bytes[0].toString(36);
}

function encodeAnswers(answers, items) {
  return items
    .slice()
    .sort((a, b) => a.id - b.id)
    .map(question => {
      const value = answers[question.id];
      return Number.isFinite(value) ? String(value + 2) : "2";
    })
    .join("");
}

function decodeAnswers(encoded, items) {
  const answers = {};
  items.slice().sort((a, b) => a.id - b.id).forEach((question, index) => {
    const digit = Number(encoded[index]);
    if (digit >= 0 && digit <= 4) answers[question.id] = digit - 2;
  });
  return answers;
}

function groupBy(items, getter) {
  const map = new Map();
  items.forEach(item => {
    const key = getter(item);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  });
  return [...map.values()];
}

function cosine(a, b) {
  const numerator = dot(a, b);
  const denom = Math.sqrt(dot(a, a)) * Math.sqrt(dot(b, b));
  return denom ? numerator / denom : 0;
}

function dot(a, b) {
  return a.reduce((sum, value, index) => sum + value * b[index], 0);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
