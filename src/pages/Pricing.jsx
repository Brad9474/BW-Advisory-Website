import { useState } from 'react';
import { Link } from 'react-router-dom';
import posthog from 'posthog-js';
import Footer from '../components/Footer';

const COMMAND_CENTRE_URL = 'https://command.bwadvisorysolutions.com.au';
const CONSENT_VERSION = 'v1-2026-07-21';
const PURCHASE_ENABLED = import.meta.env.VITE_PURCHASE_SURFACE_ENABLED === 'true';

// ─── Pre-checkout consent modal ───────────────────────────────────────────────

const CHECKBOX_COPY = {
  snapshot:
    'I understand the Snapshot Report is an automated assessment built from my answers, that tool prices and availability can change and are checked as at the date in my report, and that return figures are estimates based on stated assumptions. My rights under the Australian Consumer Law are not affected.',
  'solution-map':
    'I understand the Solution Map is generated from my answers and personally reviewed by Brad Warburton before delivery, that tool prices and availability can change and are checked as at the date in my report, and that return figures are estimates based on stated assumptions. My rights under the Australian Consumer Law are not affected.',
};

const ENDPOINTS = {
  snapshot: `${COMMAND_CENTRE_URL}/api/checkout/snapshot`,
  'solution-map': `${COMMAND_CENTRE_URL}/api/checkout/solution-map`,
};

const CheckoutModal = ({ tier, onClose }) => {
  const [consented, setConsented] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const confirm = async () => {
    if (!consented || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(ENDPOINTS[tier], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consentVersion: CONSENT_VERSION,
          consentAt: new Date().toISOString(),
          sourceSurface: 'pricing_page',
        }),
      });
      if (!res.ok) throw new Error(res.status);
      const { url } = await res.json();
      posthog.capture('checkout_initiated', { tier, source: 'pricing_page' });
      window.location.href = url;
    } catch {
      setLoading(false);
      setError('Something went wrong. Please try again or email brad@bwadvisorysolutions.com.au.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div
        className="absolute inset-0 bg-primary/90 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 bg-[#0F1929] border border-white/15 rounded-2xl p-8 md:p-10 max-w-lg w-full space-y-6 shadow-2xl">
        <h2 id="checkout-modal-title" className="font-display font-bold text-xl text-white">
          Before you pay
        </h2>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
            className="mt-1 w-4 h-4 accent-[#C9A84C] cursor-pointer flex-shrink-0 focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60"
          />
          <span className="text-silver/80 font-light text-sm leading-relaxed group-hover:text-white transition-colors duration-200">
            {CHECKBOX_COPY[tier]}
          </span>
        </label>
        <p className="text-silver/50 text-xs font-light">
          By continuing you also agree to BW Advisory's{' '}
          <a
            href="/privacy"
            className="text-[#C9A84C] hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
          . Service Terms will be linked here once finalised by our solicitor.
        </p>
        {error && (
          <p className="text-red-400 text-sm font-light">{error}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={confirm}
            disabled={!consented || loading}
            className={[
              'flex-1 px-8 py-4 rounded-lg font-bold text-sm tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60 focus-visible:outline-none',
              consented && !loading
                ? 'bg-[#C9A84C] text-[#0F172A] hover:bg-[#E0BC60] shadow-[0_8px_24px_rgba(201,168,76,0.3)]'
                : 'bg-white/10 text-silver/40 cursor-not-allowed',
            ].join(' ')}
          >
            {loading ? 'Opening secure checkout…' : 'Continue to payment'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-4 rounded-lg border border-white/15 text-silver/60 text-sm font-bold tracking-[0.15em] uppercase hover:text-white hover:border-white/30 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Buy button ───────────────────────────────────────────────────────────────

const BuyButton = ({ tier, label, onOpen, className = '' }) => {
  if (!PURCHASE_ENABLED) {
    return (
      <button
        type="button"
        disabled
        title="Purchase not yet available"
        className={[
          'w-full sm:w-auto px-10 py-4 rounded-full font-bold text-sm tracking-[0.15em] uppercase bg-white/10 text-silver/40 cursor-not-allowed border border-white/10',
          className,
        ].join(' ')}
      >
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(tier)}
      className={[
        'w-full sm:w-auto px-10 py-4 rounded-full font-bold text-sm tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60 focus-visible:outline-none bg-[#C9A84C] text-[#0F172A] hover:bg-[#E0BC60] shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)]',
        className,
      ].join(' ')}
    >
      {label}
    </button>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: 'Does Brad review my $497 report?',
    a: 'No. The Snapshot is generated by our diagnostic system from your intake answers, instantly. Brad built the methodology and maintains the knowledge base it checks against, but no human reads your individual report before it reaches you. That is why it costs $497 and arrives in minutes. Brad personally reviews every Solution Map.',
  },
  {
    q: 'How is this different from the free diagnostic?',
    a: 'The free diagnostic scores your readiness and shows you where the risk sits. The paid reports do the work: named tools checked against your existing software, verified pricing, safety analysis, and a setup plan for each one. The free diagnostic tells you where you stand. The Snapshot tells you what to do.',
  },
  {
    q: 'Are the savings figures guaranteed?',
    a: 'No. They are projections, presented as ranges with the assumptions stated under every figure. We show the workings so you can test them against your own numbers. Anyone who promises you a specific dollar return from a tool they haven\'t seen you run is guessing.',
  },
  {
    q: 'Do you get a commission on the tools you recommend?',
    a: 'No. BW Advisory receives no commission or referral fee from any vendor in any report. If that ever changed, we would disclose it at the point of recommendation. The recommendation stands on the evidence or it doesn\'t stand.',
  },
  {
    q: 'What happens after I pay?',
    a: 'Within a minute you get an email with your intake link. The Snapshot intake is 13 questions, about ten minutes. Your report generates the moment you submit it. For the Solution Map, the report arrives within 3 business days of your completed intake and the call is scheduled within 5 business days of delivery.',
  },
  {
    q: 'Can I buy the Snapshot now and upgrade later?',
    a: 'Yes. Your $497 counts in full toward the Solution Map for 60 days from purchase. You answer six additional questions — your original thirteen are on file. After 60 days the Solution Map is full price.',
  },
  {
    q: 'What do you do with my information?',
    a: (
      <>
        Your intake answers are used to generate your report and are stored on Australian-hosted infrastructure. We don't sell your information and we don't pass it to anyone for a benefit without your consent. The full collection notice is on the intake form and our privacy policy is at{' '}
        <Link to="/privacy" className="text-[#C9A84C] hover:underline">
          /privacy
        </Link>
        .
      </>
    ),
  },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 rounded"
        aria-expanded={open}
      >
        <span className="font-display font-semibold text-white text-lg leading-snug">{q}</span>
        <svg
          className={`w-5 h-5 text-[#C9A84C] flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 5v14M5 12h14" />
        </svg>
      </button>
      {open && (
        <p className="pb-6 text-silver/80 font-light leading-relaxed text-base">{a}</p>
      )}
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const Pricing = () => {
  const [modal, setModal] = useState(null); // null | 'snapshot' | 'solution-map'

  const openModal = (tier) => setModal(tier);
  const closeModal = () => setModal(null);

  return (
    <div className="relative z-10 min-h-screen">
      {modal && <CheckoutModal tier={modal} onClose={closeModal} />}

      {/* ── HERO ── */}
      <section className="pt-40 md:pt-52 pb-20 px-6 w-full">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Pricing</p>
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
            Two reports. Fixed prices.<br className="hidden md:block" /> No sales call required.
          </h1>
          <p className="text-silver/75 font-light text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
            An AI Readiness diagnostic, checked against BW Advisory's knowledge base at the moment of purchase. Every tool verified on the date your report generates. Every projection a range with its assumptions printed underneath. Built by Brad Warburton — 30 years in law enforcement command, National Director of Law Enforcement Partnerships at Auror, founder of BW Advisory Solutions.
          </p>
          <p className="text-silver/50 text-sm font-light tracking-wide">All prices include GST.</p>
          {!PURCHASE_ENABLED && (
            <p className="text-amber-400/80 text-sm font-mono tracking-wide">
              Purchase not yet available — launching soon.
            </p>
          )}
        </div>
      </section>

      {/* ── SNAPSHOT TIER ── */}
      <section id="snapshot" className="py-16 px-6 w-full scroll-mt-28">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-sm border border-white/15 rounded-3xl p-8 md:p-14 space-y-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="space-y-2">
                <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">AI Snapshot Report</p>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-white">$497</h2>
                <p className="text-silver/50 text-sm font-light">incl. GST</p>
              </div>
              <p className="text-[#C9A84C] font-semibold text-lg md:text-xl">Automated. Instant. Complete at its price.</p>
            </div>

            <div className="space-y-5 text-silver/80 font-light text-base md:text-lg leading-relaxed max-w-3xl">
              <p>
                The Snapshot takes your intake answers and identifies the workflow areas where automation is most likely to reduce administrative time in your business. For each one: a primary tool checked against the software you already run, the alternatives we considered, and a trust and safety note covering data residency, certifications, and what to switch off before any client data touches it. Each tool comes with a 4-day setup plan you can start the week the report lands. No IT department required.
              </p>
              <p>
                The savings projections are ranges, not promises. Every figure carries its assumptions, its evidence rating, and the date the tool's pricing was verified. You see the workings. You decide what to act on.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 space-y-2">
              <p className="text-silver/50 font-mono text-xs tracking-[0.3em] uppercase font-bold">What it's not</p>
              <p className="text-silver/75 font-light text-base leading-relaxed">
                Nobody reviews this report by hand. The system generates it from your answers, using a methodology Brad Warburton built and maintains. If the report is wrong about your business, the guarantee below applies. If you want Brad's personal review of your business, that is the Solution Map.
              </p>
            </div>

            <p className="text-silver/50 text-sm font-light italic">
              The Snapshot Report is an automated assessment checked against BW Advisory's knowledge base at the moment of purchase. The verification date is printed in your report.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 space-y-2">
              <p className="text-silver/50 font-mono text-xs tracking-[0.3em] uppercase font-bold">Delivery</p>
              <p className="text-silver/75 font-light text-base">
                Pay, and the intake link is in your inbox within a minute. The intake takes about ten minutes. Your report generates the moment you submit it.
              </p>
            </div>

            <div className="pt-4">
              <BuyButton tier="snapshot" label="Get the Snapshot Report — $497" onOpen={openModal} />
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION MAP TIER ── */}
      <section id="solution-map" className="py-16 px-6 w-full scroll-mt-28">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-[#C9A84C]/8 via-white/4 to-white/2 backdrop-blur-sm border border-[#C9A84C]/20 rounded-3xl p-8 md:p-14 space-y-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="space-y-2">
                <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">AI Solution Map</p>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-white">$1,497</h2>
                <p className="text-silver/50 text-sm font-light">incl. GST</p>
              </div>
              <p className="text-[#C9A84C] font-semibold text-lg md:text-xl max-w-xs md:text-right">Everything in the Snapshot, plus Brad's personal review.</p>
            </div>

            <div className="space-y-5 text-silver/80 font-light text-base md:text-lg leading-relaxed max-w-3xl">
              <p>
                Everything in the Snapshot, plus the analysis the intake alone can't reach. Personally reviewed by Brad before it leaves the building.
              </p>
              <p>
                The Snapshot works from the problems you name. The Solution Map reads your whole intake for the patterns your answers show but didn't name — the workflows costing you time that you've stopped noticing. It carries deeper implementation detail on every opportunity: template structures, rollout sequences, team briefing notes, and a priority matrix that sequences all of it.
              </p>
              <p>
                Brad reviews every Solution Map personally before delivery. Then you get 30 minutes with him on a video call, within 5 business days of your report arriving, to decide what to act on first.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 space-y-2">
              <p className="text-silver/50 font-mono text-xs tracking-[0.3em] uppercase font-bold">Delivery</p>
              <p className="text-silver/75 font-light text-base">
                Within 3 business days of your completed intake. The intake is 19 questions — or six, if you've already bought the Snapshot.
              </p>
            </div>

            <div className="bg-[#C9A84C]/8 border border-[#C9A84C]/25 rounded-xl p-5 md:p-6 space-y-2">
              <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Already bought the Snapshot?</p>
              <p className="text-silver/75 font-light text-base">
                Your $497 counts in full toward the Solution Map for 60 days from purchase. You pay $1,000, answer six more questions, and your first thirteen answers are already on file.
              </p>
            </div>

            <div className="pt-4">
              <BuyButton tier="solution-map" label="Get the Solution Map — $1,497" onOpen={openModal} />
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-16 px-6 w-full">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-silver/50 font-mono text-xs tracking-[0.2em] uppercase font-bold w-1/3"></th>
                  <th className="text-left px-6 py-4 text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase font-bold">AI Snapshot Report</th>
                  <th className="text-left px-6 py-4 text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase font-bold">AI Solution Map</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8">
                {[
                  ['Price (GST inclusive)', '$497', '$1,497'],
                  ['Method', 'Automated — generated from your intake by BW Advisory\'s diagnostic system', 'Automated draft plus Brad Warburton\'s personal review'],
                  ['Human review', 'None — stated plainly, here and in the report', 'Every report, before delivery'],
                  ['Call', 'None', '30 minutes with Brad, within 5 business days of delivery'],
                  ['Opportunities covered', 'Your stated top pains', 'Your stated pains plus the under-recognised layer your intake shows'],
                  ['Implementation detail', '4-day DIY plan per tool', 'Full implementation plan per opportunity, plus sequencing across all of them'],
                  ['Intake', '13 questions, about 10 minutes', '19 questions — only 6 more if upgrading from the Snapshot'],
                  ['Delivery', 'Instant on intake submission', 'Within 3 business days of completed intake'],
                  ['Complete at its price', 'Yes', 'Yes'],
                  ['Credit toward the other tier', '$497 credits in full toward the Solution Map within 60 days', '—'],
                ].map(([label, a, b]) => (
                  <tr key={label} className="hover:bg-white/3 transition-colors duration-150">
                    <td className="px-6 py-4 text-silver/60 font-light">{label}</td>
                    <td className="px-6 py-4 text-white font-light">{a}</td>
                    <td className="px-6 py-4 text-white font-light">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-silver/65 font-light text-base leading-relaxed">
            Both reports carry the same discipline. Verified tool data with the check date printed. Ranges with stated assumptions. No commissions from any vendor we recommend. The difference is depth and Brad's personal involvement — not quality of care.
          </p>

          <p className="text-silver/50 font-light text-sm italic">
            Savings figures in both reports are estimates presented as ranges, based on your intake answers and stated assumptions. They are not guarantees. Actual results depend on implementation and adoption.
          </p>
        </div>
      </section>

      {/* ── GUARANTEE ── */}
      <section className="py-16 px-6 w-full">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-white/6 to-white/2 border border-white/15 rounded-2xl p-8 md:p-12 space-y-5">
            <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Our guarantee</p>
            <p className="text-silver/85 font-light text-base md:text-lg leading-relaxed max-w-3xl">
              If a primary recommended tool in your report had been discontinued, or its published price had materially increased, before your report was generated — tell us. You choose the remedy: we correct and reissue the report, or refund the fee in full. Change-of-mind refunds are not offered once generation begins. Your rights under the Australian Consumer Law are not affected.
            </p>
          </div>
        </div>
      </section>

      {/* ── ACL DISCLOSURE STRIP ── */}
      <section className="py-8 px-6 w-full">
        <div className="max-w-5xl mx-auto border-t border-white/8 pt-8 space-y-3">
          <p className="text-silver/45 font-light text-xs leading-relaxed">
            The Snapshot Report is an automated assessment checked against BW Advisory's knowledge base at the moment of purchase. The verification date is printed in your report.
          </p>
          <p className="text-silver/45 font-light text-xs leading-relaxed">
            Savings figures in both reports are estimates presented as ranges, based on your intake answers and stated assumptions. They are not guarantees. Actual results depend on implementation and adoption.
          </p>
          <p className="text-silver/45 font-light text-xs leading-relaxed">
            BW Advisory receives no commission or referral fee from any vendor recommended in your report.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-6 w-full">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold mb-8">Frequently asked</p>
          {FAQ_ITEMS.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* ── QUIET CLOSE ── */}
      <section className="py-16 px-6 w-full">
        <div className="max-w-3xl mx-auto text-center space-y-4 border-t border-white/8 pt-16">
          <p className="text-silver/60 font-light text-base leading-relaxed">
            Not sure yet?{' '}
            <Link to="/ai-readiness" className="text-[#C9A84C] hover:underline">
              Start with the free AI Readiness diagnostic
            </Link>{' '}
            — scored result, no account required. Want a conversation first?{' '}
            <Link to="/consultation" className="text-[#C9A84C] hover:underline">
              Book a consultation.
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
