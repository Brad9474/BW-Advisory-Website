import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import posthog from 'posthog-js';
import Footer from '../components/Footer';

const COMMAND_CENTRE_URL = 'https://command.bwadvisorysolutions.com.au';
const CONSENT_VERSION = 'v1-2026-07-21';
const TERMS_VERSION = 'v1.1-2026-07-27';
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

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const CheckoutModal = ({ tier, onClose }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [consented, setConsented] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const openedAt = useRef(Date.now());
  const continuedClicked = useRef(false);

  const canContinue = isValidEmail(email) && consented;

  useEffect(() => {
    posthog.capture('checkout_modal_opened', { tier });
  }, [tier]);

  const handleClose = () => {
    if (!continuedClicked.current) {
      posthog.capture('checkout_modal_closed_without_continue', {
        tier,
        email_entered: email.trim().length > 0,
        time_open_ms: Date.now() - openedAt.current,
      });
    }
    onClose();
  };

  const handleEmailBlur = () => {
    if (email.trim() && !isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
    if (email.trim()) {
      const domain = email.trim().split('@')[1] || '';
      posthog.capture('checkout_email_entered', { tier, email_domain: domain });
    }
  };

  const handlePhoneBlur = () => {
    if (phone.trim()) {
      posthog.capture('checkout_phone_entered', { tier });
    }
  };

  const handleMarketingChange = (e) => {
    const checked = e.target.checked;
    setMarketingOptIn(checked);
    posthog.capture(
      checked ? 'checkout_marketing_consent_ticked' : 'checkout_marketing_consent_unticked',
      { tier },
    );
  };

  const confirm = async () => {
    if (!canContinue || loading) return;
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    continuedClicked.current = true;
    posthog.capture('checkout_continue_clicked', {
      tier,
      has_phone: phone.trim().length > 0,
      marketing_opt_in: marketingOptIn,
    });
    setLoading(true);
    setError(null);
    const body = {
      email: email.trim(),
      marketingOptIn,
      consentVersion: CONSENT_VERSION,
      termsVersion: TERMS_VERSION,
      consentAt: new Date().toISOString(),
      sourceSurface: 'pricing_page',
    };
    if (phone.trim()) body.phone = phone.trim().slice(0, 30);
    try {
      const res = await fetch(ENDPOINTS[tier], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
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

  const inputBase =
    'w-full bg-[#0A1120] border rounded-lg px-4 py-3 text-sm text-white placeholder:text-silver/30 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/60 focus:border-[#C9A84C]/40';

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div
        className="absolute inset-0 bg-primary/90 backdrop-blur-md"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className="relative z-10 bg-[#0F1929] border border-white/15 rounded-2xl p-8 md:p-10 max-w-lg w-full space-y-5 shadow-2xl">
        <h2 id="checkout-modal-title" className="font-display font-bold text-xl text-white">
          Before you pay
        </h2>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="checkout-email" className="block text-silver/60 text-xs font-mono tracking-[0.12em] uppercase">
            Where should we send your intake link?
          </label>
          <input
            id="checkout-email"
            type="email"
            autoFocus
            autoComplete="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(''); }}
            onBlur={handleEmailBlur}
            placeholder="you@yourbusiness.com.au"
            maxLength={254}
            style={{ transition: 'border-color 150ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 150ms cubic-bezier(0.16, 1, 0.3, 1)' }}
            className={`${inputBase} ${emailError ? 'border-red-500/60' : 'border-white/15'}`}
          />
          {emailError && (
            <p className="text-red-400 text-xs font-light">{emailError}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label htmlFor="checkout-phone" className="block text-silver/40 text-xs font-mono tracking-[0.12em] uppercase">
            Phone <span className="normal-case tracking-normal font-light">(optional)</span>
          </label>
          <input
            id="checkout-phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.slice(0, 30))}
            onBlur={handlePhoneBlur}
            placeholder="+61 4XX XXX XXX"
            maxLength={30}
            style={{ transition: 'border-color 150ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 150ms cubic-bezier(0.16, 1, 0.3, 1)' }}
            className={`${inputBase} border-white/10`}
          />
          <p className="text-silver/35 text-xs font-light leading-relaxed">
            We may call this number about your unfinished purchase — not used for marketing.
          </p>
        </div>

        {/* Marketing consent */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={marketingOptIn}
            onChange={handleMarketingChange}
            style={{ transition: 'opacity 150ms cubic-bezier(0.16, 1, 0.3, 1)' }}
            className="mt-1 w-4 h-4 accent-[#C9A84C] cursor-pointer flex-shrink-0 focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60"
          />
          <span className="text-silver/55 font-light text-sm leading-relaxed group-hover:text-silver/80 transition-colors duration-150">
            I&apos;d like to hear about future BW Advisory content, guides and offers by email. You can unsubscribe at any time.
          </span>
        </label>

        {/* Terms consent */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
            style={{ transition: 'opacity 150ms cubic-bezier(0.16, 1, 0.3, 1)' }}
            className="mt-1 w-4 h-4 accent-[#C9A84C] cursor-pointer flex-shrink-0 focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60"
          />
          <span className="text-silver/80 font-light text-sm leading-relaxed group-hover:text-white transition-colors duration-150">
            {CHECKBOX_COPY[tier]}
          </span>
        </label>

        <p className="text-silver/50 text-xs font-light">
          {PURCHASE_ENABLED ? (
            <>
              By continuing you agree to BW Advisory&apos;s{' '}
              <a href="/privacy" className="text-[#C9A84C] hover:underline" target="_blank" rel="noreferrer">
                Privacy Policy
              </a>
              {' '}and{' '}
              <a href="/terms" className="text-[#C9A84C] hover:underline" target="_blank" rel="noreferrer">
                Service Terms
              </a>
              .
            </>
          ) : (
            <>
              By continuing you also agree to BW Advisory&apos;s{' '}
              <a href="/privacy" className="text-[#C9A84C] hover:underline" target="_blank" rel="noreferrer">
                Privacy Policy
              </a>
              . Service Terms will be linked here once finalised by our solicitor.
            </>
          )}
        </p>

        {error && (
          <p className="text-red-400 text-sm font-light">{error}</p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button
            type="button"
            onClick={confirm}
            disabled={!canContinue || loading}
            style={{ transition: 'all 150ms cubic-bezier(0.16, 1, 0.3, 1)' }}
            className={[
              'flex-1 px-8 py-4 rounded-lg font-bold text-sm tracking-[0.15em] uppercase focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60 focus-visible:outline-none',
              canContinue && !loading
                ? 'bg-[#C9A84C] text-[#0F172A] hover:bg-[#E0BC60] shadow-[0_8px_24px_rgba(201,168,76,0.3)] cursor-pointer'
                : 'bg-white/10 text-silver/40 cursor-not-allowed',
            ].join(' ')}
          >
            {loading ? 'Opening secure checkout…' : 'Continue to payment'}
          </button>
          <button
            type="button"
            onClick={handleClose}
            style={{ transition: 'all 150ms cubic-bezier(0.16, 1, 0.3, 1)' }}
            className="px-8 py-4 rounded-lg border border-white/15 text-silver/60 text-sm font-bold tracking-[0.15em] uppercase hover:text-white hover:border-white/30 cursor-pointer focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Card CTA button ──────────────────────────────────────────────────────────

const CardCTA = ({ tier, label, onOpen }) => {
  if (!PURCHASE_ENABLED) {
    return (
      <button
        type="button"
        disabled
        title="Purchase not yet available"
        className="w-full px-8 py-4 rounded-lg font-bold text-sm tracking-[0.15em] uppercase bg-white/8 text-silver/35 cursor-not-allowed border border-white/10"
      >
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(tier)}
      style={{ transition: 'all 150ms cubic-bezier(0.16, 1, 0.3, 1)' }}
      className="w-full px-8 py-4 rounded-lg font-bold text-sm tracking-[0.15em] uppercase cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0F172A] focus-visible:ring-[#C9A84C]/60 focus-visible:outline-none bg-[#C9A84C] text-[#0F172A] hover:bg-[#E0BC60] shadow-[0_8px_24px_rgba(201,168,76,0.25)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)]"
    >
      {label}
    </button>
  );
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    className="w-3.5 h-3.5 text-[#C9A84C] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

// ─── Accordion ────────────────────────────────────────────────────────────────

const AccordionSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-white/8">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 py-3 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 focus-visible:ring-offset-2 rounded"
      >
        <span className="text-silver/50 font-mono text-xs tracking-[0.15em] uppercase font-bold">
          {title}
        </span>
        <svg
          className="w-4 h-4 text-[#C9A84C]/60 flex-shrink-0"
          style={{
            transition: 'transform 150ms cubic-bezier(0.16, 1, 0.3, 1)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {/* Content always in DOM for SEO — visually toggled via max-height */}
      <div
        style={{
          overflow: 'hidden',
          maxHeight: open ? '600px' : '0px',
          transition: 'max-height 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="pb-4 text-silver/60 font-light text-[13px] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: 'Does Brad review my $497 report?',
    a: "No. The Snapshot is generated by our diagnostic system from your intake answers, instantly. Brad built the methodology and maintains the knowledge base it checks against, but no human reads your individual report before it reaches you. That is why it costs $497 and arrives in minutes. Brad personally reviews every Solution Map.",
  },
  {
    q: 'How is this different from the free diagnostic?',
    a: 'The free diagnostic scores your readiness and shows you where the risk sits. The paid reports do the work: named tools checked against your existing software, verified pricing, safety analysis, and a setup plan for each one. The free diagnostic tells you where you stand. The Snapshot tells you what to do.',
  },
  {
    q: 'Are the savings figures guaranteed?',
    a: "No. They are projections, presented as ranges with the assumptions stated under every figure. We show the workings so you can test them against your own numbers. Anyone who promises you a specific dollar return from a tool they haven't seen you run is guessing.",
  },
  {
    q: 'Do you get a commission on the tools you recommend?',
    a: "No. BW Advisory receives no commission or referral fee from any vendor in any report. If that ever changed, we would disclose it at the point of recommendation. The recommendation stands on the evidence or it doesn't stand.",
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
        Your intake answers are used to generate your report and are stored on Australian-hosted infrastructure. We don&apos;t sell your information and we don&apos;t pass it to anyone for a benefit without your consent. The full collection notice is on the intake form and our privacy policy is at{' '}
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
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState('solution-map');
  const [hovered, setHovered] = useState(null);

  const openModal = (tier) => setModal(tier);
  const closeModal = () => setModal(null);

  return (
    <div className="relative z-10 min-h-screen">
      {modal && <CheckoutModal tier={modal} onClose={closeModal} />}

      {/* ── HERO ── */}
      <section className="pt-40 md:pt-52 pb-10 px-6 w-full">
        <div className="max-w-5xl mx-auto text-center space-y-5">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">
            TWO REPORTS
          </p>
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
            Pick what fits.
          </h1>
          {/* ① Feature pills replacing subtitle paragraph */}
          <div className="flex flex-wrap justify-center gap-3 pt-1">
            {['TWO REPORTS', 'FIXED PRICES', 'NO SALES CALL REQUIRED'].map((label) => (
              <span
                key={label}
                className="px-6 py-1.5 border border-[#C9A84C] rounded-full text-[#C9A84C] font-mono text-xs font-bold tracking-[0.15em] uppercase"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING CARDS ── */}
      <section className="pb-20 px-6 w-full">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 items-stretch">

          {/* AI Snapshot Report — desktop left, mobile second */}
          <div
            id="snapshot"
            className="order-2 lg:order-1 flex-1 flex flex-col rounded-2xl p-8 space-y-6 scroll-mt-28 cursor-pointer"
            onClick={() => setSelected('snapshot')}
            onMouseEnter={() => setHovered('snapshot')}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: selected === 'snapshot'
                ? 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, rgba(255,255,255,0.02) 100%)'
                : 'rgba(255,255,255,0.04)',
              border: selected === 'snapshot'
                ? '2px solid #C9A84C'
                : hovered === 'snapshot'
                  ? '1px solid rgba(201,168,76,0.40)'
                  : '1px solid rgba(255,255,255,0.10)',
              boxShadow: selected === 'snapshot'
                ? '0 0 48px rgba(201,168,76,0.10), 0 24px 64px rgba(0,0,0,0.35)'
                : hovered === 'snapshot'
                  ? '0 0 24px rgba(201,168,76,0.06)'
                  : 'none',
              transition: 'border-color 150ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 150ms cubic-bezier(0.16, 1, 0.3, 1), background 150ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="space-y-1.5">
              <h2 className="font-display font-bold text-2xl text-white">AI Snapshot Report</h2>
              <p className="text-silver/55 font-light text-sm leading-snug">
                Automated. Instant. Complete at its price.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-display font-bold text-6xl text-white tabular-nums leading-none">
                $497
              </p>
              <p className="text-silver/45 text-xs font-light">incl. GST</p>
              <span className="inline-flex items-center mt-2 px-3 py-1 rounded-full bg-[#C9A84C]/12 border border-[#C9A84C]/25 text-[#C9A84C] text-xs font-mono font-bold tracking-[0.15em] uppercase">
                Delivered in minutes
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase font-bold">
                What you get
              </p>
              <ul className="space-y-2.5">
                {/* ② Named tools, no specific count */}
                <li className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span className="text-silver/75 font-light text-sm leading-snug">
                    Named tools matched to your priority workflows
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span className="text-silver/75 font-light text-sm leading-snug">
                    Trust &amp; safety notes on each tool
                  </span>
                </li>
                {/* ③ DIY setup plan as proposition */}
                <li className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span className="text-silver/75 font-light text-sm leading-snug">
                    <strong className="font-semibold text-white">DIY setup plan</strong>{' '}
                    &mdash; 4 days per tool, no IT team needed
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span className="text-silver/75 font-light text-sm leading-snug">
                    Verified pricing with check date printed
                  </span>
                </li>
              </ul>
            </div>

            {/* ④ Reframe NOT INCLUDED as intentional design */}
            <div className="pt-2 border-t border-white/8">
              <p className="text-silver/55 font-light text-sm leading-relaxed">
                <strong className="font-semibold text-white">Snapshot is 100% automated.</strong>{' '}
                No human review, no call &mdash; this report generates directly from your intake.
                Want Brad&apos;s eyes on your business?{' '}
                <a
                  href="#solution-map"
                  style={{ transition: 'color 150ms cubic-bezier(0.16, 1, 0.3, 1)' }}
                  className="text-[#C9A84C]/70 hover:text-[#C9A84C]"
                >
                  Upgrade to Solution Map &mdash; your $497 credits in full for 60 days &rarr;
                </a>
              </p>
            </div>

            <div className="flex-1" />

            {/* ⑤ Accordions */}
            <div>
              <AccordionSection title="How the report is built">
                The Snapshot is generated by our diagnostic system from your intake answers, instantly.
                Brad built the methodology and maintains the knowledge base it checks against, but no human
                reads your individual report before it reaches you. That is why it costs $497 and arrives
                in minutes. Tool data is verified and the check date is printed in your report. BW Advisory
                receives no commission or referral fee from any vendor we recommend &mdash; if that ever
                changed, we would disclose it at the point of recommendation. The recommendation stands on
                the evidence or it doesn&apos;t stand. Savings figures are projections, presented as ranges
                with the assumptions stated under every figure, so you can test them against your own numbers.
              </AccordionSection>
              <AccordionSection title="Delivery &amp; what happens next">
                Within a minute of purchase you get an email with your intake link. The Snapshot intake is
                13 questions, about ten minutes. Your report generates the moment you submit it, with the
                tool verification date printed in the report. Your $497 counts in full toward the Solution
                Map for 60 days from purchase &mdash; you answer six additional questions and your original
                thirteen are on file. After 60 days the Solution Map is full price.
              </AccordionSection>
            </div>

            {/* ⑥⑦ Guarantee badge + CTA + risk reversal */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-center gap-1.5">
                <ShieldIcon />
                <span className="text-[#C9A84C] text-xs font-light tracking-wide">
                  60-day guarantee &mdash; correct or refund
                </span>
              </div>
              <CardCTA tier="snapshot" label="Get the Snapshot — $497" onOpen={openModal} />
              <p className="text-center text-silver/40 font-light" style={{ fontSize: '12px' }}>
                Nothing charged if you cancel before submitting your intake.
              </p>
            </div>
          </div>

          {/* AI Solution Map — desktop right, mobile first (flagship-first stack) */}
          <div
            id="solution-map"
            className="order-1 lg:order-2 flex-1 flex flex-col rounded-2xl p-8 space-y-6 scroll-mt-28 cursor-pointer"
            onClick={() => setSelected('solution-map')}
            onMouseEnter={() => setHovered('solution-map')}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, rgba(255,255,255,0.02) 100%)',
              border: selected === 'solution-map'
                ? '2px solid #C9A84C'
                : hovered === 'solution-map'
                  ? '1px solid rgba(201,168,76,0.40)'
                  : '1px solid rgba(255,255,255,0.10)',
              boxShadow: selected === 'solution-map'
                ? '0 0 48px rgba(201,168,76,0.10), 0 24px 64px rgba(0,0,0,0.35)'
                : hovered === 'solution-map'
                  ? '0 0 24px rgba(201,168,76,0.06)'
                  : 'none',
              transition: 'border-color 150ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#C9A84C] text-[#0F172A] text-xs font-mono font-bold tracking-[0.15em] uppercase">
                Personally reviewed by Brad
              </span>
            </div>

            <div className="space-y-1.5">
              <h2 className="font-display font-bold text-2xl text-white">AI Solution Map</h2>
              <p className="text-silver/55 font-light text-sm leading-snug">
                Brad&apos;s personal review of your business, and 60 minutes with him on a call.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-display font-bold text-6xl text-white tabular-nums leading-none">
                $1,497
              </p>
              <p className="text-silver/45 text-xs font-light">incl. GST</p>
              <span className="inline-flex items-center mt-2 px-3 py-1 rounded-full bg-[#C9A84C]/12 border border-[#C9A84C]/25 text-[#C9A84C] text-xs font-mono font-bold tracking-[0.15em] uppercase">
                Delivered in 3 business days
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase font-bold">
                What you get
              </p>
              <ul className="space-y-2.5">
                {[
                  'Everything in the Snapshot',
                  "Brad’s personal review before delivery",
                  'Deep implementation plan per opportunity',
                  'Priority matrix across all opportunities',
                  '60-min call with Brad (within 5 business days)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="text-silver/75 font-light text-sm leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1" />

            {/* ⑤ Accordions */}
            <div>
              <AccordionSection title="How the report is built">
                The Solution Map starts with the same automated diagnostic as the Snapshot &mdash; your
                intake runs through BW Advisory&apos;s diagnostic system, and Brad Warburton personally
                reviews your report before it reaches you. Both reports carry the same discipline: verified
                tool data with the check date printed, ranges with stated assumptions, no commissions from
                any vendor we recommend. The difference is depth and Brad&apos;s personal involvement &mdash;
                not quality of care.
              </AccordionSection>
              <AccordionSection title="Delivery &amp; what happens next">
                Within a minute of purchase you get an email with your intake link. The Solution Map intake
                is 19 questions &mdash; only 6 more if upgrading from the Snapshot, with your original
                thirteen on file. Your report arrives within 3 business days of your completed intake. The
                60-minute call with Brad is scheduled within 5 business days of delivery.
              </AccordionSection>
            </div>

            {/* ⑥⑦ Guarantee badge + CTA + risk reversal */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-center gap-1.5">
                <ShieldIcon />
                <span className="text-[#C9A84C] text-xs font-light tracking-wide">
                  60-day guarantee &mdash; correct or refund
                </span>
              </div>
              <CardCTA tier="solution-map" label="Get the Solution Map — $1,497" onOpen={openModal} />
              <p className="text-center text-silver/40 font-light" style={{ fontSize: '12px' }}>
                Nothing charged if you cancel before submitting your intake.
              </p>
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
                  ['Method', "Automated — generated from your intake by BW Advisory’s diagnostic system", "Automated draft plus Brad Warburton’s personal review"],
                  ['Human review', 'None — stated plainly, here and in the report', 'Every report, before delivery'],
                  ['Call', 'None', '60 minutes with Brad, within 5 business days of delivery'],
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
            Both reports carry the same discipline. Verified tool data with the check date printed. Ranges
            with stated assumptions. No commissions from any vendor we recommend. The difference is depth
            and Brad&apos;s personal involvement &mdash; not quality of care.
          </p>

          <p className="text-silver/50 font-light text-sm italic">
            Savings figures in both reports are estimates presented as ranges, based on your intake answers
            and stated assumptions. They are not guarantees. Actual results depend on implementation and adoption.
          </p>
        </div>
      </section>

      {/* ── GUARANTEE ── */}
      <section className="py-16 px-6 w-full">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-white/6 to-white/2 border border-white/15 rounded-2xl p-8 md:p-12 space-y-5">
            <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Our guarantee</p>
            <p className="text-silver/85 font-light text-base md:text-lg leading-relaxed max-w-3xl">
              If a primary recommended tool in your report had been discontinued, or its published price had
              materially increased, before your report was generated &mdash; tell us. You choose the remedy:
              we correct and reissue the report, or refund the fee in full. Change-of-mind refunds are not
              offered once generation begins. Your rights under the Australian Consumer Law are not affected.
            </p>
          </div>
        </div>
      </section>

      {/* ── ACL DISCLOSURE STRIP ── */}
      <section className="py-8 px-6 w-full">
        <div className="max-w-5xl mx-auto border-t border-white/8 pt-8 space-y-3">
          <p className="text-silver/45 font-light text-xs leading-relaxed">
            The Snapshot Report is an automated assessment checked against BW Advisory&apos;s knowledge base
            at the moment of purchase. The verification date is printed in your report.
          </p>
          <p className="text-silver/45 font-light text-xs leading-relaxed">
            Savings figures in both reports are estimates presented as ranges, based on your intake answers
            and stated assumptions. They are not guarantees. Actual results depend on implementation and adoption.
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
            &mdash; scored result, no account required. Want a conversation first?{' '}
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
