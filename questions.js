window.QUESTIONS = [
  {
    id: 1, type: "fill",
    question: "[Google Dorking] Εντόπισε σελίδες «Ξέχασα τον κωδικό» που μπορεί να είναι εκτεθειμένες.",
    blanks: "_____:forgot _____:example.com",
    hashes: [
      "f6448694d80c5e1535c4a9db656f16cf0315e7bf821f5f2fae2bc1025b4fa84a",
      "c1dbb3aa10745d85ba781ed9102837c32e3a3485b2b6218bf65874f9059420cf",
      "ecd0bbecefec8e2b4685fdb3d58f78b5e06ba65c44ea9d0847c55e148b6460b7"
    ]
  },
  {
    id: 2, type: "mcq",
    question: "Τι σημαίνει πρακτικά ένα υψηλό score/count στο AbuseIPDB;",
    options: [
      "Ότι η IP είναι απολύτως ασφαλής και μπορεί να χρησιμοποιηθεί χωρίς ανησυχία.",
      "Ότι η IP διεύθυνση έχει αναφερθεί πολλές φορές για ύποπτη ή κακόβουλη δραστηριότητα.",
      "Ότι η IP ανήκει σε κυβερνητικό φορέα και προστατεύεται από το AbuseIPDB.",
      "Ότι η IP χρησιμοποιείται αποκλειστικά για εσωτερικά δίκτυα (LAN)."
    ],
    answerHash: "5e3000e91aaa947b243c17ed24081caa75d91478ae47d243215511bd65cd129f"
  },
  {
    id: 3, type: "fill",
    question: "[Google Dorking] Εντόπισε εμπιστευτικά PDF έγγραφα σε ένα website.",
    blanks: "site:example.com filetype:_____ \"confidential\"",
    hashes: ["c35b21d6ca39aa7cc3b79a705d989f1a6e88b99ab43988d74048799e3db926a3"]
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
    answerHash: "01a79b3d84ef98082ae9b1f2b17f3ae06dad26cd5711880a2409f5a34d9de730"
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
    answerHash: "5bd70100edcce85905c4bb58b29e3a1aa0ad1ee587b2dd2118fa0cc8fb339b5e"
  },
  {
    id: 6, type: "fill",
    question: "[Google Dorking] Εντόπισε δημόσια αρχεία ρυθμίσεων Wi-Fi.",
    blanks: "filetype:_____ intitle: settings _______",
    hashes: [
      "d21c1fc673dce9b67accbdc5c6490e3801d295843a1ce38d585f03650d738d0f",
      "6cdd4375239e636117c0f299a6d6b1a2c685809e2010694f548a22d0090240af",
      "ed82755eab7398744615a0a05bed3d5d8b3a4a84732f740849833b2ab477d333"
    ]
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
    answerHash: "b17014094cd64d894d5d4eba8cfc05b11d559657466cca203ce3b7cd472f803e"
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
    answerHash: "558c99064445d5ebac707ebb99999b6b385f4a1fad1403d2c917d743a28c5a89"
  },
  {
    id: 9, type: "fill",
    question: "[Google Dorking] Εντόπισε σελίδες σύνδεσης (login) που μπορεί να είναι εκτεθειμένες.",
    blanks: "inurl: admin _____",
    hashes: ["428821350e9691491f616b754cd8315fb86d797ab35d843479e732ef90665324"]
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
    answerHash: "c2d0c117dd864061d5ff0945cc9ea791b6961d45d6a7737f225524eceffd249b"
  },
  {
    id: 11, type: "fill",
    question: "Σε ποια πόλη τραβήχτηκε αυτή η φωτογραφία;",
    blanks: "",
    hashes: [
      "d93acc6c69eade6fcbbb0ee120164ef9feb3ee30a6f4b756b868c16f951e0a51",
      "cdb56c5393d48cde602bf2f4c67ce326d4a487a2663a33fbd63cb01d558e2a39",
      "14b02602df859a326c5b4ceb4dc2b248dfe3eee1e3d4f5e359b1e0f2386f1e0b"
    ],
    media: {
      img: "images/q11.png",
      link: "https://drive.google.com/file/d/1FfKGW9QZOSSsXIr3DcDmi2gAy5KTUb3m/view?usp=sharing"
    }
  },
  {
    id: 12, type: "fill",
    question: "Βρες τον ιδιοκτήτη του domain opensource.org.",
    blanks: "",
    hashes: [
      "d78d9a6911dedbdf959444c52035e6fcb5f7dc3ece3f536bbba679a9aba2b113",
      "8cb802b1d5a95ed662ca67fcd747346177274808652ce065f766aca2fbe263dc",
      "7573418810ebe0d84c89af1d1524e7301ce54ece39b6fca3e385a38f0731a52c",
      "f47b7502898e680322f9914913f902f199b49c51ee5218ce82d754efc41efade"
    ]
  },
  {
    id: 13, type: "mcq",
    question: "The Double Agent — Αναλύοντας το ίχνος του υπόπτου.",
    preface: "Έχουμε λάβει πληροφορίες ότι ένας από τους πράκτορές μας στο πεδίο μπορεί να έχει γίνει αδίστακτος. Υπάρχουν αυξανόμενες υποψίες ότι ενεργεί ως διπλός πράκτορας, εργαζόμενος και για τις δύο πλευρές. Έχουμε μόνο μία φωτογραφία του υπόπτου, αλλά βρήκαμε και τρεις φωτογραφίες από την προσωπική του συσκευή. Η αποστολή σας είναι να αναλύσετε αυτές τις φωτογραφίες και να αποκαλύψετε τα ίχνη του. Πού βρέθηκαν τα ίχνη του;",
    options: ["Mall","River","Temple","Πουθενά"],
    answerHash: "67425801bf1a60fe7ca30d5eb62347636dc487ecd4de65b328beac381abfdd3d",
    media: {
      img: "images/q3.png",
      alt: "",
      link: "https://drive.google.com/drive/folders/1461UT6-E3bcxr5KBsjixqzGrw3MoLKgD?usp=sharing"
    }
  }
];
