import Footer from '../components/Footer';

const groups = [
  {
    label: "Stream 01",
    name: "Strategic & Operational",
    desc: "Identify the gap between intent and execution.",
    items: [
      {
        num: "01",
        badge: "Strategic Diagnostic",
        audience: "CEO · Board · Senior Leadership",
        duration: "8 min · 10 questions",
        desc: "Maps the systemic gap between leadership intent and organisational delivery. Focuses on alignment, execution, and risk posture.",
        href: "https://portal.bwadvisorysolutions.com.au/diagnostic.html"
      },
      {
        num: "02",
        badge: "Operational Diagnostic",
        audience: "GM · Head of Operations · Delivery Lead",
        duration: "8 min · 10 questions",
        desc: "Surfaces the functional friction between tactical decisions and frontline capability across processes, systems, and accountability.",
        href: "https://portal.bwadvisorysolutions.com.au/diagnostic.html"
      },
    ]
  },
  {
    label: "Stream 02",
    name: "Loss Intelligence & Investigations",
    desc: "Assess your retail crime defence capability.",
    items: [
      {
        num: "03",
        badge: "Loss Governance Diagnostic",
        audience: "GM · CEO · CFO",
        duration: "8 min · 10 questions",
        desc: "Identifies breakdowns in loss governance and risk visibility. For senior leaders who require a clear picture of organisational exposure.",
        href: "https://portal.bwadvisorysolutions.com.au/diagnostic.html"
      },
      {
        num: "04",
        badge: "Investigations Capability Diagnostic",
        audience: "LP Manager · Head of Security · Ops Manager",
        duration: "8 min · 10 questions",
        desc: "Assesses the integrity of the investigation lifecycle from signal collection to defensible documentation and outcome.",
        href: "https://portal.bwadvisorysolutions.com.au/diagnostic.html"
      },
    ]
  }
];

const DiagnosticCard = ({ item }) => (
  <a
    href={item.href}
    className="group relative overflow-hidden"
  >
    <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/40 to-accent/20 rounded-3xl opacity-0 group-hover:opacity-50 transition-all duration-700 blur-lg"></div>
    <div className="relative bg-gradient-to-br from-white/12 via-white/6 to-white/3 backdrop-blur-sm border border-white/20 group-hover:border-[#C9A84C]/50 rounded-3xl p-10 md:p-14 lg:p-16 transition-all duration-500 group-hover:bg-white/14">
      <div className="flex items-start justify-between mb-10">
        <div className="space-y-3">
          <p className="text-[#C9A84C] font-mono tracking-[0.2em] text-xs uppercase font-bold">{item.badge}</p>
          <span className="text-silver/70 font-light text-sm font-mono tracking-[0.15em]">{item.duration}</span>
        </div>
      </div>

      <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-8 leading-tight">
        {item.desc}
      </h3>

      <div className="flex items-end justify-between pt-8 border-t border-accent/15">
        <p className="text-silver/70 text-xs font-mono tracking-widest uppercase font-bold">{item.audience}</p>
        <span className="flex items-center gap-3 text-[#C9A84C] font-bold text-sm tracking-[0.15em] uppercase group-hover:gap-4 transition-all duration-300">
          <span>Start</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </div>
    </div>
  </a>
);

const Diagnostics = () => (
  <div className="bg-primary min-h-screen">
    {/* ── HERO ── */}
    <section className="relative py-40 md:py-48 px-6 w-full z-10 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#0369A1]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-silver/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        <div className="space-y-8">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase font-bold">Diagnostic Assessment</p>
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]">
            Know Your Exposure
          </h1>
          <p className="text-2xl md:text-3xl text-silver/75 font-light leading-relaxed max-w-5xl">
            The gap doesn't close until you know exactly where it is. <span className="text-white font-semibold">Four diagnostics. Two streams. Eight minutes each.</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-8 text-silver/60 text-sm font-light">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
            Proprietary diagnostics
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
            Personally reviewed
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
            24-hour turnaround
          </span>
        </div>
      </div>
    </section>

    {/* ── DIAGNOSTIC STREAMS ── */}
    <section className="py-32 px-6 w-full relative z-10">
      <div className="max-w-7xl mx-auto space-y-24">
        {groups.map((group) => (
          <div key={group.name} className="space-y-12">
            {/* Stream Header */}
            <div className="max-w-4xl space-y-6">
              <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase font-bold">{group.label}</p>
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
    <section className="py-40 px-6 w-full relative z-10 bg-gradient-to-b from-primary to-[#051020] border-t border-accent/10">
      <div className="max-w-5xl mx-auto text-center space-y-10">
        <div className="space-y-6">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase font-bold">Rigorous Process</p>
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
          <div className="relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-xl border border-accent/30 group-hover:border-[#C9A84C]/60 rounded-3xl p-14 lg:p-20 transition-all duration-500 group-hover:bg-white/12">
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
