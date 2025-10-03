/* =========================
   QUIZ DATA
   - type: "mcq" ή "fill"
   - question: εκφώνηση (ΕΛΛΗΝΙΚΑ)
   - options: array για mcq
   - answer: για mcq -> το ακριβές string επιλογής, για fill -> αποδεκτές απαντήσεις (array, case-insensitive)
   - explanation: σύντομη εξήγηση
   - media: optional { img, link, alt }
     ➜ Αν θέλεις να εμφανιστεί εικόνα μέσα στην κάρτα, βάλε media.img
     ➜ Για Google Drive, προτίμησε να κατεβάσεις/ανεβάσεις στο repo (π.χ. /images/q11.jpg)
========================= */

const QUESTIONS = [
  /* ---- ΠΟΛΛΑΠΛΗΣ ΕΠΙΛΟΓΗΣ ---- */
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
    explanation: "Υψηλό score = πολλά reports από χρήστες/διαχειριστές· θέλει επιπλέον ανάλυση.",
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
    explanation: "Το filetype: ζητά αποτελέσματα π.χ. PDF, XLSX όπως τα έχει indexάρει η Google.",
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
    explanation: "EXIF = μεταδεδομένα χρόνου, ρυθμίσεων κάμερας και πιθανό GPS.",
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
    explanation: "site: περιορίζει σε domain/subdomains, όχι πλήρη λίστα όλων των αρχείων.",
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
    explanation: "Χρήση για ανάλυση/triage/προτάσεις remediation — όχι επιθετικές ενέργειες.",
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
    explanation: "Σήμα για αλλαγή κωδικών και ενεργοποίηση MFA.",
  },

  /* ---- ΣΥΜΠΛΗΡΩΣΗΣ ---- */
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

  /* ---- ΝΕΕΣ 11-13 ---- */
  {
    id: 11, type: "fill",
    question: "Σε ποια πόλη τραβήχτηκε αυτή η φωτογραφία;",
    blanks: "Άφησε κενό: __________________",
    answer: ["bangkok", "μπανγκοκ", "μπανγκόκ", "bangkok / μπανγκοκ", "bangkok / μΠΑΝΓΚΟΚ"],
    explanation: "Σωστή απάντηση: Bangkok / ΜΠΑΝΓΚΟΚ",
    media: {
      /* ➜ ΒΑΛΕ ΕΔΩ ΤΟ ΑΜΕΣΟ LINK ΕΙΚΟΝΑΣ (όχι το Google Drive viewer).
         Ιδανικά: /images/q11.jpg στο ίδιο repo. */
      img: "", // π.χ. "images/q11.jpg"
      alt: "Φωτογραφία για την ερώτηση 11",
      link: "https://drive.google.com/file/d/1FfKGW9QZOSSsXIr3DcDmi2gAy5KTUb3m/view?usp=sharing"
    }
  },
  {
    id: 12, type: "fill",
    question: "Βρες τον ιδιοκτήτη του domain.",
    blanks: "Άφησε κενό: __________________",
    answer: [
      "open source initiative",
      "οpen source initiative",
      "open-source initiative",
      "open source  initiative"
    ],
    explanation: "Σωστή απάντηση: Open Source Initiative"
    /* ➜ TIP: Μπορείς να βάλεις media.link με WHOIS/RDAP screenshot */
  },
  {
    id: 13, type: "mcq",
    question: "The Double Agent — Αναλύοντας το ίχνος του υπόπτου (δες τις εικόνες πριν απαντήσεις).",
    options: ["Mall","River","Temple","Nowhere"],
    answer: "Temple",
    explanation: "Το σκηνικό αντιστοιχεί σε ναό.",
    media: {
      /* ➜ Βάλε εδώ ένα link στο φάκελο εικόνων. Ιδανικά ανέβασέ τες στο repo. */
      link: "https://drive.google.com/drive/folders/1461UT6-E3bcxr5KBsjixqzGrw3MoLKgD?usp=sharing"
    }
  }
];

/* =========================
   HELPERS
========================= */
const byId = (id) => document.getElementById(id);

function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random() * (i+1));
    [a[i], a[j]] = [a[j], a[i]];
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
   RENDER
========================= */
let renderOrder = shuffle(QUESTIONS);

function renderAll(){
  const grid = byId("quiz");
  grid.innerHTML = "";
  renderOrder.forEach((q, idx) => {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.qid = q.id;

    const qid = document.createElement("div");
    qid.className = "qid";
    qid.textContent = `Q${idx+1}`;
    card.appendChild(qid);

    const qtext = document.createElement("div");
    qtext.className = "qtext";
    qtext.textContent = q.question;
    card.appendChild(qtext);

    // Optional media
    if(q.media && (q.media.img || q.media.link)){
      const meta = document.createElement("div");
      meta.className = "meta";
      if(q.media.img){
        const wrap = document.createElement("div");
        wrap.className = "imgwrap";
        const im = document.createElement("img");
        im.src = q.media.img; // ➜ Βάλε εδώ το δικό σου path (π.χ. images/q11.jpg)
        im.alt = q.media.alt || "media";
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

    if(q.type === "mcq"){
      const opts = document.createElement("div");
      opts.className = "options";
      shuffle(q.options).forEach((opt, i) => {
        const label = document.createElement("label");
        label.className = "opt";
        const id = `q${q.id}_opt${i}`;
        label.innerHTML = `<input type="radio" name="q_${q.id}" id="${id}" value="${opt}"> ${opt}`;
        opts.appendChild(label);
      });
      card.appendChild(opts);
    }else if(q.type === "fill"){
      const fill = document.createElement("div");
      fill.className = "fill";
      const span = document.createElement("span");
      span.textContent = q.blanks;
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Γράψε την απάντηση…";
      input.name = `q_${q.id}_fill`;
      fill.appendChild(span);
      fill.appendChild(input);
      card.appendChild(fill);
    }

    const feedback = document.createElement("div");
    feedback.className = "feedback";
    card.appendChild(feedback);

    grid.appendChild(card);
  });
}

renderAll();

/* =========================
   CHECK & RESET
========================= */
function checkAll(){
  let correctCount = 0;
  renderOrder.forEach(q => {
    const card = document.querySelector(`.card[data-qid="${q.id}"]`);
    const feedback = card.querySelector(".feedback");
    let ok = false;

    if(q.type === "mcq"){
      const chosen = card.querySelector('input[type="radio"]:checked');
      if(chosen && chosen.value === q.answer){ ok = true; }
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
      feedback.textContent = "Σωστό! " + (q.explanation ? "— " + q.explanation : "");
      correctCount++;
      card.style.borderColor = "rgba(57,255,20,.45)";
    }else{
      feedback.className = "feedback no";
      const showAns = (q.type === "mcq") ? q.answer : (Array.isArray(q.answer) ? q.answer[0] : q.answer);
      feedback.textContent = "Λάθος. Σωστό: " + showAns + (q.explanation ? " — " + q.explanation : "");
      card.style.borderColor = "rgba(255,49,49,.45)";
    }
  });

  // Toast-like summary
  const summary = document.createElement("div");
  summary.textContent = `Σύνολο σωστών: ${correctCount} / ${renderOrder.length}`;
  summary.style.position = "fixed";
  summary.style.right = "16px";
  summary.style.bottom = "16px";
  summary.style.padding = "10px 14px";
  summary.style.background = "#101010";
  summary.style.border = "1px solid #2b2b2b";
  summary.style.borderRadius = "10px";
  summary.style.boxShadow = "0 8px 20px rgba(0,0,0,.35)";
  document.body.appendChild(summary);
  setTimeout(()=> summary.remove(), 2600);
}

function resetAll(){
  renderAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================
   EVENTS
========================= */
document.getElementById("checkAll").addEventListener("click", checkAll);
document.getElementById("reset").addEventListener("click", resetAll);
document.getElementById("reshuffle").addEventListener("click", () => {
  renderOrder = shuffle(QUESTIONS);
  resetAll();
});
