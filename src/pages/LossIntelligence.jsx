import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import CinematicHero from '../components/CinematicHero';

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
  <div className="min-h-screen">
    {/* PAGE HERO */}
    <CinematicHero
      eyebrow="Loss intelligence"
      heading="Connect the incidents. Understand the loss. Act on the pattern."
      body="I help retailers and multi-site operators build the capability to turn incident information into useful intelligence. Together, we develop the processes, analysis and response arrangements your team needs to identify patterns and act on them."
      ctaLabel="Book a 30-minute conversation"
      ctaHref="/consultation"
      videoSrc="/loss-intelligence-urban-cinematic.mp4"
      posterSrc="/loss-intelligence-urban.webp"
      crossLinkTo="/investigations"
      crossLinkLabel="See also: Investigations"
    />

    {/* THREE PHASES */}
    <section className="pb-44 px-8 w-full relative z-10 bg-primary">
      <div className="max-w-[1400px] mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-44">
          <div className="group h-full">
            <div className="bg-white/[0.04] rounded-lg border border-white/10 border-t-2 border-t-[#C9A84C] group-hover:border-white/15 group-hover:bg-white/[0.06] p-10 flex flex-col h-full transition-all duration-300">
              <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase mb-6 font-semibold">Phase 01</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Diagnose.</h3>
              <p className="text-silver/80 font-light text-base leading-[1.6] flex-grow">
                Operational assessment across your loss landscape, risk governance, and intelligence pipeline. I identify where loss is going undetected.
              </p>
            </div>
          </div>

          <div className="group h-full">
            <div className="bg-white/[0.04] rounded-lg border border-white/10 border-t-2 border-t-[#C9A84C] group-hover:border-white/15 group-hover:bg-white/[0.06] p-10 flex flex-col h-full transition-all duration-300">
              <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase mb-6 font-semibold">Phase 02</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Design.</h3>
              <p className="text-silver/80 font-light text-base leading-[1.6] flex-grow">
                I build the intelligence-led loss framework with you: the SOPs, analysis templates, decision trees, and signal collection protocols. You own the capability when I'm done.
              </p>
            </div>
          </div>

          <div className="group h-full">
            <div className="bg-white/[0.04] rounded-lg border border-white/10 border-t-2 border-t-[#C9A84C] group-hover:border-white/15 group-hover:bg-white/[0.06] p-10 flex flex-col h-full transition-all duration-300">
              <p className="text-[#C9A84C] font-mono text-xs tracking-[0.2em] uppercase mb-6 font-semibold">Phase 03</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Embed.</h3>
              <p className="text-silver/80 font-light text-base leading-[1.6] flex-grow">
                Embed the capability into your operation. I train your teams in intelligence analysis and investigation doctrine, align leadership to the intelligence-led model, and hand over a function your own people run. After handover, I review how it is performing against the measures we set together.
              </p>
            </div>
          </div>
        </div>

        {/* DIAGNOSTICS ENTRY POINT */}
        <div className="border-t border-white/10 pt-36 mb-4">
          <p className="text-[#C9A84C] font-bold tracking-[0.2em] text-xs mb-8 uppercase">Capability Assessment</p>
          <div className="mb-20">
            <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]">Locate your organisational exposures.</h2>
          </div>
          <p className="text-2xl md:text-3xl text-silver/75 font-light leading-relaxed max-w-6xl mb-24">
            Two diagnostics. Eight minutes each. I assess your governance posture and your investigative capability to find where your operation would fail under scrutiny.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-20">
            <Link
              to="/loss-intelligence-diagnostic"
              className="group relative overflow-hidden bg-white/5 border border-white/15 hover:border-[#C9A84C] hover:bg-[#C9A84C] px-14 py-5 rounded-lg text-white hover:text-[#0F172A] font-bold text-sm transition-all duration-200 tracking-[0.15em] uppercase flex items-center justify-center gap-3 cursor-pointer"
            >
              Loss Intelligence Diagnostic
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </Link>
            <Link
              to="/investigations-diagnostic"
              className="group relative overflow-hidden bg-white/5 border border-white/15 hover:border-[#C9A84C] hover:bg-[#C9A84C] px-14 py-5 rounded-lg text-white hover:text-[#0F172A] font-bold text-sm transition-all duration-200 tracking-[0.15em] uppercase flex items-center justify-center gap-3 cursor-pointer"
            >
              Investigations Capability Diagnostic
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </Link>
          </div>
        </div>

      </div>
    </section>

    {/* ── THE INTELLIGENCE SYSTEM ── */}
    <section className="py-44 w-full relative z-10 bg-primary border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
        <div className="mb-32 space-y-8">
          <p className="text-gold font-semibold tracking-[0.4em] uppercase text-xs">What You'll Build</p>
          <div className="pl-12 border-l-2 border-gold/30">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[0.9]">Four pillars of intelligence-led loss prevention.</h2>
          </div>
          <p className="text-xl md:text-2xl text-silver/75 font-light leading-relaxed max-w-4xl">
            The framework has four elements. Each is built into your operation during the engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {intelligenceStages.map((stage, i) => (
            <div key={i} className="group h-full">
              <div className="bg-gradient-to-br from-white/8 via-white/4 to-white/2 rounded-lg border border-white/15 border-l-2 border-l-[#C9A84C] group-hover:border-white/25 group-hover:bg-gradient-to-br group-hover:from-white/10 group-hover:via-white/5 group-hover:to-white/3 p-10 flex flex-col h-full transition-all duration-300 backdrop-blur-sm">
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
