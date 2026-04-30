import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

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


const Investigations = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proved-card', {
        scrollTrigger: {
          trigger: '.proved-grid',
          start: 'top 80%',
        },
        y: 24,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
      });

      gsap.from('.proved-header', {
        scrollTrigger: {
          trigger: '.proved-header',
          start: 'top 85%',
        },
        y: 16,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
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

          <div className="bg-gradient-to-br from-white/6 via-white/3 to-white/1 rounded-lg border border-white/10 p-10 backdrop-blur-sm">
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
    <section className="py-44 w-full relative z-10 bg-[#0A1E3D] border-t border-white/5 overflow-hidden">
      {/* Ambient gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A84C]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className="proved-header mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full px-4 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
                <span className="text-[#C9A84C] font-mono text-[10px] tracking-[0.25em] uppercase font-bold">Proprietary Framework</span>
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[0.95]">
              The <span className="text-[#C9A84C]">PROVED</span> Model.
            </h2>
            <p className="text-silver/60 font-light text-lg max-w-xl leading-relaxed">
              Six stages. One unified protocol. Every investigation conducted to a standard that withstands civil, disciplinary, or police scrutiny.
            </p>
          </div>
          {/* Acronym display */}
          <div className="hidden lg:flex items-center gap-1 flex-shrink-0">
            {['P','R','O','V','E','D'].map((l) => (
              <div key={l} className="w-10 h-10 flex items-center justify-center border border-[#C9A84C]/20 rounded bg-[#C9A84C]/5">
                <span className="text-[#C9A84C] font-display font-bold text-sm tracking-wider">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="proved-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {provedStages.map((stage, i) => (
            <div key={stage.letter} className="proved-card group h-full">
              <div className="relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 rounded-xl border border-white/10 border-t-2 border-t-[#C9A84C]/60 group-hover:border-t-[#C9A84C] group-hover:border-white/20 p-8 flex flex-col h-full transition-all duration-500 backdrop-blur-sm overflow-hidden group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                {/* Ghost letter background */}
                <span className="absolute -bottom-4 -right-2 text-[9rem] font-display font-bold text-white/[0.04] group-hover:text-[#C9A84C]/[0.07] leading-none select-none transition-all duration-500 pointer-events-none">
                  {stage.letter}
                </span>

                {/* Stage number + name */}
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div>
                    <p className="text-[#C9A84C]/50 font-mono text-[10px] tracking-[0.3em] uppercase mb-2">
                      Stage {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="text-white font-bold text-2xl tracking-tight">{stage.name}</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0 group-hover:border-[#C9A84C]/60 group-hover:bg-[#C9A84C]/10 transition-all duration-300">
                    <span className="text-[#C9A84C] font-display font-bold text-sm">{stage.letter}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-[#C9A84C]/30 to-transparent mb-6 relative z-10" />

                {/* Description */}
                <p className="text-silver/70 font-light text-sm leading-relaxed flex-grow relative z-10 group-hover:text-silver/90 transition-colors duration-300">
                  {stage.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-12 text-center text-silver/30 font-mono text-[10px] tracking-[0.2em] uppercase">
          © BW Advisory Solutions — PROVED is a proprietary investigations framework
        </p>
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
          href="https://portal.bwadvisorysolutions.com.au/intake.html"
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
};

export default Investigations;
