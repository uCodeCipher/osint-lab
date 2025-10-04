
const $ = (id) => document.getElementById(id);

function normalise(s){
  return (s||"").toString().trim().toLowerCase()
    .replaceAll("ά","α").replaceAll("έ","ε").replaceAll("ή","η")
    .replaceAll("ί","ι").replaceAll("ό","ο").replaceAll("ύ","υ").replaceAll("ώ","ω")
    .replaceAll("ϊ","ι").replaceAll("ΐ","ι").replaceAll("ϋ","υ").replaceAll("ΰ","υ");
}

async function sha256hex(str){
  const enc = new TextEncoder().encode(normalise(str));
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}


let order = [];
let idx = 0;

/* =========================
   Utility: correctness checks (hash-first, fallback plaintext NOT included)
========================= */
async function isFillCorrect(q, userInput){
  if (!q) return false;
  if (Array.isArray(q.hashes) && q.hashes.length){
    const h = await sha256hex(userInput);
    return q.hashes.includes(h);
  }
  // If no hashes present, fallback: compare normalized to q.answer if present (legacy)
  if (q.answer){
    const val = normalise(userInput);
    return q.answer.map(a=>normalise(a)).includes(val);
  }
  return false;
}

async function isMcqCorrect(q, chosenValue){
  if (!q) return false;
  if (q.answerHash){
    const h = await sha256hex(chosenValue);
    return h === q.answerHash;
  }
  // fallback to plaintext comparison if present
  if (q.answer){
    return chosenValue === q.answer;
  }
  return false;
}

/* =========================
   RENDER ONE QUESTION
========================= */
function renderQuestion(){
  try{
    const q = order[idx];
    const stage = $("stage");
    stage.innerHTML = "";

    if(!q){
      stage.innerHTML = `<article class="card"><div class="qtext">Δεν βρέθηκε η ερώτηση.</div></article>`;
      return;
    }

    const card = document.createElement("article");
    card.className = "card";
    card.dataset.qid = q.id;

    // Badge
    const qid = document.createElement("div"); qid.className = "qid"; qid.textContent = `Q${idx + 1} / ${order.length}`; card.appendChild(qid);

    // Question text
    const qtext = document.createElement("div"); qtext.className = "qtext"; qtext.textContent = q.question; card.appendChild(qtext);

    // Preface
    if(q.preface){
      const p = document.createElement("div"); p.className = "meta"; p.style.marginTop = "8px"; p.textContent = q.preface; card.appendChild(p);
    }

    // Media
    if(q.media && (q.media.img || q.media.link)){
      if(q.media.img){
        const wrap = document.createElement("div"); wrap.className = "imgwrap";
        const im = document.createElement("img"); im.src = q.media.img; im.alt = q.media.alt || "";
        wrap.appendChild(im); card.appendChild(wrap);
      }
      if(q.media.link){
        const meta = document.createElement("div"); meta.className = "meta";
        const a = document.createElement("a"); a.href = q.media.link; a.target="_blank"; a.rel="noopener"; a.textContent = "Άνοιγμα συνδέσμου υλικού";
        meta.appendChild(a); card.appendChild(meta);
      }
    }

    // Input area
    let inputArea;
    if(q.type === "mcq"){
      inputArea = document.createElement("div"); inputArea.className = "options";
      const opts = shuffle(q.options || []);
      opts.forEach((opt,i) => {
        const label = document.createElement("label"); label.className = "opt";
        label.innerHTML = `<input type="radio" name="q_${q.id}" value="${opt}"> ${opt}`;
        inputArea.appendChild(label);
      });
    } else {
      inputArea = document.createElement("div"); inputArea.className = "fill";
      if(q.blanks && q.blanks.trim().length > 0){
        const span = document.createElement("span"); span.textContent = q.blanks; inputArea.appendChild(span);
      }
      const input = document.createElement("input"); input.type="text"; input.placeholder="Γράψε την απάντηση…"; input.name=`q_${q.id}_fill`;
      inputArea.appendChild(input);
    }
    card.appendChild(inputArea);

    // Feedback + submit
    const feedback = document.createElement("div"); feedback.className = "feedback"; card.appendChild(feedback);
    const actions = document.createElement("div"); actions.style.display="flex"; actions.style.gap="10px"; actions.style.marginTop="12px";
    const submitBtn = document.createElement("button"); submitBtn.textContent="Υποβολή"; submitBtn.className="btn-accent";
    actions.appendChild(submitBtn); card.appendChild(actions);

    stage.appendChild(card);

    // Submit handler (async because sha256)
    submitBtn.addEventListener("click", async () => {
      let ok = false;
      if(q.type === "mcq"){
        const chosen = card.querySelector('input[type="radio"]:checked');
        if(chosen) ok = await isMcqCorrect(q, chosen.value);
      } else {
        const inp = card.querySelector('input[type="text"]');
        if(inp) ok = await isFillCorrect(q, inp.value);
      }

      feedback.style.display = "block";
      if(ok){
        feedback.className = "feedback ok"; feedback.textContent = "Σωστό!";
        updateProgress(true);
        setTimeout(()=> goNext(), 600);
      } else {
        feedback.className = "feedback no"; feedback.textContent = "Λάθος. Προσπάθησε ξανά.";
        updateProgress(false);
      }
    });

    updateProgressLabels();
  }catch(err){
    console.error("renderQuestion error:", err);
    const stage = $("stage"); stage.innerHTML = `<article class="card"><div class="qtext">Σφάλμα απεικόνισης ερώτησης.</div><div class="meta">${String(err.message||err)}</div></article>`;
  }
}

/* =========================
   PROGRESS UI
========================= */
function updateProgressLabels(){ $("progressLabel").textContent = `Ερώτηση ${idx+1}/${order.length}`; }
function updateProgress(afterSubmit=false){
  const current = afterSubmit ? idx+1 : idx;
  const pct = Math.round((current / order.length) * 100);
  $("progressBar").style.width = `${pct}%`;
  updateProgressLabels();
}

/* =========================
   FLOW
========================= */
function goNext(){ idx++; if(idx < order.length) renderQuestion(); else showSummary(); }

function showSummary(){
  const stage = $("stage"); stage.innerHTML = "";
  const card = document.createElement("article"); card.className = "card";
  const qtext = document.createElement("div"); qtext.className = "qtext";
  qtext.innerHTML = "Συγχαρητήρια!<br><span style='font-style:italic; color:#00BFFF;'>Οι απειλές εξελίσσονται. Εξέλιξέ κι εσύ τον εαυτό σου.</span>";
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
  if(!Q.length){
    const stage = $("stage");
    stage.innerHTML = `<article class="card"><div class="qtext">Δεν βρέθηκαν ερωτήσεις.</div><div class="meta">Έλεγξε ότι το <strong>questions.js</strong> φορτώνεται πριν από το <strong>app.js</strong>.</div></article>`;
    document.getElementById("progressLabel").textContent = "Ερώτηση 0/0";
    return;
  }
  order = shuffle(Q);
  idx = 0;
  $("progressBar").style.width = "0%";
  renderQuestion();
}

/* =========================
   BACKGROUND (canvas + floaties)
========================= */
function initBackground(){
  const canvas = $("bg-canvas"); if(!canvas) return;
  const ctx = canvas.getContext("2d");
  function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  window.addEventListener("resize", resize); resize();

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
    ctx.fillStyle = grd; ctx.fillRect(0,0,canvas.width,canvas.height);
    requestAnimationFrame(loop);
  })();

  const container = $("floaties"); if(!container) return;
  const symbols = ["#OSINT","🔒","🔥","🛰️","#dorks","🛡️","💡","📡","⚙️","#security"];
  function spawn(){
    const el = document.createElement("div"); el.className = "floaty";
    el.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    el.style.left = Math.floor(Math.random()*(window.innerWidth-40)) + "px";
    el.style.setProperty('--drift', (Math.random()*160-80) + "px");
    const duration = 9 + Math.random()*8; const delay = Math.random()*0.6;
    el.style.animationDuration = `${duration}s`; el.style.animationDelay = `${delay}s`;
    container.appendChild(el); setTimeout(()=> el.remove(), (duration+1)*1000);
  }
  for(let i=0;i<6;i++) spawn(); setInterval(spawn, 2200);
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
