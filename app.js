/* =========================================================
   OSINT & Google Dorking — Practice Quiz
   Single-question flow + interactive background
========================================================= */

const QUESTIONS = [
  // === παράδειγμα 2 ερωτήσεων (πρέπει να βάλεις ΟΛΕΣ τις υπόλοιπες από πριν) ===
  
  {
    id: 1, type: "fill",
    question: "Εντόπισε σελίδες «Ξέχασα τον κωδικό» που μπορεί να είναι εκτεθειμένες.",
    blanks: "_____:forgot _____:example.com",
    answer: ["inurl site", "inurl  site", "inurl   site"],
    explanation: "inurl:forgot + site:example.com για περιορισμό στο domain."
  },
  {
    id: 3, type: "fill",
    question: "Εντόπισε εμπιστευτικά PDF έγγραφα σε ένα website.",
    blanks: "site:example.com filetype:_____ \"confidential\"",
    answer: ["pdf"],
    explanation: "filetype:pdf φιλτράρει τα αποτελέσματα σε PDF."
  },
  {
    id: 6, type: "fill",
    question: "Εντόπισε δημόσια αρχεία ρυθμίσεων Wi-Fi.",
    blanks: "filetype:_____ intitle: settings _______",
    answer: ["config wifi", "config  wifi", "config   wifi"],
    explanation: "filetype:config + intitle:settings + λέξη-στόχος wifi."
  },
  {
    id: 9, type: "fill",
    question: "Εντόπισε σελίδες σύνδεσης (login) που μπορεί να είναι εκτεθειμένες.",
    blanks: "inurl: admin _____",
    answer: ["login"],
    explanation: "Συνδυασμός admin + login σε URL paths."
  },

  
  {
    id: 11, type: "fill",
    question: "Σε ποια πόλη τραβήχτηκε αυτή η φωτογραφία;",
    
    blanks: "",
    answer: ["bangkok", "μπανγκοκ", "μπανγκόκ", "bangkok / μπανγκοκ", "bangkok / μΠΑΝΓΚΟΚ"],
    explanation: "Σωστή απάντηση: Bangkok / ΜΠΑΝΓΚΟΚ",
    media: {
      // εάν έχεις ανέβασμα, άλλαξε σε αυτό το path ή ανέβασε το αρχείο images/q11.png
      img: "images/q11.png",
      link: "https://drive.google.com/file/d/1FfKGW9QZOSSsXIr3DcDmi2gAy5KTUb3m/view?usp=sharing"
    }
  },
  {
    id: 12, type: "fill",
    question: "Βρες τον ιδιοκτήτη του domain opensource.org.",
    blanks: "",
    answer: [
      "open source initiative",
      "open-source initiative",
      "open source  initiative",
      "opensource initiative"
    ],
    explanation: "Σωστή απάντηση: Open Source Initiative"
  },
  {
    id: 13, type: "mcq",
    question: "The Double Agent — Αναλύοντας το ίχνος του υπόπτου (δες τις εικόνες πριν απαντήσεις).",
    // appended sentence as requested
    preface: "Έχουμε λάβει πληροφορίες ότι ένας από τους πράκτορές μας στο πεδίο μπορεί να έχει γίνει αδίστακτος. Υπάρχουν αυξανόμενες υποψίες ότι ενεργεί ως διπλός πράκτορας, εργαζόμενος και για τις δύο πλευρές. Έχουμε μόνο μία φωτογραφία του προσώπου του υπόπτου, αλλά βρήκαμε και τρεις φωτογραφίες από την προσωπική του συσκευή. Η αποστολή σας είναι να αναλύσετε αυτές τις φωτογραφίες και να αποκαλύψετε τα ίχνη του. Πού βρέθηκαν τα ίχνη του;",
    options: ["Mall", "River", "Temple", "Nowhere"],
    answer: "Temple",
    explanation: "Το σκηνικό αντιστοιχεί σε ναό.",
    media: {
      // βάλε εδώ το image file που θέλεις. ο χρήστης ανέφερε q3.png → το βάζω ως default
      img: "images/q3.png",
      alt: "Υπόπτος — εικόνα από προσωπική συσκευή",
      link: "https://drive.google.com/drive/folders/1461UT6-E3bcxr5KBsjixqzGrw3MoLKgD?usp=sharing"
    }
  }
];
];

const $ = id => document.getElementById(id);
function shuffle(a){return a.sort(()=>Math.random()-0.5);}
function normalise(s){return (s||"").toString().trim().toLowerCase();}

let order=[], idx=0;

function renderQuestion(){
  const q=order[idx], stage=$("stage"); stage.innerHTML="";
  const card=document.createElement("article"); card.className="card";

  const qid=document.createElement("div"); qid.className="qid"; qid.textContent=`Q${idx+1}/${order.length}`; card.appendChild(qid);
  const qtext=document.createElement("div"); qtext.className="qtext"; qtext.textContent=q.question; card.appendChild(qtext);
  if(q.preface){const p=document.createElement("div"); p.className="meta"; p.textContent=q.preface; card.appendChild(p);}
  if(q.media&&q.media.img){const w=document.createElement("div"); w.className="imgwrap"; const im=document.createElement("img"); im.src=q.media.img; w.appendChild(im); card.appendChild(w);}

  let inputArea; 
  if(q.type==="mcq"){ inputArea=document.createElement("div"); inputArea.className="options";
    shuffle(q.options).forEach(opt=>{
      const label=document.createElement("label"); label.className="opt";
      label.innerHTML=`<input type="radio" name="q_${q.id}" value="${opt}"> ${opt}`;
      inputArea.appendChild(label);
    });
  }else{ inputArea=document.createElement("div"); inputArea.className="fill";
    const inp=document.createElement("input"); inp.type="text"; inp.placeholder="Γράψε την απάντηση…"; inputArea.appendChild(inp);
  }
  card.appendChild(inputArea);

  const feedback=document.createElement("div"); feedback.className="feedback"; card.appendChild(feedback);
  const btn=document.createElement("button"); btn.textContent="Υποβολή"; btn.className="btn-accent"; card.appendChild(btn);

  stage.appendChild(card);

  btn.addEventListener("click",()=>{
    let ok=false;
    if(q.type==="mcq"){const c=card.querySelector('input[type="radio"]:checked'); ok=!!(c&&c.value===q.answer);}
    else{const v=normalise(card.querySelector('input').value); ok=q.answer.map(a=>normalise(a)).includes(v);}
    feedback.style.display="block";
    if(ok){feedback.className="feedback ok"; feedback.textContent="Σωστό!"; setTimeout(()=>goNext(),600); updateProgress(true);}
    else{feedback.className="feedback no"; feedback.textContent="Λάθος. Προσπάθησε ξανά."; updateProgress(false);}
  });
  updateProgressLabels();
}

function updateProgressLabels(){ $("progressLabel").textContent=`Ερώτηση ${idx+1}/${order.length}`; }
function updateProgress(after=false){const pct=Math.round(((after?idx+1:idx)/order.length)*100); $("progressBar").style.width=`${pct}%`; updateProgressLabels();}
function goNext(){idx++; if(idx<order.length) renderQuestion(); else showSummary();}
function showSummary(){const s=$("stage"); s.innerHTML=""; const c=document.createElement("article"); c.className="card"; const t=document.createElement("div"); t.className="qtext"; t.textContent="Συγχαρητήρια! Ολοκλήρωσες το quiz."; c.appendChild(t); $("progressBar").style.width="100%"; $("progressLabel").textContent="Ολοκληρώθηκε"; s.appendChild(c);}
function startQuiz(){order=shuffle(QUESTIONS.slice()); idx=0; $("progressBar").style.width="0%"; renderQuestion();}

window.addEventListener("DOMContentLoaded",()=>{
  $("startBtn").addEventListener("click",()=>{ $("startScreen").style.display="none"; $("quizUI").style.display="block"; startQuiz(); });
  initBackground();
});

/* ===== BACKGROUND ===== */
function initBackground(){
  const canvas=$("bg-canvas"); const ctx=canvas.getContext("2d");
  function resize(){canvas.width=innerWidth; canvas.height=innerHeight;} resize(); addEventListener("resize",resize);
  let t=0; (function loop(){t+=0.004; ctx.clearRect(0,0,canvas.width,canvas.height);
    const cx=canvas.width*(0.55+0.18*Math.sin(t*1.1)), cy=canvas.height*(0.65+0.18*Math.cos(t*0.9));
    const r=Math.max(canvas.width,canvas.height)*0.55;
    const grd=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
    grd.addColorStop(0,"rgba(96,43,123,0.10)"); grd.addColorStop(1,"rgba(0,0,0,0)");
    ctx.fillStyle=grd; ctx.fillRect(0,0,canvas.width,canvas.height);
    requestAnimationFrame(loop);
  })();
  const container=$("floaties"); const symbols=["#OSINT","🔒","🔥","🛰️","#dorks","🛡️","💡","📡","⚙️","#security"];
  function spawn(){const el=document.createElement("div"); el.className="floaty"; el.textContent=symbols[Math.random()*symbols.length|0];
    el.style.left=Math.floor(Math.random()*(innerWidth-40))+"px"; el.style.setProperty("--drift",(Math.random()*160-80)+"px");
    const dur=9+Math.random()*8, del=Math.random()*0.6; el.style.animationDuration=`${dur}s`; el.style.animationDelay=`${del}s`;
    container.appendChild(el); setTimeout(()=>el.remove(),(dur+1)*1000);}
  for(let i=0;i<6;i++) spawn(); setInterval(spawn,2200);
}
