import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const groups = [
  {
    label: "Stream 01",
    name: "AI Readiness",
    desc: "For allied health and healthcare practices, and professional services firms.",
    items: [
      {
        num: "01",
        badge: "AI Readiness Diagnostic",
        audience: "Allied health and healthcare practices · Professional services firms",
        duration: "5 min · 5 sections · 28 questions",
        desc: "Five sections. Five minutes. A scored result covering AI readiness, process optimisation opportunities, and security posture — with an opportunity estimate of what your gaps are costing you.",
        href: "/ai-readiness",
        internal: true,
        glyph: "neuralNet",
      },
    ]
  },
  {
    label: "Stream 02",
    name: "Strategic & Operational",
    desc: "Identify the gap between intent and execution.",
    items: [
      {
        num: "02",
        badge: "Strategic Diagnostic",
        audience: "CEO · Board · Senior Leadership",
        duration: "8 min · 10 questions",
        desc: "Maps the systemic gap between leadership intent and organisational delivery. Focuses on alignment, execution, and risk posture.",
        href: "https://portal.bwadvisorysolutions.com.au/diagnostic.html"
      },
      {
        num: "03",
        badge: "Operational Diagnostic",
        audience: "GM · Head of Operations · Delivery Lead",
        duration: "8 min · 10 questions",
        desc: "Surfaces the functional friction between tactical decisions and frontline capability across processes, systems, and accountability.",
        href: "https://portal.bwadvisorysolutions.com.au/operational-diagnostic.html"
      },
    ]
  },
  {
    label: "Stream 03",
    name: "Loss Intelligence & Investigations",
    desc: "Assess your retail crime defence and investigation capability.",
    items: [
      {
        num: "04",
        badge: "Loss Intelligence Diagnostic",
        audience: "GM · CEO · CFO",
        duration: "8 min · 10 questions",
        desc: "Assesses your capability to transform incident data into actionable loss intelligence. For leaders seeking to disrupt systemic retail crime and minimise exposure.",
        href: "https://portal.bwadvisorysolutions.com.au/loss-intelligence-diagnostic.html"
      },
      {
        num: "05",
        badge: "Investigations Capability Diagnostic",
        audience: "LP Manager · Head of Security · Risk Manager",
        duration: "8 min · 10 questions",
        desc: "Assesses the integrity of the investigation lifecycle from signal collection to defensible documentation and outcome.",
        comingSoon: true,
        ctaLabel: "Coming 2026"
      },
    ]
  }
];

const NeuralNetGlyph = () => (
  <svg
    className="w-24 h-14 text-[#C9A84C] shrink-0"
    viewBox="0 0 80 48"
    fill="none"
    aria-hidden="true"
  >
    <style>{`
      @keyframes nn-pulse-a {
        0%, 100% { opacity: 0.45; }
        50%      { opacity: 1; }
      }
      @keyframes nn-pulse-b {
        0%, 100% { opacity: 0.45; }
        50%      { opacity: 1; }
      }
      @keyframes nn-flow {
        from { stroke-dashoffset: 12; }
        to   { stroke-dashoffset: 0; }
      }
      .nn-out-a { animation: nn-pulse-a 2.4s ease-in-out infinite; }
      .nn-out-b { animation: nn-pulse-b 2.4s ease-in-out 1.2s infinite; }
      .nn-link  { stroke-dasharray: 2 4; animation: nn-flow 3s linear infinite; }
    `}</style>
    <g stroke="currentColor" strokeWidth="0.55" opacity="0.55" className="nn-link">
      <line x1="8"  y1="10" x2="40" y2="6"  />
      <line x1="8"  y1="10" x2="40" y2="18" />
      <line x1="8"  y1="10" x2="40" y2="30" />
      <line x1="8"  y1="10" x2="40" y2="42" />
      <line x1="8"  y1="24" x2="40" y2="6"  />
      <line x1="8"  y1="24" x2="40" y2="18" />
      <line x1="8"  y1="24" x2="40" y2="30" />
      <line x1="8"  y1="24" x2="40" y2="42" />
      <line x1="8"  y1="38" x2="40" y2="6"  />
      <line x1="8"  y1="38" x2="40" y2="18" />
      <line x1="8"  y1="38" x2="40" y2="30" />
      <line x1="8"  y1="38" x2="40" y2="42" />
      <line x1="40" y1="6"  x2="72" y2="18" />
      <line x1="40" y1="6"  x2="72" y2="32" />
      <line x1="40" y1="18" x2="72" y2="18" />
      <line x1="40" y1="18" x2="72" y2="32" />
      <line x1="40" y1="30" x2="72" y2="18" />
      <line x1="40" y1="30" x2="72" y2="32" />
      <line x1="40" y1="42" x2="72" y2="18" />
      <line x1="40" y1="42" x2="72" y2="32" />
    </g>
    <g fill="currentColor">
      <circle cx="8"  cy="10" r="1.7" opacity="0.85" />
      <circle cx="8"  cy="24" r="1.7" opacity="0.85" />
      <circle cx="8"  cy="38" r="1.7" opacity="0.85" />
      <circle cx="40" cy="6"  r="1.9" opacity="0.9" />
      <circle cx="40" cy="18" r="1.9" opacity="0.9" />
      <circle cx="40" cy="30" r="1.9" opacity="0.9" />
      <circle cx="40" cy="42" r="1.9" opacity="0.9" />
      <circle className="nn-out-a" cx="72" cy="18" r="2.6" />
      <circle className="nn-out-b" cx="72" cy="32" r="2.6" />
    </g>
  </svg>
);

const cardGlyph = (item) => {
  if (item.glyph === 'neuralNet') return <NeuralNetGlyph />;
  return null;
};

const DiagnosticCardBody = ({ item }) => (
  <>
    {!item.comingSoon && (
      <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/40 to-accent/20 rounded-3xl opacity-0 group-hover:opacity-50 transition-all duration-700 blur-lg"></div>
    )}
    <div className={`relative bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 md:p-14 lg:p-16 transition-all duration-500 flex flex-col h-full ${item.comingSoon ? 'opacity-70' : 'group-hover:border-[#C9A84C]/50 group-hover:bg-white/22'}`}>
      <div className="flex items-start justify-between mb-10 gap-6">
        <div className="space-y-3">
          <p className="text-[#C9A84C] font-mono tracking-[0.2em] text-xs uppercase font-bold">{item.badge}</p>
          <span className="text-silver/70 font-light text-sm font-mono tracking-[0.15em]">{item.duration}</span>
        </div>
        {cardGlyph(item)}
      </div>

      <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-8 leading-tight flex-1">
        {item.desc}
      </h3>

      <div className="flex items-end justify-between pt-8 border-t border-accent/15 mt-auto">
        <p className="text-silver/70 text-xs font-mono tracking-widest uppercase font-bold">{item.audience}</p>
        {item.comingSoon ? (
          <span className="text-silver/60 font-mono text-xs tracking-[0.15em] uppercase font-bold">
            {item.ctaLabel || "Coming 2026"}
          </span>
        ) : (
          <span className="flex items-center gap-3 text-[#C9A84C] font-bold text-sm tracking-[0.15em] uppercase group-hover:gap-4 transition-all duration-300">
            <span>{item.ctaLabel || "Start"}</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        )}
      </div>
    </div>
  </>
);

const DiagnosticCard = ({ item }) => {
  const className = "group relative overflow-hidden h-full flex flex-col";
  if (item.comingSoon) {
    return (
      <div className={className} aria-disabled="true">
        <DiagnosticCardBody item={item} />
      </div>
    );
  }
  if (item.internal) {
    return (
      <Link to={item.href} className={className}>
        <DiagnosticCardBody item={item} />
      </Link>
    );
  }
  return (
    <a href={item.href} className={className}>
      <DiagnosticCardBody item={item} />
    </a>
  );
};

const Diagnostics = () => (
  <div className="bg-primary min-h-screen">
    {/* ── HERO ── */}
    <section className="relative pt-40 md:pt-48 pb-12 md:pb-16 px-6 w-full z-10 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#0369A1]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-silver/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        <div className="space-y-8">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Diagnostic Assessment</p>
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]">
            Start with what's true.
          </h1>
          <p className="text-2xl md:text-3xl text-silver/75 font-light leading-relaxed max-w-5xl">
            The gap doesn't close until you know exactly where it is. <span className="text-white font-semibold">Five diagnostics. Three streams.</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-8 text-silver/60 text-sm font-light">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
            5 proprietary diagnostics
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
            Personally reviewed
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
            3 stream assessment
          </span>
        </div>
      </div>
    </section>

    {/* ── DIAGNOSTIC STREAMS ── */}
    <section className="pt-12 md:pt-16 pb-24 px-6 w-full relative z-10">
      <div className="max-w-7xl mx-auto space-y-20">
        {groups.map((group) => (
          <div key={group.name} className="space-y-12">
            {/* Stream Header */}
            <div className="max-w-4xl space-y-6">
              <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">{group.label}</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">{group.name}</h2>
              <p className="text-xl md:text-2xl text-silver/75 font-light">{group.desc}</p>
            </div>

            {/* Diagnostic Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
              {group.items.map((item) => (
                <DiagnosticCard key={item.badge} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ── METHODOLOGY ── */}
    <section className="py-28 px-6 w-full relative z-10 bg-gradient-to-b from-primary to-[#051020] border-t border-accent/10">
      <div className="max-w-5xl mx-auto text-center space-y-10">
        <div className="space-y-6">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Rigorous Process</p>
          <h2 className="font-display font-bold text-5xl md:text-7xl text-white tracking-tight">
            Every Assessment is Reviewed Personally
          </h2>
        </div>
        <p className="text-xl md:text-2xl text-silver/75 font-light leading-relaxed">
          No automated output. No templated responses. Each diagnostic receives a specific, written capability assessment delivered within 24 hours by Brad — <span className="text-white font-semibold">not a machine.</span>
        </p>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="py-40 px-6 w-full relative z-10 bg-primary">
      <div className="max-w-5xl mx-auto">
        <div className="relative group overflow-hidden">
          <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/40 to-accent/20 rounded-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 blur-xl"></div>
          <div className="relative bg-gradient-to-br from-white/15 via-white/12 to-white/10 backdrop-blur-xl border border-accent/30 group-hover:border-[#C9A84C]/60 rounded-3xl p-14 lg:p-20 transition-all duration-500 group-hover:bg-white/20">
            <div className="space-y-8 text-center">
              <h3 className="font-display font-bold text-4xl md:text-6xl text-white">
                Ready to Understand Your Exposure?
              </h3>
              <p className="text-lg md:text-2xl text-silver/75 font-light">
                Direct engagement. No proposal until we've talked.
              </p>
              <a
                href="https://portal.bwadvisorysolutions.com.au/diagnostic.html"
                className="group/btn relative overflow-hidden bg-[#C9A84C] px-12 md:px-16 py-5 md:py-6 rounded-lg text-[#0F172A] font-bold text-sm md:text-base hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase inline-flex items-center justify-center gap-4 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10 cursor-pointer"
              >
                Start Your Assessment
                <svg className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Diagnostics;
