import Footer from '../components/Footer';

const groundStages = [
  {
    letter: 'G',
    name: 'Gather',
    desc: 'How incidents enter the investigation system — direct report, intelligence-led detection, or external referral. The entry point determines the initial evidence posture.',
  },
  {
    letter: 'R',
    name: 'Review',
    desc: 'Triage decision. Investigate, record, refer, or close — against defined criteria, not judgment alone. Every decision documented with a decision record.',
  },
  {
    letter: 'O',
    name: 'Outline',
    desc: 'A formal investigation plan prepared before any overt action. Scope, objectives, evidence strategy, hypotheses. The step most retail investigations skip — and the step most responsible for poor outcomes.',
  },
  {
    letter: 'U',
    name: 'Uncover',
    desc: 'Evidence collection, structured interviews (periphery-inward), digital and physical records, chain of custody. Built to withstand disciplinary, civil, or police referral scrutiny.',
  },
  {
    letter: 'N',
    name: 'Neutralise',
    desc: 'Findings converted to action — prevention, disruption, disciplinary, financial recovery, or police referral. Not mutually exclusive. Sequenced correctly.',
  },
  {
    letter: 'D',
    name: 'Document',
    desc: 'Case file finalised, intelligence fed back into the detection pipeline, risk register updated. The investigation\'s intelligence value is realised here — not on the day it closes.',
  },
];

const pipelineLayers = [
  {
    letter: 'D',
    name: 'Detect',
    desc: 'Exception-based reporting on POS, refund, and discount data. Behavioural analytics detecting anomalies in CCTV and access patterns. Real-time signal generation across transaction, inventory, and incident data.',
  },
  {
    letter: 'I',
    name: 'Interpret',
    desc: 'Network and link analysis connecting isolated incidents to organised criminal networks. Human-machine teaming — AI flags signals, analysts validate and escalate. Intelligence products built for both operational response and executive briefing.',
  },
  {
    letter: 'A',
    name: 'Act',
    desc: 'Intelligence-led investigation trigger. Signal validated, escalation criteria applied, GROUND model initiated. The investigation begins with a documented evidence basis — not a complaint or a caught-in-the-act report.',
  },
  {
    letter: 'L',
    name: 'Learn',
    desc: 'Post-investigation feedback closes the loop. Confirmed findings update the detection model. False positives reduce noise over time. The pipeline improves with every investigation completed.',
  },
];


const GroundTruth = () => (
  <>
    {/* ── HERO ── */}
    <section className="relative pt-44 pb-20 px-6 w-full z-10">
      <div className="max-w-[1400px] mx-auto xl:px-12">
        <p className="text-accent font-semibold tracking-[0.2em] uppercase text-lg mb-4">Ground Truth</p>
        <div className="pl-6 border-l-2 border-accent max-w-[900px]">
          <h1 className="font-light text-5xl md:text-6xl lg:text-7xl text-surface tracking-tight mb-8 mt-2 leading-[1.05]">
            The verified situation on the ground.
          </h1>
          <p className="text-xl text-surface/70 font-light leading-relaxed max-w-[700px]">
            As distinct from what is reported, assumed, or modelled. Ground Truth is the proprietary retail risk and investigations methodology of BW Advisory Solutions — built to the standard of professional law enforcement investigation, applied to the commercial context.
          </p>
        </div>
      </div>
    </section>

    {/* ── THE DIFFERENTIATOR ── */}
    <section className="pb-20 px-6 w-full relative z-10">
      <div className="max-w-[1400px] mx-auto xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          <div className="space-y-6 text-surface/80 font-light text-lg leading-relaxed">
            <p>
              Most retail risk functions are reactive. When a theft ring surfaces or a fraud pattern emerges, the organisation mobilises. Between incidents, the underlying exposures remain unaddressed and the intelligence that could have prevented the incident is never captured or acted upon.
            </p>
            <p>
              Ground Truth methodology applies a different standard. Thirty years of operational command and investigation in law enforcement — environments where evidentiary standards are legally binding, where the wrong call on an investigation exposes the organisation to challenge, and where intelligence has to be accurate enough to act on. That discipline does not arrive through frameworks read in a course. It comes from running and reviewing complex criminal investigations where those standards were the floor, not the aspiration, and from coordinating intelligence cycles where the analysis drove operational decisions in real time.
            </p>
            <p>
              Most recently, Brad led the national law enforcement intelligence-sharing engagement across all Australian and New Zealand jurisdictions — coordinating directly with police executives, major retail operators, and intelligence analysts, and influencing successful police operations targeting organised retail crime networks. The intelligence pipeline design at the core of Ground Truth comes from that work, deployed at operational scale.
            </p>
          </div>

          <div className="bg-[#112850] rounded-3xl border border-[#1B6EC2]/20 p-10 xl:p-12">
            <p className="text-accent font-bold tracking-[0.2em] text-xs uppercase mb-8">The problem this solves</p>
            <div className="space-y-6">
              {[
                'No unified investigation framework — every incident handled differently',
                'Intelligence exists in disconnected systems, not an actionable pipeline',
                'Investigations not documented to a standard that withstands scrutiny',
                'Outcomes inconsistent — same conduct, different results',
                'No feedback loop — findings do not improve the system',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-[0.6rem]" />
                  <p className="text-surface/75 font-light text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── THE GROUND MODEL ── */}
    <section className="py-20 md:py-28 w-full relative z-10 bg-[#0D2247] border-t border-silver/5">
      <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
        <div className="mb-16 max-w-[900px]">
          <p className="text-accent font-semibold tracking-[0.2em] uppercase text-lg mb-4">The Model</p>
          <div className="pl-6 border-l-2 border-accent">
            <h2 className="font-light text-5xl md:text-6xl text-surface tracking-tight mb-6 mt-2">The GROUND Model.</h2>
            <p className="text-xl text-surface/70 font-light leading-relaxed max-w-[650px]">
              Six stages. Structured, repeatable, and documented at every step. Adapted from the AFP Investigations Doctrine lifecycle for the retail commercial context.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {groundStages.map((stage) => (
            <div key={stage.letter} className="bg-[#112850] rounded-2xl border border-[#1B6EC2]/20 p-8 xl:p-10 flex flex-col group hover:border-accent/40 transition-colors duration-500">
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-5xl font-light text-accent/30 leading-none select-none">{stage.letter}</span>
                <span className="text-accent font-bold tracking-[0.2em] text-xs uppercase">{stage.name}</span>
              </div>
              <p className="text-surface/75 font-light text-base leading-relaxed flex-grow">{stage.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-surface/40 font-light text-sm mt-8 max-w-2xl">
          The model is non-linear. Stages can be revisited as new evidence changes the picture — but every revisit is documented. The investigation record reflects the full decision history, not just the final conclusion.
        </p>
      </div>
    </section>

    {/* ── THE INTELLIGENCE PIPELINE ── */}
    <section className="py-20 md:py-28 w-full relative z-10 bg-[#0A1E3D] border-t border-silver/5">
      <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
        <div className="mb-16 max-w-[900px]">
          <p className="text-accent font-semibold tracking-[0.2em] uppercase text-lg mb-4">The DIAL Intelligence Pipeline</p>
          <div className="pl-6 border-l-2 border-accent">
            <h2 className="font-light text-5xl md:text-6xl text-surface tracking-tight mb-6 mt-2">From signal to action.</h2>
            <p className="text-xl text-surface/70 font-light leading-relaxed max-w-[650px]">
              The pipeline changes the fundamental posture of the risk function: from reactive response to proactive detection. Four stages — Detect, Interpret, Act, Learn.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pipelineLayers.map((layer) => (
            <div key={layer.letter} className="bg-[#112850] rounded-2xl border border-[#1B6EC2]/20 p-8 xl:p-10 flex flex-col group hover:border-accent/40 transition-colors duration-500">
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-5xl font-light text-accent/30 leading-none select-none">{layer.letter}</span>
                <span className="text-accent font-bold tracking-[0.2em] text-xs uppercase">{layer.name}</span>
              </div>
              <p className="text-surface/75 font-light text-base leading-relaxed">{layer.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="py-20 px-6 w-full bg-[#0A1E3D] border-t border-silver/[0.06] relative z-10">
      <div className="max-w-[1400px] mx-auto xl:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <h3 className="font-light text-2xl md:text-3xl text-surface mb-2">Ready to close the gap?</h3>
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

export default GroundTruth;
