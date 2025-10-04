/* =========================
   QUIZ QUESTIONS (global)
   Φόρτωσε αυτό το αρχείο ΠΡΙΝ από το app.js
========================= */
window.QUESTIONS = [
  // ---- ΣΥΜΠΛΗΡΩΣΗΣ ----
  {
    id: 1, type: "fill",
    question: "[Google Dorking] Εντόπισε σελίδες «Ξέχασα τον κωδικό» που μπορεί να είναι εκτεθειμένες.",
    blanks: "_____:forgot _____:example.com",
    answer: ["inurl site","inurl  site","inurl   site"],
    explanation: "inurl:forgot + site:example.com για περιορισμό στο domain."
  },

  // ---- ΠΟΛΛΑΠΛΗΣ ΕΠΙΛΟΓΗΣ ----
  {
    id: 2, type: "mcq",
    question: "Τι σημαίνει πρακτικά ένα υψηλό score/count στο AbuseIPDB;",
    options: [
      "Ότι η IP είναι απολύτως ασφαλής και μπορεί να χρησιμοποιηθεί χωρίς ανησυχία.",
      "Ότι η IP διεύθυνση έχει αναφερθεί πολλές φορές για ύποπτη ή κακόβουλη δραστηριότητα.",
      "Ότι η IP ανήκει σε κυβερνητικό φορέα και προστατεύεται από το AbuseIPDB.",
      "Ότι η IP χρησιμοποιείται αποκλειστικά για εσωτερικά δίκτυα (LAN)."
    ],
    answer: "Ότι η IP διεύθυνση έχει αναφερθεί πολλές φορές για ύποπτη ή κακόβουλη δραστηριότητα.",
    explanation: "Υψηλό score = πολλά reports από χρήστες/διαχειριστές· θέλει επιπλέον ανάλυση."
  },

  {
    id: 3, type: "fill",
    question: "[Google Dorking] Εντόπισε εμπιστευτικά PDF έγγραφα σε ένα website.",
    blanks: "site:example.com filetype:_____ \"confidential\"",
    answer: ["pdf"],
    explanation: "filetype:pdf φιλτράρει τα αποτελέσματα σε PDF."
  },

  {
    id: 4, type: "mcq",
    question: "[Google Dorking] Ποια είναι η σωστή περιγραφή του τελεστή filetype:;",
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
      "Το περιεχόμενο της φωτογραφίας με ανάλυση αντικειμένων μέσω τεχνητής νοημοσύνης.",
      "Τις ρυθμίσεις της κάμερας και τις τεχνικές πληροφορίες κατά τη λήψη της φωτογραφίας.",
      "Μόνο το όνομα του αρχείου και τον τύπο της εικόνας (JPEG, PNG κ.λπ.).",
      "Τις αλλαγές που έγιναν στη φωτογραφία κατά την επεξεργασία της σε πρόγραμμα γραφικών."
    ],
    answer: "Τις ρυθμίσεις της κάμερας και τις τεχνικές πληροφορίες κατά τη λήψη της φωτογραφίας.",
    explanation: "EXIF = μεταδεδομένα χρόνου, ρυθμίσεων κάμερας και πιθανό GPS."
  },

  {
    id: 6, type: "fill",
    question: "[Google Dorking] Εντόπισε δημόσια αρχεία ρυθμίσεων Wi-Fi.",
    blanks: "filetype:_____ intitle: settings _______",
    answer: ["config wifi","config  wifi","config   wifi"],
    explanation: "filetype:config + intitle:settings + λέξη-στόχος wifi."
  },

  {
    id: 7, type: "mcq",
    question: "[Google Dorking] Τι κάνει με ακρίβεια ο τελεστής site: στις αναζητήσεις Google;",
    options: [
      "Περιορίζει αποτελέσματα σε συγκεκριμένο domain.",
      "Εμφανίζει μόνο σελίδες που είναι αποθηκευμένες στην προσωρινή μνήμη (cache) της Google.",
      "Αναζητά αποκλειστικά σελίδες όπου το ζητούμενο όρος υπάρχει στο όνομα του αρχείου ή στην URL.",
      "Αποκλείει αυτόματα όλες τις σελίδες του domain από τα αποτελέσματα."
    ],
    answer: "Περιορίζει αποτελέσματα σε συγκεκριμένο domain.",
    explanation: "site: περιορίζει σε domain/subdomains."
  },

  {
    id: 8, type: "mcq",
    question: "Ποιος είναι ο πιο ασφαλής τρόπος να χρησιμοποιήσεις ένα LLM στο OSINT workflow;",
    options: [
      "Να γράφει αυτοματοποιημένα phishing emails για δοκιμές.",
      "Να συνοψίζει ευρήματα και να προτείνει άμυνες.",
      "Να το χρησιμοποιείς για αυτόματη συλλογή δεδομένων από πηγές που απαιτούν login ή bypass περιορισμών πρόσβασης.",
      "Να αυτοματοποιεί scanning και IP enumeration."
    ],
    answer: "Να συνοψίζει ευρήματα και να προτείνει άμυνες.",
    explanation: "Χρήση για ανάλυση/triage/προτάσεις remediation — όχι επιθετικές ενέργειες."
  },

  {
    id: 9, type: "fill",
    question: "[Google Dorking] Εντόπισε σελίδες σύνδεσης (login) που μπορεί να είναι εκτεθειμένες.",
    blanks: "inurl: admin _____",
    answer: ["login"],
    explanation: "Συνδυασμός admin + login σε URL paths."
  },

  {
    id: 10, type: "mcq",
    question: "Τι χρήσιμο συμπέρασμα παίρνεις από ένα email που εμφανίζεται σε μια υπηρεσία διαρροών όπως το Have I Been Pwned (HIBP);",
    options: [
      "Ότι τα στοιχεία του λογαριασμού έχουν εκτεθεί σε κάποια γνωστή παραβίαση δεδομένων.",
      "Ότι το email είναι ψεύτικο ή ανύπαρκτο.",
      "Ότι ο λογαριασμός είναι ασφαλής, επειδή εντοπίστηκε από το HIBP.",
      "Ότι ο λογαριασμός έχει μολυνθεί με ιό ή κακόβουλο λογισμικό."
    ],
    answer: "Ότι τα στοιχεία του λογαριασμού έχουν εκτεθεί σε κάποια γνωστή παραβίαση δεδομένων.",
    explanation: "Σήμα για αλλαγή κωδικών και ενεργοποίηση MFA."
  },

  // ---- 11–13 ----
  {
    id: 11, type: "fill",
    question: "Σε ποια πόλη τραβήχτηκε αυτή η φωτογραφία;",
    blanks: "",
    answer: ["bangkok","μπανγκοκ","μπανγκόκ","bangkok / μπανγκοκ","bangkok / μΠΑΝΓΚΟΚ"],
    explanation: "Σωστή απάντηση: Bangkok / ΜΠΑΝΓΚΟΚ",
    media: {
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
    question: "The Double Agent — Αναλύοντας το ίχνος του υπόπτου.",
    preface: "Έχουμε λάβει πληροφορίες ότι ένας από τους πράκτορές μας στο πεδίο μπορεί να έχει γίνει αδίστακτος. Υπάρχουν αυξανόμενες υποψίες ότι ενεργεί ως διπλός πράκτορας, εργαζόμενος και για τις δύο πλευρές. Έχουμε μόνο μία φωτογραφία του υπόπτου, αλλά βρήκαμε και τρεις φωτογραφίες από την προσωπική του συσκευή. Η αποστολή σας είναι να αναλύσετε αυτές τις φωτογραφίες και να αποκαλύψετε τα ίχνη του. Πού βρέθηκαν τα ίχνη του;",
    options: ["Mall","River","Temple","Πουθενά"],
    answer: "Temple",
    explanation: "Το σκηνικό αντιστοιχεί σε ναό.",
    media: {
      img: "images/q3.png",
      alt: "",
      link: "https://drive.google.com/drive/folders/1461UT6-E3bcxr5KBsjixqzGrw3MoLKgD?usp=sharing"
    }
  }
];
