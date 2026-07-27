import { Link, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';

const TIER_COPY = {
  snapshot: {
    heading: 'Your Snapshot Report is on its way.',
    body: 'Your intake link is in your inbox — should arrive within a minute. The intake is 13 questions and takes about ten minutes. Your report generates the moment you submit it.',
    sub: 'The Snapshot Report is an automated assessment built from your answers. The verification date is printed in your report.',
  },
  'solution-map': {
    heading: 'Your Solution Map purchase is confirmed.',
    body: 'Your intake link is in your inbox — should arrive within a minute. The intake is 19 questions. Your report will be delivered within 3 business days of your completed intake. Brad will review it personally before it reaches you. Your 30-minute call will be scheduled within 5 business days of delivery.',
    sub: null,
  },
  'solution-map-upgrade': {
    heading: 'Your upgrade to the Solution Map is confirmed.',
    body: 'Your Section E intake link is in your inbox. Your original thirteen answers are already on file — just six more questions. Your report will be delivered within 3 business days of completion. Brad will review it personally.',
    sub: null,
  },
};

const DEFAULT_COPY = {
  heading: 'Purchase confirmed.',
  body: 'Check your inbox for your next steps. If you don\'t see an email within a few minutes, check your spam folder or contact brad@bwadvisorysolutions.com.au.',
  sub: null,
};

const PurchaseConfirmed = () => {
  const [params] = useSearchParams();
  const tier = params.get('tier');
  const copy = TIER_COPY[tier] || DEFAULT_COPY;

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      <section className="flex-1 flex items-center justify-center px-6 pt-40 pb-24">
        <div className="max-w-lg w-full text-center space-y-8">
          <div className="w-16 h-16 border border-[#C9A84C] rounded-full flex items-center justify-center text-[#C9A84C] mx-auto">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="space-y-4">
            <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Confirmed</p>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white leading-snug">
              {copy.heading}
            </h1>
            <p className="text-silver/75 font-light text-base md:text-lg leading-relaxed">
              {copy.body}
            </p>
            {copy.sub && (
              <p className="text-silver/45 font-light text-sm italic">
                {copy.sub}
              </p>
            )}
          </div>

          <p className="text-silver/50 font-light text-sm">
            Questions? Email{' '}
            <a
              href="mailto:brad@bwadvisorysolutions.com.au"
              className="text-[#C9A84C] hover:underline"
            >
              brad@bwadvisorysolutions.com.au
            </a>
          </p>

          <Link
            to="/"
            className="inline-block border border-white/15 px-10 py-4 rounded-lg text-xs font-bold tracking-[0.25em] uppercase text-white hover:bg-white hover:text-[#0F172A] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            Return to homepage
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PurchaseConfirmed;
