export const SITE = 'https://bwadvisorysolutions.com.au';

const DEFAULT_META = {
  title: 'BW Advisory Solutions | Operational Resilience & Technology Advisory',
  description:
    'BW Advisory Solutions closes the gap between strategic intent and frontline execution for operations and professional services firms — operational diagnostics, AI readiness, technology matching, and loss intelligence & investigations, backed by 30+ years of command experience.',
};

// One entry per route in src/App.jsx. Routes not listed here fall back to
// DEFAULT_META. `noindex: true` keeps a page out of search results without
// removing it from the sitemap logic in scripts/generate-sitemap.mjs.
const PAGE_META = {
  '/': DEFAULT_META,
  '/loss-intelligence': {
    title: 'Loss Intelligence & Investigations | BW Advisory Solutions',
    description:
      'Build the capability to see, investigate, and act. Loss intelligence services that turn incident data into a defensible strategy for reducing retail and operational loss.',
  },
  '/diagnostics': {
    title: 'Diagnostics | BW Advisory Solutions',
    description:
      "Start with what's true. Four operational diagnostics — strategic, operational, loss intelligence, and investigations — that surface the real gap before you act.",
  },
  '/investigations': {
    title: 'Investigations | BW Advisory Solutions',
    description:
      'Investigations that are proven and defensible. Built on law enforcement evidentiary standards, from signal collection to defensible documentation and outcome.',
  },
  '/privacy': {
    title: 'Privacy Policy | BW Advisory Solutions',
    description:
      'How BW Advisory Solutions Pty Ltd collects, stores and protects your information, and how to access, correct or delete it.',
  },
  '/terms': {
    title: 'Service Terms | BW Advisory Solutions',
    description:
      'The terms governing every service BW Advisory Solutions Pty Ltd supplies — the AI Readiness diagnostic, paid report tiers, and the AI Partner retainer.',
  },
  '/ai-readiness': {
    title: 'AI Readiness Diagnostic | BW Advisory Solutions',
    description:
      "See where AI fits — and where it doesn't. A free, scored diagnostic that identifies your best AI opportunities in minutes, no account required.",
  },
  '/consultation': {
    title: 'Book a Consultation | BW Advisory Solutions',
    description:
      "Book a direct consultation with Brad Warburton on operational resilience, technology advisory, or loss intelligence — no proposal until we've talked.",
  },
  '/strategic-diagnostic': {
    title: 'Strategic Diagnostic | BW Advisory Solutions',
    description:
      'Close the gap between intent and execution. Maps the systemic gap between leadership intent and organisational delivery, focused on alignment, execution and risk posture.',
  },
  '/operational-diagnostic': {
    title: 'Operational Diagnostic | BW Advisory Solutions',
    description:
      'Audit the machine. Uncover the friction. Surfaces the functional friction between tactical decisions and frontline capability across processes, systems and accountability.',
  },
  '/loss-intelligence-diagnostic': {
    title: 'Loss Intelligence Diagnostic | BW Advisory Solutions',
    description:
      'Measure the loss. Define the strategy. Assesses your capability to transform incident data into actionable loss intelligence and minimise exposure to systemic retail crime.',
  },
  '/investigations-diagnostic': {
    title: 'Investigations Capability Diagnostic | BW Advisory Solutions',
    description:
      'Build the capability to investigate, and prove it. Assesses the integrity of your investigation lifecycle against the PROVED protocol, built on law enforcement evidentiary standards.',
  },
  '/pricing': {
    title: 'Pricing | BW Advisory Solutions',
    description:
      'AI Snapshot Report and AI Solution Map pricing — automated and personally reviewed AI workflow reports for operations and professional services firms.',
  },
  '/solution-map': {
    title: 'AI Solution Map | BW Advisory Solutions',
    description:
      'A report and adoption roadmap generated from your intake and personally reviewed by Brad Warburton, plus a 60-minute strategy call.',
  },
  '/purchase/confirmed': {
    title: 'Order Confirmed | BW Advisory Solutions',
    description: 'Your order has been confirmed.',
    noindex: true,
  },
  '/purchase/cancelled': {
    title: 'Order Cancelled | BW Advisory Solutions',
    description: 'Your order was cancelled.',
    noindex: true,
  },
};

export function getPageMeta(pathname) {
  return PAGE_META[pathname] || { ...DEFAULT_META, noindex: pathname !== '/' };
}
