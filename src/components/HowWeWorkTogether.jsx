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
    desc: "I define the boundaries of the work before starting. We agree upfront on what I examine, what I will not, and what a successful outcome looks like — so neither party faces surprises."
  },
  {
    step: "03",
    title: "Diagnose.",
    desc: "I look beneath the surface to identify friction points, blind spots, and operational realities that are not captured in strategy documents."
  },
  {
    step: "04",
    title: "Plan & Align.",
    desc: "I connect strategic intent with frontline reality by providing a clear roadmap and shared ownership of outcomes, from leadership to frontline delivery."
  },
  {
    step: "05",
    title: "Operationalise.",
    desc: "Strategy delivers results here. I remain accountable for the outcome by embedding change, aligning people, and measuring what matters until the gap between intent and performance closes."
  }
];

const HowWeWorkTogether = () => {
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".timeline-progress", {
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top center",
          end: "bottom center",
          scrub: 1
        },
        height: "100%",
        ease: "none"
      });

      gsap.utils.toArray('.timeline-node').forEach((node) => {
        gsap.from(node, {
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" className="relative w-full pb-20 bg-primary z-10 pt-16 overflow-hidden">
      <div className="px-6 max-w-6xl mx-auto mb-24">
        <p className="text-accent font-semibold tracking-[0.2em] uppercase text-lg mb-4">The Engagement</p>
        <div className="pl-6 border-l-2 border-accent">
          <h2 className="font-light text-5xl lg:text-6xl text-surface tracking-tight mt-2">The engagement.</h2>
        </div>
      </div>

      <div className="timeline-container max-w-5xl mx-auto px-6 relative">
        <div className="absolute left-6 md:left-[50%] top-0 bottom-0 w-[2px] bg-silver/5 md:-translate-x-1/2" />
        <div className="timeline-progress absolute left-6 md:left-[50%] top-0 h-0 w-[2px] bg-accent md:-translate-x-1/2 shadow-[0_0_6px_rgba(27,110,194,0.35)]" />

        <div className="space-y-16 md:space-y-20 relative z-10 py-10">
          {phases.map((phase, i) => (
            <div key={i} className="timeline-node relative w-full flex flex-col md:flex-row justify-between items-center group">
              <div className="absolute left-6 md:left-1/2 w-5 h-5 rounded-full bg-[#0D2247] border-2 border-accent transform -translate-x-[9px] md:-translate-x-1/2 top-4 md:top-auto transition-all duration-500 shadow-[0_0_6px_rgba(27,110,194,0.25)] group-hover:scale-[1.5] group-hover:bg-accent z-20" />
              <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-16 text-left' : 'md:order-2 md:text-left md:pl-16'} flex flex-col pt-2 md:pt-0`}>
                <p className="text-silver/50 font-bold tracking-[0.3em] text-lg md:text-xl uppercase mb-3 drop-shadow-sm">Phase {phase.step}</p>
                <h3 className="font-light text-4xl lg:text-[2.8rem] leading-tight text-surface tracking-tight mb-5 drop-shadow-sm">{phase.title}</h3>
                <div className={`h-[1px] w-16 bg-accent/40 mb-6 ${i % 2 === 0 ? 'md:ml-auto md:mr-0' : ''}`} />
                <p className="text-[17px] lg:text-xl text-surface/70 leading-relaxed font-light">{phase.desc}</p>
              </div>
              <div className={`hidden md:block w-[45%] ${i % 2 === 0 ? 'md:order-2' : ''}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex justify-center w-full relative z-10 px-6">
        <a href="https://portal.bwadvisorysolutions.com.au/intake.html" className="group relative overflow-hidden bg-accent px-12 py-4 md:py-5 rounded-full text-white font-bold text-sm md:text-base hover:bg-[#155A9E] border border-white/20 transition-all duration-500 tracking-[0.2em] uppercase text-center flex items-center justify-center gap-4 shadow-[0_4px_16px_rgba(27,110,194,0.25)] hover:shadow-[0_6px_24px_rgba(27,110,194,0.4)] ring-1 ring-accent/50 group-hover:ring-accent w-full md:w-auto">
          Request a scoping session
          <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </a>
      </div>
    </section>
  );
};

export default HowWeWorkTogether;
