import Footer from '../components/Footer';

const intelligenceStages = [
  {
    name: 'Signal Detection',
    desc: 'Define data sources and collection protocols. Build real-time dashboards that surface anomalies before loss occurs.',
  },
  {
    name: 'Intelligence Analysis',
    desc: 'Create analysis templates and decision trees your team uses daily. Convert isolated signals into organised patterns.',
  },
  {
    name: 'Response Initiation',
    desc: 'Design response thresholds. Define when signals trigger investigation, prevention, or police referral.',
  },
  {
    name: 'Continuous Learning',
    desc: 'Build feedback loops from outcomes back into detection. Monthly reporting tracks system performance and hardens capability.',
  },
];

const LossIntelligence = () => (
  <div className="bg-primary min-h-screen">
    {/* PAGE HERO */}
    <section className="relative pt-48 pb-24 px-8 w-full z-10 text-center">
      <div className="max-w-7xl mx-auto space-y-14">
        <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase font-bold">Intelligence Capability</p>
        <div className="mx-auto max-w-6xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1] mb-14">
            Build the capability to see,<br />
            <span className="font-serif italic text-[#C9A84C] text-4xl md:text-5xl lg:text-6xl block mt-4">investigate, and act.</span>
          </h1>
          <p className="text-2xl md:text-3xl text-silver/75 font-light leading-relaxed max-w-5xl mx-auto">
            Modern loss prevention is an <span className="text-white font-semibold">intelligence function</span>. I diagnose your current state, design and build the framework with your team, and hand over a fully operational intelligence capability that your organisation owns and controls.
          </p>
        </div>
      </div>
    </section>

    {/* THREE PHASES */}
    <section className="pb-44 px-8 w-full relative z-10 bg-primary">
      <div className="max-w-[1400px] mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-44">
          <div className="group h-full">
            <div className="bg-white/[0.04] rounded-lg border border-white/10 border-t-2 border-t-[#C9A84C] group-hover:border-white/15 group-hover:bg-white/[0.06] p-10 flex flex-col h-full transition-all duration-300">
              <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase mb-6 font-semibold">Phase 01</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-tight">Diagnose.</h3>
              <p className="text-silver/80 font-light text-base leading-[1.6] flex-grow">
                Operational assessment across your loss landscape, risk governance, and intelligence pipeline. We identify the gaps where organised threat actors are currently operating undetected.
              </p>
            </div>
          </div>

          <div className="group h-full">
            <div className="bg-white/[0.04] rounded-lg border border-white/10 border-t-2 border-t-[#C9A84C] group-hover:border-white/15 group-hover:bg-white/[0.06] p-10 flex flex-col h-full transition-all duration-300">
              <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase mb-6 font-semibold">Phase 02</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-tight">Design.</h3>
              <p className="text-silver/80 font-light text-base leading-[1.6] flex-grow">
                Build the intelligence-led loss framework with you. We create the SOPs, analysis templates, decision trees, and signal collection protocols. You own the capability when we're done.
              </p>
            </div>
          </div>

          <div className="group h-full">
            <div className="bg-white/[0.04] rounded-lg border border-white/10 border-t-2 border-t-[#C9A84C] group-hover:border-white/15 group-hover:bg-white/[0.06] p-10 flex flex-col h-full transition-all duration-300">
              <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase mb-6 font-semibold">Phase 03</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-tight">Embed.</h3>
              <p className="text-silver/80 font-light text-base leading-[1.6] flex-grow">
                Embed the capability into your operation. We train your teams in intelligence analysis and investigation doctrine, align your leadership to the intelligence-led model, and hand over a fully independent intelligence function. Optional: ongoing advisory support for complex cases.
              </p>
            </div>
          </div>
        </div>

        {/* DIAGNOSTICS ENTRY POINT */}
        <div className="border-t border-white/10 pt-36 mb-4">
          <p className="text-[#C9A84C] font-bold tracking-[0.2em] text-xs mb-8 uppercase">Capability Assessment</p>
          <div className="mb-20">
            <h2 className="font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] uppercase">Locate your organisational exposures.</h2>
          </div>
          <p className="text-2xl md:text-3xl text-silver/75 font-light leading-relaxed max-w-6xl mb-24">
            Two specialised diagnostics. Eight minutes each. We assess your governance posture and your investigative capability to determine exactly where your operation would fail under scrutiny.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-20">
            <a
              href="https://portal.bwadvisorysolutions.com.au/diagnostic.html"
              className="group relative overflow-hidden bg-[#C9A84C] px-14 py-5 rounded-lg text-[#0F172A] font-bold text-sm hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase flex items-center justify-center gap-3 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10 cursor-pointer"
            >
              Loss Intelligence Diagnostic
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </a>
            <a
              href="https://portal.bwadvisorysolutions.com.au/diagnostic.html"
              className="group relative overflow-hidden border border-accent/40 hover:border-[#C9A84C]/60 text-white font-bold px-14 py-5 rounded-lg tracking-[0.15em] uppercase text-sm hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
            >
              Investigations Diagnostic
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </a>
          </div>
        </div>

      </div>
    </section>

    {/* ── THE INTELLIGENCE SYSTEM ── */}
    <section className="py-44 w-full relative z-10 bg-[#0A1E3D] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
        <div className="mb-32 space-y-8">
          <p className="text-gold font-semibold tracking-[0.4em] uppercase text-xs">What You'll Build</p>
          <div className="pl-12 border-l-2 border-gold/30">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight uppercase leading-[0.9]">Four Pillars of Intelligence-Led Loss Prevention.</h2>
          </div>
          <p className="text-xl md:text-2xl text-silver/75 font-light leading-relaxed max-w-4xl">
            The intelligence framework we design and embed has four core elements. Each is built into your operation during the engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {intelligenceStages.map((stage, i) => (
            <div key={i} className="group h-full">
              <div className="bg-white/[0.06] rounded-lg border border-white/10 border-l-2 border-l-[#C9A84C] group-hover:border-white/15 group-hover:bg-white/[0.08] p-10 flex flex-col h-full transition-all duration-300">
                <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase mb-6 font-semibold">{stage.name}</p>
                <p className="text-silver/80 font-light text-base leading-[1.6] flex-grow">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default LossIntelligence;
