import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import posthog from 'posthog-js';
import Footer from '../components/Footer';

// ─────────────────────────────────────────────────────────────────────────────
// Question definitions — preserved verbatim from prior implementation.
// 28 questions across 5 sections. Each option carries the data needed for
// scoring and downstream calculation. `gap` applies to scored single-selects.
// ─────────────────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: 'A',
    title: 'About Your Business',
    questions: [
      {
        id: 'A1',
        text: 'What type of business are you?',
        kind: 'single',
        options: [
          { label: 'Medical practice (GP)' },
          { label: 'Medical practice (specialist)' },
          { label: 'Dental practice' },
          { label: 'Allied health — physiotherapy' },
          { label: 'Allied health — chiropractic' },
          { label: 'Allied health — psychology' },
          { label: 'Allied health — occupational therapy' },
          { label: 'Allied health — podiatry' },
          { label: 'Allied health — other' },
          { label: 'Accounting firm' },
          { label: 'Financial planning / wealth management' },
          { label: 'Legal practice' },
          { label: 'Mortgage broking' },
          { label: 'Insurance broking' },
          { label: 'Other professional services' },
          { label: 'Retail' },
          { label: 'Trades / construction' },
          { label: 'Hospitality' },
          { label: 'Other' },
        ],
      },
      {
        id: 'A2',
        text: 'How many staff do you currently employ?',
        kind: 'single',
        options: [
          { label: 'Just me (sole trader or principal only)', staff: 1 },
          { label: '2–5', staff: 3 },
          { label: '6–10', staff: 8 },
          { label: '11–20', staff: 15 },
          { label: '21–50', staff: 35 },
          { label: 'More than 50', staff: 60 },
        ],
      },
      {
        id: 'A3',
        text: 'How many locations do you operate from?',
        kind: 'single',
        options: [
          { label: 'One location' },
          { label: 'Two or three locations' },
          { label: 'Four or more locations' },
        ],
      },
      {
        id: 'A4',
        text: 'What is your approximate annual revenue?',
        kind: 'single',
        options: [
          { label: 'Under $500,000' },
          { label: '$500,000 – $1 million' },
          { label: '$1 million – $2 million' },
          { label: '$2 million – $5 million' },
          { label: 'More than $5 million' },
        ],
      },
      {
        id: 'A5',
        text: 'Who is completing this diagnostic?',
        kind: 'single',
        options: [
          { label: 'Business owner / principal' },
          { label: 'Practice manager' },
          { label: 'Operations manager' },
          { label: 'Office manager' },
          { label: 'IT or systems administrator' },
          { label: 'Finance manager' },
          { label: 'Other' },
        ],
      },
    ],
  },
  {
    id: 'B',
    title: 'Your Systems',
    questions: [
      {
        id: 'B1',
        text: 'Which practice or business management system do you use?',
        helper: 'Select all that apply.',
        kind: 'multi',
        allowOther: true,
        options: [
          'Best Practice (Best Practice Software)', 'Medical Director (Telstra Health)', 'Genie Solutions', 'Zedmed',
          'Cliniko', 'Automed', 'Shexie', 'PPMP', 'HotDoc', 'HealthEngine', 'MedicalDirector Pracsoft', 'Nookal',
          'Halaxy', 'Coreplus', 'TM3 / TM2', 'Jane App', 'Karbon', 'MYOB Practice', 'Handisoft (Access)',
          'Xero Practice Manager (XPM)', 'Practice Ignition / Ignition', 'Clio', 'LEAP', 'ActionStep', 'XPLAN',
          'Advice Intelligence', 'AdviserLogic', 'Class', 'BGL CAS360', 'Reckon APS', 'Monday.com', 'Asana',
          'Notion', "We don't use a practice or business management system", 'Not sure what this is',
        ].map((label) => ({ label })),
      },
      {
        id: 'B2',
        text: 'Which accounting or billing software do you use?',
        helper: 'Select all that apply.',
        kind: 'multi',
        allowOther: true,
        options: [
          'Xero', 'MYOB AccountRight', 'MYOB Essentials', 'QuickBooks Online', 'Reckon One', 'HICAPS', 'Medipass',
          'Tyro', 'Stripe', 'Square', 'PayWay', 'Healthpoint', 'We do this manually / in spreadsheets',
          'Our accountant handles this', 'Not sure',
        ].map((label) => ({ label })),
      },
      {
        id: 'B3',
        text: 'Which communication and scheduling tools do you use?',
        helper: 'Select all that apply.',
        kind: 'multi',
        allowOther: true,
        options: [
          'Microsoft 365 (Outlook, Teams, SharePoint)', 'Google Workspace (Gmail, Calendar, Drive)', 'Zoom',
          'Microsoft Teams', 'Slack', 'HotDoc (appointment booking)', 'HealthEngine (appointment booking)',
          'Calendly', 'Acuity Scheduling', 'SimplePractice', 'Phone only',
          'We use booking built into our practice management software', 'WhatsApp or SMS for staff coordination',
          'Not sure',
        ].map((label) => ({ label })),
      },
      {
        id: 'B4',
        text: 'Which file storage and document management tools do you use?',
        helper: 'Select all that apply.',
        kind: 'multi',
        allowOther: true,
        options: [
          'Microsoft SharePoint / OneDrive', 'Google Drive', 'Dropbox', 'Box', 'Shared local server / NAS drive',
          'Documents stored within our practice management system', 'Physical files only',
          'Mix of everything above', 'Not sure',
        ].map((label) => ({ label })),
      },
      {
        id: 'B5',
        text: 'Which patient or client communication tools do you use?',
        helper: 'Select all that apply.',
        kind: 'multi',
        allowOther: true,
        options: [
          'Automated SMS reminders (via practice management system)',
          'Automated email reminders (via practice management system)',
          'Manual phone calls by staff', 'Manual SMS sent by staff', 'Manual emails sent by staff',
          'MailChimp or similar', 'ActiveCampaign', 'HubSpot',
          "We don't have a structured follow-up process", 'Not sure',
        ].map((label) => ({ label })),
      },
      {
        id: 'B6',
        text: 'Do your systems share information with each other automatically?',
        kind: 'single',
        options: [
          { label: 'Yes — most systems integrated and share data automatically', gap: 0 },
          { label: "Partly — some connect, others don't", gap: 1 },
          { label: "Mostly no — we manually move data between systems", gap: 2 },
          { label: 'No — everything is separate, handled manually', gap: 3 },
          { label: "Not sure / I don't know how our systems work at that level", gap: 2 },
        ],
      },
      {
        id: 'B7',
        text: 'How many different software tools does your team use on a typical working day?',
        kind: 'single',
        options: [
          { label: '1 or 2', gap: 0 },
          { label: '3 to 5', gap: 1 },
          { label: '6 to 10', gap: 2 },
          { label: 'More than 10', gap: 3 },
          { label: 'Not sure', gap: 2 },
        ],
      },
    ],
  },
  {
    id: 'C',
    title: 'How You Work',
    questions: [
      {
        id: 'C1',
        text: "How much time per day does your team collectively spend on administrative tasks that feel manual or repetitive?",
        kind: 'single',
        options: [
          { label: 'Less than 1 hour across the team', gap: 0, hours: 0.5 },
          { label: '1–2 hours', gap: 1, hours: 1.5 },
          { label: '2–4 hours', gap: 2, hours: 3 },
          { label: '4–6 hours', gap: 3, hours: 5 },
          { label: 'More than 6 hours', gap: 4, hours: 7 },
          { label: "I honestly don't know", gap: 2, hours: 2 },
        ],
      },
      {
        id: 'C2',
        text: 'How do you currently handle appointment or booking reminders?',
        kind: 'single',
        options: [
          { label: 'Fully automated — sent without staff involvement', gap: 0 },
          { label: 'Partly automated — some done manually', gap: 1 },
          { label: 'Manual — staff make calls or send messages individually', gap: 3 },
          { label: 'We send reminders occasionally but inconsistently', gap: 3 },
          { label: "We don't send reminders", gap: 4 },
        ],
      },
      {
        id: 'C3',
        text: 'How do you handle patient or client follow-up after an appointment or engagement?',
        kind: 'single',
        options: [
          { label: 'Automated — follow-up sent automatically', gap: 0 },
          { label: 'Manual — staff contact individually', gap: 2 },
          { label: 'Ad hoc — we do it sometimes, not consistent', gap: 3 },
          { label: "We don't do follow-up communication", gap: 4 },
        ],
      },
      {
        id: 'C4',
        text: 'How do you currently manage new patient or client onboarding?',
        kind: 'single',
        options: [
          { label: 'Fully digital — forms and consents completed online before arrival', gap: 0 },
          { label: 'Mix of paper and digital', gap: 2 },
          { label: 'Mostly paper — forms completed on arrival', gap: 3 },
          { label: 'Staff manually enter information from paper forms into our systems', gap: 4 },
          { label: "We're not sure of the exact process", gap: 2 },
        ],
      },
      {
        id: 'C5',
        text: 'When a staff member is absent unexpectedly, what happens?',
        kind: 'single',
        options: [
          { label: 'Very little — processes documented, others can cover', gap: 0 },
          { label: 'Some slowing down but we manage', gap: 1 },
          { label: "Significant disruption — key tasks don't get done", gap: 3 },
          { label: 'Everything stops — we are very dependent on individuals', gap: 4 },
        ],
      },
      {
        id: 'C6',
        text: 'How often do you or your staff re-enter the same information into more than one system?',
        kind: 'single',
        options: [
          { label: 'Never — information entered once flows automatically', gap: 0 },
          { label: 'Occasionally', gap: 1 },
          { label: 'Daily', gap: 3 },
          { label: 'Multiple times per day — this is constant', gap: 4 },
        ],
      },
    ],
  },
  {
    id: 'D',
    title: 'What Is Breaking',
    questions: [
      {
        id: 'D1',
        text: 'How often do scheduling errors, double bookings, or missed appointments occur?',
        kind: 'single',
        options: [
          { label: 'Never or extremely rarely', gap: 0 },
          { label: 'Once or twice a month', gap: 1 },
          { label: 'Weekly', gap: 3 },
          { label: 'Multiple times per week — ongoing problem', gap: 4 },
        ],
      },
      {
        id: 'D2',
        text: 'Have you ever lost a client, patient, or piece of business because of an administrative or communication failure?',
        kind: 'single',
        options: [
          { label: "Not that I'm aware of", gap: 0 },
          { label: 'Once or twice', gap: 1 },
          { label: 'A handful of times', gap: 2 },
          { label: "This happens regularly and I know it's costing us", gap: 4 },
        ],
      },
      {
        id: 'D3',
        text: 'How confident are you that your team is using your current systems to their full capability?',
        kind: 'single',
        options: [
          { label: 'Very confident — we use our systems well', gap: 0 },
          { label: 'Somewhat confident — we use the main features', gap: 1 },
          { label: "Not confident — we're using maybe half of what's available", gap: 3 },
          { label: "We're barely using our systems — they don't suit us", gap: 4 },
        ],
      },
      {
        id: 'D4',
        text: 'Do you know how much time your team spends on tasks that could realistically be automated?',
        kind: 'single',
        options: [
          { label: 'Yes — I have a clear picture', gap: 0 },
          { label: 'Rough idea but not precise', gap: 1 },
          { label: "Not really — I've never measured it", gap: 3 },
          { label: 'No idea at all', gap: 4 },
        ],
      },
      {
        id: 'D5',
        text: 'Is your business growth currently being limited by operational capacity rather than demand?',
        kind: 'single',
        options: [
          { label: 'No — capacity is not the constraint right now', gap: 0 },
          { label: 'Not sure', gap: 1 },
          { label: "Possibly — I suspect it but haven't confirmed", gap: 2 },
          { label: "Yes — we have demand but can't take on more without more overhead", gap: 3 },
        ],
      },
      {
        id: 'D6',
        text: 'What is the biggest operational problem you are trying to solve right now?',
        helper: 'Select all that apply.',
        kind: 'multi',
        options: [
          'Too much time on manual or repetitive admin',
          'Staff spending time on tasks below their skill level',
          "Systems that don't talk to each other",
          'Appointment no-shows or communication breakdowns',
          'Inconsistent patient or client experience',
          "We're growing but processes haven't kept up",
          'Dependent on one or two people who know how things work',
          "No visibility into what's actually happening",
          'Security or data protection — not sure how exposed we are',
          'Compliance — not confident we meet regulatory obligations',
          'Billing errors, claim rejections, or revenue leakage',
          'Something else',
        ].map((label) => ({ label })),
      },
      {
        id: 'D7',
        text: 'Have you previously attempted to improve your systems or processes and found it difficult?',
        kind: 'single',
        options: [
          { label: "We've made some improvements but significant work remains", gap: 0 },
          { label: "No — this is the first time we're seriously looking at it", gap: 1 },
          { label: "We've talked about it but never started", gap: 2 },
          { label: "Yes — we've tried and it hasn't worked", gap: 3 },
        ],
      },
    ],
  },
  {
    id: 'E',
    title: 'Your Goals',
    questions: [
      {
        id: 'E1',
        text: "If you could recover 20% of your team's time from manual admin work, what would you do with it?",
        helper: 'Select all that apply.',
        kind: 'multi',
        options: [
          'See more patients or clients — grow revenue',
          'Improve the quality of care or service',
          'Reduce administrative staff costs',
          'Give existing staff more meaningful work',
          'Reduce my own hours and get out of the day-to-day',
          'Invest in business development and growth',
          'All of the above — any recovered time has value',
          'Something else',
        ].map((label) => ({ label })),
      },
      {
        id: 'E2',
        text: 'What is your primary goal over the next 12 months?',
        kind: 'single',
        options: [
          { label: "Comply with regulatory requirements I know I'm behind on", gap: 4 },
          { label: 'Reduce operational complexity and stress', gap: 3 },
          { label: 'Grow revenue — more clients, more volume', gap: 2 },
          { label: 'Expand to additional locations', gap: 2 },
          { label: 'Improve profitability — same revenue, lower cost', gap: 2 },
          { label: "Not sure yet — that's partly why I'm here", gap: 2 },
          { label: 'Prepare the business for sale or succession', gap: 1 },
          { label: 'Something else', gap: 2 },
        ],
      },
      {
        id: 'E3',
        text: 'What would success look like for you if you engaged with an external advisor?',
        helper: 'Optional. 200 character limit.',
        kind: 'text',
        optional: true,
        maxLength: 200,
      },
    ],
  },
];

// Flatten into a single ordered list of question screens with section context.
const QUESTIONS = SECTIONS.flatMap((section, sectionIndex) =>
  section.questions.map((q, indexInSection) => ({
    ...q,
    section,
    sectionIndex,
    indexInSection,
    questionsInSection: section.questions.length,
  }))
);

const QUESTION_BY_ID = SECTIONS.reduce((acc, sec) => {
  for (const q of sec.questions) acc[q.id] = q;
  return acc;
}, {});

const HEALTHCARE_LABELS = new Set([
  'Medical practice (GP)',
  'Medical practice (specialist)',
  'Dental practice',
  'Allied health — physiotherapy',
  'Allied health — chiropractic',
  'Allied health — psychology',
  'Allied health — occupational therapy',
  'Allied health — podiatry',
  'Allied health — other',
]);

const PROFESSIONAL_LABELS = new Set([
  'Accounting firm',
  'Financial planning / wealth management',
  'Legal practice',
  'Mortgage broking',
  'Insurance broking',
  'Other professional services',
]);

const isHealthcare = (label) => HEALTHCARE_LABELS.has(label);

const SOMETHING_ELSE = 'Something else';

// Single-select questions whose "Something else" option suppresses auto-advance
// and surfaces a free-text follow-up + explicit Next button.
const singleSelectNeedsManualNext = (qid, value) => {
  if (qid === 'A1') return isHealthcare(value);
  if (qid === 'E2') return value === SOMETHING_ELSE;
  return false;
};

const getDiagnosticType = (label) => {
  if (HEALTHCARE_LABELS.has(label)) return 'SMB_HEALTHCARE';
  if (PROFESSIONAL_LABELS.has(label)) return 'SMB_PROFESSIONAL';
  return 'SMB_HEALTHCARE';
};

// ─────────────────────────────────────────────────────────────────────────────
// Scoring — preserved from prior implementation.
// ─────────────────────────────────────────────────────────────────────────────

const gapFor = (qid, value) => {
  const q = QUESTION_BY_ID[qid];
  if (!q || !value) return 0;
  const opt = q.options?.find((o) => o.label === value);
  return opt?.gap ?? 0;
};

const SECTION_MAX = { B: 6, C: 24, D: 26, E: 4 };

const computeSectionGaps = (responses) => {
  const bGap = gapFor('B6', responses.B6) + gapFor('B7', responses.B7);
  const cGap =
    gapFor('C1', responses.C1) +
    gapFor('C2', responses.C2) +
    gapFor('C3', responses.C3) +
    gapFor('C4', responses.C4) +
    gapFor('C5', responses.C5) +
    gapFor('C6', responses.C6);
  const d6Count = Array.isArray(responses.D6) ? Math.min(responses.D6.length, 4) : 0;
  const dGap =
    gapFor('D1', responses.D1) +
    gapFor('D2', responses.D2) +
    gapFor('D3', responses.D3) +
    gapFor('D4', responses.D4) +
    gapFor('D5', responses.D5) +
    d6Count +
    gapFor('D7', responses.D7);
  const eGap = gapFor('E2', responses.E2);
  return {
    bGap,
    cGap,
    dGap,
    eGap,
    bNorm: bGap / SECTION_MAX.B,
    cNorm: cGap / SECTION_MAX.C,
    dNorm: dGap / SECTION_MAX.D,
    eNorm: eGap / SECTION_MAX.E,
  };
};

const computeScore = (responses) => {
  const { bNorm, cNorm, dNorm, eNorm } = computeSectionGaps(responses);
  const totalGap = bNorm * 0.25 + cNorm * 0.25 + dNorm * 0.3 + eNorm * 0.2;
  return Math.round((1 - totalGap) * 100);
};

const SESSION_RATES = {
  'Medical practice (GP)': 180,
  'Medical practice (specialist)': 200,
  'Dental practice': 150,
  'Allied health — physiotherapy': 120,
  'Allied health — chiropractic': 120,
  'Allied health — psychology': 120,
  'Allied health — occupational therapy': 120,
  'Allied health — podiatry': 120,
  'Allied health — other': 120,
  'Accounting firm': 250,
  'Financial planning / wealth management': 250,
  'Legal practice': 300,
  'Mortgage broking': 200,
  'Insurance broking': 200,
  'Other professional services': 200,
};

const calcStaff = (responses) => {
  const a2Opt = QUESTION_BY_ID.A2.options.find((o) => o.label === responses.A2);
  return a2Opt?.staff ?? 3;
};

const calcTimeLost = (responses) => {
  const c1Opt = QUESTION_BY_ID.C1.options.find((o) => o.label === responses.C1);
  const dailyHours = c1Opt?.hours ?? 2;
  const weeklyHours = dailyHours * 5;
  const recoverablePerWeek = weeklyHours * 0.6;
  const annualHours = recoverablePerWeek * 52;
  const annualCost = annualHours * 45;
  return { dailyHours, weeklyHours, recoverablePerWeek, annualHours, annualCost };
};

const calcRevenueAtRisk = (responses) => {
  const d1High = ['Weekly', 'Multiple times per week — ongoing problem'].includes(responses.D1);
  const d2High = ['A handful of times', "This happens regularly and I know it's costing us"].includes(responses.D2);
  const staff = calcStaff(responses);
  const rate = SESSION_RATES[responses.A1] ?? 180;
  const sessionsPerWeek = staff * 8;

  if (!d1High || !d2High) {
    // Conservative baseline: 2% attrition factor where signals are weak.
    return Math.max(sessionsPerWeek * 52 * rate * 0.02, 0);
  }

  const d1Critical = (responses.D1 || '').includes('Multiple');
  const d2Critical = (responses.D2 || '').includes('regularly');
  let attrition = 0.05;
  if (d1Critical && d2Critical) attrition = 0.15;
  else if (d1Critical || d2Critical) attrition = 0.1;
  return sessionsPerWeek * 52 * rate * attrition;
};

const computeOpportunity = (responses) => {
  const timeLost = calcTimeLost(responses);
  const revenueAtRisk = calcRevenueAtRisk(responses);
  return { timeLost, revenueAtRisk };
};

// ─────────────────────────────────────────────────────────────────────────────
// Risk-area breakdown — five labelled areas, each rated CRITICAL/HIGH/MODERATE.
// ─────────────────────────────────────────────────────────────────────────────

const severityOf = (norm) => {
  if (norm >= 0.6) return 'CRITICAL';
  if (norm >= 0.35) return 'HIGH';
  return 'MODERATE';
};

const SEVERITY_BADGE = {
  CRITICAL: 'bg-red-500/20 text-red-300 border-red-500/50',
  HIGH: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
  MODERATE: 'bg-white/10 text-silver/80 border-white/20',
};

const computeRiskAreas = (responses) => {
  const gapNorm = (qid) => {
    const q = QUESTION_BY_ID[qid];
    const max = Math.max(...(q.options || []).map((o) => o.gap ?? 0));
    if (max === 0) return 0;
    return gapFor(qid, responses[qid]) / max;
  };

  const avg = (arr) => (arr.length === 0 ? 0 : arr.reduce((a, b) => a + b, 0) / arr.length);

  const systems = avg([gapNorm('B6'), gapNorm('B7')]);
  const workflow = avg([
    gapNorm('C1'),
    gapNorm('C2'),
    gapNorm('C3'),
    gapNorm('C4'),
    gapNorm('C5'),
    gapNorm('C6'),
  ]);
  const d6Count = Array.isArray(responses.D6) ? Math.min(responses.D6.length, 4) : 0;
  const failures = avg([gapNorm('D1'), gapNorm('D2'), d6Count / 4]);
  const visibility = avg([gapNorm('D3'), gapNorm('D4')]);
  const strategic = avg([gapNorm('D5'), gapNorm('D7'), gapNorm('E2')]);

  return [
    {
      id: 'systems',
      label: 'Systems & Integration',
      norm: systems,
      severity: severityOf(systems),
    },
    {
      id: 'workflow',
      label: 'Operational Workflow',
      norm: workflow,
      severity: severityOf(workflow),
    },
    {
      id: 'failures',
      label: 'Recurring Operational Failures',
      norm: failures,
      severity: severityOf(failures),
    },
    {
      id: 'visibility',
      label: 'Visibility & Awareness',
      norm: visibility,
      severity: severityOf(visibility),
    },
    {
      id: 'strategic',
      label: 'Strategic Posture',
      norm: strategic,
      severity: severityOf(strategic),
    },
  ];
};

const REVIEW_TEMPLATES = {
  systems:
    'Your systems are operating in isolation. Every workflow that needs data from more than one place creates manual effort, and the cost compounds across every working day.',
  workflow:
    'Your team is spending significant time on manual administrative tasks that could be largely automated. This is the single biggest cost driver in your current operation.',
  failures:
    'You are losing measurable revenue from administrative and communication failures. These are recoverable with the right process design — the cost is real and the fix is well-understood.',
  visibility:
    "You don't currently have a clear picture of where time is being lost or what it is costing. That is the first thing to fix — you cannot manage what you cannot measure.",
  strategic:
    'Past attempts to improve your processes have not held. This is usually a sequencing and change-management problem, not a technology problem.',
};

const generatePersonalReview = (areas) => {
  const ranked = [...areas].filter((a) => a.severity !== 'MODERATE').sort((a, b) => b.norm - a.norm);
  const top = ranked.slice(0, 3);
  if (top.length === 0) {
    return 'Your operation is running with relatively few obvious gaps. The remaining opportunity is targeted — confirming what is already working and removing the last sources of friction before they grow.';
  }
  return top.map((a) => REVIEW_TEMPLATES[a.id]).join(' ');
};

// ─────────────────────────────────────────────────────────────────────────────
// API submission
// ─────────────────────────────────────────────────────────────────────────────

const API_URL = 'https://command.bwadvisorysolutions.com.au/api/intake/diagnostic';
const TRACK_URL = 'https://command.bwadvisorysolutions.com.au/api/track/diagnostic';
const REFERRAL_URL = 'https://command.bwadvisorysolutions.com.au/api/intake/referral';
const SHARE_BASE = 'https://bwadvisorysolutions.com.au/ai-readiness';

const trackEvent = (payload) => {
  try {
    fetch(TRACK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // fire-and-forget — never block the UI
  }
};

const buildReferralToken = (email) => {
  try {
    return btoa((email || '').trim()).replace(/=/g, '');
  } catch {
    return '';
  }
};

const submitToCommandCentre = async (payload) => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error('[ai-readiness] API responded', res.status, await res.text().catch(() => ''));
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error('[ai-readiness] API submission failed', err);
    return { ok: false };
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Formatting
// ─────────────────────────────────────────────────────────────────────────────

const fmtMoney = (n) => {
  const rounded = Math.round(n / 100) * 100;
  return `$${rounded.toLocaleString('en-AU')}`;
};
const fmtHours = (n) => `${Math.round(n).toLocaleString('en-AU')}`;

// ─────────────────────────────────────────────────────────────────────────────
// UI primitives
// ─────────────────────────────────────────────────────────────────────────────

const ProgressBar = ({ current, total }) => {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-silver/70 text-[11px] font-mono tracking-[0.3em] uppercase font-bold">
        <span>Question {current} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#C9A84C] transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

const SectionHeader = ({ section, sectionNumber, totalSections, indexInSection, questionsInSection }) => (
  <div className="space-y-1">
    <p className="text-[#C9A84C] font-mono text-[11px] tracking-[0.3em] uppercase font-bold">
      Section {sectionNumber} of {totalSections} — {section.title}
    </p>
    <p className="text-silver/55 font-mono text-[11px] tracking-[0.3em] uppercase">
      Question {indexInSection + 1} of {questionsInSection}
    </p>
  </div>
);

const OptionCard = ({ checked, label, multi, onClick, autoFocus }) => (
  <button
    type="button"
    onClick={onClick}
    autoFocus={autoFocus}
    className={[
      'group w-full text-left px-5 py-4 min-h-[56px] rounded-xl border transition-all duration-200 cursor-pointer',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60',
      checked
        ? 'bg-[#C9A84C]/15 border-[#C9A84C] text-white'
        : 'bg-white/5 border-white/15 text-silver hover:bg-white/10 hover:border-[#C9A84C]/40 hover:text-white',
    ].join(' ')}
  >
    <span className="flex items-center gap-4">
      <span
        className={[
          multi ? 'rounded-md' : 'rounded-full',
          'w-5 h-5 border-2 flex-shrink-0 transition-colors duration-200 flex items-center justify-center',
          checked ? 'border-[#C9A84C] bg-[#C9A84C]' : 'border-silver/40 group-hover:border-[#C9A84C]/60',
        ].join(' ')}
      >
        {checked && (
          <svg className="w-3 h-3 text-[#0F172A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span className="text-base md:text-lg font-light leading-snug">{label}</span>
    </span>
  </button>
);

// ─────────────────────────────────────────────────────────────────────────────
// Question screen — one question rendered, auto-advance for single-select.
// ─────────────────────────────────────────────────────────────────────────────

const OTHER_LABEL = 'Other — please specify';

const QuestionScreen = ({
  question,
  value,
  otherValue,
  onChange,
  onOtherChange,
  onAdvance,
  onSelectionMade,
  isFirstScreen,
}) => {
  // Healthcare follow-up only triggers when A1 + healthcare option chosen.
  const showHealthcareFollowUp = question.id === 'A1' && isHealthcare(value);
  const followUpRef = useRef(null);

  useEffect(() => {
    if (showHealthcareFollowUp && followUpRef.current) {
      followUpRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showHealthcareFollowUp]);

  const handleSingle = (label) => {
    onChange(label);
    if (singleSelectNeedsManualNext(question.id, label)) {
      // Surfaces an explicit Next button — bring it into view.
      if (onSelectionMade) onSelectionMade();
      return;
    }
    setTimeout(() => onAdvance(), 400);
  };

  const handleMultiToggle = (label) => {
    const arr = Array.isArray(value) ? value : [];
    const next = arr.includes(label) ? arr.filter((x) => x !== label) : [...arr, label];
    onChange(next);
    if (onSelectionMade) onSelectionMade();
  };

  const arr = Array.isArray(value) ? value : [];

  if (question.kind === 'text') {
    return (
      <div className="space-y-6">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white leading-snug">
          {question.text}
        </h2>
        {question.helper && <p className="text-sm text-silver/60 font-light">{question.helper}</p>}
        <textarea
          autoFocus
          value={value || ''}
          onChange={(e) => onChange(e.target.value.slice(0, question.maxLength || 200))}
          maxLength={question.maxLength || 200}
          rows={4}
          className="w-full bg-white/5 border border-white/15 rounded-xl px-5 py-4 text-white text-base md:text-lg placeholder:text-silver/40 focus:outline-none focus:border-[#C9A84C] transition-colors duration-200"
          placeholder="Optional — share in your own words"
        />
        <p className="text-xs text-silver/50 font-mono">
          {(value || '').length}/{question.maxLength || 200}
        </p>
      </div>
    );
  }

  if (question.kind === 'multi') {
    const otherChecked = question.allowOther && arr.includes(OTHER_LABEL);
    const toggleOther = () => {
      if (otherChecked) {
        onChange(arr.filter((x) => x !== OTHER_LABEL));
        if (onOtherChange) onOtherChange('');
      } else {
        onChange([...arr, OTHER_LABEL]);
      }
    };
    return (
      <div className="space-y-6">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white leading-snug">
          {question.text}
        </h2>
        {question.helper && <p className="text-sm text-silver/60 font-light">{question.helper}</p>}
        <div className="grid grid-cols-1 gap-3">
          {question.options.map((opt, i) => (
            <OptionCard
              key={opt.label}
              multi
              checked={arr.includes(opt.label)}
              label={opt.label}
              onClick={() => handleMultiToggle(opt.label)}
              autoFocus={i === 0 && !isFirstScreen}
            />
          ))}
          {question.allowOther && (
            <>
              <OptionCard
                multi
                checked={otherChecked}
                label={OTHER_LABEL}
                onClick={toggleOther}
              />
              {otherChecked && (
                <input
                  type="text"
                  value={otherValue || ''}
                  onChange={(e) => onOtherChange && onOtherChange(e.target.value.slice(0, 200))}
                  maxLength={200}
                  placeholder="Enter software name"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-5 py-4 text-white placeholder:text-silver/40 focus:outline-none focus:border-[#C9A84C] transition-colors duration-200"
                />
              )}
            </>
          )}
          {question.id === 'E1' && arr.includes(SOMETHING_ELSE) && (
            <input
              type="text"
              value={otherValue || ''}
              onChange={(e) => onOtherChange && onOtherChange(e.target.value.slice(0, 200))}
              maxLength={200}
              placeholder="Tell us what you'd do with it — optional"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-5 py-4 text-white placeholder:text-silver/40 focus:outline-none focus:border-[#C9A84C] transition-colors duration-200"
            />
          )}
          {question.id === 'D6' && arr.includes(SOMETHING_ELSE) && (
            <input
              type="text"
              value={otherValue || ''}
              onChange={(e) => onOtherChange && onOtherChange(e.target.value.slice(0, 200))}
              maxLength={200}
              placeholder="Tell us what the problem is — optional"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-5 py-4 text-white placeholder:text-silver/40 focus:outline-none focus:border-[#C9A84C] transition-colors duration-200"
            />
          )}
        </div>
      </div>
    );
  }

  // Single-select
  return (
    <div className="space-y-6">
      <h2 className="font-display font-bold text-2xl md:text-3xl text-white leading-snug">
        {question.text}
      </h2>
      {question.helper && <p className="text-sm text-silver/60 font-light">{question.helper}</p>}
      <div className="grid grid-cols-1 gap-3">
        {question.options.map((opt, i) => (
          <OptionCard
            key={opt.label}
            checked={value === opt.label}
            label={opt.label}
            onClick={() => handleSingle(opt.label)}
            autoFocus={i === 0 && !isFirstScreen}
          />
        ))}
      </div>
      {showHealthcareFollowUp && (
        <div ref={followUpRef} className="space-y-3 pt-4 border-t border-white/10">
          <label className="block">
            <span className="text-silver/75 text-xs font-mono tracking-[0.3em] uppercase font-bold">
              Tell us more — what type of practice?
            </span>
            <input
              type="text"
              value={otherValue || ''}
              onChange={(e) => onOtherChange && onOtherChange(e.target.value.slice(0, 200))}
              placeholder="Optional — e.g. mixed billing GP, paediatric specialist, group dental"
              className="mt-2 w-full bg-white/5 border border-white/15 rounded-xl px-5 py-4 text-white placeholder:text-silver/40 focus:outline-none focus:border-[#C9A84C] transition-colors duration-200"
            />
          </label>
        </div>
      )}
      {question.id === 'E2' && value === SOMETHING_ELSE && (
        <div className="space-y-3 pt-4 border-t border-white/10">
          <input
            type="text"
            value={otherValue || ''}
            onChange={(e) => onOtherChange && onOtherChange(e.target.value.slice(0, 200))}
            placeholder="Tell us your goal — optional"
            className="w-full bg-white/5 border border-white/15 rounded-xl px-5 py-4 text-white placeholder:text-silver/40 focus:outline-none focus:border-[#C9A84C] transition-colors duration-200"
          />
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Intro / gate screen — shown before Question 1 so the diagnostic reads as
// quick and low-friction before the question count is ever visible.
// ─────────────────────────────────────────────────────────────────────────────

const IntroScreen = ({ onStart }) => (
  <div className="space-y-8 text-center">
    <div className="flex justify-center">
      <div className="relative">
        <div className="absolute inset-0 bg-[#C9A84C]/30 rounded-full blur-2xl" />
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A84C]/25 to-accent/15 border border-[#C9A84C]/40 flex items-center justify-center">
          <img src="/ai-icon.svg" alt="" className="w-10 h-10" />
        </div>
      </div>
    </div>
    <div className="space-y-3">
      <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">AI-Powered Diagnostic</p>
      <h2 className="font-display font-bold text-2xl md:text-3xl text-white leading-snug">
        Ready when you are.
      </h2>
      <p className="text-silver/75 font-light text-base md:text-lg leading-relaxed max-w-lg mx-auto">
        No account, no download — just straight answers and a scored result the moment you finish.
      </p>
    </div>
    <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-silver/70 text-sm font-light">
      {['~5 minutes', 'One question at a time', 'Instant scored result'].map((t) => (
        <span key={t} className="flex items-center gap-2">
          <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
          {t}
        </span>
      ))}
    </div>
    <div className="pt-4">
      <button
        type="button"
        onClick={onStart}
        className="inline-flex items-center justify-center gap-3 bg-[#C9A84C] px-10 md:px-12 py-5 min-h-[48px] rounded-lg text-[#0F172A] font-bold text-sm tracking-[0.15em] uppercase hover:bg-[#E0BC60] transition-all duration-300 shadow-[0_8px_24px_rgba(201,168,76,0.3)] cursor-pointer"
      >
        Start Diagnostic
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Email capture screen
// ─────────────────────────────────────────────────────────────────────────────

const ConsentCheckbox = ({ checked, onChange, required, children }) => (
  <label className="flex items-start gap-3 cursor-pointer group">
    <input
      type="checkbox"
      checked={!!checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mt-1 w-4 h-4 accent-[#C9A84C] cursor-pointer flex-shrink-0"
    />
    <span className="text-silver/85 font-light text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
      {children}{required && <span className="text-[#C9A84C]"> *</span>}
    </span>
  </label>
);

const EmailCaptureScreen = ({ lead, onChange, onSubmit, submitting }) => {
  const fieldsValid = lead.name.trim().length > 1 && /\S+@\S+\.\S+/.test(lead.email.trim());
  const valid = fieldsValid && !!lead.consentContact;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!valid || submitting) return;
        onSubmit();
      }}
      className="space-y-6"
    >
      <h2 className="font-display font-bold text-2xl md:text-3xl text-white leading-snug">
        Where should we send your results?
      </h2>
      <p className="text-silver/70 font-light text-base md:text-lg">
        Your score appears on the next screen.
      </p>
      <div className="space-y-4">
        <label className="flex flex-col gap-2">
          <span className="text-silver/75 text-xs font-mono tracking-[0.3em] uppercase font-bold">
            Name <span className="text-[#C9A84C]">*</span>
          </span>
          <input
            autoFocus
            type="text"
            required
            value={lead.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="bg-white/5 border border-white/15 rounded-lg px-5 py-4 min-h-[48px] text-white text-base placeholder:text-silver/40 focus:outline-none focus:border-[#C9A84C] transition-colors duration-200"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-silver/75 text-xs font-mono tracking-[0.3em] uppercase font-bold">
            Email <span className="text-[#C9A84C]">*</span>
          </span>
          <input
            type="email"
            required
            value={lead.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="bg-white/5 border border-white/15 rounded-lg px-5 py-4 min-h-[48px] text-white text-base placeholder:text-silver/40 focus:outline-none focus:border-[#C9A84C] transition-colors duration-200"
          />
        </label>
      </div>
      <div className="space-y-4 pt-2 border-t border-white/10 pt-6">
        <ConsentCheckbox
          checked={lead.consentContact}
          onChange={(v) => onChange('consentContact', v)}
          required
        >
          I consent to BW Advisory Solutions collecting and using the personal information in this form for the purpose of responding to my enquiry and preparing for our conversation, in line with the{' '}
          <a href="/privacy" className="underline hover:text-[#C9A84C]">Privacy Policy</a> and the <em>Privacy Act 1988</em> (Cth).
        </ConsentCheckbox>
        <ConsentCheckbox
          checked={lead.consentMarketing}
          onChange={(v) => onChange('consentMarketing', v)}
        >
          I'd also like to receive occasional insights, articles, and updates from BW Advisory Solutions. I understand I can unsubscribe at any time.
        </ConsentCheckbox>
      </div>
      <div className="pt-4">
        <button
          type="submit"
          disabled={!valid || submitting}
          className={[
            'w-full md:w-auto px-12 py-5 min-h-[48px] rounded-lg font-bold text-sm tracking-[0.15em] uppercase transition-all duration-300 inline-flex items-center justify-center gap-3',
            !valid || submitting
              ? 'bg-white/10 text-silver/40 cursor-not-allowed'
              : 'bg-[#C9A84C] text-[#0F172A] hover:bg-[#E0BC60] cursor-pointer shadow-[0_8px_24px_rgba(201,168,76,0.3)]',
          ].join(' ')}
        >
          {submitting ? 'Calculating…' : 'Show My Results →'}
        </button>
      </div>
    </form>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Result screen
// ─────────────────────────────────────────────────────────────────────────────

const Results = ({ score, opportunity, riskAreas, review, lead, referralToken, diagnosticType }) => {
  const concernCount = riskAreas.filter((a) => a.severity !== 'MODERATE').length;
  const weeklyHours = opportunity.timeLost.weeklyHours;

  const shareUrl = referralToken ? `${SHARE_BASE}?ref=${referralToken}` : SHARE_BASE;
  const [linkCopied, setLinkCopied] = useState(false);
  const [showShareForm, setShowShareForm] = useState(false);
  const [shareForm, setShareForm] = useState({ name: '', email: '' });
  const [shareAttempted, setShareAttempted] = useState(false);

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // fall back silently — modern browsers expose clipboard in secure contexts
    }
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 3000);
  };

  const buildMailtoBody = () => {
    const riskLines = riskAreas
      .map((a) => `- ${a.label} (${a.severity})`)
      .join('\n');
    const body = [
      `I completed the BW Advisory AI Readiness Diagnostic.`,
      ``,
      `Score: ${score}/100`,
      ``,
      `Estimated time lost per week: ${fmtHours(weeklyHours)} hours`,
      `Estimated annual cost of lost time: ${fmtMoney(opportunity.timeLost.annualCost)}`,
      `Estimated annual revenue at risk: ${fmtMoney(opportunity.revenueAtRisk)}`,
      ``,
      `Risk areas:`,
      riskLines,
      ``,
      `Assessment completed at bwadvisorysolutions.com.au/ai-readiness`,
    ].join('\n');
    return body;
  };

  const openMailto = () => {
    const subject = `BW Advisory AI Readiness — Score ${score}/100`;
    const href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMailtoBody())}`;
    window.location.href = href;
  };

  const sendShare = () => {
    if (shareAttempted) {
      openMailto();
      return;
    }
    setShareAttempted(true);
    const referrerEmail = (lead?.email || '').trim();
    const referralName = shareForm.name.trim();
    const referralEmail = shareForm.email.trim();
    if (referralName || referralEmail) {
      try {
        fetch(REFERRAL_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referrerEmail,
            referralName,
            referralEmail,
            score,
            diagnosticType,
          }),
          keepalive: true,
        }).catch(() => {});
      } catch {
        // fire-and-forget
      }
    }
    openMailto();
  };

  return (
    <div className="space-y-12">
      {/* Headline score */}
      <div className="bg-gradient-to-br from-white/12 via-white/6 to-white/3 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-14 text-center space-y-5">
        <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">
          Your Result
        </p>
        <h1 className="font-display font-bold text-3xl md:text-5xl text-white leading-tight">
          Your Operational Efficiency Score:{' '}
          <span className="text-[#C9A84C]">{score}/100</span>
        </h1>
        <p className="text-base md:text-lg text-silver/80 font-light leading-relaxed max-w-3xl mx-auto">
          Based on your responses, we've identified <span className="text-4xl font-bold text-[#C9A84C]">{concernCount}</span> area{concernCount === 1 ? '' : 's'} where your current workflows are creating measurable <span className="text-[#C9A84C]">inefficiency</span>, <span className="text-[#C9A84C]">duplication</span>, and <span className="text-[#C9A84C]">risk</span>.
        </p>
      </div>

      {/* Three-metric block */}
      <div>
        <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold mb-6">
          The Cost
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/15 rounded-2xl p-6 md:p-8 space-y-2">
            <p className="text-silver/65 text-sm font-light">Estimated time lost per week across your team</p>
            <p className="text-[#C9A84C] font-display font-bold text-3xl md:text-4xl">
              {fmtHours(weeklyHours)} hours
            </p>
          </div>
          <div className="bg-white/5 border border-white/15 rounded-2xl p-6 md:p-8 space-y-2">
            <p className="text-silver/65 text-sm font-light">Estimated annual cost of that lost time</p>
            <p className="text-[#C9A84C] font-display font-bold text-3xl md:text-4xl">
              {fmtMoney(opportunity.timeLost.annualCost)}
            </p>
          </div>
          <div className="bg-white/5 border border-white/15 rounded-2xl p-6 md:p-8 space-y-2">
            <p className="text-silver/65 text-sm font-light">Estimated annual revenue at risk</p>
            <p className="text-[#C9A84C] font-display font-bold text-3xl md:text-4xl">
              {fmtMoney(opportunity.revenueAtRisk)}
            </p>
          </div>
        </div>
        <p className="text-xs text-silver/55 font-light mt-4">
          These are conservative estimates. The actual cost to your business is likely higher.
        </p>
      </div>

      {/* Risk-area breakdown */}
      <div>
        <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold mb-6">
          Risk Area Breakdown
        </p>
        <div className="grid grid-cols-1 gap-3">
          {riskAreas.map((a) => (
            <div
              key={a.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white/5 border border-white/15 rounded-xl px-5 md:px-6 py-4"
            >
              <p className="text-white font-display font-semibold text-lg">{a.label}</p>
              <span
                className={`self-start md:self-auto text-[11px] font-mono font-bold tracking-[0.3em] uppercase px-3 py-1 rounded border ${SEVERITY_BADGE[a.severity]}`}
              >
                {a.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Personal review */}
      <div className="bg-white/5 border border-white/15 rounded-2xl p-6 md:p-8 space-y-3">
        <p className="text-silver/60 font-mono text-xs tracking-[0.3em] uppercase font-bold">
          Here's what stood out in your responses
        </p>
        <p className="text-silver/85 font-light text-base md:text-lg leading-relaxed">
          {review}
        </p>
      </div>

      {/* CTA */}
      <div className="relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-xl border border-[#C9A84C]/30 rounded-3xl p-8 md:p-14 text-center space-y-6">
        <p className="text-base md:text-lg text-silver/85 font-light leading-relaxed max-w-3xl mx-auto">
          The next step is a BW Advisory Operational Resilience Diagnostic. Most clients recover the cost of the diagnostic within the first month of implementation.
        </p>
        <button
          type="button"
          onClick={() => { posthog.capture('diagnostic_result_book_clicked', { score }); window.location.href = '/consultation'; }}
          className="inline-flex items-center justify-center gap-3 bg-[#C9A84C] px-10 md:px-12 py-5 min-h-[48px] rounded-lg text-[#0F172A] font-bold text-sm tracking-[0.15em] uppercase hover:bg-[#E0BC60] transition-all duration-300 shadow-[0_8px_24px_rgba(201,168,76,0.3)] cursor-pointer"
        >
          Book Your Diagnostic
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
        <p className="text-sm md:text-base text-silver/60 font-light">
          {lead.consentContact
            ? <>Your results are on their way to <span className="text-white">{lead.email}</span>.</>
            : 'Use the buttons below to save or share your results.'}
        </p>
      </div>

      {/* Paid tier ladder — shown when purchase surface is enabled */}
      {import.meta.env.VITE_PURCHASE_SURFACE_ENABLED === 'true' && (
        <div className="space-y-4 border-t border-white/10 pt-10">
          <p className="text-silver/50 font-mono text-xs tracking-[0.3em] uppercase font-bold text-center">Want the full picture?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 md:p-8 space-y-4">
              <div className="space-y-1">
                <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">AI Snapshot Report</p>
                <p className="font-display font-bold text-2xl text-white">$497 <span className="text-sm text-silver/50 font-light font-sans">incl. GST</span></p>
              </div>
              <p className="text-silver/70 font-light text-sm leading-relaxed">
                Automated, instant. Named tools checked against your existing software, verified pricing, trust and safety notes, and a 4-day setup plan per opportunity.
              </p>
              <p className="text-silver/45 text-xs font-light italic">
                Automated — instant delivery. No human review at this tier.
              </p>
              <a
                href="/pricing#snapshot"
                onClick={() => posthog.capture('diagnostic_result_pricing_clicked', { score, tier: 'snapshot' })}
                className="inline-flex items-center gap-2 text-[#C9A84C] text-sm font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 rounded"
              >
                View pricing
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            <div className="bg-gradient-to-br from-[#C9A84C]/8 to-white/2 border border-[#C9A84C]/25 rounded-2xl p-6 md:p-8 space-y-4">
              <div className="space-y-1">
                <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">AI Solution Map</p>
                <p className="font-display font-bold text-2xl text-white">$1,497 <span className="text-sm text-silver/50 font-light font-sans">incl. GST</span></p>
              </div>
              <p className="text-silver/70 font-light text-sm leading-relaxed">
                Personally reviewed by Brad before delivery. Everything in the Snapshot, plus the patterns you didn't name. Includes a 30-minute call within 5 business days.
              </p>
              <p className="text-silver/45 text-xs font-light">
                Your $497 Snapshot credit applies for 60 days from purchase.
              </p>
              <a
                href="/pricing#solution-map"
                onClick={() => posthog.capture('diagnostic_result_pricing_clicked', { score, tier: 'solution-map' })}
                className="inline-flex items-center gap-2 text-[#C9A84C] text-sm font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 rounded"
              >
                View pricing
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Share buttons */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <button
            type="button"
            onClick={copyShareLink}
            className="flex-1 px-6 py-4 min-h-[48px] rounded-lg border border-[#C9A84C]/60 text-[#C9A84C] font-bold text-sm tracking-[0.15em] uppercase hover:bg-[#C9A84C]/10 hover:border-[#C9A84C] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50"
          >
            {linkCopied ? 'Link copied' : 'Share this diagnostic'}
          </button>
          <button
            type="button"
            onClick={() => setShowShareForm((s) => !s)}
            className="flex-1 px-6 py-4 min-h-[48px] rounded-lg border border-[#C9A84C]/60 text-[#C9A84C] font-bold text-sm tracking-[0.15em] uppercase hover:bg-[#C9A84C]/10 hover:border-[#C9A84C] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50"
          >
            Share results
          </button>
        </div>

        {showShareForm && (
          <div className="bg-white/5 border border-white/15 rounded-2xl p-6 space-y-4">
            {shareAttempted ? (
              <p className="text-silver/85 font-light text-base text-center py-4">
                Results shared. Check your email for a copy.
              </p>
            ) : (
              <>
                <p className="text-silver/80 font-light text-base">Who are you sharing this with?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="flex flex-col gap-2">
                    <span className="text-silver/75 text-xs font-mono tracking-[0.3em] uppercase font-bold">
                      Name (optional)
                    </span>
                    <input
                      type="text"
                      value={shareForm.name}
                      onChange={(e) => setShareForm((prev) => ({ ...prev, name: e.target.value.slice(0, 200) }))}
                      className="bg-white/5 border border-white/15 rounded-lg px-4 py-3 min-h-[44px] text-white placeholder:text-silver/40 focus:outline-none focus:border-[#C9A84C] transition-colors duration-200"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-silver/75 text-xs font-mono tracking-[0.3em] uppercase font-bold">
                      Email (optional)
                    </span>
                    <input
                      type="email"
                      value={shareForm.email}
                      onChange={(e) => setShareForm((prev) => ({ ...prev, email: e.target.value.slice(0, 200) }))}
                      className="bg-white/5 border border-white/15 rounded-lg px-4 py-3 min-h-[44px] text-white placeholder:text-silver/40 focus:outline-none focus:border-[#C9A84C] transition-colors duration-200"
                    />
                  </label>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={sendShare}
                    className="px-8 py-3 min-h-[44px] rounded-lg bg-[#C9A84C] text-[#0F172A] font-bold text-sm tracking-[0.15em] uppercase hover:bg-[#E0BC60] transition-all duration-300 cursor-pointer shadow-[0_8px_24px_rgba(201,168,76,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50"
                  >
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

const TOTAL_QUESTIONS = QUESTIONS.length; // 28
const STEP_INTRO = -1;
const STEP_EMAIL = TOTAL_QUESTIONS;       // 28
const STEP_RESULTS = TOTAL_QUESTIONS + 1; // 29

const isAnswerValid = (question, value) => {
  if (!question) return false;
  if (question.optional || question.kind === 'text') return true;
  if (question.kind === 'multi') return Array.isArray(value) && value.length > 0;
  return typeof value === 'string' && value.length > 0;
};

const AIReadiness = () => {
  const [step, setStep] = useState(STEP_INTRO);
  const [direction, setDirection] = useState('forward');
  const [responses, setResponses] = useState({});
  const [lead, setLead] = useState({ name: '', email: '', consentContact: false, consentMarketing: false });
  const [submitting, setSubmitting] = useState(false);
  const [finalResults, setFinalResults] = useState(null);
  const [referredBy, setReferredBy] = useState(null);
  const [sessionId] = useState(() => {
    try {
      return crypto.randomUUID();
    } catch {
      return `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    }
  });
  const advanceLockRef = useRef(false);
  const nextButtonRef = useRef(null);
  const startFiredRef = useRef(false);
  const stepRef = useRef(0);
  const completedRef = useRef(false);

  // Read inbound referral token from URL on mount.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (ref) setReferredBy(ref);
    } catch {
      // ignore
    }
  }, []);

  const setAnswer = useCallback((qid, value) => {
    setResponses((prev) => ({ ...prev, [qid]: value }));
    if (!startFiredRef.current) {
      startFiredRef.current = true;
      trackEvent({ sessionId, event: 'START', questionIndex: 0 });
    }
  }, [sessionId]);

  const scrollNextIntoView = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (nextButtonRef.current) {
          nextButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      });
    });
  }, []);

  const startDiagnostic = useCallback(() => {
    posthog.capture('ai_readiness_started');
    setDirection('forward');
    setStep(0);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const advance = useCallback(() => {
    if (advanceLockRef.current) return;
    advanceLockRef.current = true;
    setDirection('forward');
    setStep((s) => {
      const next = Math.min(s + 1, STEP_RESULTS);
      trackEvent({ sessionId, event: 'ADVANCE', questionIndex: next });
      return next;
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => { advanceLockRef.current = false; }, 350);
  }, [sessionId]);

  const goBack = useCallback(() => {
    if (advanceLockRef.current) return;
    setDirection('back');
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const submitLead = async () => {
    setSubmitting(true);
    const score = computeScore(responses);
    const opportunity = computeOpportunity(responses);
    const riskAreas = computeRiskAreas(responses);
    const review = generatePersonalReview(riskAreas);
    const diagnosticType = getDiagnosticType(responses.A1);
    const referralToken = buildReferralToken(lead.email);
    setFinalResults({ score, opportunity, riskAreas, review, diagnosticType, referralToken });

    const payload = {
      name: lead.name.trim(),
      email: lead.email.trim(),
      organisation: responses.A1 || 'Not specified',
      diagnosticType,
      responses: {
        ...responses,
        score,
        opportunityEstimate: {
          weeklyHours: opportunity.timeLost.weeklyHours,
          annualHours: opportunity.timeLost.annualHours,
          annualCost: opportunity.timeLost.annualCost,
          revenueAtRisk: opportunity.revenueAtRisk,
        },
        riskAreas: riskAreas.map(({ id, label, severity }) => ({ id, label, severity })),
      },
      optInResearch: false,
      consentContact: !!lead.consentContact,
      consentMarketing: !!lead.consentMarketing,
      source: 'website_diagnostic',
      brand: 'BW_ADVISORY',
      sessionId,
      referralToken,
      referredBy: referredBy || undefined,
    };

    submitToCommandCentre(payload).finally(() => {
      setSubmitting(false);
    });

    completedRef.current = true;
    trackEvent({ sessionId, event: 'COMPLETE', score, diagnosticType });
    posthog.identify(lead.email.trim(), { name: lead.name.trim() });
    posthog.capture('ai_readiness_completed', {
      score,
      diagnostic_type: diagnosticType,
      concern_count: computeRiskAreas(responses).filter((a) => a.severity !== 'MODERATE').length,
    });

    setDirection('forward');
    setStep(STEP_RESULTS);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Mirror step into a ref so the unload handler can read it without re-binding.
  useEffect(() => {
    stepRef.current = step;
    if (step === STEP_EMAIL) {
      trackEvent({ sessionId, event: 'EMAIL_CAPTURE' });
    }
  }, [step, sessionId]);

  // Fire ABANDON if the user leaves before completing.
  useEffect(() => {
    const handler = () => {
      if (completedRef.current) return;
      if (!startFiredRef.current) return;
      trackEvent({ sessionId, event: 'ABANDON', questionIndex: stepRef.current });
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [sessionId]);

  // Global Enter handler — advance when current screen is valid.
  useEffect(() => {
    const handler = (e) => {
      if (e.key !== 'Enter') return;
      const tag = (e.target?.tagName || '').toLowerCase();
      if (tag === 'textarea' || tag === 'input' || tag === 'button') return;
      if (step === STEP_INTRO) {
        startDiagnostic();
        return;
      }
      if (step < TOTAL_QUESTIONS) {
        const q = QUESTIONS[step];
        if (isAnswerValid(q, responses[q.id])) advance();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [step, responses, advance, startDiagnostic]);

  // Determine which screen is rendered.
  let screenContent;
  let progressCurrent;
  let canGoNext = false;

  if (step === STEP_INTRO) {
    screenContent = <IntroScreen onStart={startDiagnostic} />;
  } else if (step < TOTAL_QUESTIONS) {
    const q = QUESTIONS[step];
    progressCurrent = step + 1;
    canGoNext = isAnswerValid(q, responses[q.id]);

    screenContent = (
      <div className="space-y-8">
        <SectionHeader
          section={q.section}
          sectionNumber={q.sectionIndex + 1}
          totalSections={SECTIONS.length}
          indexInSection={q.indexInSection}
          questionsInSection={q.questionsInSection}
        />
        <QuestionScreen
          question={q}
          value={responses[q.id]}
          otherValue={responses[`${q.id}_other`]}
          onChange={(v) => setAnswer(q.id, v)}
          onOtherChange={(v) => setAnswer(`${q.id}_other`, v)}
          onAdvance={advance}
          onSelectionMade={scrollNextIntoView}
          isFirstScreen={step === 0}
        />
      </div>
    );
  } else if (step === STEP_EMAIL) {
    progressCurrent = TOTAL_QUESTIONS;
    canGoNext = true;
    screenContent = (
      <EmailCaptureScreen
        lead={lead}
        onChange={(field, value) => setLead((prev) => ({ ...prev, [field]: value }))}
        onSubmit={submitLead}
        submitting={submitting}
      />
    );
  } else {
    screenContent = finalResults ? (
      <Results
        score={finalResults.score}
        opportunity={finalResults.opportunity}
        riskAreas={finalResults.riskAreas}
        review={finalResults.review}
        lead={lead}
        referralToken={finalResults.referralToken}
        diagnosticType={finalResults.diagnosticType}
      />
    ) : null;
  }

  const showProgress = step >= 0 && step <= STEP_EMAIL;
  const showBack = step > 0 && step <= STEP_EMAIL;
  const currentQ = step < TOTAL_QUESTIONS ? QUESTIONS[step] : null;
  const singleNeedsNext =
    currentQ?.kind === 'single' &&
    singleSelectNeedsManualNext(currentQ.id, responses[currentQ.id]);
  const showNextButton =
    step < TOTAL_QUESTIONS &&
    currentQ &&
    (currentQ.kind === 'multi' || currentQ.kind === 'text' || singleNeedsNext);

  const slideClass = direction === 'forward' ? 'slide-fwd' : 'slide-back';

  return (
    <div className="bg-primary min-h-screen">
      <style>{`
        @keyframes aiFwd { from { opacity: 0; transform: translateX(32px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes aiBack { from { opacity: 0; transform: translateX(-32px); } to { opacity: 1; transform: translateX(0); } }
        .slide-fwd { animation: aiFwd 280ms ease-out; }
        .slide-back { animation: aiBack 280ms ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .slide-fwd, .slide-back { animation: none; }
        }
      `}</style>

      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-12 px-6 w-full z-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#0369A1]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-silver/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">
            AI Readiness Diagnostic
          </p>
          <h1 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight leading-[1.1]">
            See where AI fits — and where it doesn't.
          </h1>
          <p className="text-base md:text-lg text-silver/75 font-light leading-relaxed">
            Five minutes. One question at a time. Your scored result appears the moment you finish — showing exactly where you're exposed and what each gap is likely costing you.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="pb-32 px-6 w-full relative z-10">
        <div className="max-w-3xl mx-auto space-y-6">
          {showProgress && (
            <ProgressBar current={progressCurrent} total={TOTAL_QUESTIONS} />
          )}

          <div className="relative bg-[#0F172A]/90 backdrop-blur-sm border border-white/20 rounded-3xl p-6 md:p-12 min-h-[420px]">
            <div key={step} className={slideClass}>
              {screenContent}
            </div>
          </div>

          {(showBack || showNextButton) && (
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={goBack}
                disabled={!showBack}
                className={[
                  'text-silver/70 font-mono text-xs tracking-[0.15em] uppercase font-bold transition-colors duration-200 px-4 py-3 min-h-[44px]',
                  !showBack ? 'opacity-0 pointer-events-none' : 'hover:text-white cursor-pointer',
                ].join(' ')}
              >
                ← Back
              </button>
              {showNextButton ? (
                <button
                  ref={nextButtonRef}
                  type="button"
                  onClick={advance}
                  disabled={!canGoNext}
                  className={[
                    'px-8 py-4 min-h-[48px] rounded-lg font-bold text-sm tracking-[0.15em] uppercase transition-all duration-300 inline-flex items-center gap-3',
                    canGoNext
                      ? 'bg-[#C9A84C] text-[#0F172A] hover:bg-[#E0BC60] cursor-pointer shadow-[0_8px_24px_rgba(201,168,76,0.3)]'
                      : 'bg-white/10 text-silver/40 cursor-not-allowed',
                  ].join(' ')}
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              ) : (
                <span />
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIReadiness;
