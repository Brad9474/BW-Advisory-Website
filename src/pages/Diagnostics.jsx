import Footer from '../components/Footer';

const groups = [
  {
    label: "Practice Area 01",
    name: "General Advisory",
    desc: "Strategic and operational breakdowns. Not industry-specific.",
    items: [
      {
        num: "01",
        badge: "Strategic Diagnostic",
        audience: "CEO · Board · Senior Leadership",
        duration: "8 min · 10 questions",
        desc: "Maps the gap between what your leadership intends and what the organisation is delivering — across strategy alignment, execution, decision-making, and capability.",
        href: "https://portal.bwadvisorysolutions.com.au/diagnostic.html",
      },
      {
        num: "02",
        badge: "Operational Diagnostic",
        audience: "GM · Head of Operations · Delivery Lead",
        duration: "8 min · 10 questions",
        desc: "Surfaces the friction between what leaders decide and what frontline teams can actually deliver — across processes, capability, systems, and accountability structures.",
        href: "https://portal.bwadvisorysolutions.com.au/operational-diagnostic.html",
      },
    ]
  },
  {
    label: "Practice Area 02",
    name: "Loss Intelligence Advisory",
    desc: "For retail organisations building structured loss and investigations capability.",
    items: [
      {
        num: "03",
        badge: "Loss Intelligence Diagnostic",
        audience: "GM · CEO · CFO",
        duration: "8 min · 10 questions",
        desc: "Identifies gaps in loss governance, risk visibility, and organisational accountability. For the senior leader who wants a clear picture of where the capability stands — and what it would take to strengthen it.",
        href: "https://portal.bwadvisorysolutions.com.au/loss-intelligence-diagnostic.html",
      },
      {
        num: "04",
        badge: "Investigations Capability Diagnostic",
        audience: "LP Manager · Head of Security · Operations Manager",
        duration: "8 min · 10 questions",
        desc: "Assesses how well your organisation collects, connects, and acts on incident data — and whether the investigations you run would stand up when it matters.",
        href: "https://portal.bwadvisorysolutions.com.au/investigations-diagnostic.html",
      },
    ]
  }
];

const DiagnosticCard = ({ item }) => (
  <a
    href={item.href}
    className="group relative block overflow-hidden rounded-2xl bg-[#112850] border border-[#1B6EC2]/20 hover:border-accent transition-all duration-500 hover:shadow-[0_12px_50px_rgba(27,110,194,0.2)]"
  >
    {/* Ghost number — depth element */}
    <div className="absolute bottom-0 right-0 text-[11rem] md:text-[14rem] font-bold text-surface leading-none select-none pointer-events-none opacity-[0.025] group-hover:opacity-[0.055] transition-opacity duration-700 translate-x-3 translate-y-6">
      {item.num}
    </div>

    <div className="relative z-10 p-8 md:p-12">

      {/* Top metadata row */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-accent font-bold tracking-[0.2em] text-sm uppercase">{item.badge}</span>
        <span className="text-surface/55 text-sm tracking-widest font-light">{item.duration}</span>
      </div>

      {/* Core description — this is the card's headline */}
      <p className="text-surface/85 text-xl md:text-2xl font-light leading-[1.55] mb-10 max-w-[600px]">
        {item.desc}
      </p>

      {/* Bottom row — audience + CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-silver/[0.08]">
        <p className="text-surface/60 text-sm font-light tracking-[0.15em] uppercase">{item.audience}</p>
        <span className="flex items-center gap-2 text-accent font-bold text-sm tracking-[0.2em] uppercase group-hover:gap-3 transition-all duration-300">
          Begin assessment
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </div>
    </div>
  </a>
);

const Diagnostics = () => (
  <>
    {/* ── HERO ── */}
    <section className="relative pt-40 pb-16 px-6 w-full z-10">
      <div className="max-w-5xl mx-auto">

        <p className="text-accent/70 font-bold tracking-[0.25em] text-sm uppercase mb-10">
          Before the first conversation
        </p>

        <h1 className="font-light text-[clamp(2rem,4vw,3.5rem)] text-surface tracking-tight leading-[1.1] mb-10">
          The gap doesn't close until you know{' '}
          <em className="font-serif italic text-accent">exactly</em>{' '}
          where it is.
        </h1>

        {/* Metadata strip */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-surface/65 text-base font-light">
          {['4 diagnostics', '2 practice areas', '8 minutes each'].map((item, i, arr) => (
            <span key={item} className="flex items-center gap-6">
              {item}
              {i < arr.length - 1 && <span className="inline-block w-px h-3 bg-silver/20" />}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* ── DIAGNOSTIC GROUPS ── */}
    <section className="pb-12 px-6 w-full relative z-10">
      <div className="max-w-5xl mx-auto space-y-24">

        {groups.map((group, gi) => (
          <div key={group.name}>

            {/* Group header */}
            <div className="flex items-end gap-5 mb-10 pb-6 border-b border-silver/[0.08]">
              <div>
                <p className="text-accent font-bold tracking-[0.25em] text-sm uppercase mb-2">{group.label}</p>
                <h2 className="font-light text-3xl md:text-4xl text-surface tracking-tight leading-tight">{group.name}</h2>
              </div>
              <p className="text-surface/60 text-sm font-light leading-snug pb-1 hidden md:block whitespace-nowrap">{group.desc}</p>
            </div>

            {/* Cards */}
            <div className="space-y-5">
              {group.items.map((item) => (
                <DiagnosticCard key={item.badge} item={item} />
              ))}
            </div>

          </div>
        ))}

      </div>
    </section>

    {/* ── PERSONAL REVIEW CALLOUT ── */}
    <section className="py-16 px-6 w-full relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start gap-6">
          <div className="w-px h-16 bg-accent flex-shrink-0 mt-1" />
          <div>
            <p className="text-surface/70 font-light text-lg md:text-xl leading-relaxed max-w-2xl">
              Every submission is reviewed before the report is sent. No automated output — a specific written assessment, delivered within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="py-20 px-6 w-full bg-[#0A1E3D] border-t border-silver/[0.06] relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <h3 className="font-light text-2xl md:text-3xl text-surface mb-2">Ready to talk directly?</h3>
          <p className="text-surface/65 font-light text-base">30 minutes. No proposal until we have talked.</p>
        </div>
        <a
          href="https://portal.bwadvisorysolutions.com.au/intake.html"
          className="group flex-shrink-0 relative overflow-hidden bg-accent px-10 py-4 rounded-full text-white font-bold text-sm hover:bg-[#155A9E] border border-white/20 transition-all duration-500 tracking-[0.2em] uppercase flex items-center gap-4 shadow-[0_4px_16px_rgba(27,110,194,0.25)] hover:shadow-[0_6px_24px_rgba(27,110,194,0.4)] ring-1 ring-accent/50"
        >
          Request a scoping session
          <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </section>

    <Footer />
  </>
);

export default Diagnostics;
