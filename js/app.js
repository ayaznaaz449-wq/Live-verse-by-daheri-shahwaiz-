(() => {
  const D = window.LIFEVERSE_DATA;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  const store = {
    get(k, fallback) {
      try {
        const v = localStorage.getItem("lifeverse_" + k);
        return v === null ? fallback : JSON.parse(v);
      } catch {
        return fallback;
      }
    },
    set(k, v) {
      localStorage.setItem("lifeverse_" + k, JSON.stringify(v));
    }
  };

  const dateKey = new Date().toISOString().slice(0, 10);
  const visits = store.get("visits", { total: 0, days: {}, log: [] });
  visits.total += 1;
  visits.days[dateKey] = (visits.days[dateKey] || 0) + 1;
  visits.log.unshift({
    time: new Date().toLocaleString(),
    page: location.hash || "#home"
  });
  visits.log = visits.log.slice(0, 50);
  store.set("visits", visits);
  store.set("lastVisit", new Date().toISOString());

  function renderWorlds() {
    $("#worldGrid").innerHTML = D.worlds.map(w => `
      <article class="world-card" tabindex="0" role="button"
        aria-label="Explore ${w.title}" data-world="${w.id}"
        style="--card-glow:${w.glow}">
        <div class="world-icon">${w.icon}</div>
        <div class="eyebrow">${w.tag}</div>
        <h3>${w.title}</h3>
        <p>${w.description}</p>
        <div class="world-bottom">
          <span>${w.count}</span><span>↗</span>
        </div>
      </article>`).join("");

    $$(".world-card").forEach(card => {
      const open = () => showWorld(card.dataset.world);
      card.addEventListener("click", open);
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });
  }

  function showWorld(id) {
    const w = D.worlds.find(x => x.id === id);
    if (!w) return;

    $("#detailContent").innerHTML = `
      <div class="detail-hero">
        <div class="detail-emoji">${w.emojiBig || w.icon}</div>
        <div>
          <div class="eyebrow">${w.tag}</div>
          <h2 id="detailTitle">${w.title}</h2>
          <p>${w.summary}</p>
        </div>
      </div>
      <div class="detail-body">
        ${w.facts.map(f => `
          <div class="detail-block">
            <h4>${f[0]}</h4><p>${f[1]}</p>
          </div>`).join("")}
        <div class="detail-block detail-wide">
          <h4>3D EXPLORER NOTE</h4>
          <p>This starter build provides interactive learning cards and
          creature comparisons. For a true rotatable 3D view, add licensed
          GLB/GLTF models and connect them to a 3D viewer.</p>
        </div>
      </div>`;

    openModal("detailModal");
  }

  function renderDiseases() {
    const term = ($("#diseaseSearch").value || "").toLowerCase().trim();
    const type = $("#diseaseFilter").value;

    const list = D.diseases.filter(d =>
      (type === "all" || d.type === type) &&
      [d.name, d.organ, d.cause, d.symptoms]
        .join(" ").toLowerCase().includes(term)
    );

    $("#diseaseGrid").innerHTML = list.length
      ? list.map(d => `
        <article class="disease-card" tabindex="0" role="button"
          data-disease="${D.diseases.indexOf(d)}">
          <div class="disease-type">
            ${d.type.toUpperCase()} • ${d.organ.toUpperCase()}
          </div>
          <h3>${d.emoji || "🩺"} ${d.name}</h3>
          <p>${d.cause}</p>
        </article>`).join("")
      : `<div class="empty-state">No matching topics found. Try another search.</div>`;

    $$(".disease-card").forEach(c => {
      const open = () => showDisease(Number(c.dataset.disease));
      c.addEventListener("click", open);
      c.addEventListener("keydown", e => {
        if (e.key === "Enter") open();
      });
    });
  }

  function showDisease(i) {
    const d = D.diseases[i];
    if (!d) return;

    $("#detailContent").innerHTML = `
      <div class="detail-hero">
        <div class="detail-emoji">${d.emoji || "🩺"}</div>
        <div>
          <div class="eyebrow">HEALTH EXPLORER • ${d.type.toUpperCase()}</div>
          <h2 id="detailTitle">${d.name}</h2>
          <p>Related system: ${d.organ}</p>
        </div>
      </div>
      <div class="detail-body">
        <div class="detail-block">
          <h4>COMMON CAUSES & RISK FACTORS</h4><p>${d.cause}</p>
        </div>
        <div class="detail-block">
          <h4>POSSIBLE SYMPTOMS</h4><p>${d.symptoms}</p>
        </div>
        <div class="detail-block">
          <h4>PREVENTION & RISK REDUCTION</h4><p>${d.prevention}</p>
        </div>
        <div class="detail-block">
          <h4>DIAGNOSIS & CARE</h4><p>${d.care}</p>
        </div>
        <div class="detail-block detail-wide">
          <h4>IMPORTANT MEDICAL NOTE</h4>
          <p>This is general educational information, not a diagnosis or
          personal treatment plan. Consult a qualified healthcare professional
          for personal symptoms.</p>
        </div>
      </div>`;

    openModal("detailModal");
  }

  function setupCompare() {
    const opts = D.creatures.map(c =>
      `<option value="${c.id}">${c.name}</option>`
    ).join("");

    $("#creatureA").innerHTML = opts;
    $("#creatureB").innerHTML = opts;
    $("#creatureA").value = "human";
    $("#creatureB").value = "lion";

    $("#creatureA").addEventListener("change", updateCompare);
    $("#creatureB").addEventListener("change", updateCompare);
    updateCompare();
  }

  function updateCompare() {
    const a = D.creatures.find(c =>
      c.id === $("#creatureA").value
    ) || D.creatures[0];

    const b = D.creatures.find(c =>
      c.id === $("#creatureB").value
    ) || D.creatures[1];

    $("#compareA").textContent = a.emoji;
    $("#compareB").textContent = b.emoji;
    $("#nameA").textContent = a.name;
    $("#nameB").textContent = b.name;

    const fields = [
      ["Classification", "class"],
      ["Breathing", "breathing"],
      ["Skeleton", "skeleton"],
      ["Heart", "heart"],
      ["Diet", "diet"],
      ["Movement", "movement"]
    ];

    $("#compareResults").innerHTML = fields.map(([label, key]) => `
      <div class="compare-fact">
        <small>${label}</small>
        <b>${a[key]}</b>
        <div style="height:1px;background:var(--line);margin:9px 0"></div>
        <b>${b[key]}</b>
      </div>`).join("");
  }

  let quizIndex = 0;
  let quizScore = 0;
  let answered = false;

  function renderQuiz() {
    const q = D.quiz[quizIndex];
    answered = false;

    $("#quizCount").textContent =
      `QUESTION ${quizIndex + 1} / ${D.quiz.length}`;

    $("#quizQuestion").textContent = q.q;
    $("#quizFeedback").textContent = "";

    $("#quizAnswers").innerHTML = q.answers.map((a, i) => `
      <button class="quiz-answer" data-answer="${i}">
        ${String.fromCharCode(65 + i)}. ${a}
      </button>`).join("");

    $$(".quiz-answer").forEach(btn => {
      btn.addEventListener("click", () =>
        answerQuiz(Number(btn.dataset.answer))
      );
    });

    $("#nextQuestion").disabled = true;
    $("#nextQuestion").textContent =
      quizIndex === D.quiz.length - 1
        ? "See result →"
        : "Next question →";
  }

  function answerQuiz(i) {
    if (answered) return;
    answered = true;

    const q = D.quiz[quizIndex];

    $$(".quiz-answer").forEach((b, j) => {
      b.disabled = true;
      if (j === q.correct) b.classList.add("correct");
      if (j === i && i !== q.correct) b.classList.add("wrong");
    });

    if (i === q.correct) quizScore++;

    $("#quizFeedback").textContent =
      (i === q.correct ? "Correct! " : "Not quite. ") + q.why;

    $("#nextQuestion").disabled = false;
  }

  $("#nextQuestion").addEventListener("click", () => {
    if (!answered) return;

    if (quizIndex < D.quiz.length - 1) {
      quizIndex++;
      renderQuiz();
    } else {
      $("#quizQuestion").textContent =
        `You scored ${quizScore} / ${D.quiz.length}!`;

      $("#quizAnswers").innerHTML = `
        <div class="empty-state">
          ${quizScore >= 4
            ? "Excellent science explorer!"
            : "Keep exploring and try again."}
        </div>`;

      $("#quizFeedback").textContent =
        "Your score is for this session only.";

      $("#nextQuestion").textContent = "Try again ↻";
      $("#nextQuestion").disabled = false;
      $("#nextQuestion").onclick = () => {
        quizIndex = 0;
        quizScore = 0;
        $("#nextQuestion").onclick = null;
        renderQuiz();
      };
    }
  });

  function openModal(id) {
    const m = $("#" + id);
    m.classList.add("open");
    m.setAttribute("aria-hidden", "false");
  }

  function closeModal(id) {
    const m = $("#" + id);
    m.classList.remove("open");
    m.setAttribute("aria-hidden", "true");
  }

  $$("[data-close]").forEach(b =>
    b.addEventListener("click", () => closeModal(b.dataset.close))
  );

  $$(".modal-backdrop").forEach(m =>
    m.addEventListener("click", e => {
      if (e.target === m) closeModal(m.id);
    })
  );

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      $$(".modal-backdrop.open").forEach(m => closeModal(m.id));
    }
  });

  let toastTimer;

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
  }

  $("#diseaseSearch").addEventListener("input", renderDiseases);
  $("#diseaseFilter").addEventListener("change", renderDiseases);
  $("#adminOpen").addEventListener("click", () => showAdminLogin());

  function showAdminLogin() {
    const logged = store.get("adminLogged", false);

    if (logged) {
      renderAdmin("overview");
      openModal("adminModal");
      return;
    }

    $("#adminContent").innerHTML = `
      <div class="admin-head">
        <div>
          <div class="eyebrow">PRIVATE AREA</div>
          <h2 id="adminTitle">Admin dashboard</h2>
          <p>Sign in to view this browser's demo analytics and settings.</p>
        </div>
      </div>
      <form id="adminLoginForm" class="admin-form">
        <label>Username
          <input id="adminUser" autocomplete="username" required value="admin">
        </label>
        <label>Password
          <input id="adminPass" type="password"
            autocomplete="current-password" required placeholder="Enter demo password">
        </label>
        <button class="button button-primary" type="submit">
          Login to dashboard →
        </button>
      </form>
      <p class="admin-warning">
        Demo login: username <b>admin</b>, password <b>LifeVerse@2026</b>.
        This client-side login is for a school-project demo only and is not
        secure for a public website.
      </p>`;

    $("#adminLoginForm").addEventListener("submit", e => {
      e.preventDefault();

      const user = $("#adminUser").value.trim();
      const pass = $("#adminPass").value;
      const savedPass = store.get("adminPassword", "LifeVerse@2026");
      const savedUser = store.get("adminUsername", "admin");

      if (user === savedUser && pass === savedPass) {
        store.set("adminLogged", true);
        renderAdmin("overview");
      } else {
        toast("Incorrect username or password.");
      }
    });

    openModal("adminModal");
  }

  function renderAdmin(tab) {
    const v = store.get("visits", { total: 0, days: {}, log: [] });
    const today = v.days[dateKey] || 0;

    const views7 = Object.entries(v.days)
      .filter(([d]) =>
        (Date.now() - new Date(d + "T00:00:00").getTime()) <=
        7 * 86400000
      )
      .reduce((s, [, n]) => s + n, 0);

    const tabs = [
      ["overview", "Overview"],
      ["analytics", "Visitor log"],
      ["settings", "Settings"]
    ];

    $("#adminContent").innerHTML = `
      <div class="admin-head">
        <div>
          <div class="eyebrow">LIFEVERSE CONTROL CENTER</div>
          <h2 id="adminTitle">Admin dashboard</h2>
          <p>Manage this demo and inspect local browser analytics.</p>
        </div>
        <button class="button button-ghost" id="adminLogout">Log out</button>
      </div>
      <div class="admin-tabs">
        ${tabs.map(([id, label]) => `
          <button class="admin-tab ${id === tab ? "active" : ""}"
            data-admin-tab="${id}">${label}</button>`).join("")}
      </div>
      <div id="adminPanel"></div>`;

    $$(".admin-tab").forEach(b =>
      b.addEventListener("click", () => renderAdmin(b.dataset.adminTab))
    );

    $("#adminLogout").addEventListener("click", () => {
      store.set("adminLogged", false);
      showAdminLogin();
    });

    const panel = $("#adminPanel");

    if (tab === "overview") {
      panel.innerHTML = `
        <div class="admin-stats">
          <div class="admin-stat">
            <span>Total page loads (this browser)</span><b>${v.total}</b>
          </div>
          <div class="admin-stat">
            <span>Today (this browser)</span><b>${today}</b>
          </div>
          <div class="admin-stat">
            <span>Last 7 days (this browser)</span><b>${views7}</b>
          </div>
        </div>
        <div class="admin-content-panel">
          <h3>Project status</h3>
          <p>Interactive categories: ${D.worlds.length} ·
          Disease topics: ${D.diseases.length} ·
          Comparison creatures: ${D.creatures.length} ·
          Quiz questions: ${D.quiz.length}</p>
          <p class="admin-warning">
            Analytics are stored in this browser only. They are not shared
            across visitors or devices.
          </p>
        </div>`;
    } else if (tab === "analytics") {
      const rows = (v.log || []).map(x => `
        <tr><td>${escapeHtml(x.time)}</td>
        <td>${escapeHtml(x.page)}</td></tr>`).join("");

      panel.innerHTML = `
        <div class="admin-content-panel">
          <h3>Recent page loads</h3>
          <p>Only activity recorded by this browser is visible here.</p>
          <table class="admin-table">
            <thead><tr><th>Time</th><th>Page / hash</th></tr></thead>
            <tbody>${rows ||
              "<tr><td colspan='2'>No activity recorded yet.</td></tr>"}
            </tbody>
          </table>
          <button class="button button-ghost" id="exportVisits"
            style="margin-top:14px">Export local log as JSON</button>
        </div>`;

      $("#exportVisits").addEventListener("click", () => {
        const blob = new Blob([JSON.stringify(v, null, 2)], {
          type: "application/json"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "lifeverse-local-analytics.json";
        a.click();
        URL.revokeObjectURL(url);
      });
    } else {
      panel.innerHTML = `
        <div class="admin-content-panel">
          <h3>Dashboard settings</h3>
          <form id="settingsForm" class="admin-form">
            <label>Admin username
              <input id="newAdminUser" required
                value="${escapeHtml(store.get("adminUsername", "admin"))}">
            </label>
            <label>New password
              <input id="newAdminPass" type="password" minlength="8"
                placeholder="At least 8 characters">
            </label>
            <button class="button button-primary" type="submit">
              Save settings
            </button>
          </form>
          <p class="admin-warning">
            These settings are stored only in this browser and are not
            secure server-side credentials.
          </p>
          <button class="button button-ghost" id="resetAnalytics">
            Reset local analytics
          </button>
        </div>`;

      $("#settingsForm").addEventListener("submit", e => {
        e.preventDefault();

        const u = $("#newAdminUser").value.trim();
        const p = $("#newAdminPass").value;

        if (p && p.length < 8) {
          toast("Password must be at least 8 characters.");
          return;
        }

        store.set("adminUsername", u);
        if (p) store.set("adminPassword", p);

        toast("Local settings saved.");
        renderAdmin("settings");
      });

      $("#resetAnalytics").addEventListener("click", () => {
        if (confirm("Reset visitor counters for this browser?")) {
          store.set("visits", { total: 0, days: {}, log: [] });
          toast("Local analytics reset.");
          renderAdmin("overview");
        }
      });
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));
  }

  renderWorlds();
  renderDiseases();
  setupCompare();
  renderQuiz();
})();
