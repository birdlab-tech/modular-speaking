/*
  Each card has:
    id: string
    title: string
    lines: [string, ...]  // 2–4 lines of cues
    parent: string | null
    links: [{ label, targetId }, ...]  // up to 4 forward links
*/

const cards = {
  // MAIN MENU
  menu: {
    id: "menu",
    title: "Main menu",
    lines: [
      "1st job hunt",
      "1st incorporation",
      "global financial crisis",
      "commercial property"
    ],
    parent: null,
    links: [
      { label: "1st job hunt", targetId: "job-hunt-main" },
      { label: "1st incorporation", targetId: "incorporation-main" },
      { label: "global financial crisis", targetId: "gfc-main" },
      { label: "commercial property", targetId: "com-prop-main" }
    ]
  },

  // 1ST JOB HUNT CLUSTER
  "job-hunt-main": {
    id: "job-hunt-main",
    title: "1st job hunt",
    lines: ["2004 graduation", "narrow scope / no innovation", "example role"],
    parent: "menu",
    links: [
      { label: "job hunt context", targetId: "job-hunt-context" },
      { label: "narrow sectors", targetId: "narrow-sectors" },
      { label: "Airbus example", targetId: "airbus-fea" },
      { label: "explore & discover", targetId: "explore-discover" }
    ]
  },

  "job-hunt-context": {
    id: "job-hunt-context",
    title: "1st job hunt — context",
    lines: [
      "pre-LinkedIn era",
      "newspaper ads, highlighter",
      "post CV letters / basic forms"
    ],
    parent: "job-hunt-main",
    links: []
  },

  "narrow-sectors": {
    id: "narrow-sectors",
    title: "narrow scope sectors",
    lines: [
      "advanced industrial engineering",
      "mass-scale precision manufacture",
      "automotive & aerospace sectors"
    ],
    parent: "job-hunt-main",
    links: [{ label: "Airbus example", targetId: "airbus-fea" }]
  },

  "airbus-fea": {
    id: "airbus-fea",
    title: "Airbus example role",
    lines: [
      "Airbus FEA fastener regions",
      "stress concentrations at nodes",
      "bolt hole / torque vs fatigue life"
    ],
    parent: "job-hunt-main",
    links: []
  },

  // 1ST INCORPORATION / LLP + JAZZ CLUSTER
  "incorporation-main": {
    id: "incorporation-main",
    title: "1st incorporation",
    lines: [
      "explore & discover",
      "jazz piano evenings",
      "event management data platform",
      "foundation for future"
    ],
    parent: "menu",
    links: [
      { label: "why own systems", targetId: "own-systems" },
      { label: "jazz & improv", targetId: "jazz-improv" },
      { label: "event platform", targetId: "event-platform" },
      { label: "platform insight", targetId: "platform-insight" }
    ]
  },

  "explore-discover": {
    id: "explore-discover",
    title: "explore & discover",
    lines: [
      "wanted to build complete systems",
      "not analyse tiny parts of others",
      "co-founded 1st company of 9",
      "LLP with partner from uni"
    ],
    parent: "incorporation-main",
    links: [{ label: "event platform", targetId: "event-platform" }]
  },

  "own-systems": {
    id: "own-systems",
    title: "why complete systems",
    lines: [
      "wanted to build complete systems",
      "not analyse tiny parts of others",
      "LLP with partner from uni"
    ],
    parent: "incorporation-main",
    links: [{ label: "event platform", targetId: "event-platform" }]
  },

  "jazz-improv": {
    id: "jazz-improv",
    title: "jazz & cognition",
    lines: [
      "Sheraton Hotel",
      "self-taught jazz",
      "improvisation is pattern recognition"
    ],
    parent: "incorporation-main",
    links: []
  },

  "event-platform": {
    id: "event-platform",
    title: "event data platform",
    lines: [
      "systems for real users",
      "manage bookings, coordinate logistics",
      "performer bidding feature",
      "117 gigs Jan 2006"
    ],
    parent: "incorporation-main",
    links: [{ label: "platform insight", targetId: "platform-insight" }]
  },

  "platform-insight": {
    id: "platform-insight",
    title: "platform insight",
    lines: [
      "didn't realise then platform 1st engineered system",
      "real-time marketplace for users",
      "apprenticeship without realising",
      "1st journey as entrepreneur"
    ],
    parent: "incorporation-main",
    links: []
  },

  // GLOBAL FINANCIAL CRISIS CLUSTER
  "gfc-main": {
    id: "gfc-main",
    title: "global financial crisis",
    lines: ["credit crunch hits", "LLP closes cleanly"],
    parent: "menu",
    links: [
      { label: "subprime / pipeline", targetId: "gfc-details" },
      { label: "closure & debts", targetId: "gfc-closure" },
      { label: "asset opportunity", targetId: "asset-opportunity" }
    ]
  },

  "gfc-details": {
    id: "gfc-details",
    title: "credit crunch detail",
    lines: [
      "subprime CDO collapse",
      "client pipeline dried up",
      "orderly LLP shutdown"
    ],
    parent: "gfc-main",
    links: [{ label: "closure & debts", targetId: "gfc-closure" }]
  },

  "gfc-closure": {
    id: "gfc-closure",
    title: "LLP closes cleanly",
    lines: [
      "dissolved without debts",
      "clean closure",
      "lessons for next venture"
    ],
    parent: "gfc-main",
    links: [{ label: "asset opportunity", targetId: "asset-opportunity" }]
  },

  "asset-opportunity": {
    id: "asset-opportunity",
    title: "asset opportunity",
    lines: [
      "post-crisis asset value opportunity",
      "events space vision"
    ],
    parent: "gfc-main",
    links: [{ label: "commercial property", targetId: "com-prop-main" }]
  },

  // COMMERCIAL PROPERTY CLUSTER
  "com-prop-main": {
    id: "com-prop-main",
    title: "commercial property",
    lines: [
      "post-crisis asset value opportunity",
      "events space vision"
    ],
    parent: "menu",
    links: [
      { label: "fit-out & lessons", targetId: "fitout-lessons" },
      { label: "building services", targetId: "building-services" },
      { label: "capital & credit", targetId: "capital-credit" },
      { label: "liquidation arc", targetId: "liquidation-main" }
    ]
  },

  "fitout-lessons": {
    id: "fitout-lessons",
    title: "fit-out & lessons",
    lines: [
      "fit-out from shell & core",
      "cashflow limit",
      "narrow escape story",
      "lessons learnt"
    ],
    parent: "com-prop-main",
    links: [{ label: "building services", targetId: "building-services" }]
  },

  "building-services": {
    id: "building-services",
    title: "1st building services exposure",
    lines: [
      "(virtual) freehold bought 2010",
      "1st building services exposure",
      "HVAC commissioning",
      "bookkeeping & modelling"
    ],
    parent: "com-prop-main",
    links: [{ label: "capital & credit", targetId: "capital-credit" }]
  },

  "capital-credit": {
    id: "capital-credit",
    title: "capital & credit",
    lines: [
      "holding co vs operator co",
      "new LLP / partner for bar/kitchen",
      "over budget / breakeven slow",
      "credit hard (11–15% AER)"
    ],
    parent: "com-prop-main",
    links: [{ label: "liquidation arc", targetId: "liquidation-main" }]
  },

  // LIQUIDATION ARC
  "liquidation-main": {
    id: "liquidation-main",
    title: "operator liquidation 2013",
    lines: [
      "operator liquidation 2013",
      "dual-role landlord / tenant"
    ],
    parent: "com-prop-main",
    links: [
      { label: "insolvency context", targetId: "insolvency-context" },
      { label: "bailiff timeline", targetId: "bailiff-timeline" },
      { label: "landlord rights", targetId: "landlord-rights" },
      { label: "lessons learnt", targetId: "liquidation-lessons" }
    ]
  },

  "insolvency-context": {
    id: "insolvency-context",
    title: "insolvency context",
    lines: [
      "operator insolvency rules",
      "creditor demand letters",
      "bailiff arrival imminent"
    ],
    parent: "liquidation-main",
    links: [{ label: "bailiff timeline", targetId: "bailiff-timeline" }]
  },

  "bailiff-timeline": {
    id: "bailiff-timeline",
    title: "bailiff timeline",
    lines: [
      "rights re unpaid rent",
      "our bailiff distrained ahead",
      "their bailiffs too late"
    ],
    parent: "liquidation-main",
    links: [{ label: "lessons learnt", targetId: "liquidation-lessons" }]
  },

  "landlord-rights": {
    id: "landlord-rights",
    title: "landlord rights & CRAR",
    lines: [
      "dual-role landlord / tenant",
      "landlord rights re arrears",
      "use system correctly, not shadily"
    ],
    parent: "liquidation-main",
    links: [{ label: "bailiff timeline", targetId: "bailiff-timeline" }]
  },

  "liquidation-lessons": {
    id: "liquidation-lessons",
    title: "liquidation lessons",
    lines: [
      "think outside box",
      "corporate veil / Ltd liability experience",
      "operator huge workload, no reward"
    ],
    parent: "liquidation-main",
    links: []
  }
};

let currentId = "menu";

function renderCard() {
  const card = cards[currentId];
  if (!card) return;

  const app = document.getElementById("app");
  app.innerHTML = "";

  const cardEl = document.createElement("div");
  cardEl.className = "card";

  // Calculate dynamic font size based on total content length
  const totalChars = (card.title || "").length + 
                     (card.lines || []).join("").length;
  let fontSize;
  if (totalChars < 80) {
    fontSize = "1.4rem";
  } else if (totalChars < 150) {
    fontSize = "1.25rem";
  } else if (totalChars < 250) {
    fontSize = "1.1rem";
  } else {
    fontSize = "1rem";
  }

  // MAIN CONTENT
  const mainEl = document.createElement("div");
  mainEl.className = "card-main";

  const titleEl = document.createElement("div");
  titleEl.className = "card-title";
  titleEl.textContent = card.title;

  const ul = document.createElement("ul");
  ul.className = "card-lines";
  ul.style.fontSize = fontSize;

  (card.lines || []).forEach((line) => {
    const li = document.createElement("li");
    li.textContent = line;
    ul.appendChild(li);
  });

  mainEl.appendChild(titleEl);
  mainEl.appendChild(ul);

  // FOOTER NAV
  const footerEl = document.createElement("div");
  footerEl.className = "card-footer";

  const navRowTop = document.createElement("div");
  navRowTop.className = "nav-row";

  // Forward links (up to 4)
  (card.links || []).forEach((link) => {
    const btn = document.createElement("button");
    btn.className = "nav-btn";
    btn.textContent = link.label;
    btn.onclick = () => {
      currentId = link.targetId;
      renderCard();
    };
    navRowTop.appendChild(btn);
  });

  // Back / menu row
  const navRowBottom = document.createElement("div");
  navRowBottom.className = "nav-row";

  if (card.parent) {
    const backParentBtn = document.createElement("button");
    backParentBtn.className = "nav-btn";
    backParentBtn.textContent = "← Parent";
    backParentBtn.onclick = () => {
      currentId = card.parent;
      renderCard();
    };
    navRowBottom.appendChild(backParentBtn);
  }

  if (card.id !== "menu") {
    const backMenuBtn = document.createElement("button");
    backMenuBtn.className = "nav-btn";
    backMenuBtn.textContent = "⟲ Main menu";
    backMenuBtn.onclick = () => {
      currentId = "menu";
      renderCard();
    };
    navRowBottom.appendChild(backMenuBtn);
  }

  footerEl.appendChild(navRowTop);
  footerEl.appendChild(navRowBottom);

  // Meta info (tiny footer)
  const meta = document.createElement("div");
  meta.className = "meta-row";
  meta.innerHTML = `<span>${card.id}</span><span>Modular Speaking</span>`;

  cardEl.appendChild(mainEl);
  cardEl.appendChild(footerEl);
  cardEl.appendChild(meta);

  app.appendChild(cardEl);
}

// Initial render
renderCard();
