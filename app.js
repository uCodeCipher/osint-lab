/* =========================================================
   OSINT & Google Dorking — Practice Quiz
   - Single-question flow
   - Start -> μία ερώτηση τη φορά
   - Προχώρα μόνο όταν είναι σωστό • λάθος => "Προσπάθησε ξανά."
   - Διαδραστικό background (canvas glow + floating icons)
========================================================= */

/* =========================
   QUIZ DATA
========================= */
const QUESTIONS = [
  /* ... (οι ίδιες ερωτήσεις όπως στο τελευταίο σου build) ... */

  // Δείχνω μόνο τις δύο που άλλαξες πρόσφατα (κρατάς και τις υπόλοιπες από πριν):
  {
    id: 11, type: "fill",
    question: "Σε ποια πόλη τραβήχτηκε αυτή η φωτογραφία;",
    blanks: "", // ζητήθηκε να φύγει το helper
    answer: ["bangkok","μπανγκοκ","μπανγκόκ","bangkok / μπανγκοκ","bangkok / μΠΑΝΓΚΟΚ"],
    explanation: "Σωστή απάντηση: Bangkok / ΜΠΑΝΓΚΟΚ",
    media: {
      img: "images/q11.png",
      link: "https://drive.google.com/file/d/1FfKGW9QZOSSsXIr3DcDmi2gAy5KTUb3m/view?usp=sharing"
    }
  },
  {
    id: 13, type: "mcq",
    question: "The Double Agent — Αναλύοντας το ίχνος του υπόπτου (δες τις εικόνες πριν απαντήσεις).",
    preface: "Έχουμε λάβει πληροφορίες ότι ένας από τους πράκτορές μας στο πεδίο μπορεί να έχει γίνει αδίστακτος. Υπάρχουν αυξανόμενες υποψίες ότι ενεργεί ως διπλός πράκτορας, εργαζόμενος και για τις δύο πλευρές. Έχουμε μόνο μία φωτογραφία του προσώπου του υπόπτου, αλλά βρήκαμε και τρεις φωτογραφίες από την προσωπική του συσκευή. Η αποστολή σας είναι να αναλύσετε αυτές τις φωτογραφίες και να αποκαλύψετε τα ίχνη του. Πού βρέθηκαν τα ίχνη του;",
    options: ["Mall","River","Temple","Nowhere"],
    answer: "Temple",
    explanation: "Το σκηνικό αντιστοιχεί σε ναό.",
    media: {
      img: "images/q3.png", // φρόντισε να υπάρχει αυτό το αρχείο (ή άλλαξε το όνομα)
      alt: "",
      link: "https://drive.google.com/drive/folders/1461UT6-E3bcxr5KBsjixqzGrw3MoLKgD?usp=sharing"
    }
  },

  /* === ΠΡΟΣΟΧΗ ===
     Εδώ πρέπει να τοποθετήσεις ΟΛΕΣ τις υπόλοιπες ερωτήσεις από την προηγούμενη έκδοση app.js.
     Δεν τις επαναλαμβάνω για οικονομία χώρου. Κάνε copy τις Q1,3,6,9,2,4,5,7,8,10,12 όπως πριν.
  */
];

/* =========================
   HELPERS
========================= */
const $ = (id) => document.getElementById(id);
function shuffle(arr){ const a = arr.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
function normalise(s){ return (s||"").toString().trim().toLowerCase()
  .replaceAll("ά","α").replaceAll("έ","ε").replaceAll("ή","η")
  .replaceAll("ί","ι").replaceAll("ό","ο").replaceAll("ύ","υ").replaceAll("ώ","ω")
  .replaceAll("ϊ","ι").replaceAll("ΐ","ι").replaceAll("ϋ","υ").replaceAll("ΰ","υ"); }

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
  stage.innerHTML = "";

  const card = document.createElement("article");
  card.className = "card";
  card.dataset.qid = q.id;

  const qid = document.createElement("div");
  qid.className = "qid";
  qid.textContent = `Q${idx+1} / ${order.length}`;
  card.appendChild(qid);

  const qtext = document.createElement("div");
  qtext.className = "qtext";
  qtext.textContent = q.question;
  card.appendChild(qtext);

  if(q.preface){
    const p = document.createElement("div");
    p.className = "meta";
    p.style.marginTop = "8px";
    p.textContent = q.preface;
    card.appendChild(p);
  }

  // media
  if(q.media && (q.media.img || q.media.link)){
    const meta = document.createElement("div"); meta.className = "meta";
    if(q.media.img){
      const wrap = document.createElement("div"); wrap.className = "imgwrap";
      const im = document.createElement("img"); im.src = q.media.img; im.alt = q.media.alt || "";
      wrap.appendChild(im); card.appendChild(wrap);
    }
    if(q.media.link){
      const a = document.createElement("a");
      a.href = q.media.link; a.target="_blank"; a.rel="noopener"; a.textContent = "Άνοιγμα συνδέσμου υλικού";
      meta.appendChild(a);
    }
    card.appendChild(meta);
  }

  // input
  let inputArea;
  if(q.type === "mcq"){
    inputArea = document.createElement("div"); inputArea.className = "options";
    shuffle(q.options).forEach((opt,i)=>{
      const label = document.createElement("label"); label.className = "opt";
      label.innerHTML = `<input type="radio" name="q_${q.id}" value="${opt}"> ${opt}`;
      inputArea.appendChild(label);
    });
  }else{
    inputArea = document.createElement("div"); inputArea.className = "fill";
    if(q.blanks && q.blanks.trim().length > 0){
      const span = document.createElement("span"); span.textContent = q.blanks; inputArea.appendChild(span);
    }
    const input = document.createElement("input"); input.type="text"; input.placeholder="Γράψε την απάντηση…"; input.name=`q_${q.id}_fill`;
    inputArea.appendChild(input);
  }
  card.appendChild(inputArea);

  // feedback + submit
  const feedback = document.createElement("div"); feedback.className="feedback"; card.appendChild(feedback);
  const submitBtn = document.createElement("button"); submitBtn.textContent="Υποβολή"; submitBtn.className="btn-accent";
  card.appendChild(submitBtn);

  $("stage").appendChild(card);

  submitBtn.addEventListener("click", ()=>{
    let ok=false;
    if(q.type==="mcq"){
      const chosen = card.querySelector('input[type="radio"]:checked');
      ok = !!(chosen && chosen.value === q.answer);
    }else{
      const inp = card.querySelector('input[type="text"]');
      if(inp){
        const val = normalise(inp.value);
        ok = Array.isArray(q.answer) ? q.answer.map(a=>normalise(a)).includes(val) : (val===normalise(q.answer));
      }
    }

    feedback.style.display="block";
    if(ok){
      feedback.className="feedback ok";
      feedback.textContent="Σωστό!";
      setTimeout(()=>goNext(), 600);
      updateProgress(true);
    }else{
      feedback.className="feedback no";
      feedback.textContent="Λάθος. Προσπάθησε ξανά.";
      updateProgress(false);
    }
  });

  updateProgressLabels();
}

/* =========================
   PROGRESS
========================= */
function updateProgressLabels(){ $("progressLabel").textContent = `Ερώτηση ${idx+1}/${order.length}`; }
function updateProgress(after=false){
  const current = after ? idx+1 : idx;
  const pct = Math.round((current/order.length)*100);
  $("progressBar").style.width = `${pct}%`;
  updateProgressLabels();
}

/* =========================
   FLOW
========================= */
function goNext(){ idx++; if(idx<order.length){ renderQuestion(); } else { showSummary(); } }
function showSummary(){
  const stage=$("stage"); stage.innerHTML="";
  const card=document.createElement("article"); card.className="card";
  const qtext=document.createElement("div"); qtext.className="qtext"; qtext.textContent="Συγχαρητήρια! Ολοκλήρωσες το quiz.";
  card.appendChild(qtext); $("progressBar").style.width="100%"; $("progressLabel").textContent="Ολοκληρώθηκε"; stage.appendChild(card);
}

/* =========================
   START
========================= */
function startQuiz(){ order = shuffle(QUESTIONS); idx=0; $("progressBar").style.width="0%"; renderQuestion(); }

window.addEventListener("DOMContentLoaded", ()=>{
  // start
  document.getElementById("startBtn").addEventListener("click", ()=>{
    document.getElementById("startScreen").style.display="none";
    document.getElementById("quizUI").style.display="block";
    startQuiz();
  });

  // background init
  initBackground();
});
