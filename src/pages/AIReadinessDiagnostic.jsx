import { useState } from 'react';
import Footer from '../components/Footer';

// ─────────────────────────────────────────────────────────────────────────────
// Question definitions. Each option carries a numeric score and the question
// carries a "max" so we can scale per-question and aggregate to /100.
// `area` is the priority-area label surfaced when a question scores poorly.
// ─────────────────────────────────────────────────────────────────────────────

const HEALTHCARE_QUESTIONS = [
  {
    id: 'H1',
    text: 'What type of healthcare practice are you?',
    area: 'Practice profile',
    max: 0,
    options: [
      { label: 'GP practice', score: 0 },
      { label: 'Dental practice', score: 0 },
      { label: 'Chiropractic / physiotherapy', score: 0 },
      { label: 'Psychology / allied health', score: 0 },
      { label: 'Other', score: 0 },
    ],
  },
  {
    id: 'H2',
    text: 'How many clinicians or practitioners work in your practice?',
    area: 'Practice profile',
    max: 0,
    options: [
      { label: '1–2', score: 0 },
      { label: '3–5', score: 0 },
      { label: '6–10', score: 0 },
      { label: '11+', score: 0 },
    ],
  },
  {
    id: 'H3',
    text: 'What practice management software do you use?',
    area: 'Practice profile',
    max: 0,
    options: [
      { label: 'Best Practice', score: 0 },
      { label: 'Genie', score: 0 },
      { label: 'MedicalDirector', score: 0 },
      { label: 'Cliniko', score: 0 },
      { label: 'Other', score: 0 },
      { label: 'Not sure', score: 0 },
    ],
  },
  {
    id: 'H4',
    text: 'How do you currently handle patient appointment reminders?',
    area: 'Operational automation',
    max: 8,
    options: [
      { label: 'We call patients manually', score: 0 },
      { label: 'We send SMS manually', score: 4 },
      { label: 'Automated SMS or email', score: 8 },
      { label: 'Our PMS handles it automatically', score: 8 },
    ],
  },
  {
    id: 'H5',
    text: 'How often do your clinical and administrative systems fail to share data (e.g. PMS and billing not syncing)?',
    area: 'Systems integration',
    max: 10,
    options: [
      { label: "Never — they're fully integrated", score: 10 },
      { label: 'Occasionally — we work around it', score: 7 },
      { label: 'Often — we patch it manually', score: 3 },
      { label: 'Always — everything is separate', score: 0 },
    ],
  },
  {
    id: 'H6',
    text: 'How do you handle patient intake forms and consent documents?',
    area: 'Patient experience',
    max: 8,
    options: [
      { label: 'Paper only', score: 0 },
      { label: 'Mixture of paper and digital', score: 4 },
      { label: 'Fully digital', score: 8 },
    ],
  },
  {
    id: 'H7',
    text: 'Do you have a documented response plan for a patient data breach?',
    area: 'Breach response readiness',
    max: 12,
    options: [
      { label: 'Yes and staff know it', score: 12 },
      { label: "Yes but staff aren't trained", score: 8 },
      { label: "No but we're working on it", score: 4 },
      { label: 'No', score: 0 },
    ],
  },
  {
    id: 'H8',
    text: 'When did you last review your data handling practices under the Privacy Act?',
    area: 'Privacy Act compliance',
    max: 10,
    options: [
      { label: 'Within the last 12 months', score: 10 },
      { label: '1–3 years ago', score: 6 },
      { label: 'More than 3 years ago', score: 2 },
      { label: 'Never formally reviewed', score: 0 },
    ],
  },
  {
    id: 'H9',
    text: 'Does your practice team receive regular training on cybersecurity and data handling?',
    area: 'Security culture and training',
    max: 8,
    options: [
      { label: 'Yes — at least annually', score: 8 },
      { label: 'Occasionally — when prompted', score: 4 },
      { label: 'Rarely or never', score: 0 },
    ],
  },
  {
    id: 'H10',
    text: 'Where does your admin team spend the most unproductive time each week?',
    area: 'Administrative bottleneck',
    max: 6,
    directional: true,
    options: [
      { label: 'Phone calls and appointment scheduling', score: 3 },
      { label: 'Patient paperwork and forms', score: 3 },
      { label: 'Billing and Medicare reconciliation', score: 3 },
      { label: 'Chasing referrals or results', score: 3 },
      { label: 'Coordinating between systems', score: 3 },
    ],
  },
  {
    id: 'H11',
    text: "How would you describe your practice's current level of interest in AI tools?",
    area: 'AI adoption posture',
    max: 6,
    options: [
      { label: 'Actively exploring — ready to move', score: 6 },
      { label: 'Curious but cautious', score: 4 },
      { label: 'Sceptical — need to be convinced', score: 2 },
      { label: 'Not a current priority', score: 0 },
    ],
  },
  {
    id: 'H12',
    text: 'What is your biggest concern about adopting AI in your practice?',
    area: 'AI adoption concerns',
    max: 6,
    directional: true,
    options: [
      { label: 'Patient data security and privacy', score: 3 },
      { label: 'AHPRA or regulatory compliance', score: 3 },
      { label: 'Staff resistance to change', score: 3 },
      { label: 'Cost and ROI uncertainty', score: 3 },
      { label: "Don't know where to start", score: 3 },
    ],
  },
];

const PROFESSIONAL_QUESTIONS = [
  {
    id: 'P1',
    text: 'What type of professional services firm are you?',
    area: 'Firm profile',
    max: 0,
    options: [
      { label: 'Accounting firm', score: 0 },
      { label: 'Law firm', score: 0 },
      { label: 'Financial advice practice', score: 0 },
      { label: 'Mortgage broking', score: 0 },
      { label: 'Other', score: 0 },
    ],
  },
  {
    id: 'P2',
    text: 'How many fee-earners or advisers work in your firm?',
    area: 'Firm profile',
    max: 0,
    options: [
      { label: '1–2', score: 0 },
      { label: '3–5', score: 0 },
      { label: '6–10', score: 0 },
      { label: '11+', score: 0 },
    ],
  },
  {
    id: 'P3',
    text: 'How do you currently manage client onboarding?',
    area: 'Client onboarding',
    max: 8,
    options: [
      { label: 'Fully manual — forms, email, phone', score: 0 },
      { label: 'Partly automated — some tools in place', score: 4 },
      { label: 'Fully automated — clients self-serve', score: 8 },
    ],
  },
  {
    id: 'P4',
    text: 'How do you generate standard client documents (agreements, reports, letters)?',
    area: 'Document generation',
    max: 8,
    options: [
      { label: 'Manually from scratch each time', score: 0 },
      { label: 'Templates we fill in manually', score: 3 },
      { label: 'Software-assisted with some automation', score: 6 },
      { label: 'Largely automated', score: 8 },
    ],
  },
  {
    id: 'P5',
    text: 'How much time does your team spend on repetitive administrative tasks each week (estimates)?',
    area: 'Administrative load',
    max: 8,
    options: [
      { label: 'Less than 2 hours', score: 8 },
      { label: '2–5 hours', score: 5 },
      { label: '5–10 hours', score: 2 },
      { label: 'More than 10 hours', score: 0 },
    ],
  },
  {
    id: 'P6',
    text: 'Do you have documented workflows for your most common engagement types?',
    area: 'Workflow documentation',
    max: 10,
    options: [
      { label: 'Yes — detailed and followed', score: 10 },
      { label: 'Yes — documented but not consistently used', score: 5 },
      { label: "No — it's in people's heads", score: 0 },
    ],
  },
  {
    id: 'P7',
    text: 'How do you manage compliance deadlines and regulatory calendar items?',
    area: 'Compliance management',
    max: 10,
    options: [
      { label: 'Software with automated alerts', score: 10 },
      { label: 'Calendar reminders — manual', score: 6 },
      { label: 'Whoever remembers', score: 2 },
      { label: 'Clients manage their own', score: 0 },
    ],
  },
  {
    id: 'P8',
    text: 'When did you last formally review your information security practices?',
    area: 'Information security review',
    max: 12,
    options: [
      { label: 'Within the last 12 months', score: 12 },
      { label: '1–3 years ago', score: 7 },
      { label: 'More than 3 years ago', score: 3 },
      { label: 'Never formally reviewed', score: 0 },
    ],
  },
  {
    id: 'P9',
    text: 'Do you have cyber liability insurance?',
    area: 'Cyber liability cover',
    max: 10,
    options: [
      { label: 'Yes', score: 10 },
      { label: 'Not sure', score: 4 },
      { label: 'No', score: 0 },
    ],
  },
  {
    id: 'P10',
    text: 'Where does your team spend the most unproductive time each week?',
    area: 'Operational bottleneck',
    max: 6,
    directional: true,
    options: [
      { label: 'Client communication and chasing', score: 3 },
      { label: 'Document preparation and review', score: 3 },
      { label: 'Compliance tracking and reporting', score: 3 },
      { label: 'Billing reconciliation', score: 3 },
      { label: 'Internal coordination', score: 3 },
    ],
  },
  {
    id: 'P11',
    text: "How would you describe your firm's readiness to adopt AI tools?",
    area: 'AI adoption posture',
    max: 6,
    options: [
      { label: "Ready — we're actively evaluating", score: 6 },
      { label: 'Interested but need a clear case', score: 4 },
      { label: "Uncertain — we don't know what applies to us", score: 2 },
      { label: 'Not a current priority', score: 0 },
    ],
  },
  {
    id: 'P12',
    text: 'What is your biggest concern about AI adoption?',
    area: 'AI adoption concerns',
    max: 6,
    directional: true,
    options: [
      { label: 'Accuracy and reliability of outputs', score: 3 },
      { label: 'Client data confidentiality', score: 3 },
      { label: 'Regulatory or professional standard compliance', score: 3 },
      { label: 'Staff adoption and change management', score: 3 },
      { label: 'Cost and return on investment', score: 3 },
    ],
  },
];

const PRACTICE_SIZE_OPTIONS = [
  'Sole trader',
  '2–5 staff',
  '6–10 staff',
  '11–20 staff',
  '20+ staff',
];

const SOURCE_OPTIONS = [
  'Referral from a colleague',
  'LinkedIn',
  'Google search',
  'Industry event',
  'Other',
];

const PRACTICE_TYPES = {
  SMB_HEALTHCARE: {
    key: 'SMB_HEALTHCARE',
    title: 'Healthcare Practice',
    blurb: 'GP, dental, allied health, chiropractic, psychology, podiatry',
    questions: HEALTHCARE_QUESTIONS,
  },
  SMB_PROFESSIONAL: {
    key: 'SMB_PROFESSIONAL',
    title: 'Professional Services Firm',
    blurb: 'Accounting, legal, financial advice',
    questions: PROFESSIONAL_QUESTIONS,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Scoring
// ─────────────────────────────────────────────────────────────────────────────

const scoreBands = [
  {
    min: 80,
    label: 'STRONG FOUNDATION',
    summary:
      "Your systems are reasonably sound. The fundamentals are in place. The opportunity from here is targeted: identify the highest-leverage points where automation or AI can lift performance without disrupting what already works.",
  },
  {
    min: 60,
    label: 'DEVELOPING',
    summary:
      "You have gaps that carry real risk. Some areas are working well, others are not. The priority areas below are identifiable and addressable. A structured review would surface the connections between them.",
  },
  {
    min: 40,
    label: 'EXPOSED',
    summary:
      "Multiple risk areas. Both operational efficiency and security posture need attention. The cost of inaction is measurable in time, money, and exposure. This is the band where a thirty-minute conversation usually changes the trajectory.",
  },
  {
    min: 0,
    label: 'CRITICAL',
    summary:
      "Significant gaps across security, process, and compliance. This requires immediate attention. The good news is the priorities are clear. The risk is that the longer this sits, the more it compounds.",
  },
];

const computeResults = (practiceType, answers) => {
  const questions = PRACTICE_TYPES[practiceType].questions;
  let raw = 0;
  let max = 0;
  const perQuestion = [];

  for (const q of questions) {
    if (q.max === 0) continue;
    max += q.max;
    const answer = answers[q.id];
    const opt = q.options.find((o) => o.label === answer);
    const got = opt ? opt.score : 0;
    raw += got;
    perQuestion.push({
      id: q.id,
      area: q.area,
      pct: q.max > 0 ? got / q.max : 1,
      directional: !!q.directional,
      answer,
    });
  }

  const score = max > 0 ? Math.round((raw / max) * 100) : 0;
  const band = scoreBands.find((b) => score >= b.min);

  // Priority areas: lowest three scoring questions, exclude directional
  // (they have flat scores) unless we don't have three substantive ones.
  const substantive = perQuestion
    .filter((q) => !q.directional)
    .sort((a, b) => a.pct - b.pct);
  let priorities = substantive.slice(0, 3);

  if (priorities.length < 3) {
    const directional = perQuestion
      .filter((q) => q.directional && q.answer)
      .map((q) => ({ ...q, area: `${q.area}: ${q.answer}` }));
    priorities = [...priorities, ...directional].slice(0, 3);
  }

  // Deduplicate by area label
  const seen = new Set();
  priorities = priorities.filter((p) => {
    if (seen.has(p.area)) return false;
    seen.add(p.area);
    return true;
  });

  return { score, band, priorities };
};

// ─────────────────────────────────────────────────────────────────────────────
// API submission
// ─────────────────────────────────────────────────────────────────────────────

const API_BASE = 'https://command.bwadvisorysolutions.com.au';
const API_URL = `${API_BASE}/api/intake/diagnostic`;
const RELEASE_URL = `${API_BASE}/api/intake/diagnostic/release`;

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
    const data = await res.json().catch(() => ({}));
    return { ok: true, intakeId: data?.intakeId ?? null, diagnosticId: data?.diagnosticId ?? null };
  } catch (err) {
    console.error('[ai-readiness] API submission failed', err);
    return { ok: false };
  }
};

const releaseResults = async ({ intakeId, email, consentToContact, consentToMarketing }) => {
  try {
    const res = await fetch(RELEASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ intakeId, email, consentToContact, consentToMarketing }),
    });
    if (res.status === 422) {
      return { ok: false, error: 'Contact consent is required to continue.' };
    }
    if (!res.ok) {
      console.error('[ai-readiness] release responded', res.status, await res.text().catch(() => ''));
      return { ok: false, error: 'We could not retrieve your results. Please try again in a moment.' };
    }
    const data = await res.json().catch(() => null);
    if (!data) {
      return { ok: false, error: 'Unexpected response from the server.' };
    }
    return { ok: true, data };
  } catch (err) {
    console.error('[ai-readiness] release failed', err);
    return { ok: false, error: 'Network error. Please check your connection and try again.' };
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// UI primitives matching the existing Diagnostics page treatment
// ─────────────────────────────────────────────────────────────────────────────

const PracticeCard = ({ title, blurb, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group relative overflow-hidden h-full flex flex-col text-left cursor-pointer"
  >
    <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/40 to-accent/20 rounded-3xl opacity-0 group-hover:opacity-50 transition-all duration-700 blur-lg"></div>
    <div className="relative bg-gradient-to-br from-white/12 via-white/6 to-white/3 backdrop-blur-sm border border-white/20 group-hover:border-[#C9A84C]/50 rounded-3xl p-10 md:p-14 transition-all duration-500 group-hover:bg-white/14 flex flex-col h-full">
      <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-6 leading-tight">
        {title}
      </h3>
      <p className="text-silver/75 font-light text-lg md:text-xl flex-1">{blurb}</p>
      <div className="flex items-end justify-end pt-8 border-t border-accent/15 mt-8">
        <span className="flex items-center gap-3 text-[#C9A84C] font-bold text-sm tracking-[0.15em] uppercase group-hover:gap-4 transition-all duration-300">
          <span>Select</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </div>
    </div>
  </button>
);

const ProgressBar = ({ index, total }) => {
  const pct = Math.round(((index + 1) / total) * 100);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-silver/70 text-xs font-mono tracking-[0.3em] uppercase font-bold">
        <span>Question {index + 1} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#C9A84C] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

const QuestionCard = ({ question, value, onAnswer, onBack, canBack, isLast, onSubmit }) => (
  <div className="relative bg-gradient-to-br from-white/12 via-white/6 to-white/3 backdrop-blur-sm border border-white/20 rounded-3xl p-10 md:p-14">
    <h2 className="font-display font-bold text-2xl md:text-3xl text-white leading-tight mb-10">
      {question.text}
    </h2>

    <div className="space-y-4">
      {question.options.map((opt) => {
        const selected = value === opt.label;
        return (
          <button
            key={opt.label}
            type="button"
            onClick={() => onAnswer(opt.label)}
            className={[
              'group w-full text-left px-6 py-5 rounded-xl border transition-all duration-300 cursor-pointer',
              selected
                ? 'bg-[#C9A84C]/15 border-[#C9A84C] text-white'
                : 'bg-white/5 border-white/15 text-silver hover:bg-white/10 hover:border-[#C9A84C]/40 hover:text-white',
            ].join(' ')}
          >
            <span className="flex items-center gap-4">
              <span
                className={[
                  'w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors duration-300',
                  selected ? 'border-[#C9A84C] bg-[#C9A84C]' : 'border-silver/40 group-hover:border-[#C9A84C]/60',
                ].join(' ')}
              />
              <span className="text-base md:text-lg font-light">{opt.label}</span>
            </span>
          </button>
        );
      })}
    </div>

    <div className="flex items-center justify-between pt-10 mt-10 border-t border-accent/15">
      <button
        type="button"
        onClick={onBack}
        disabled={!canBack}
        className={[
          'text-silver/70 font-mono text-xs tracking-[0.15em] uppercase font-bold transition-colors duration-300',
          canBack ? 'hover:text-white cursor-pointer' : 'opacity-30 cursor-not-allowed',
        ].join(' ')}
      >
        ← Back
      </button>
      {isLast && (
        <button
          type="button"
          onClick={onSubmit}
          disabled={!value}
          className={[
            'px-8 py-3 rounded-lg font-bold text-sm tracking-[0.15em] uppercase transition-all duration-300 inline-flex items-center gap-3',
            value
              ? 'bg-[#C9A84C] text-[#0F172A] hover:bg-[#E0BC60] cursor-pointer shadow-[0_8px_24px_rgba(201,168,76,0.3)]'
              : 'bg-white/10 text-silver/40 cursor-not-allowed',
          ].join(' ')}
        >
          Continue
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      )}
    </div>
  </div>
);

const LeadCaptureForm = ({ values, onChange, onSubmit, submitting }) => {
  const requiredText = ['name', 'organisation', 'role', 'email'];
  const requiredSelect = ['practiceSize', 'referralSource'];
  const missing =
    requiredText.some((f) => !values[f]?.trim()) ||
    requiredSelect.some((f) => !values[f]);
  const consentOk = values.consentContact;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (missing || !consentOk) return;
        onSubmit();
      }}
      className="relative bg-gradient-to-br from-white/12 via-white/6 to-white/3 backdrop-blur-sm border border-white/20 rounded-3xl p-10 md:p-14 space-y-8"
    >
      <div className="space-y-4">
        <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Last step</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight">
          Your AI Readiness Score is ready.
        </h2>
        <p className="text-lg text-silver/75 font-light">
          Your score appears on the next screen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Full name" required value={values.name} onChange={(v) => onChange('name', v)} />
        <Field label="Practice / Firm name" required value={values.organisation} onChange={(v) => onChange('organisation', v)} />
        <Field label="Your role" required value={values.role} onChange={(v) => onChange('role', v)} />
        <Field label="Email address" type="email" required value={values.email} onChange={(v) => onChange('email', v)} />
        <Field label="Phone (optional)" type="tel" value={values.phone} onChange={(v) => onChange('phone', v)} className="md:col-span-2" />
        <Select
          label="Practice size"
          required
          value={values.practiceSize}
          onChange={(v) => onChange('practiceSize', v)}
          options={PRACTICE_SIZE_OPTIONS}
        />
        <Select
          label="How did you hear about us?"
          required
          value={values.referralSource}
          onChange={(v) => onChange('referralSource', v)}
          options={SOURCE_OPTIONS}
        />
        <TextareaField
          label="Biggest concern right now (optional)"
          value={values.biggestConcern}
          onChange={(v) => onChange('biggestConcern', v)}
          placeholder="What's keeping you up at night? Even a rough thought helps me prepare."
          className="md:col-span-2"
        />
      </div>

      <div className="space-y-4 pt-2 border-t border-white/10 pt-6">
        <Checkbox
          checked={values.consentContact}
          onChange={(v) => onChange('consentContact', v)}
          required
          label={
            <>
              I consent to BW Advisory Solutions collecting and using the personal information in this form for the purpose of responding to my enquiry and preparing for our conversation, in line with the{' '}
              <a href="/privacy" className="underline hover:text-[#C9A84C]">Privacy Policy</a> and the <em>Privacy Act 1988</em> (Cth).
            </>
          }
        />
        <Checkbox
          checked={values.consentMarketing}
          onChange={(v) => onChange('consentMarketing', v)}
          label="I'd also like to receive occasional insights, articles, and updates from BW Advisory Solutions. I understand I can unsubscribe at any time."
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={missing || !consentOk || submitting}
          className={[
            'w-full md:w-auto px-12 py-5 rounded-lg font-bold text-sm tracking-[0.15em] uppercase transition-all duration-300 inline-flex items-center justify-center gap-3',
            missing || !consentOk || submitting
              ? 'bg-white/10 text-silver/40 cursor-not-allowed'
              : 'bg-[#C9A84C] text-[#0F172A] hover:bg-[#E0BC60] cursor-pointer shadow-[0_8px_24px_rgba(201,168,76,0.3)]',
          ].join(' ')}
        >
          {submitting ? 'Calculating...' : 'See My Results'}
          {!submitting && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
};

const Field = ({ label, required, type = 'text', value, onChange, className = '' }) => (
  <label className={`flex flex-col gap-2 ${className}`}>
    <span className="text-silver/75 text-xs font-mono tracking-[0.3em] uppercase font-bold">
      {label} {required && <span className="text-[#C9A84C]">*</span>}
    </span>
    <input
      type={type}
      value={value || ''}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-silver/40 focus:outline-none focus:border-[#C9A84C] transition-colors duration-300"
    />
  </label>
);

const Select = ({ label, required, value, onChange, options, className = '' }) => (
  <label className={`flex flex-col gap-2 ${className}`}>
    <span className="text-silver/75 text-xs font-mono tracking-[0.3em] uppercase font-bold">
      {label} {required && <span className="text-[#C9A84C]">*</span>}
    </span>
    <select
      value={value || ''}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C9A84C] transition-colors duration-300 appearance-none cursor-pointer"
    >
      <option value="" disabled>Select one</option>
      {options.map((label) => (
        <option key={label} value={label} className="bg-[#0F172A] text-white">{label}</option>
      ))}
    </select>
  </label>
);

const TextareaField = ({ label, value, onChange, placeholder, className = '' }) => (
  <label className={`flex flex-col gap-2 ${className}`}>
    <span className="text-silver/75 text-xs font-mono tracking-[0.3em] uppercase font-bold">{label}</span>
    <textarea
      value={value || ''}
      rows={3}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-silver/40 focus:outline-none focus:border-[#C9A84C] transition-colors duration-300 resize-y min-h-[90px]"
    />
  </label>
);

const Checkbox = ({ checked, onChange, label, required }) => (
  <label className="flex items-start gap-3 cursor-pointer group">
    <input
      type="checkbox"
      checked={!!checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mt-1 w-4 h-4 accent-[#C9A84C] cursor-pointer flex-shrink-0"
    />
    <span className="text-silver/85 font-light text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
      {label}{required && <span className="text-[#C9A84C]"> *</span>}
    </span>
  </label>
);

const GateScreen = ({ values, onChange, onSubmit, submitting, error }) => {
  const emailOk = values.email && /\S+@\S+\.\S+/.test(values.email);
  const canSubmit = emailOk && values.consentToContact && !submitting;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        onSubmit();
      }}
      className="relative bg-gradient-to-br from-white/12 via-white/6 to-white/3 backdrop-blur-sm border border-white/20 rounded-3xl p-10 md:p-14 space-y-8"
    >
      <div className="space-y-4">
        <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Results gate</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight">
          Your results are ready.
        </h2>
        <p className="text-lg text-silver/75 font-light">
          Enter your details to see your AI Readiness Score and personalised gap analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Field
          label="Email address"
          type="email"
          required
          value={values.email}
          onChange={(v) => onChange('email', v)}
        />
      </div>

      <div className="space-y-4 pt-2 border-t border-white/10 pt-6">
        <Checkbox
          checked={values.consentToContact}
          onChange={(v) => onChange('consentToContact', v)}
          required
          label="I consent to BW Advisory Solutions contacting me to discuss my results."
        />
        <Checkbox
          checked={values.consentToMarketing}
          onChange={(v) => onChange('consentToMarketing', v)}
          label="I would like to receive practical guides and insights from BW Advisory Solutions."
        />
      </div>

      {error && (
        <div className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={!canSubmit}
          className={[
            'w-full md:w-auto px-12 py-5 rounded-lg font-bold text-sm tracking-[0.15em] uppercase transition-all duration-300 inline-flex items-center justify-center gap-3',
            !canSubmit
              ? 'bg-white/10 text-silver/40 cursor-not-allowed'
              : 'bg-[#C9A84C] text-[#0F172A] hover:bg-[#E0BC60] cursor-pointer shadow-[0_8px_24px_rgba(201,168,76,0.3)]',
          ].join(' ')}
        >
          {submitting ? 'Loading results...' : 'Show my results'}
          {!submitting && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
};

const ResultsView = ({ results, organisation }) => {
  const { score, band, flags, opportunityEstimates, bespoke } = results;
  const paragraphs = bespoke?.paragraphs ?? [];
  const weeklyHoursLost = opportunityEstimates?.weeklyHoursLost ?? null;
  const annualCostAud = opportunityEstimates?.annualCostAud ?? null;
  const safeFlags = Array.isArray(flags) ? flags : [];
  const subject = `AI Readiness Diagnostic — ${score ?? ''} — ${organisation || 'your practice'}`;
  const mailto = `mailto:brad@bwadvisorysolutions.com.au?subject=${encodeURIComponent(subject)}`;

  return (
    <div className="space-y-12">
      <div className="relative bg-gradient-to-br from-white/12 via-white/6 to-white/3 backdrop-blur-sm border border-white/20 rounded-3xl p-10 md:p-16 text-center space-y-6">
        <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Your AI Readiness Score</p>
        {score !== null && score !== undefined ? (
          <div className="font-display font-bold text-7xl md:text-9xl text-white leading-none">{score}</div>
        ) : (
          <p className="text-silver/70 font-light">Your score is being finalised.</p>
        )}
        {band && (
          <p className="text-[#C9A84C] font-display font-bold text-2xl md:text-3xl tracking-[0.1em]">{band}</p>
        )}
      </div>

      {(weeklyHoursLost !== null || annualCostAud !== null) && (
        <div>
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold mb-6">Opportunity Estimate</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weeklyHoursLost !== null && (
              <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/2 border border-white/15 rounded-2xl p-8">
                <p className="text-silver/60 font-mono text-xs tracking-[0.3em] uppercase font-bold mb-3">
                  Weekly hours lost
                </p>
                <p className="text-white font-display font-bold text-3xl md:text-4xl leading-snug">
                  {weeklyHoursLost}
                </p>
              </div>
            )}
            {annualCostAud !== null && (
              <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/2 border border-white/15 rounded-2xl p-8">
                <p className="text-silver/60 font-mono text-xs tracking-[0.3em] uppercase font-bold mb-3">
                  Estimated annual cost
                </p>
                <p className="text-white font-display font-bold text-3xl md:text-4xl leading-snug">
                  A${annualCostAud.toLocaleString('en-AU')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {safeFlags.length > 0 && (
        <div>
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold mb-6">Flagged Areas</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeFlags.map((flag, i) => (
              <div
                key={`${flag}-${i}`}
                className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/2 border border-white/15 rounded-2xl px-6 py-4"
              >
                <p className="text-white font-light text-base md:text-lg leading-snug">{flag}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {paragraphs.length > 0 && (
        <div>
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold mb-6">Personalised Analysis</p>
          <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/2 border border-white/15 rounded-2xl p-8 md:p-10 space-y-5">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-silver/85 font-light text-base md:text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="relative group overflow-hidden">
        <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/40 to-accent/20 rounded-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 blur-xl"></div>
        <div className="relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-xl border border-accent/30 group-hover:border-[#C9A84C]/60 rounded-3xl p-12 md:p-16 transition-all duration-500 text-center space-y-8">
          <h3 className="font-display font-bold text-3xl md:text-5xl text-white leading-tight">
            Talk to Brad Warburton
          </h3>
          <p className="text-lg md:text-xl text-silver/80 font-light">
            Book a 30-minute conversation to go through your results.
          </p>
          <a
            href={mailto}
            className="inline-flex items-center justify-center gap-3 bg-[#C9A84C] px-12 py-5 rounded-lg text-[#0F172A] font-bold text-sm tracking-[0.15em] uppercase hover:bg-[#E0BC60] transition-all duration-300 shadow-[0_8px_24px_rgba(201,168,76,0.3)] cursor-pointer"
          >
            Book the conversation
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <p className="text-sm md:text-base text-silver/60 font-light max-w-2xl mx-auto">
            No sales pitch. I'll tell you what the score means for your specific situation.
          </p>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────

const AIReadinessDiagnostic = () => {
  const [phase, setPhase] = useState('select'); // select | questions | lead | gate | results
  const [practiceType, setPracticeType] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [lead, setLead] = useState({
    name: '',
    organisation: '',
    role: '',
    email: '',
    phone: '',
    practiceSize: '',
    referralSource: '',
    biggestConcern: '',
    consentContact: false,
    consentMarketing: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [intakeId, setIntakeId] = useState(null);
  const [gate, setGate] = useState({
    email: '',
    consentToContact: false,
    consentToMarketing: false,
  });
  const [gateError, setGateError] = useState(null);
  const [serverResults, setServerResults] = useState(null);

  const questions = practiceType ? PRACTICE_TYPES[practiceType].questions : [];
  const currentQ = questions[qIndex];
  const isLast = qIndex === questions.length - 1;

  const handleSelect = (key) => {
    setPracticeType(key);
    setQIndex(0);
    setAnswers({});
    setPhase('questions');
  };

  const handleAnswer = (label) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: label }));
    if (!isLast) {
      // small delay so the radio fill visibly registers before advancing
      setTimeout(() => setQIndex((i) => i + 1), 180);
    }
  };

  const handleBack = () => {
    if (qIndex === 0) {
      setPhase('select');
    } else {
      setQIndex((i) => i - 1);
    }
  };

  const handleQuestionsDone = () => {
    setPhase('lead');
  };

  const handleLeadChange = (field, value) => {
    setLead((prev) => ({ ...prev, [field]: value }));
  };

  const handleLeadSubmit = async () => {
    setSubmitting(true);
    const { score } = computeResults(practiceType, answers);
    const trimmedEmail = lead.email.trim();
    const payload = {
      name: lead.name.trim(),
      email: trimmedEmail,
      organisation: lead.organisation.trim(),
      role: lead.role.trim(),
      phone: lead.phone.trim(),
      practiceSize: lead.practiceSize,
      referralSource: lead.referralSource,
      biggestConcern: lead.biggestConcern.trim(),
      diagnosticType: practiceType,
      responses: answers,
      score,
      consentContact: !!lead.consentContact,
      consentMarketing: !!lead.consentMarketing,
      source: 'website_diagnostic',
      brand: 'BW_ADVISORY',
    };
    const result = await submitToCommandCentre(payload);
    setSubmitting(false);
    if (result.ok && result.intakeId) {
      setIntakeId(result.intakeId);
      setGate({
        email: trimmedEmail,
        consentToContact: !!lead.consentContact,
        consentToMarketing: !!lead.consentMarketing,
      });
      setGateError(null);
      setPhase('gate');
    } else {
      setGateError('We could not submit your responses. Please try again in a moment.');
      setPhase('gate');
    }
  };

  const handleGateChange = (field, value) => {
    setGate((prev) => ({ ...prev, [field]: value }));
    if (gateError) setGateError(null);
  };

  const handleGateSubmit = async () => {
    if (!intakeId) {
      setGateError('Your session has expired. Please refresh and try again.');
      return;
    }
    setSubmitting(true);
    setGateError(null);
    const result = await releaseResults({
      intakeId,
      email: gate.email.trim(),
      consentToContact: !!gate.consentToContact,
      consentToMarketing: !!gate.consentToMarketing,
    });
    setSubmitting(false);
    if (result.ok) {
      setServerResults(result.data);
      setPhase('results');
    } else {
      setGateError(result.error);
    }
  };

  return (
    <div className="bg-primary min-h-screen">
      {/* HERO */}
      <section className="relative py-32 md:py-40 px-6 w-full z-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#0369A1]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-silver/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">AI Readiness Diagnostic</p>
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]">
            Find out where AI fits in your practice.
          </h1>
          <p className="text-xl md:text-2xl text-silver/75 font-light leading-relaxed max-w-4xl">
            Twelve questions. Five minutes. A scored result that tells you where your practice is exposed, where the easy wins are, and what to do first.
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="py-16 md:py-24 px-6 w-full relative z-10">
        <div className="max-w-4xl mx-auto">
          {phase === 'select' && (
            <div className="space-y-10">
              <div className="space-y-4">
                <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Step 1 of 3</p>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight">
                  Which one fits you?
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
                {Object.values(PRACTICE_TYPES).map((p) => (
                  <PracticeCard
                    key={p.key}
                    title={p.title}
                    blurb={p.blurb}
                    onClick={() => handleSelect(p.key)}
                  />
                ))}
              </div>
            </div>
          )}

          {phase === 'questions' && currentQ && (
            <div className="space-y-8">
              <ProgressBar index={qIndex} total={questions.length} />
              <QuestionCard
                question={currentQ}
                value={answers[currentQ.id]}
                onAnswer={handleAnswer}
                onBack={handleBack}
                canBack={true}
                isLast={isLast}
                onSubmit={handleQuestionsDone}
              />
            </div>
          )}

          {phase === 'lead' && (
            <LeadCaptureForm
              values={lead}
              onChange={handleLeadChange}
              onSubmit={handleLeadSubmit}
              submitting={submitting}
            />
          )}

          {phase === 'gate' && (
            <GateScreen
              values={gate}
              onChange={handleGateChange}
              onSubmit={handleGateSubmit}
              submitting={submitting}
              error={gateError}
            />
          )}

          {phase === 'results' && serverResults && (
            <ResultsView
              results={serverResults}
              organisation={lead.organisation}
            />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIReadinessDiagnostic;
