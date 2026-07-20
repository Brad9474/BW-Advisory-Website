import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    letter: 'P',
    name: 'Prepare',
    desc: 'Engagement-level assessment. We establish investigability, authority, constraints, and budget. The output is a scope statement and a proceed-or-refer decision.',
  },
  {
    letter: 'R',
    name: 'Review',
    desc: 'A deliberate triage gateway — investigate, record, or refer. Not every matter warrants a full investigation, and that determination is made on evidence, not assumption.',
  },
  {
    letter: 'O',
    name: 'Outline',
    desc: 'Matter-level planning. Hypotheses are set, avenues identified, evidence strategy defined, and a timeline agreed. The output is the Investigation Plan.',
  },
  {
    letter: 'V',
    name: 'Verify',
    desc: 'Every avenue tested. Every assertion challenged. Facts are confirmed against evidence — not witness accounts alone.',
  },
  {
    letter: 'E',
    name: 'Evaluate',
    desc: 'Findings and evidence quality are assessed. We select an outcome path based on what the evidence supports — not what was expected at the outset.',
  },
  {
    letter: 'D',
    name: 'Document',
    desc: 'Closure is executed: reporting, outcome recording, lessons learned, and intelligence fed back into future detection. The record is closed and preserved.',
  },
];

const principles = [
  {
    name: 'Impartiality',
    desc: 'We apply the same standard to every matter, regardless of who the subject is or what outcome the client prefers.',
  },
  {
    name: 'Independence',
    desc: 'Our findings are not shaped by the client\'s position. Independence is not a courtesy — it is the condition under which our work holds.',
  },
  {
    name: 'Fact-Based Analysis',
    desc: 'If it isn\'t supported by evidence, it doesn\'t go in the report. Inference is labelled as inference.',
  },
  {
    name: 'Proportionality',
    desc: 'The response matches the risk. We don\'t escalate matters that don\'t warrant it, and we don\'t underplay those that do.',
  },
  {
    name: 'Accountability',
    desc: 'Every decision is documented, and we stand behind it. The record exists so that anyone can audit the process, not just the outcome.',
  },
];

const differentiators = [
  {
    label: 'Null-hypothesis discipline',
    desc: 'Every matter opens with a formal hypothesis that no wrongdoing occurred. Confirmation bias is the most common investigation failure. This structure prevents it.',
  },
  {
    label: 'Decision-record proportionality',
    desc: 'The response tier — record, inquiry, investigation, or referral — is assigned against documented criteria, not instinct. Every escalation decision is on the record.',
  },
  {
    label: 'Contestability of AI-assisted decisions',
    desc: 'Where algorithmic tools contribute to a finding, the affected person is told and can challenge it. This is not a courtesy. It is an obligation we build in by design.',
  },
  {
    label: 'Evidentiary write-once posture',
    desc: 'If it isn\'t documented concurrently, with an unbroken chain of custody, it doesn\'t exist. Retrospective reconstruction of the evidentiary record is not an option.',
  },
];

const Methodology = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stage-card', {
        scrollTrigger: { trigger: '.stage-grid', start: 'top 80%' },
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power2.out',
      });
      gsap.from('.principle-row', {
        scrollTrigger: { trigger: '.principles-section', start: 'top 80%' },
        y: 16,
        opacity: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: 'power2.out',
      });
      gsap.from('.diff-card', {
        scrollTrigger: { trigger: '.diff-grid', start: 'top 80%' },
        y: 24,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-primary min-h-screen">

      {/* ── HERO ── */}
      <section className="relative pt-48 pb-24 px-8 w-full z-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full px-4 py-1.5 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <span className="text-[#C9A84C] font-mono text-[10px] tracking-[0.3em] uppercase font-bold">BW Advisory Methodology</span>
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1] mb-8">
              PROVED.
            </h1>
            <p className="text-2xl md:text-3xl text-silver/80 font-light leading-relaxed max-w-3xl mb-6">
              PROVED is BW Advisory's investigation and intelligence methodology.
            </p>
            <p className="text-lg text-silver/60 font-light leading-relaxed max-w-2xl">
              Six stages. Five principles. One evidentiary standard — applied consistently, from triage to closure.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="pb-32 px-8 w-full relative z-10 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-7 text-white/85 font-light text-xl leading-relaxed">
              <p>
                Most organisations have investigation capability. Few have investigation discipline. PROVED provides the protocol — applied consistently across every matter, every time.
              </p>
              <p>
                The six-stage framework governs how investigations are structured, scoped, and documented. Findings must be evidence-based. Decisions must be on the record. Every outcome must be defensible to a civil, disciplinary, or regulatory standard.
              </p>
              <p>
                Where PROVED is adopted, the methodology is non-negotiable. Independence and evidence are prerequisites — not options.
              </p>
            </div>
            <div className="bg-white/8 rounded-xl border border-white/10 p-10 backdrop-blur-sm">
              <p className="text-[#C9A84C] font-mono text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">Where PROVED applies</p>
              <div className="space-y-4">
                {[
                  'Investigations and inquiries run under the PROVED protocol',
                  'Intelligence analysis and source assessment',
                  'Workplace inquiry and misconduct response',
                  'Loss investigation and fraud triage',
                  'AI-assisted detection and algorithmic decision review',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full flex-shrink-0 mt-2.5" />
                    <p className="text-silver/85 font-light text-base leading-normal">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIX STAGES ── */}
      <section className="py-44 w-full relative z-10 bg-[#0A1E3D] border-t border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A84C]/3 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12 relative z-10">
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="space-y-6">
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[0.95]">
                The Six Stages.
              </h2>
              <p className="text-silver/60 font-light text-lg max-w-xl leading-loose">
                Every investigation, every time. The sequence is fixed; the scope is not.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-1 flex-shrink-0">
              {['P', 'R', 'O', 'V', 'E', 'D'].map((l) => (
                <div key={l} className="w-10 h-10 flex items-center justify-center border border-[#C9A84C]/20 rounded bg-[#C9A84C]/5">
                  <span className="text-[#C9A84C] font-display font-bold text-sm tracking-wider">{l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="stage-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stages.map((stage, i) => (
              <div key={stage.letter} className="stage-card group h-full">
                <div className="relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 rounded-xl border border-white/10 border-t-2 border-t-[#C9A84C]/60 group-hover:border-t-[#C9A84C] group-hover:border-white/20 p-8 flex flex-col h-full transition-all duration-500 backdrop-blur-sm overflow-hidden group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                  <span className="absolute -bottom-4 -right-2 text-[9rem] font-display font-bold text-white/[0.04] group-hover:text-[#C9A84C]/[0.07] leading-none select-none transition-all duration-500 pointer-events-none">
                    {stage.letter}
                  </span>
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
                  <div className="h-px bg-gradient-to-r from-[#C9A84C]/30 to-transparent mb-6 relative z-10" />
                  <p className="text-silver/70 font-light text-sm leading-loose flex-grow relative z-10 group-hover:text-silver/90 transition-colors duration-300">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIVE PRINCIPLES ── */}
      <section className="principles-section py-44 px-8 w-full relative z-10 bg-primary border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="text-[#C9A84C] font-mono text-[10px] tracking-[0.3em] uppercase font-bold mb-6">How the methodology holds</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white tracking-tight">Five Principles.</h2>
          </div>
          <div className="space-y-0 divide-y divide-white/5">
            {principles.map((p, i) => (
              <div key={p.name} className="principle-row group flex flex-col md:flex-row md:items-start gap-6 md:gap-16 py-10 transition-colors duration-300 hover:bg-white/[0.02] px-4 -mx-4 rounded-lg">
                <div className="flex items-center gap-5 md:w-72 flex-shrink-0">
                  <span className="text-[#C9A84C]/30 font-mono text-[10px] tracking-[0.3em] w-6 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-white font-bold text-lg tracking-tight group-hover:text-[#C9A84C] transition-colors duration-300">
                    {p.name}
                  </h3>
                </div>
                <p className="text-silver/70 font-light text-base leading-loose md:max-w-2xl">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUR DIFFERENTIATORS ── */}
      <section className="py-44 w-full relative z-10 bg-[#0A1E3D] border-t border-white/5 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C9A84C]/4 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/3" />
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12 relative z-10">
          <div className="mb-20">
            <p className="text-[#C9A84C] font-mono text-[10px] tracking-[0.3em] uppercase font-bold mb-6">Where this differs from standard practice</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
              Four Structural Commitments.
            </h2>
            <p className="text-silver/60 font-light text-lg max-w-2xl leading-loose">
              These aren't policies. They're design decisions baked into the methodology — present in every engagement, not applied selectively.
            </p>
          </div>
          <div className="diff-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
            {differentiators.map((d, i) => (
              <div key={i} className="diff-card group">
                <div className="relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 rounded-xl border border-white/10 p-10 h-full transition-all duration-500 hover:border-[#C9A84C]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] backdrop-blur-sm">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A84C]/20 group-hover:border-[#C9A84C]/40 transition-all duration-300">
                      <span className="text-[#C9A84C] font-mono text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-white font-bold text-xl leading-tight pt-1">{d.label}</h3>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#C9A84C]/20 to-transparent mb-6" />
                  <p className="text-silver/70 font-light text-base leading-loose group-hover:text-silver/85 transition-colors duration-300">
                    {d.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INVESTIGATIONS CONNECTION ── */}
      <section className="py-32 px-8 w-full relative z-10 bg-primary border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[#C9A84C] font-mono text-[10px] tracking-[0.3em] uppercase font-bold mb-10">Where PROVED operates</p>
          <p className="text-2xl md:text-3xl text-silver/80 font-light leading-loose max-w-5xl mb-10">
            PROVED is the governing methodology in every Loss Intelligence engagement BW Advisory designs. Organisations adopt it for standalone investigations, workplace inquiries, and fraud triage.
          </p>
          <div className="flex flex-col sm:flex-row gap-8">
            <Link to="/investigations" className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#E0BC60] font-mono text-xs tracking-[0.3em] uppercase font-bold transition-colors">
              Investigations
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </Link>
            <Link to="/loss-intelligence" className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#E0BC60] font-mono text-xs tracking-[0.3em] uppercase font-bold transition-colors">
              Loss Intelligence
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── DISCOVERY CTA ── */}
      <section className="py-48 px-8 w-full bg-[#0A1E3D] border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 md:gap-20">
          <div className="text-center md:text-left space-y-6">
            <h3 className="text-5xl md:text-6xl font-bold text-white tracking-tight uppercase">Talk to us first.</h3>
            <p className="text-silver/75 text-xl md:text-2xl font-light leading-loose max-w-xl">Thirty minutes. We'll tell you whether PROVED is the right fit for your matter — and if not, who is.</p>
          </div>
          <a
            href="https://calendar.app.google/m5nPtDntM5vzigPx6"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-[#C9A84C] px-14 md:px-16 py-5 md:py-6 rounded-lg text-[#0F172A] font-bold text-sm md:text-base hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase flex items-center justify-center gap-3 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10 whitespace-nowrap cursor-pointer"
          >
            Book a Discovery Call
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Methodology;
