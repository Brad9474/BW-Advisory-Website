import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    step: "01",
    title: "Engage.",
    desc: "Every engagement begins with strategic intent. I listen, clarify your objectives, and establish the distance between your current state and your goals."
  },
  {
    step: "02",
    title: "Scope.",
    desc: "I define the boundaries of the work before starting. We agree upfront on what I examine, what I will not, and what a successful outcome looks like."
  },
  {
    step: "03",
    title: "Diagnose.",
    desc: "I look beneath the surface to identify friction points, blind spots, and operational realities not captured in strategy documents."
  },
  {
    step: "04",
    title: "Plan & Align.",
    desc: "I connect strategic intent with frontline reality — a clear roadmap with shared ownership of outcomes, from leadership to frontline delivery."
  },
  {
    step: "05",
    title: "Operationalise.",
    desc: "Strategy delivers results here. I remain accountable by embedding change, aligning people, and measuring what matters until the gap closes."
  }
];

const HowWeWorkTogether = () => {
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Horizontal line fill — scrub with scroll
      gsap.to(".timeline-line-fill", {
        scrollTrigger: {
          trigger: ".timeline-h-container",
          start: "top 65%",
          end: "bottom 55%",
          scrub: 1.5,
        },
        width: "100%",
        ease: "none",
      });

      // Dot activation — stagger in when section enters
      gsap.from(".phase-dot", {
        scrollTrigger: {
          trigger: ".timeline-h-container",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "back.out(2)",
      });

      // Phase content stagger in
      gsap.from(".phase-content", {
        scrollTrigger: {
          trigger: ".timeline-h-container",
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" className="relative w-full py-24 bg-primary z-10 overflow-hidden">

      {/* Header */}
      <div className="px-6 max-w-[1400px] mx-auto xl:px-12 mb-20">
        <p className="text-accent font-semibold tracking-[0.2em] uppercase text-lg mb-4">The Engagement</p>
        <div className="pl-6 border-l-2 border-accent">
          <h2 className="font-light text-5xl lg:text-6xl text-surface tracking-tight mt-2">The engagement.</h2>
        </div>
      </div>

      {/* ── HORIZONTAL TIMELINE — desktop ── */}
      <div className="timeline-h-container hidden md:block px-6 max-w-[1400px] mx-auto xl:px-12 mb-20">
        <div className="relative">

          {/* Track and animated fill — sits at vertical centre of dot row */}
          <div className="absolute left-0 right-0 h-px bg-silver/[0.08]" style={{ top: '7px' }} />
          <div
            className="timeline-line-fill absolute left-0 h-px w-0 bg-accent"
            style={{ top: '7px', boxShadow: '0 0 8px rgba(27,110,194,0.55)' }}
          />

          {/* Five phase columns */}
          <div className="grid grid-cols-5">
            {phases.map((phase, i) => (
              <div key={i} className="flex flex-col pr-8">

                {/* Dot — sits on the line */}
                <div
                  className="phase-dot w-[14px] h-[14px] rounded-full bg-primary border-2 border-accent flex-shrink-0 relative z-10"
                  style={{ boxShadow: '0 0 8px rgba(27,110,194,0.4)' }}
                />

                {/* Content below the line */}
                <div className="phase-content pt-10">
                  <p className="text-accent/60 font-bold tracking-[0.2em] text-xs uppercase mb-4">
                    Phase {phase.step}
                  </p>
                  <h3 className="font-light text-2xl xl:text-3xl text-surface tracking-tight mb-4 leading-tight">
                    {phase.title}
                  </h3>
                  <div className="w-6 h-px bg-accent/40 mb-5" />
                  <p className="text-surface/55 font-light text-sm xl:text-[15px] leading-relaxed">
                    {phase.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── STACKED LAYOUT — mobile ── */}
      <div className="md:hidden px-6 mb-20">
        <div className="relative pl-8">
          {/* Static vertical line for mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-accent/20" />
          <div className="space-y-12">
            {phases.map((phase, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[37px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-accent" />
                <p className="text-accent/60 font-bold tracking-[0.2em] text-xs uppercase mb-3">Phase {phase.step}</p>
                <h3 className="font-light text-2xl text-surface tracking-tight mb-3 leading-tight">{phase.title}</h3>
                <p className="text-surface/55 font-light text-sm leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center w-full relative z-10 px-6">
        <a
          href="https://portal.bwadvisorysolutions.com.au/intake.html"
          className="group relative overflow-hidden bg-accent px-12 py-4 md:py-5 rounded-full text-white font-bold text-sm md:text-base hover:bg-[#155A9E] border border-white/20 transition-all duration-500 tracking-[0.2em] uppercase text-center flex items-center justify-center gap-4 shadow-[0_4px_16px_rgba(27,110,194,0.25)] hover:shadow-[0_6px_24px_rgba(27,110,194,0.4)] ring-1 ring-accent/50 group-hover:ring-accent w-full md:w-auto"
        >
          Request a scoping session
          <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

    </section>
  );
};

export default HowWeWorkTogether;
