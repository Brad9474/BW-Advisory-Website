import Footer from '../components/Footer';

const provedStages = [
  {
    letter: 'P',
    name: 'Prepare',
    desc: 'Plan the investigation approach.',
  },
  {
    letter: 'R',
    name: 'Review',
    desc: 'Triage: investigate, record, or refer.',
  },
  {
    letter: 'O',
    name: 'Outline',
    desc: 'Define strategy and scope.',
  },
  {
    letter: 'V',
    name: 'Verify',
    desc: 'Confirm facts with evidence.',
  },
  {
    letter: 'E',
    name: 'Evaluate',
    desc: 'Assess findings and evidence quality.',
  },
  {
    letter: 'D',
    name: 'Document',
    desc: 'Close the loop. Feed findings back.',
  },
];


const GroundTruth = () => (
  <div className="bg-primary min-h-screen">
    {/* ── HERO ── */}
    <section className="relative pt-48 pb-24 px-8 w-full z-10 text-center">
      <div className="max-w-7xl mx-auto space-y-14">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1] mb-14">
            Investigations that are<br />
            <span className="font-serif italic text-[#C9A84C] text-4xl md:text-5xl lg:text-6xl block mt-4">proven and defensible.</span>
          </h1>
          <p className="text-2xl md:text-3xl text-silver/75 font-light leading-relaxed max-w-5xl mx-auto">
            PROVED is BW Advisory Solutions' investigations framework. A <span className="text-white font-semibold">disciplined, six-stage protocol</span> designed to close the gap between strategic intent and frontline execution.
          </p>
        </div>
      </div>
    </section>

    {/* ── THE DIFFERENTIATOR ── */}
    <section className="pb-44 px-8 w-full relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">

          <div className="space-y-12 text-white/70 font-light text-2xl leading-relaxed">
            <p>
              Most retail risk functions are reactive — responding to incidents after the damage is done. PROVED changes the fundamental posture of the organisation from response to detection and prevention.
            </p>
            <p>
              Built on 30 years of operational command in law enforcement, this framework applies the same evidentiary rigour used in complex criminal investigations to the commercial context. It is about accuracy, accountability, and proven outcomes.
            </p>
            <p>
              By establishing a single, unified protocol, we ensure that every investigation is conducted to a standard that withstands civil, disciplinary, or police scrutiny.
            </p>
          </div>

          <div className="bg-white/[0.04] rounded-lg border border-white/10 p-10">
            <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase mb-8 font-semibold">Systemic Failures We Address</p>
            <div className="space-y-6">
              {[
                'Inconsistent investigation standards across the organisation',
                'Intelligence siloing between disconnected systems',
                'Failure to document decisions to a defensible standard',
                'Lack of a feedback loop between investigation and detection',
                'Operational friction that delays response to emerging threats',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full flex-shrink-0 mt-2" />
                  <p className="text-silver/80 font-light text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── THE PROVED MODEL ── */}
    <section className="py-44 w-full relative z-10 bg-[#0A1E3D] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
        <div className="mb-32 space-y-8">
          <p className="text-gold font-semibold tracking-[0.4em] uppercase text-xs">Investigations Protocol</p>
          <div className="pl-12 border-l-2 border-gold/30">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight uppercase leading-[0.9]">The PROVED Model.</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {provedStages.map((stage) => (
            <div key={stage.letter} className="group h-full">
              <div className="bg-white/[0.06] rounded-lg border border-white/10 border-l-2 border-l-[#C9A84C] group-hover:border-white/15 group-hover:bg-white/[0.08] p-10 flex flex-col h-full transition-all duration-300">
                <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase mb-6 font-semibold">{stage.name}</p>
                <p className="text-silver/80 font-light text-base leading-[1.6] flex-grow">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

{/* ── CTA ── */}
    <section className="py-48 px-8 w-full bg-[#0A1E3D] border-t border-white/5 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 md:gap-20">
        <div className="text-center md:text-left space-y-6">
          <h3 className="text-5xl md:text-6xl font-bold text-white tracking-tight uppercase">Ready to talk capability?</h3>
          <p className="text-silver/75 text-xl md:text-2xl font-light">Direct engagement. No proposal until we have talked.</p>
        </div>
        <a
          href="https://portal.bwadvisorysolutions.com.au/"
          className="group relative overflow-hidden bg-[#C9A84C] px-14 md:px-16 py-5 md:py-6 rounded-lg text-[#0F172A] font-bold text-sm md:text-base hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase flex items-center justify-center gap-3 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10 whitespace-nowrap cursor-pointer"
        >
          Request Scoping Session
          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
        </a>
      </div>
    </section>

    <Footer />
  </div>
);

export default GroundTruth;
