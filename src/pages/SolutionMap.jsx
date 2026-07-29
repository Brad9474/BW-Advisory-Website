import { useState, useRef, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import posthog from 'posthog-js';
import Footer from '../components/Footer';

const COMMAND_CENTRE_URL = 'https://command.bwadvisorysolutions.com.au';
const CONSENT_VERSION = 'v1-2026-07-21';
const TERMS_VERSION = 'v1.1-2026-07-27';
const PURCHASE_ENABLED = import.meta.env.VITE_PURCHASE_SURFACE_ENABLED === 'true';

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

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

const INCLUDES = [
  '37-question intake — 22 on file if upgrading from the Snapshot, plus 15 strategic questions',
  'Named tools matched to your priority workflows — verified pricing, AU residency & retention notes, check date printed',
  'Brad Warburton personally reviews your report before delivery',
  'Deep implementation plan per opportunity, plus priority matrix across all',
  '60-minute call with Brad, within 5 business days of delivery',
  '30-day email Q&A window — bring any question from your report',
];

const SolutionMap = () => {
  const [searchParams] = useSearchParams();
  const emailFromParam = searchParams.get('email') || '';

  const [email, setEmail] = useState(emailFromParam);
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [consented, setConsented] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // True when the customer arrived via the Snapshot delivery email upgrade link
  const isUpgrade = !!emailFromParam;

  const continuedClicked = useRef(false);
  const canSubmit = isValidEmail(email) && consented;

  useEffect(() => {
    posthog.capture('solution_map_page_viewed', { has_email_param: isUpgrade });
  }, [isUpgrade]);

  const handleEmailBlur = () => {
    if (email.trim() && !isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
    if (email.trim()) {
      const domain = email.trim().split('@')[1] || '';
      posthog.capture('checkout_email_entered', { tier: 'solution-map', email_domain: domain });
    }
  };

  const handleMarketingChange = (e) => {
    const checked = e.target.checked;
    setMarketingOptIn(checked);
    posthog.capture(
      checked ? 'checkout_marketing_consent_ticked' : 'checkout_marketing_consent_unticked',
      { tier: 'solution-map' },
    );
  };

  const confirm = async () => {
    if (!canSubmit || loading) return;
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    continuedClicked.current = true;
    posthog.capture('checkout_continue_clicked', {
      tier: 'solution-map',
      has_phone: phone.trim().length > 0,
      marketing_opt_in: marketingOptIn,
      source: 'solution_map_page',
      is_upgrade: isUpgrade,
    });
    setLoading(true);
    setError(null);
    const body = {
      email: email.trim(),
      marketingOptIn,
      consentVersion: CONSENT_VERSION,
      termsVersion: TERMS_VERSION,
      consentAt: new Date().toISOString(),
      sourceSurface: 'solution_map_page',
    };
    if (phone.trim()) body.phone = phone.trim().slice(0, 30);
    // TODO: Once the Stripe Solution Map product has a discounted upgrade price or coupon,
    // replace this metadata flag with the proper credit mechanism. For now Brad reconciles
    // the $497 Snapshot credit manually for customers flagged as upgrade=true.
    if (isUpgrade) body.upgradeSource = 'snapshot_upgrade';
    try {
      const res = await fetch(`${COMMAND_CENTRE_URL}/api/checkout/solution-map`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(res.status);
      const { url } = await res.json();
      posthog.capture('checkout_initiated', { tier: 'solution-map', source: 'solution_map_page' });
      window.location.href = url;
    } catch {
      setLoading(false);
      setError('Something went wrong. Please try again or email brad@bwadvisorysolutions.com.au.');
    }
  };

  const inputBase =
    'w-full bg-[#0A1120] border rounded-lg px-4 py-3 text-sm text-white placeholder:text-silver/30 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/60 focus:border-[#C9A84C]/40';

  return (
    <div className="relative z-10 min-h-screen">

      {/* ── HERO ── */}
      <section className="pt-40 md:pt-52 pb-12 px-6 w-full">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#C9A84C] text-[#0F172A] text-xs font-mono font-bold tracking-[0.15em] uppercase">
            Personally reviewed by Brad
          </span>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-white tracking-tight leading-[1.05]">
            AI Solution Map
          </h1>
          <p className="text-silver/65 font-light text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Brad&apos;s personal review of your business — named tools, verified pricing, a full
            implementation plan, and 60 minutes with him on a call.
          </p>
          <div className="pt-2 space-y-2">
            <p className="font-display font-bold text-6xl text-white tabular-nums leading-none">
              $1,497
            </p>
            <p className="text-silver/45 text-sm font-light">incl. GST &mdash; one-time</p>
          </div>
          {isUpgrade && (
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C9A84C]/12 border border-[#C9A84C]/30 text-[#C9A84C] text-sm font-light leading-snug">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Your $497 Snapshot fee credits in full &mdash; upgrade within 60 days of purchase
            </div>
          )}
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="py-12 px-6 w-full">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-2xl p-8 space-y-6"
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(201,168,76,0.25)',
            }}
          >
            <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase font-bold">
              What you get
            </p>
            <ul className="space-y-3">
              {INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-silver/80 font-light text-sm leading-snug">{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-white/8 space-y-1.5">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#C9A84C]/12 border border-[#C9A84C]/25 text-[#C9A84C] text-xs font-mono font-bold tracking-[0.15em] uppercase">
                Delivered in 3 business days
              </span>
              <p className="text-silver/50 font-light text-xs leading-relaxed">
                Within a minute of purchase you get your intake link. Your original 22 Snapshot
                questions are on file &mdash; you only answer the 15 new strategic questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHECKOUT FORM ── */}
      <section className="py-12 px-6 w-full">
        <div className="max-w-lg mx-auto">
          <div className="bg-[#0F1929] border border-white/15 rounded-2xl p-8 md:p-10 space-y-5 shadow-2xl">
            <h2 className="font-display font-bold text-xl text-white">
              {isUpgrade ? 'Upgrade to Solution Map' : 'Get the Solution Map'}
            </h2>

            {isUpgrade && (
              <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/20">
                <svg className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[#C9A84C] text-xs font-light leading-relaxed">
                  $497 credit will be applied to your invoice. Brad reconciles Snapshot upgrades
                  individually &mdash; you will be charged the net amount of $1,000.
                </p>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="sm-email" className="block text-silver/60 text-xs font-mono tracking-[0.12em] uppercase">
                Where should we send your intake link?
              </label>
              <input
                id="sm-email"
                type="email"
                autoFocus={!isUpgrade}
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
              <label htmlFor="sm-phone" className="block text-silver/40 text-xs font-mono tracking-[0.12em] uppercase">
                Phone <span className="normal-case tracking-normal font-light">(optional)</span>
              </label>
              <input
                id="sm-phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.slice(0, 30))}
                placeholder="+61 4XX XXX XXX"
                maxLength={30}
                style={{ transition: 'border-color 150ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 150ms cubic-bezier(0.16, 1, 0.3, 1)' }}
                className={`${inputBase} border-white/10`}
              />
              <p className="text-silver/35 text-xs font-light leading-relaxed">
                We may call this number about your unfinished purchase &mdash; not used for marketing.
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
                I understand the Solution Map is generated from my answers and personally reviewed by Brad
                Warburton before delivery, that tool prices and availability can change and are checked as
                at the date in my report, and that return figures are estimates based on stated assumptions.
                My rights under the Australian Consumer Law are not affected.
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

            {PURCHASE_ENABLED ? (
              <button
                type="button"
                onClick={confirm}
                disabled={!canSubmit || loading}
                style={{ transition: 'all 150ms cubic-bezier(0.16, 1, 0.3, 1)' }}
                className={[
                  'w-full px-8 py-4 rounded-lg font-bold text-sm tracking-[0.15em] uppercase focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60 focus-visible:outline-none',
                  canSubmit && !loading
                    ? 'bg-[#C9A84C] text-[#0F172A] hover:bg-[#E0BC60] shadow-[0_8px_24px_rgba(201,168,76,0.3)] cursor-pointer'
                    : 'bg-white/10 text-silver/40 cursor-not-allowed',
                ].join(' ')}
              >
                {loading
                  ? 'Opening secure checkout…'
                  : isUpgrade
                    ? 'Upgrade to Solution Map — $1,497'
                    : 'Get the Solution Map — $1,497'}
              </button>
            ) : (
              <button
                type="button"
                disabled
                title="Purchase not yet available"
                className="w-full px-8 py-4 rounded-lg font-bold text-sm tracking-[0.15em] uppercase bg-white/8 text-silver/35 cursor-not-allowed border border-white/10"
              >
                {isUpgrade ? 'Upgrade to Solution Map — $1,497' : 'Get the Solution Map — $1,497'}
              </button>
            )}

            <p className="text-center text-silver/40 font-light" style={{ fontSize: '12px' }}>
              Nothing charged if you cancel before submitting your intake.
            </p>
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ── */}
      <section className="py-16 px-6 w-full">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-white/6 to-white/2 border border-white/15 rounded-2xl p-8 md:p-10 space-y-5">
            <div className="flex items-center gap-2">
              <ShieldIcon />
              <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">
                Our guarantee
              </p>
            </div>
            <p className="text-silver/85 font-light text-base leading-relaxed">
              If a primary recommended tool in your report had been discontinued, or its published
              price had materially increased, before your report was generated &mdash; tell us. You
              choose the remedy: we correct and reissue the report, or refund the fee in full.
              Change-of-mind refunds are not offered once generation begins. Your rights under the
              Australian Consumer Law are not affected.
            </p>
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY FOOTER ── */}
      <section className="py-12 px-6 w-full">
        <div className="max-w-3xl mx-auto">
          <div className="border-l-2 border-[#C9A84C]/40 pl-6 space-y-2">
            <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Built by Brad Warburton&apos;s methodology</p>
            <p className="text-silver/65 font-light text-base leading-relaxed">
              Both reports carry the same discipline: verified tool data with the check date printed,
              ranges with stated assumptions, no commissions from any vendor we recommend. The
              Solution Map adds Brad&apos;s personal involvement &mdash; not a different quality of
              care, a different depth of it.
            </p>
          </div>
        </div>
      </section>

      {/* ── QUIET CLOSE ── */}
      <section className="py-12 px-6 w-full">
        <div className="max-w-3xl mx-auto text-center border-t border-white/8 pt-12">
          <p className="text-silver/60 font-light text-base leading-relaxed">
            Want to compare both reports?{' '}
            <Link to="/pricing" className="text-[#C9A84C] hover:underline">
              See the full pricing page &rarr;
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SolutionMap;
