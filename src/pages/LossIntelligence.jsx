import { Link } from 'react-router-dom';
import HowWeWorkTogether from '../components/HowWeWorkTogether';
import Footer from '../components/Footer';

const LossIntelligence = () => (
  <>
    {/* PAGE HERO */}
    <section className="relative pt-44 pb-20 px-6 w-full z-10">
      <div className="max-w-[1400px] mx-auto xl:px-12">
        <p className="text-accent font-semibold tracking-[0.2em] uppercase text-lg mb-4">Loss Intelligence Advisory</p>
        <div className="pl-6 border-l-2 border-accent max-w-[900px]">
          <h1 className="font-light text-5xl md:text-6xl lg:text-7xl text-surface tracking-tight mb-8 mt-2 leading-[1.05]">
            Build the capability to see, investigate, and act.
          </h1>
          <p className="text-xl text-surface/70 font-light leading-relaxed max-w-[700px]">
            The organisations that consistently outperform on loss share one thing: they have built a structured capability — not inherited one, not outsourced it. One three-month engagement designs and embeds that capability inside your operation, from governance framework to active intelligence pipeline.
          </p>
        </div>
      </div>
    </section>

    {/* THREE PHASES */}
    <section className="pb-20 px-6 w-full relative z-10">
      <div className="max-w-[1400px] mx-auto xl:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 bg-[#112850] rounded-3xl border border-[#1B6EC2]/20 shadow-2xl relative overflow-hidden mb-20">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C0C8D0 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

          <div className="relative p-10 xl:p-14 border-b lg:border-b-0 lg:border-r border-silver/10 flex flex-col group overflow-hidden hover:bg-white/[0.02] transition-colors duration-700">
            <div className="absolute -top-4 sm:-top-6 right-2 text-[6rem] sm:text-[8rem] lg:text-[11rem] leading-none font-sans font-light text-silver opacity-0 select-none pointer-events-none transition-all duration-1000 group-hover:opacity-10 group-hover:scale-105">01</div>
            <p className="text-accent font-bold tracking-[0.2em] text-xs uppercase mb-4 relative z-10">Weeks 1–3</p>
            <h2 className="font-light text-4xl lg:text-5xl text-surface mb-6 relative z-10">Diagnose.</h2>
            <p className="text-surface/70 leading-relaxed font-light relative z-10 text-[15px] lg:text-base flex-grow">
              Current state assessment across your loss landscape, risk governance, investigation capability, and intelligence pipeline. A risk register and gap analysis that gives you a clear picture of where you are exposed and why.
            </p>
          </div>

          <div className="relative p-10 xl:p-14 border-b lg:border-b-0 lg:border-r border-silver/10 flex flex-col group overflow-hidden hover:bg-white/[0.02] transition-colors duration-700">
            <div className="absolute -top-4 sm:-top-6 right-2 text-[6rem] sm:text-[8rem] lg:text-[11rem] leading-none font-sans font-light text-silver opacity-0 select-none pointer-events-none transition-all duration-1000 group-hover:opacity-10 group-hover:scale-105">02</div>
            <p className="text-accent font-bold tracking-[0.2em] text-xs uppercase mb-4 relative z-10">Weeks 4–8</p>
            <h2 className="font-light text-4xl lg:text-5xl text-surface mb-6 relative z-10">Design.</h2>
            <p className="text-surface/70 leading-relaxed font-light relative z-10 text-[15px] lg:text-base flex-grow">
              A complete intelligence-led loss framework built for your operation — governance structure, investigation procedures, SOP suite, reporting templates, and an intelligence setup that surfaces threats before they become incidents.
            </p>
          </div>

          <div className="relative p-10 xl:p-14 flex flex-col group overflow-hidden hover:bg-white/[0.02] transition-colors duration-700">
            <div className="absolute -top-4 sm:-top-6 right-2 text-[6rem] sm:text-[8rem] lg:text-[11rem] leading-none font-sans font-light text-silver opacity-0 select-none pointer-events-none transition-all duration-1000 group-hover:opacity-10 group-hover:scale-105">03</div>
            <p className="text-accent font-bold tracking-[0.2em] text-xs uppercase mb-4 relative z-10">Weeks 9–12</p>
            <h2 className="font-light text-4xl lg:text-5xl text-surface mb-6 relative z-10">Embed.</h2>
            <p className="text-surface/70 leading-relaxed font-light relative z-10 text-[15px] lg:text-base flex-grow">
              Implementation support, team training, and leadership handover. The engagement ends when the capability is operational — not when the documents are delivered.
            </p>
          </div>
        </div>

        {/* DIAGNOSTICS ENTRY POINT */}
        <div className="border-t border-silver/10 pt-14 mb-4">
          <p className="text-accent font-semibold tracking-[0.2em] uppercase text-sm mb-4">Start here</p>
          <div className="pl-6 border-l-2 border-accent mb-8">
            <h2 className="font-light text-3xl md:text-4xl text-surface tracking-tight mt-2">Two diagnostics. Exactly where your loss and investigations capability falls short.</h2>
          </div>
          <p className="text-xl text-surface/70 font-light leading-relaxed max-w-2xl mb-10">
            Two diagnostics. Eight minutes each. One for the executive who needs to understand the governance picture. One for the loss prevention or security professional who needs to know whether their investigation capability would stand up when it matters. Ten questions each. A specific written report — reviewed personally before it is sent.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
            <a
              href="https://portal.bwadvisorysolutions.com.au/loss-intelligence-diagnostic.html"
              className="group relative overflow-hidden bg-accent px-10 py-4 rounded-full text-white font-bold text-sm hover:bg-[#155A9E] border border-white/20 transition-all duration-500 tracking-[0.2em] uppercase flex items-center gap-4 shadow-[0_4px_16px_rgba(27,110,194,0.25)] hover:shadow-[0_6px_24px_rgba(27,110,194,0.4)] ring-1 ring-accent/50"
            >
              Loss Intelligence Diagnostic
              <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
            <a
              href="https://portal.bwadvisorysolutions.com.au/investigations-diagnostic.html"
              className="group relative overflow-hidden bg-transparent px-10 py-4 rounded-full text-accent font-bold text-sm border border-accent hover:bg-accent hover:text-white transition-all duration-500 tracking-[0.2em] uppercase flex items-center gap-4"
            >
              Investigations Diagnostic
              <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </div>
          <a
            href="https://portal.bwadvisorysolutions.com.au/intake.html"
            className="group relative overflow-hidden bg-transparent px-10 py-4 rounded-full text-surface/70 font-bold text-sm border border-surface/20 hover:border-surface/50 hover:text-surface transition-all duration-500 tracking-[0.2em] uppercase flex items-center gap-4 w-fit"
          >
            Book a scoping conversation
            <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </a>
        </div>

      </div>
    </section>

    {/* HOW WE WILL WORK TOGETHER */}
    <HowWeWorkTogether />

    <Footer />
  </>
);

export default LossIntelligence;
