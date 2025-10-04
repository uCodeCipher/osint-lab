/* =========================================================
   OSINT & Google Dorking — Practice Quiz
   app.js — quiz logic (QUESTIONS φορτώνονται από questions.js)
   - Μία ερώτηση κάθε φορά
   - Προχωρά ΜΟΝΟ όταν η απάντηση είναι σωστή
   - Αν είναι λάθος: "Λάθος. Προσπάθησε ξανά."
   - Χωρίς σκορ
   - Start screen με κουμπί "ΞΕΚΙΝΑ ΤΟ ΚΟΥΙΖ"
   - Διαδραστικό background (canvas glow + floating icons)
========================================================= */

/* =========================
   HELPERS
========================= */
const $ = (id) => document.getElementById(id);
function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}
function normalise(s){
  return (s||"").toString().trim().toLowerCase()
    .replaceAll("ά","α").replaceAll("έ","ε").replaceAll("ή","η")
    .replaceAll("ί","ι").replaceAll("ό","ο").replaceAll("ύ","υ").replaceAll("ώ","ω")
    .replaceAll("ϊ","ι").replaceAll("ΐ","ι").replaceAll("ϋ","υ").replaceAll("ΰ","υ");
}

/* =========================
   STATE
========================= */
let order = [];
let idx = 0;

/* =========================
   RENDER ONE QUESTION
========================= */
function renderQuestion(){
  const q = order[idx];
  const stage = $("stage");
  stage.innerHTML = ""; // clear

  const card = document.createElement("article");
  card.className = "card";
  card.dataset.qid = q.id;

  // Badge
  const qid = document.createElement("div");
  qid.className = "qid";
  qid.textContent = `Q${idx + 1} / ${order.length}`;
  card.appendChild(qid);

  // Text
  const qtext = document.createElement("div");
  qtext.className = "qtext";
  qtext.textContent = q.question;
  card.appendChild(qtext);

  // Preface (αν υπάρχει)
  if(q.preface){
    const p = document.createElement("div");
    p.className = "meta";
    p.style.marginTop = "8px";
    p.textContent = q.preface;
    card.appendChild(p);
  }

  // Media (εικόνα inline +/ή link)
  if(q.media && (q.media.img || q.media.link)){
    const meta = document.createElement("div");
    meta.className = "meta";
    if(q.media.img){
      const wrap = document.createElement("div");
      wrap.className = "imgwrap";
      const im = document.createElement("img");
      im.src = q.media.img;
      im.alt = q.media.alt || "";
      wrap.appendChild(im);
      card.appendChild(wrap);
    }
    if(q.media.link){
      const a = document.createElement("a");
      a.href = q.media.link; a.target = "_blank"; a.rel = "noopener";
      a.textContent = "Άνοιγμα συνδέσμου υλικού";
      meta.appendChild(a);
    }
    card.appendChild(meta);
  }

  // Input area
  let inputArea;
  if(q.type === "mcq"){
    inputArea = document.createElement("div");
    inputArea.className = "options";
    shuffle(q.options).forEach((opt, i) => {
      const label = document.createElement("label");
      label.className = "opt";
      const id = `q${q.id}_opt${i}`;
      label.innerHTML = `<input type="radio" name="q_${q.id}" id="${id}" value="${opt}"> ${opt}`;
      inputArea.appendChild(label);
    });
  }else{
    inputArea = document.createElement("div");
    inputArea.className = "fill";
    if(q.blanks && q.blanks.trim().length > 0){
      const span = document.createElement("span");
      span.textContent = q.blanks;
      inputArea.appendChild(span);
    }
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Γράψε την απάντηση…";
    input.name = `q_${q.id}_fill`;
    inputArea.appendChild(input);
  }
  card.appendChild(inputArea);

  // Feedback + Submit
  const feedback = document.createElement("div");
  feedback.className = "feedback";
  card.appendChild(feedback);

  const actions = document.createElement("div");
  actions.style.display = "flex";
  actions.style.gap = "10px";
  actions.style.marginTop = "12px";

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Υποβολή";
  submitBtn.className = "btn-accent";
  actions.appendChild(submitBtn);

  card.appendChild(actions);
  stage.appendChild(card);

  // Submit handler
  submitBtn.addEventListener("click", () => {
    let ok = false;

    if(q.type === "mcq"){
      const chosen = card.querySelector('input[type="radio"]:checked');
      ok = !!(chosen && chosen.value === q.answer);
    }else{
      const inp = card.querySelector('input[type="text"]');
      if(inp){
        const val = normalise(inp.value);
        if(Array.isArray(q.answer)){
          ok = q.answer.map(a => normalise(a)).includes(val);
        }else{
          ok = (val === normalise(q.answer));
        }
      }
    }

    feedback.style.display = "block";
    if(ok){
      feedback.className = "feedback ok";
      feedback.textContent = "Σωστό!";
      setTimeout(() => goNext(), 600); // προχωρά μόνο όταν είναι σωστό
      updateProgress(true);
    }else{
      feedback.className = "feedback no";
      feedback.textContent = "Λάθος. Προσπάθησε ξανά.";
      updateProgress(false);
    }
  });

  // Αρχικές ενδείξεις προόδου
  updateProgressLabels();
}

/* =========================
   PROGRESS (χωρίς σκορ)
========================= */
function updateProgressLabels(){
  $("progressLabel").textContent = `Ερώτηση ${idx + 1}/${order.length}`;
}
function updateProgress(afterSubmit = false){
  const current = afterSubmit ? idx + 1 : idx;
  const pct = Math.round((current / order.length) * 100);
  $("progressBar").style.width = `${pct}%`;
  updateProgressLabels();
}

/* =========================
   FLOW
========================= */
function goNext(){
  idx++;
  if(idx < order.length){
    renderQuestion();
  }else{
    showSummary();
  }
}

function showSummary(){
  const stage = $("stage");
  stage.innerHTML = "";

  const card = document.createElement("article");
  card.className = "card";

  const qtext = document.createElement("div");
  qtext.className = "qtext";
  qtext.innerHTML = "Συγχαρητήρια!<br><span style='font-style:italic; color:#00BFFF;'>“Οι απειλές εξελίσσονται. Εξέλιξέ κι εσύ τον εαυτό σου.”</span>";
  card.appendChild(qtext);

  $("progressBar").style.width = "100%";
  $("progressLabel").textContent = `Ολοκληρώθηκε`;

  stage.appendChild(card);
}

/* =========================
   START
========================= */
function startQuiz(){
  const Q = Array.isArray(window.QUESTIONS) ? window.QUESTIONS : [];
  if (!Q.length){
    const stage = document.getElementById("stage");
    stage.innerHTML = `
      <article class="card">
        <div class="qtext">Δεν βρέθηκαν ερωτήσεις.</div>
        <div class="meta">Έλεγξε ότι το <strong>questions.js</strong> φορτώνεται πριν από το <strong>app.js</strong> 
        και ότι δεν υπάρχει συντακτικό λάθος μέσα στο αρχείο.</div>
      </article>`;
    document.getElementById("progressLabel").textContent = "Ερώτηση 0/0";
    return;
  }
  order = Q.slice().sort(()=>Math.random()-0.5);
  idx = 0;
  document.getElementById("progressBar").style.width = "0%";
  renderQuestion();
}

/* =========================
   INTERACTIVE BACKGROUND
========================= */
function initBackground(){
  // 1) Subtle animated glow on canvas
  const canvas = $("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  window.addEventListener("resize", resize);
  resize();

  let t = 0;
  (function loop(){
    t += 0.0045;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const cx = canvas.width * (0.55 + 0.18*Math.sin(t*1.1));
    const cy = canvas.height * (0.65 + 0.18*Math.cos(t*0.9));
    const r  = Math.max(canvas.width, canvas.height) * 0.55;
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grd.addColorStop(0, "rgba(96,43,123,0.10)");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    requestAnimationFrame(loop);
  })();

  // 2) Floating icons / hashtags
  const container = $("floaties");
  if (!container) return;
  const symbols = ["#OSINT","🔒","🔥","🛰️","#dorks","🛡️","💡","📡","⚙️","#security"];

  function spawn(){
    const el = document.createElement("div");
    el.className = "floaty";
    el.textContent = symbols[Math.floor(Math.random()*symbols.length)];

    // τυχαία οριζόντια θέση (σε pixels)
    const leftPx = Math.floor(Math.random() * (window.innerWidth - 40));
    el.style.left = `${leftPx}px`;

    // οριζόντιο drift (CSS var που χρησιμοποιεί το keyframe)
    const drift = (Math.random() * 160 - 80); // -80..+80px
    el.style.setProperty('--drift', `${drift}px`);

    const duration = 9 + Math.random()*8;   // 9–17s
    const delay    = Math.random()*0.6;

    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay    = `${delay}s`;

    container.appendChild(el);
    setTimeout(()=> el.remove(), (duration+1)*1000);
  }

  for(let i=0;i<6;i++) spawn();
  setInterval(spawn, 2200);
}

/* =========================
   DOM Ready
========================= */
window.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  if(startBtn){
    startBtn.addEventListener("click", () => {
      document.getElementById("startScreen").style.display = "none";
      document.getElementById("quizUI").style.display = "block";
      startQuiz();
    });
  }
  initBackground();
});
