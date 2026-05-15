import { useMemo, useState } from 'react';
import Footer from '../components/Footer';

// ─────────────────────────────────────────────────────────────────────────────
// Question definitions
//
// Each option carries the data needed for scoring and downstream calculation.
// - `gap` (number) applies to scored questions only
// - `hours` (number) applies to C1 only (used in calcTimeLost)
// - `staff` (number) applies to A2 only (used in calcRevenueAtRisk)
// Section A and informational questions in B carry no gap.
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

// Quick lookup of a question by id
const QUESTION_BY_ID = SECTIONS.reduce((acc, sec) => {
  for (const q of sec.questions) acc[q.id] = q;
  return acc;
}, {});

// Helpers to read the gap value for a scored single-select answer
const gapFor = (qid, value) => {
  const q = QUESTION_BY_ID[qid];
  if (!q || !value) return 0;
  const opt = q.options?.find((o) => o.label === value);
  return opt?.gap ?? 0;
};

// ─────────────────────────────────────────────────────────────────────────────
// Scoring
//
// Per-section max gap totals:
//   B  =  3 + 3                            =  6    (B6 max 3, B7 max 3)
//   C  =  4 * 6                            = 24    (C1..C6 each max 4)
//   D  =  4 + 4 + 4 + 4 + 3 + 4 + 3        = 26    (D5 max 3, D7 max 3, D6 cap 4)
//   E  =  4                                =  4    (E2 only)
// ─────────────────────────────────────────────────────────────────────────────

const SECTION_MAX = { B: 6, C: 24, D: 26, E: 4 };

const computeScore = (responses) => {
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

  const bNorm = bGap / SECTION_MAX.B;
  const cNorm = cGap / SECTION_MAX.C;
  const dNorm = dGap / SECTION_MAX.D;
  const eNorm = eGap / SECTION_MAX.E;

  const totalGap = bNorm * 0.25 + cNorm * 0.25 + dNorm * 0.3 + eNorm * 0.2;
  return Math.round((1 - totalGap) * 100);
};

const bandFor = (score) => {
  if (score >= 81) return 'ADVANCED';
  if (score >= 66) return 'ESTABLISHED';
  if (score >= 41) return 'DEVELOPING';
  return 'EARLY STAGE';
};

const BAND_COPY = {
  ADVANCED:
    'Your operation is well-optimised. The diagnostic has identified any remaining friction and any hidden risk worth confirming.',
  ESTABLISHED:
    'Your operation is reasonably well-structured. The opportunity from here is targeted — specific automation and integration improvements with clear ROI.',
  DEVELOPING:
    'Your business has solid foundations in some areas, but identifiable gaps in automation and process efficiency that carry a measurable cost.',
  'EARLY STAGE':
    'Your operation has significant gaps in automation, integration, and process stability — and they are costing you time and money every week.',
};

// Colour ranges for the gauge.
const colourFor = (score) => {
  if (score >= 81) return '#15803D'; // deep green
  if (score >= 66) return '#22C55E'; // green
  if (score >= 41) return '#D97706'; // amber
  return '#DC2626'; // red
};

// ─────────────────────────────────────────────────────────────────────────────
// Opportunity calculator
// ─────────────────────────────────────────────────────────────────────────────

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

const calcTimeLost = (responses) => {
  const c1Opt = QUESTION_BY_ID.C1.options.find((o) => o.label === responses.C1);
  const dailyHours = c1Opt?.hours ?? 2;
  const weeklyHours = dailyHours * 5;
  const recoverablePerWeek = weeklyHours * 0.6;
  const annualHours = recoverablePerWeek * 52;
  const annualCost = annualHours * 45; // AUD blended admin rate
  return { dailyHours, recoverablePerWeek, annualHours, annualCost };
};

const calcStaff = (responses) => {
  const a2Opt = QUESTION_BY_ID.A2.options.find((o) => o.label === responses.A2);
  return a2Opt?.staff ?? 3;
};

const calcRevenueAtRisk = (responses) => {
  const d1High = ['Weekly', 'Multiple times per week — ongoing problem'].includes(responses.D1);
  const d2High = ['A handful of times', "This happens regularly and I know it's costing us"].includes(responses.D2);
  if (!d1High || !d2High) return null;

  const staff = calcStaff(responses);
  const rate = SESSION_RATES[responses.A1] ?? 180;
  const sessionsPerWeek = staff * 8;

  const d1Critical = (responses.D1 || '').includes('Multiple');
  const d2Critical = (responses.D2 || '').includes('regularly');
  let attrition = 0.05;
  if (d1Critical && d2Critical) attrition = 0.15;
  else if (d1Critical || d2Critical) attrition = 0.1;

  return sessionsPerWeek * 52 * rate * attrition;
};

const calcCapacityConstraint = (responses, recoverablePerWeek) => {
  const d5 = responses.D5 || '';
  const triggers = d5.startsWith('Yes —') || d5.startsWith('Possibly —');
  if (!triggers) return null;
  return recoverablePerWeek * 52 * 45;
};

const computeOpportunity = (responses) => {
  const timeLost = calcTimeLost(responses);
  const revenueAtRisk = calcRevenueAtRisk(responses);
  const capacityConstraint = calcCapacityConstraint(responses, timeLost.recoverablePerWeek);
  return { timeLost, revenueAtRisk, capacityConstraint };
};

// ─────────────────────────────────────────────────────────────────────────────
// Flag engine
// ─────────────────────────────────────────────────────────────────────────────

const FLAG_ORDER = { CRITICAL: 0, HIGH: 1, MODERATE: 2 };

const FLAG_COLOURS = {
  CRITICAL: 'bg-red-500/15 text-red-300 border-red-500/40',
  HIGH: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
  MODERATE: 'bg-silver/15 text-silver border-silver/30',
};

const matches = (value, needle) => {
  if (!value) return false;
  if (Array.isArray(value)) return value.some((v) => v.includes(needle));
  return value.includes(needle);
};

const generateFlags = (responses) => {
  const flags = [];

  if (matches(responses.C6, 'Multiple times'))
    flags.push({
      severity: 'CRITICAL',
      area: 'Manual data entry across disconnected systems',
      detail:
        'Your team is re-entering information multiple times per day. This is one of the highest-cost operational patterns — measurable in staff hours and error rate.',
    });

  if (matches(responses.B6, 'No —'))
    flags.push({
      severity: 'CRITICAL',
      area: 'No system integration',
      detail:
        'Every workflow that requires data from more than one system requires manual effort. The cost compounds across every working day.',
    });

  if (matches(responses.C5, 'Everything stops'))
    flags.push({
      severity: 'CRITICAL',
      area: 'Single point of failure dependency',
      detail:
        'Key processes depend entirely on specific individuals. One absence creates significant operational disruption.',
    });

  if (matches(responses.C3, "don't do"))
    flags.push({
      severity: 'HIGH',
      area: 'No structured follow-up process',
      detail:
        'Practices without structured follow-up lose an estimated 8–15% of retention revenue annually.',
    });

  if (matches(responses.D2, 'regularly'))
    flags.push({
      severity: 'HIGH',
      area: 'Recurring client or patient loss from admin failures',
      detail:
        'You have identified ongoing business loss from communication or administrative failures. This is measurable and recoverable.',
    });

  if (matches(responses.C4, 'Staff manually'))
    flags.push({
      severity: 'HIGH',
      area: 'Manual data entry at onboarding',
      detail:
        'Staff time spent re-entering paper forms is a direct automation opportunity with no quality trade-off.',
    });

  if (matches(responses.D1, 'Multiple times'))
    flags.push({
      severity: 'HIGH',
      area: 'Frequent scheduling failures',
      detail:
        'Multiple scheduling errors per week indicates a structural process gap, not an individual error pattern.',
    });

  if (matches(responses.D6, 'Security or data protection'))
    flags.push({
      severity: 'HIGH',
      area: 'Security exposure — self-identified',
      detail:
        'You have identified security or data protection uncertainty. This requires a specific assessment.',
    });

  if (matches(responses.D6, 'Compliance — not confident'))
    flags.push({
      severity: 'HIGH',
      area: 'Compliance gap — self-identified',
      detail:
        'Compliance obligations not met with confidence create regulatory exposure and personal liability.',
    });

  if (matches(responses.D3, 'barely'))
    flags.push({
      severity: 'MODERATE',
      area: 'Underutilised systems',
      detail:
        'You are paying for systems you are not using. The capability exists — the implementation does not.',
    });

  if (matches(responses.D7, "tried and it hasn't worked"))
    flags.push({
      severity: 'MODERATE',
      area: 'Prior improvement attempts stalled',
      detail:
        'Previous attempts to improve processes have not held. This is usually a sequencing and change management problem, not a technology problem.',
    });

  return flags.sort((a, b) => FLAG_ORDER[a.severity] - FLAG_ORDER[b.severity]).slice(0, 5);
};

// ─────────────────────────────────────────────────────────────────────────────
// API submission
// ─────────────────────────────────────────────────────────────────────────────

const API_URL = 'https://command.bwadvisorysolutions.com.au/api/intake/diagnostic';

const getDiagnosticType = (a1) => {
  const healthcare = [
    'Medical practice (GP)',
    'Medical practice (specialist)',
    'Dental practice',
    'Allied health — physiotherapy',
    'Allied health — chiropractic',
    'Allied health — psychology',
    'Allied health — occupational therapy',
    'Allied health — podiatry',
    'Allied health — other',
  ];
  const professional = [
    'Accounting firm',
    'Financial planning / wealth management',
    'Legal practice',
    'Mortgage broking',
    'Insurance broking',
    'Other professional services',
  ];
  if (healthcare.includes(a1)) return 'SMB_HEALTHCARE';
  if (professional.includes(a1)) return 'SMB_PROFESSIONAL';
  return 'SMB_HEALTHCARE';
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
// Formatting helpers
// ─────────────────────────────────────────────────────────────────────────────

const fmtMoney = (n) => {
  const rounded = Math.round(n / 100) * 100;
  return `$${rounded.toLocaleString('en-AU')}`;
};

const fmtHours = (n) => `${Math.round(n).toLocaleString('en-AU')} hours`;

// ─────────────────────────────────────────────────────────────────────────────
// UI primitives
// ─────────────────────────────────────────────────────────────────────────────

const ProgressBar = ({ current, total, sectionTitle }) => {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-silver/70 text-xs font-mono tracking-[0.2em] uppercase font-bold">
        <span>Section {current} of {total} — {sectionTitle}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-[#C9A84C] transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const Radio = ({ checked, label, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={[
      'group w-full text-left px-5 py-4 min-h-[44px] rounded-xl border transition-all duration-200 cursor-pointer',
      checked
        ? 'bg-[#C9A84C]/15 border-[#C9A84C] text-white'
        : 'bg-white/5 border-white/15 text-silver hover:bg-white/10 hover:border-[#C9A84C]/40 hover:text-white',
    ].join(' ')}
  >
    <span className="flex items-center gap-4">
      <span
        className={[
          'w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors duration-200',
          checked ? 'border-[#C9A84C] bg-[#C9A84C]' : 'border-silver/40 group-hover:border-[#C9A84C]/60',
        ].join(' ')}
      />
      <span className="text-base font-light leading-snug">{label}</span>
    </span>
  </button>
);

const Checkbox = ({ checked, label, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={[
      'group w-full text-left px-5 py-4 min-h-[44px] rounded-xl border transition-all duration-200 cursor-pointer',
      checked
        ? 'bg-[#C9A84C]/15 border-[#C9A84C] text-white'
        : 'bg-white/5 border-white/15 text-silver hover:bg-white/10 hover:border-[#C9A84C]/40 hover:text-white',
    ].join(' ')}
  >
    <span className="flex items-center gap-4">
      <span
        className={[
          'w-5 h-5 rounded-md border-2 flex-shrink-0 transition-colors duration-200 flex items-center justify-center',
          checked ? 'border-[#C9A84C] bg-[#C9A84C]' : 'border-silver/40 group-hover:border-[#C9A84C]/60',
        ].join(' ')}
      >
        {checked && (
          <svg className="w-3 h-3 text-[#0F172A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span className="text-base font-light leading-snug">{label}</span>
    </span>
  </button>
);

const QuestionBlock = ({ question, value, onChange }) => {
  if (question.kind === 'text') {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-display font-bold text-xl md:text-2xl text-white leading-snug">{question.text}</h3>
          {question.helper && <p className="text-sm text-silver/60 font-light">{question.helper}</p>}
        </div>
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value.slice(0, question.maxLength || 200))}
          maxLength={question.maxLength || 200}
          rows={3}
          className="w-full bg-white/5 border border-white/15 rounded-xl px-5 py-4 text-white placeholder:text-silver/40 focus:outline-none focus:border-[#C9A84C] transition-colors duration-200"
          placeholder="Optional — share in your own words"
        />
        <p className="text-xs text-silver/50 font-mono">
          {(value || '').length}/{question.maxLength || 200}
        </p>
      </div>
    );
  }

  if (question.kind === 'multi') {
    const arr = Array.isArray(value) ? value : [];
    const toggle = (label) => {
      const next = arr.includes(label) ? arr.filter((x) => x !== label) : [...arr, label];
      onChange(next);
    };
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-display font-bold text-xl md:text-2xl text-white leading-snug">{question.text}</h3>
          {question.helper && <p className="text-sm text-silver/60 font-light">{question.helper}</p>}
        </div>
        <div className="grid grid-cols-1 gap-3">
          {question.options.map((opt) => (
            <Checkbox
              key={opt.label}
              checked={arr.includes(opt.label)}
              label={opt.label}
              onChange={() => toggle(opt.label)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-display font-bold text-xl md:text-2xl text-white leading-snug">{question.text}</h3>
        {question.helper && <p className="text-sm text-silver/60 font-light">{question.helper}</p>}
      </div>
      <div className="grid grid-cols-1 gap-3">
        {question.options.map((opt) => (
          <Radio
            key={opt.label}
            checked={value === opt.label}
            label={opt.label}
            onChange={() => onChange(opt.label)}
          />
        ))}
      </div>
    </div>
  );
};

const sectionValid = (section, responses) => {
  for (const q of section.questions) {
    if (q.optional || q.kind === 'text') continue;
    const v = responses[q.id];
    if (q.kind === 'multi') {
      if (!Array.isArray(v) || v.length === 0) return false;
    } else {
      if (!v) return false;
    }
  }
  return true;
};

// ─────────────────────────────────────────────────────────────────────────────
// Lead capture
// ─────────────────────────────────────────────────────────────────────────────

const Field = ({ label, required, type = 'text', value, onChange, className = '' }) => (
  <label className={`flex flex-col gap-2 ${className}`}>
    <span className="text-silver/75 text-xs font-mono tracking-[0.15em] uppercase font-bold">
      {label} {required && <span className="text-[#C9A84C]">*</span>}
    </span>
    <input
      type={type}
      value={value || ''}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white/5 border border-white/15 rounded-lg px-4 py-3 min-h-[44px] text-white placeholder:text-silver/40 focus:outline-none focus:border-[#C9A84C] transition-colors duration-200"
    />
  </label>
);

const ConsentBox = ({ checked, onChange, label, required }) => (
  <label className="flex items-start gap-3 cursor-pointer group">
    <input
      type="checkbox"
      checked={!!checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mt-1 w-4 h-4 accent-[#C9A84C] cursor-pointer"
    />
    <span className="text-silver/85 font-light text-sm md:text-base group-hover:text-white transition-colors duration-200">
      {label}
      {required && <span className="text-[#C9A84C]"> *</span>}
    </span>
  </label>
);

const LeadCapture = ({ values, onChange, onSubmit, submitting }) => {
  const required = ['firstName', 'lastName', 'businessName', 'email'];
  const missing = required.some((f) => !values[f]?.trim());
  const consentOk = values.consentContact;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (missing || !consentOk || submitting) return;
        onSubmit();
      }}
      className="relative bg-gradient-to-br from-white/12 via-white/6 to-white/3 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-14 space-y-8"
    >
      <div className="space-y-4">
        <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase font-bold">Last step</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight">
          Your AI Readiness Score is ready.
        </h2>
        <p className="text-base md:text-lg text-silver/75 font-light">
          To see your full results including your estimated opportunity value, enter your details below. We will also email you a summary of your results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="First name" required value={values.firstName} onChange={(v) => onChange('firstName', v)} />
        <Field label="Last name" required value={values.lastName} onChange={(v) => onChange('lastName', v)} />
        <Field
          label="Business name"
          required
          value={values.businessName}
          onChange={(v) => onChange('businessName', v)}
          className="md:col-span-2"
        />
        <Field label="Email address" type="email" required value={values.email} onChange={(v) => onChange('email', v)} />
        <Field label="Phone (optional)" type="tel" value={values.phone} onChange={(v) => onChange('phone', v)} />
      </div>

      <div className="space-y-4 pt-2">
        <ConsentBox
          checked={values.consentContact}
          onChange={(v) => onChange('consentContact', v)}
          label="I consent to BW Advisory Solutions contacting me about these results."
          required
        />
        <ConsentBox
          checked={values.optInResearch}
          onChange={(v) => onChange('optInResearch', v)}
          label="I'm happy to receive occasional insights from BW Advisory Solutions."
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={missing || !consentOk || submitting}
          className={[
            'w-full md:w-auto px-12 py-5 min-h-[44px] rounded-lg font-bold text-sm tracking-[0.15em] uppercase transition-all duration-300 inline-flex items-center justify-center gap-3',
            missing || !consentOk || submitting
              ? 'bg-white/10 text-silver/40 cursor-not-allowed'
              : 'bg-[#C9A84C] text-[#0F172A] hover:bg-[#E0BC60] cursor-pointer shadow-[0_8px_24px_rgba(201,168,76,0.3)]',
          ].join(' ')}
        >
          {submitting ? 'Calculating…' : 'See My Results'}
          {!submitting && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          )}
        </button>
      </div>

      <p className="text-xs text-silver/50 font-light">
        Your details are handled in line with our <a href="/privacy" className="underline hover:text-[#C9A84C]">privacy policy</a>.
      </p>
    </form>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Score gauge (pure SVG half-arc)
// ─────────────────────────────────────────────────────────────────────────────

const ScoreGauge = ({ score, colour }) => {
  // Half-circle arc from 180° to 360° (left to right across the top).
  // Centre (100, 100), radius 80. Path length ≈ π * 80 ≈ 251.33.
  const radius = 80;
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      <svg viewBox="0 0 200 120" className="w-full" role="img" aria-label={`Readiness score ${score}`}>
        {/* Background track */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Score arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={colour}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 800ms ease-out, stroke 400ms ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
        <div className="font-display font-bold text-6xl md:text-7xl text-white leading-none">{score}</div>
        <div className="text-silver/60 font-mono text-xs tracking-[0.2em] uppercase mt-2">out of 100</div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Results page
// ─────────────────────────────────────────────────────────────────────────────

const Results = ({ score, band, opportunity, flags, businessName }) => {
  const colour = colourFor(score);

  let ctaCopy;
  if (score <= 40) {
    ctaCopy =
      'Your results indicate significant operational gaps that are actively costing your business time and money. These compound over time. A BW Advisory Operational Resilience Diagnostic maps your full operation and delivers a prioritised plan with costs and timelines. Most clients recover the cost of the diagnostic within the first month of implementation.';
  } else if (score <= 65) {
    ctaCopy =
      'Your results show a business with solid foundations and meaningful gaps in automation, integration, and process efficiency. A BW Advisory Operational Resilience Diagnostic identifies exactly where to invest next and what the return looks like.';
  } else {
    ctaCopy =
      'Your results indicate a relatively mature operational environment. A targeted BW Advisory assessment confirms what is working, identifies remaining friction, and ensures you are not carrying hidden risk.';
  }

  const subject = `AI Readiness Diagnostic — Score ${score} — ${businessName || 'your business'}`;
  const mailto = `mailto:brad@bwadvisorysolutions.com.au?subject=${encodeURIComponent(subject)}`;

  const oppRows = [];
  oppRows.push({
    label: 'Time recoverable from manual admin',
    value: `${fmtHours(opportunity.timeLost.annualHours)} per year`,
    sub: `${fmtMoney(opportunity.timeLost.annualCost)} at AUD $45/hr blended admin rate`,
  });
  if (opportunity.revenueAtRisk !== null) {
    oppRows.push({
      label: 'Revenue at risk from admin and communication failures',
      value: `${fmtMoney(opportunity.revenueAtRisk)} per year`,
      sub: 'Estimated attrition from scheduling and communication gaps',
    });
  }
  if (opportunity.capacityConstraint !== null) {
    oppRows.push({
      label: 'Capacity unlock from process improvement',
      value: `${fmtMoney(opportunity.capacityConstraint)} per year`,
      sub: 'Estimated value of recovered capacity at current rates',
    });
  }

  return (
    <div className="space-y-12">
      {/* Score block */}
      <div className="relative bg-gradient-to-br from-white/12 via-white/6 to-white/3 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-14 text-center space-y-6">
        <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase font-bold">Your Score</p>
        <ScoreGauge score={score} colour={colour} />
        <p
          className="font-display font-bold text-2xl md:text-3xl tracking-[0.1em]"
          style={{ color: colour }}
        >
          {band}
        </p>
        <p className="text-lg md:text-xl text-silver/85 font-light leading-relaxed max-w-3xl mx-auto">
          {BAND_COPY[band]}
        </p>
      </div>

      {/* Opportunity estimate */}
      <div>
        <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-6">
          Opportunity Estimate
        </p>
        <div className="rounded-3xl border border-white/15 overflow-hidden">
          {oppRows.map((row, i) => (
            <div
              key={row.label}
              className={[
                'p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4',
                i < oppRows.length - 1 ? 'border-b border-white/10' : '',
                'bg-white/5',
              ].join(' ')}
            >
              <div className="space-y-1 md:max-w-md">
                <p className="text-white font-display font-semibold text-lg md:text-xl leading-snug">{row.label}</p>
                <p className="text-silver/60 text-sm font-light">{row.sub}</p>
              </div>
              <p className="text-[#C9A84C] font-display font-bold text-2xl md:text-3xl whitespace-nowrap">{row.value}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-silver/50 font-light mt-4 max-w-3xl">
          Conservative estimates based on your inputs and benchmarked against businesses of similar size and type.
        </p>
      </div>

      {/* Flags */}
      {flags.length > 0 && (
        <div>
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-6">What We Found</p>
          <div className="space-y-4">
            {flags.map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/15 rounded-2xl p-6 md:p-8 space-y-3">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono font-bold tracking-[0.15em] uppercase px-3 py-1 rounded border ${FLAG_COLOURS[f.severity]}`}>
                    {f.severity}
                  </span>
                  <p className="text-white font-display font-bold text-lg md:text-xl leading-snug">{f.area}</p>
                </div>
                <p className="text-silver/80 font-light text-base leading-relaxed">{f.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What this does not tell you */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
        <p className="text-silver/60 font-mono text-xs tracking-[0.2em] uppercase font-bold mb-3">
          What This Does Not Tell You
        </p>
        <p className="text-silver/80 font-light text-base md:text-lg leading-relaxed">
          This assessment identifies that gaps exist and estimates what they cost. It does not specify which systems to implement, how to sequence the work, or what investment is required to fix it. That requires a professional assessment of your end-to-end operation.
        </p>
      </div>

      {/* CTA */}
      <div className="relative group overflow-hidden">
        <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/40 to-accent/20 rounded-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 blur-xl"></div>
        <div className="relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-xl border border-accent/30 group-hover:border-[#C9A84C]/60 rounded-3xl p-8 md:p-16 transition-all duration-500 text-center space-y-8">
          <p className="text-lg md:text-xl text-silver/85 font-light leading-relaxed max-w-3xl mx-auto">
            {ctaCopy}
          </p>
          <a
            href={mailto}
            className="inline-flex items-center justify-center gap-3 bg-[#C9A84C] px-10 md:px-12 py-5 min-h-[44px] rounded-lg text-[#0F172A] font-bold text-sm tracking-[0.15em] uppercase hover:bg-[#E0BC60] transition-all duration-300 shadow-[0_8px_24px_rgba(201,168,76,0.3)] cursor-pointer"
          >
            Book a Diagnostic Call — 30 Minutes, No Cost
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <p className="text-sm md:text-base text-silver/60 font-light max-w-2xl mx-auto">
            No sales pitch. I will tell you what the score means for your specific operation.
          </p>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

const AIReadiness = () => {
  const [phase, setPhase] = useState('questions'); // questions | lead | results
  const [sectionIndex, setSectionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [lead, setLead] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    email: '',
    phone: '',
    consentContact: false,
    optInResearch: true,
  });
  const [submitting, setSubmitting] = useState(false);

  const totalSections = SECTIONS.length;
  const section = SECTIONS[sectionIndex];
  const valid = sectionValid(section, responses);

  const setAnswer = (qid, value) => {
    setResponses((prev) => ({ ...prev, [qid]: value }));
  };

  const goNext = () => {
    if (!valid) return;
    if (sectionIndex < totalSections - 1) {
      setSectionIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPhase('lead');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    if (phase === 'lead') {
      setPhase('questions');
      setSectionIndex(totalSections - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (sectionIndex > 0) {
      setSectionIndex((i) => i - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateLead = (field, value) => setLead((prev) => ({ ...prev, [field]: value }));

  const finalResults = useMemo(() => {
    if (phase !== 'results') return null;
    const score = computeScore(responses);
    const band = bandFor(score);
    const opportunity = computeOpportunity(responses);
    const flags = generateFlags(responses);
    return { score, band, opportunity, flags };
  }, [phase, responses]);

  const handleLeadSubmit = async () => {
    setSubmitting(true);
    const score = computeScore(responses);
    const band = bandFor(score);
    const opportunity = computeOpportunity(responses);
    const payload = {
      name: `${lead.firstName.trim()} ${lead.lastName.trim()}`.trim(),
      email: lead.email.trim(),
      organisation: lead.businessName.trim(),
      role: responses.A5 ?? 'Not specified',
      phone: lead.phone.trim() || undefined,
      diagnosticType: getDiagnosticType(responses.A1),
      responses: {
        ...responses,
        score,
        readinessBand: band,
        opportunityEstimate: {
          annualHours: opportunity.timeLost.annualHours,
          annualCost: opportunity.timeLost.annualCost,
          revenueAtRisk: opportunity.revenueAtRisk,
          capacityConstraint: opportunity.capacityConstraint,
        },
      },
      score,
      optInResearch: !!lead.optInResearch,
      source: 'website_diagnostic',
      brand: 'BW_ADVISORY',
    };
    await submitToCommandCentre(payload);
    setSubmitting(false);
    setPhase('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-primary min-h-screen">
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6 w-full z-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#0369A1]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-silver/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase font-bold">AI Readiness Diagnostic</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
            See where AI fits — and where it doesn't.
          </h1>
          <p className="text-lg md:text-xl text-silver/75 font-light leading-relaxed">
            Five sections. Five minutes. A scored result with an estimate of what your gaps are costing you.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="pb-32 px-6 w-full relative z-10">
        <div className="max-w-3xl mx-auto">
          {phase === 'questions' && (
            <div className="space-y-10">
              <ProgressBar current={sectionIndex + 1} total={totalSections} sectionTitle={section.title} />

              <div className="relative bg-gradient-to-br from-white/12 via-white/6 to-white/3 backdrop-blur-sm border border-white/20 rounded-3xl p-6 md:p-12 space-y-10">
                <div className="space-y-2">
                  <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase font-bold">
                    Section {section.id} — {section.title}
                  </p>
                </div>
                {section.questions.map((q) => (
                  <div key={q.id} className="border-t border-white/10 first:border-t-0 pt-8 first:pt-0">
                    <QuestionBlock question={q} value={responses[q.id]} onChange={(v) => setAnswer(q.id, v)} />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={sectionIndex === 0}
                  className={[
                    'text-silver/70 font-mono text-xs tracking-[0.15em] uppercase font-bold transition-colors duration-200 px-4 py-3 min-h-[44px]',
                    sectionIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-white cursor-pointer',
                  ].join(' ')}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!valid}
                  className={[
                    'px-8 py-4 min-h-[44px] rounded-lg font-bold text-sm tracking-[0.15em] uppercase transition-all duration-300 inline-flex items-center gap-3',
                    valid
                      ? 'bg-[#C9A84C] text-[#0F172A] hover:bg-[#E0BC60] cursor-pointer shadow-[0_8px_24px_rgba(201,168,76,0.3)]'
                      : 'bg-white/10 text-silver/40 cursor-not-allowed',
                  ].join(' ')}
                >
                  {sectionIndex === totalSections - 1 ? 'Continue' : 'Next section'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {phase === 'lead' && (
            <div className="space-y-6">
              <button
                type="button"
                onClick={goBack}
                className="text-silver/70 font-mono text-xs tracking-[0.15em] uppercase font-bold hover:text-white transition-colors duration-200 cursor-pointer"
              >
                ← Back to questions
              </button>
              <LeadCapture values={lead} onChange={updateLead} onSubmit={handleLeadSubmit} submitting={submitting} />
            </div>
          )}

          {phase === 'results' && finalResults && (
            <Results
              score={finalResults.score}
              band={finalResults.band}
              opportunity={finalResults.opportunity}
              flags={finalResults.flags}
              businessName={lead.businessName}
            />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIReadiness;
