/* =========================================================
   OSINT & Google Dorking — Practice Quiz (single-question flow)
   Απαιτήσεις:
   - Μία ερώτηση κάθε φορά
   - Προχωρά ΜΟΝΟ όταν η απάντηση είναι σωστή
   - Αν είναι λάθος: μήνυμα "Προσπάθησε ξανά." και μένουμε στην ίδια ερώτηση
   - Χωρίς σκορ
   - Start screen με κουμπί "ΞΕΚΙΝΑ ΤΟ ΚΟΥΙΖ"
   - Χωρίς κουμπιά ανακάτεμα/επανάληψης
   ========================================================= */

/* =========================
   QUIZ DATA
   - type: "mcq" ή "fill"
   - question: εκφώνηση (ΕΛΛΗΝΙΚΑ)
   - options: array για mcq
   - answer: για mcq -> ακριβές string, για fill -> αποδεκτές απαντήσεις (array, case-insensitive)
   - explanation: σύντομη εξήγηση (προαιρετική)
   - media: { img, link, alt } (προαιρετικό)
     ➜ Για inline εικόνα, βάλε media.img (π.χ. "images/q11.jpg")
     ➜ Τα Google Drive links κρατιούνται σε media.link
========================= */
const QUESTIONS = [
  // ---- ΠΟΛΛΑΠΛΗΣ ΕΠΙΛΟΓΗΣ ----
  {
    id: 2, type: "mcq",
    question: "Τι σημαίνει πρακτικά ένα υψηλό score/Count στο AbuseIPDB;",
    options: [
      "Απόλυτη απόδειξη εγκληματικότητας.",
      "Ένδειξη πολλών αναφορών· χρειάζεται context.",
      "Δείχνει μόνο ότι το IP είναι εκτός λειτουργίας.",
      "Παράγεται μόνο από honeypots αυτομάτως."
    ],
    answer: "Ένδειξη πολλών αναφορών· χρειάζεται context.",
    explanation: "Υψηλό score = πολλά reports από χρήστες/διαχειριστές· θέλει επιπλέον ανάλυση."
  },
  {
    id: 4, type: "mcq",
    question: "Ποια είναι η σωστή περιγραφή του τελεστή filetype:;",
    options: [
      "Βοηθά στον εντοπισμό συγκεκριμένου τύπου αρχείου.",
      "Φιλτράρει αποτελέσματα κατά επέκταση αρχείου.",
      "Λειτουργεί ως alias του inurl.",
      "Χρησιμοποιείται μόνο για εικόνες."
    ],
    answer: "Φιλτράρει αποτελέσματα κατά επέκταση αρχείου.",
    explanation: "Το filetype: ζητά αποτελέσματα π.χ. PDF, XLSX όπως τα έχει indexάρει η Google."
  },
  {
    id: 5, type: "mcq",
    question: "Τι περιγράφει με ακρίβεια το EXIF metadata σε μια ψηφιακή φωτογραφία;",
    options: [
      "Αρχεία που βελτιώνουν ποιότητα εικόνας.",
      "Τεχνικά & περιγραφικά πεδία (timestamp/GPS).",
      "Μη διαθέσιμο σε κινητά τηλέφωνα.",
      "Σύστημα άδειας αναπαραγωγής εικόνας."
    ],
    answer: "Τεχνικά & περιγραφικά πεδία (timestamp/GPS).",
    explanation: "EXIF = μεταδεδομένα χρόνου, ρυθμίσεων κάμερας και πιθανό GPS."
  },
  {
    id: 7, type: "mcq",
    question: "Τι κάνει με ακρίβεια ο τελεστής site: στις αναζητήσεις Google;",
    options: [
      "Περιορίζει αποτελέσματα σε συγκεκριμένο domain.",
      "Επιστρέφει μόνο αρχεία στο cache.",
      "Βρίσκει μόνο σελίδες με φόρμες.",
      "Είναι ειδικός για εικόνες."
    ],
    answer: "Περιορίζει αποτελέσματα σε συγκεκριμένο domain.",
    explanation: "site: περιορίζει σε domain/subdomains, όχι πλήρη λίστα όλων των αρχείων."
  },
  {
    id: 8, type: "mcq",
    question: "Ποιος είναι ο πιο ασφαλής τρόπος να χρησιμοποιήσεις ένα LLM στο OSINT workflow;",
    options: [
      "Να γράφει αυτοματοποιημένα phishing emails.",
      "Να συνοψίζει ευρήματα και να προτείνει άμυνες.",
      "Να δημιουργεί exploits και scripts εισβολής.",
      "Να κάνει απευθείας scanning και IP lists."
    ],
    answer: "Να συνοψίζει ευρήματα και να προτείνει άμυνες.",
    explanation: "Χρήση για ανάλυση/triage/προτάσεις remediation — όχι επιθετικές ενέργειες."
  },
  {
    id: 10, type: "mcq",
    question: "Τι χρήσιμο συμπέρασμα παίρνεις από ένα email που εμφανίζεται στο HIBP;",
    options: [
      "Δείχνει αν email εμφανίστηκε σε διαρροές.",
      "Δίνει τον τρέχοντα κωδικό χρήστη.",
      "Αποδεικνύει ότι ο κάτοχος είναι απατεώνας.",
      "Διαγράφει δεδομένα από βάσεις."
    ],
    answer: "Δείχνει αν email εμφανίστηκε σε διαρροές.",
    explanation: "Σήμα για αλλαγή κωδικών και ενεργοποίηση MFA."
  },

  // ---- ΣΥΜΠΛΗΡΩΣΗΣ ----
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

  // ---- ΝΕΕΣ 11-13 ----
  {
    id: 11, type: "fill",
    question: "Σε ποια πόλη τραβήχτηκε αυτή η φωτογραφία;",
    blanks: "Άφησε κενό: __________________",
    answer: ["bangkok", "μπανγκοκ", "μπανγκόκ", "bangkok / μπανγκοκ", "bangkok / μΠΑΝΓΚΟΚ"],
    explanation: "Σωστή απάντηση: Bangkok / ΜΠΑΝΓΚΟΚ",
    media: {
      // ➜ Βάλε άμεσο path εικόνας από το repo σου, π.χ. "images/q11.jpg"
      img: "",
      alt: "Φωτογραφία για την ερώτηση 11",
      // ➜ Drive link για αναφορά
      link: "https://drive.google.com/file/d/1FfKGW9QZOSSsXIr3DcDmi2gAy5KTUb3m/view?usp=sharing"
    }
  },
  {
    id: 12, type: "fill",
    question: "Βρες τον ιδιοκτήτη του domain.",
    blanks: "Άφησε κενό: __________________",
    answer: [
      "open source initiative",
      "open-source initiative",
      "open source  initiative"
    ],
    explanation: "Σωστή απάντηση: Open Source Initiative"
  },
  {
    id: 13, type: "mcq",
    question: "The Double Agent — Αναλύοντας το ίχνος του υπόπτου (δες τις εικόνες πριν απαντήσεις).",
    options: ["Mall", "River", "Temple", "Nowhere"],
    answer: "Temple",
    explanation: "Το σκηνικό αντιστοιχεί σε ναό.",
    media: {
      // ➜ Βάλε link σε φάκελο εικόνων στο repo σου ή κράτησε το Drive link:
      link: "https://drive.google.com/drive/folders/1461UT6-E3bcxr5KBsjixqzGrw3MoLKgD?usp=sharing"
    }
  }
];

/* =========================
   HELPERS
========================= */
const $ = (id) => document.getElementById(id);

function shuffle(arr){
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalise(s){
  return (s || "")
    .toString()
    .trim()
    .toLowerCase()
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

  // Optional media
  if (q.media && (q.media.img || q.media.link)){
    const meta = document.createElement("div");
    meta.className = "meta";
    if (q.media.img){
      const wrap = document.createElement("div");
      wrap.className = "imgwrap";
      const im = document.createElement("img");
      im.src = q.media.img;               // ➜ π.χ. "images/q11.jpg"
      im.alt = q.media.alt || "media";
      wrap.appendChild(im);
      card.appendChild(wrap);
    }
    if (q.media.link){
      const a = document.createElement("a");
      a.href = q.media.link; a.target = "_blank"; a.rel = "noopener";
      a.textContent = "Άνοιγμα συνδέσμου υλικού";
      meta.appendChild(a);
    }
    card.appendChild(meta);
  }

  // Inputs
  let inputArea;
  if (q.type === "mcq"){
    inputArea = document.createElement("div");
    inputArea.className = "options";
    shuffle(q.options).forEach((opt, i) => {
      const label = document.createElement("label");
      label.className = "opt";
      const id = `q${q.id}_opt${i}`;
      label.innerHTML = `<input type="radio" name="q_${q.id}" id="${id}" value="${opt}"> ${opt}`;
      inputArea.appendChild(label);
    });
  } else {
    inputArea = document.createElement("div");
    inputArea.className = "fill";
    const span = document.createElement("span");
    span.textContent = q.blanks;
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Γράψε την απάντηση…";
    input.name = `q_${q.id}_fill`;
    inputArea.appendChild(span);
    inputArea.appendChild(input);
  }
  card.appendChild(inputArea);

  // Feedback + Submit (μόνο Submit — προχωρά ΜΟΝΟ όταν είναι σωστό)
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

  submitBtn.addEventListener("click", () => {
    let ok = false;

    if (q.type === "mcq"){
      const chosen = card.querySelector('input[type="radio"]:checked');
      ok = !!(chosen && chosen.value === q.answer);
    } else {
      const inp = card.querySelector('input[type="text"]');
      if (inp){
        const val = normalise(inp.value);
        if (Array.isArray(q.answer)){
          ok = q.answer.map(a => normalise(a)).includes(val);
        } else {
          ok = (val === normalise(q.answer));
        }
      }
    }

    feedback.style.display = "block";
    if (ok){
      feedback.className = "feedback ok";
      feedback.textContent = "Σωστό!";
      // μικρή καθυστέρηση για να διαβαστεί το μήνυμα
      setTimeout(() => goNext(), 600);
      updateProgress(true);
    } else {
      feedback.className = "feedback no";
      feedback.textContent = "Λάθος. Προσπάθησε ξανά.";
      // Μένουμε στην ίδια ερώτηση — δεν απενεργοποιούμε το submit
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
  if (idx < order.length){
    renderQuestion();
  } else {
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
  qtext.textContent = "Συγχαρητήρια! Ολοκλήρωσες το quiz.";
  card.appendChild(qtext);

  $("progressBar").style.width = "100%";
  $("progressLabel").textContent = `Ολοκληρώθηκε`;

  stage.appendChild(card);
}

/* =========================
   RESET & INIT
========================= */
function startQuiz(){
  order = shuffle(QUESTIONS);
  idx = 0;
  $("progressBar").style.width = "0%";
  renderQuestion();
}

/* =========================
   START SCREEN
========================= */
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("quizUI").style.display = "block";
  startQuiz();
});
