import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransparentShield from '../components/TransparentShield';
import HowWeWorkTogether from '../components/HowWeWorkTogether';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const philRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".logo-letter", {
        y: 60,
        opacity: 0,
        stagger: 0.03,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.1
      });

      gsap.from(".shield-elem", {
        y: -50,
        opacity: 0,
        scale: 0.95,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.1
      });

      gsap.from(".solutions-word", {
        scale: 1.8,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "expo.out",
        delay: 1.5
      });

      gsap.from(".solutions-line", {
        scaleX: 0,
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut",
        delay: 2.6
      });

      gsap.from(".hero-elem", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "power2.out",
        delay: 1.5
      });

      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: "#framework",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out"
      });

      const frameworkTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#framework",
          start: "top 65%",
        }
      });

      gsap.utils.toArray('.framework-number').forEach((num, i) => {
        frameworkTl.fromTo(num,
          { opacity: 0, y: 20, scale: 0.98, filter: "brightness(1) blur(4px)" },
          { opacity: 0.15, y: 0, scale: 1, filter: "brightness(1.8) blur(0px)", duration: 1, ease: "power2.out" },
          i * 0.8
        ).to(num, {
          opacity: 0.015,
          duration: 1.5,
          ease: "power2.inOut"
        }, ">-0.4");
      });

      gsap.from(".phil-elem", {
        scrollTrigger: {
          trigger: philRef.current,
          start: "top 75%",
        },
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
      });

      gsap.from(".footer-tagline", {
        scrollTrigger: {
          trigger: ".footer-tagline",
          start: "top 90%",
          toggleActions: "play none none reverse"
        },
        x: -50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center pt-24 pb-16 px-8 z-10 text-center">
        <div className="w-full max-w-[800px] mx-auto mb-8 relative flex flex-col items-center justify-center select-none pt-4">

          <div className="mb-8 w-28 h-32 md:w-36 md:h-40 relative z-20 mx-auto">
            <TransparentShield />
          </div>

          <div className="flex flex-wrap justify-center gap-x-1 sm:gap-x-2 gap-y-1 sm:gap-y-2 pb-4">
            {"BW ADVISORY".split("").map((char, i) => (
              <span key={i} className="logo-letter font-sans font-bold text-4xl sm:text-5xl md:text-[5rem] lg:text-[6.5rem] tracking-[-0.03em] platinum-text drop-shadow-[0_4px_15px_rgba(255,255,255,0.1)] leading-none inline-block pb-1 sm:pb-2 pr-[0.1em]">
                {char === " " ? " " : char}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4 mt-4 sm:mt-6 w-full justify-center overflow-hidden">
            <div className="solutions-line h-[2px] w-8 sm:w-16 md:w-24 bg-accent shadow-[0_0_6px_rgba(27,110,194,0.35)] origin-right"></div>
            {"SOLUTIONS".split("").map((char, i) => (
              <span key={i} className="solutions-word font-sans font-bold text-accent tracking-[0.4em] sm:tracking-[0.6em] md:tracking-[0.8em] text-lg sm:text-2xl md:text-4xl">
                {char}
              </span>
            ))}
            <div className="solutions-line h-[2px] w-8 sm:w-16 md:w-24 bg-accent shadow-[0_0_6px_rgba(27,110,194,0.35)] origin-left"></div>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto mt-2 relative z-20">
          <h1 className="hero-elem font-semibold font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] tracking-tight leading-[1.1] text-surface drop-shadow-md">
            Most organisations know something is in the way.<br /><span className="font-serif italic text-accent pr-2 drop-shadow-[0_0_15px_rgba(27,110,194,0.3)]">Few have a clear picture of where, or why.</span>
          </h1>

          <p className="hero-elem text-surface/90 mx-auto text-xl lg:text-[1.45rem] leading-relaxed mt-6 font-light tracking-wide">
            I engage directly with your operation — what the documents say,<br />and what is actually happening — and close the distance between them.
          </p>

          <div className="hero-elem pt-8 flex items-center justify-center">
            <a href="https://portal.bwadvisorysolutions.com.au/intake.html" className="group relative overflow-hidden bg-accent px-12 py-4 md:py-5 rounded-full text-white font-bold text-sm md:text-base hover:bg-[#155A9E] border border-white/20 transition-all duration-500 tracking-[0.2em] uppercase text-center flex items-center justify-center gap-4 shadow-[0_4px_16px_rgba(27,110,194,0.25)] hover:shadow-[0_6px_24px_rgba(27,110,194,0.4)] ring-1 ring-accent/50 group-hover:ring-accent">
              Request a scoping session
              <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-40">
          <svg className="w-6 h-6 text-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── PULL QUOTE ── */}
      <section className="py-16 w-full relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-12 h-[2px] bg-gold mx-auto mb-10" />
          <p className="text-[clamp(1.2rem,2.2vw,1.8rem)] text-surface font-light leading-[1.6] tracking-wide">
            The gap between intent and execution is<br className="hidden md:block" /> where organisations lose value.
          </p>
          <p className="font-serif italic font-normal text-accent text-[clamp(1.2rem,2.2vw,1.8rem)] leading-[1.6] mt-3">
            I locate the gap and close it.
          </p>
          <div className="w-12 h-[2px] bg-gold mx-auto mt-10" />
        </div>
      </section>


      {/* ── PRACTICE AREAS SIGNPOST ── */}
      <section className="py-20 w-full relative z-10 bg-[#0A1E3D] border-t border-silver/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
          <p className="text-surface/55 font-bold tracking-[0.25em] uppercase text-sm mb-12">Practice Areas</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <a href="/#framework" className="group relative block overflow-hidden rounded-2xl bg-[#112850] border border-[#1B6EC2]/20 hover:border-accent transition-all duration-500 hover:shadow-[0_12px_50px_rgba(27,110,194,0.15)] p-10 md:p-12">
              <p className="text-accent font-bold tracking-[0.2em] text-sm uppercase mb-6">General Advisory</p>
              <h3 className="font-light text-3xl md:text-4xl text-surface mb-5 leading-snug tracking-tight">Strategic and operational advisory.</h3>
              <p className="text-surface/80 font-light text-base leading-relaxed mb-10">
                Identifying where execution breaks down and rebuilding the path from strategic intent to frontline performance. Across law enforcement, government, and the private sector.
              </p>
              <span className="flex items-center gap-2 text-accent font-bold text-sm tracking-[0.18em] uppercase group-hover:gap-3 transition-all duration-300">
                Our method
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>

            <Link to="/loss-intelligence" className="group relative block overflow-hidden rounded-2xl bg-[#112850] border border-[#1B6EC2]/20 hover:border-accent transition-all duration-500 hover:shadow-[0_12px_50px_rgba(27,110,194,0.15)] p-10 md:p-12">
              <p className="text-accent font-bold tracking-[0.2em] text-sm uppercase mb-6">Loss Intelligence Advisory</p>
              <h3 className="font-light text-3xl md:text-4xl text-surface mb-5 leading-snug tracking-tight">Intelligence-led loss management for retail.</h3>
              <p className="text-surface/80 font-light text-base leading-relaxed mb-10">
                Building the structured capability to detect, investigate, and prevent retail loss — from governance framework to active intelligence pipeline. One engagement, embedded results.
              </p>
              <span className="flex items-center gap-2 text-accent font-bold text-sm tracking-[0.18em] uppercase group-hover:gap-3 transition-all duration-300">
                Learn more
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>

          </div>
        </div>
      </section>

      {/* ── FRAMEWORK ── */}
      <section id="framework" className="py-20 md:py-28 w-full relative z-10 bg-[#0D2247] border-t border-silver/5">
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12">

          <div className="mb-20 max-w-[1200px]">
            <p className="text-accent font-semibold tracking-[0.2em] uppercase text-lg mb-4">Framework</p>
            <div className="pl-6 border-l-2 border-accent">
              <h2 className="font-light text-5xl md:text-6xl text-surface tracking-tight mb-8 mt-2">The approach.</h2>
              <p className="text-2xl text-surface font-medium leading-relaxed drop-shadow-md lg:whitespace-nowrap">
                Every engagement follows a disciplined path, from understanding your reality to closing the gap.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 bg-[#112850] rounded-3xl border border-[#1B6EC2]/20 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C0C8D0 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

            <div className="relative p-10 xl:p-14 border-b lg:border-b-0 lg:border-r border-silver/10 flex flex-col group overflow-hidden hover:bg-white/[0.02] transition-colors duration-700">
              <div className="framework-number absolute -top-4 sm:-top-6 right-2 text-[6rem] sm:text-[8rem] lg:text-[11rem] leading-none font-sans font-light text-silver opacity-0 select-none pointer-events-none transition-all duration-1000 group-hover:opacity-10 group-hover:scale-105">01</div>
              <h3 className="font-light text-4xl lg:text-5xl text-surface mb-6 relative z-10 mt-6">Identify.</h3>
              <p className="text-[#1B6EC2] tracking-[0.2em] text-sm md:text-base font-bold uppercase mb-8 relative z-10 ">Understand the problem</p>
              <p className="text-surface/80 leading-relaxed font-light relative z-10 text-[15px] lg:text-lg flex-grow">
                I engage directly with your strategic and operational environment through structured conversations. This reveals your true strategic intent, operational gaps, and the hidden friction that undermines execution — all before I develop solutions.
              </p>
            </div>

            <div className="relative p-10 xl:p-14 border-b lg:border-b-0 lg:border-r border-silver/10 flex flex-col group overflow-hidden hover:bg-white/[0.02] transition-colors duration-700">
              <div className="framework-number absolute -top-4 sm:-top-6 right-2 text-[6rem] sm:text-[8rem] lg:text-[11rem] leading-none font-sans font-light text-silver opacity-0 select-none pointer-events-none transition-all duration-1000 group-hover:opacity-10 group-hover:scale-105">02</div>
              <h3 className="font-light text-4xl lg:text-5xl text-surface mb-6 relative z-10 mt-6">Strategise.</h3>
              <p className="text-[#1B6EC2] tracking-[0.2em] text-sm md:text-base font-bold uppercase mb-8 relative z-10 ">Design the solution</p>
              <p className="text-surface/80 leading-relaxed font-light relative z-10 text-[15px] lg:text-lg flex-grow">
                I diagnose the root cause, not just surface symptoms. With 30 years of operational experience in law enforcement and the private sector, I develop executable strategies that close the gap between intent and reality, ensuring clear ownership at every level.
              </p>
            </div>

            <div className="relative p-10 xl:p-14 flex flex-col group overflow-hidden hover:bg-white/[0.02] transition-colors duration-700">
              <div className="framework-number absolute -top-4 sm:-top-6 right-2 text-[6rem] sm:text-[8rem] lg:text-[11rem] leading-none font-sans font-light text-silver opacity-0 select-none pointer-events-none transition-all duration-1000 group-hover:opacity-10 group-hover:scale-105">03</div>
              <h3 className="font-light text-4xl lg:text-5xl text-surface mb-6 relative z-10 mt-6">Operationalise.</h3>
              <p className="text-[#1B6EC2] tracking-[0.2em] text-sm md:text-base font-bold uppercase mb-8 relative z-10 ">Apply the treatment</p>
              <p className="text-surface/80 leading-relaxed font-light relative z-10 text-[15px] lg:text-lg flex-grow">
                I remain accountable for outcomes. Strategy without execution is theory. I embed change, align people, and measure what matters until the gap between your intent and frontline reality is closed.
              </p>
            </div>
          </div>

          <div className="mt-16 flex justify-center w-full relative z-10 px-6">
            <a href="https://portal.bwadvisorysolutions.com.au/intake.html" className="group relative overflow-hidden bg-accent px-12 py-4 md:py-5 rounded-full text-white font-bold text-sm md:text-base hover:bg-[#155A9E] border border-white/20 transition-all duration-500 tracking-[0.2em] uppercase text-center flex items-center justify-center gap-4 shadow-[0_4px_16px_rgba(27,110,194,0.25)] hover:shadow-[0_6px_24px_rgba(27,110,194,0.4)] ring-1 ring-accent/50 group-hover:ring-accent w-full md:w-auto">
              Request a scoping session
              <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </div>

        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="py-20 md:py-28 w-full relative z-10 bg-[#0A1E3D] border-t border-silver/5">
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
          <div className="mb-20 max-w-[1200px]">
            <p className="text-accent font-semibold tracking-[0.2em] uppercase text-lg mb-4">Applied</p>
            <div className="pl-6 border-l-2 border-accent">
              <h2 className="font-light text-5xl md:text-6xl text-surface tracking-tight mb-8 mt-2">Where the work has been done.</h2>
              <p className="text-xl text-surface/70 font-light leading-relaxed max-w-2xl">
                Details are confidential. The problems and outcomes are not.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 bg-[#112850] rounded-3xl border border-[#1B6EC2]/20 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C0C8D0 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

            <div className="relative p-10 xl:p-14 border-b lg:border-b-0 lg:border-r border-silver/10 flex flex-col">
              <p className="text-accent font-bold tracking-[0.2em] text-xs uppercase mb-6">Organisation / Operational Redesign</p>
              <div className="space-y-5 flex-grow">
                <div>
                  <p className="text-surface/40 font-bold tracking-[0.15em] text-[11px] uppercase mb-2">The situation</p>
                  <p className="text-surface/80 font-light leading-relaxed text-base lg:text-lg">A large operational unit with entrenched working practices and persistent performance gaps despite adequate resourcing.</p>
                </div>
                <div>
                  <p className="text-surface/40 font-bold tracking-[0.15em] text-[11px] uppercase mb-2">The gap</p>
                  <p className="text-surface/80 font-light leading-relaxed text-base lg:text-lg">Investigative culture had not kept pace with available intelligence capability. The tools existed. The practice did not.</p>
                </div>
                <div>
                  <p className="text-surface/40 font-bold tracking-[0.15em] text-[11px] uppercase mb-2">The result</p>
                  <p className="text-surface/80 font-light leading-relaxed text-base lg:text-lg">Restructured the workforce and modernised investigative practice. Measurable reductions in regional volume crime followed.</p>
                </div>
              </div>
            </div>

            <div className="relative p-10 xl:p-14 border-b lg:border-b-0 lg:border-r border-silver/10 flex flex-col">
              <p className="text-accent font-bold tracking-[0.2em] text-xs uppercase mb-6">Government / Digital Operations</p>
              <div className="space-y-5 flex-grow">
                <div>
                  <p className="text-surface/40 font-bold tracking-[0.15em] text-[11px] uppercase mb-2">The situation</p>
                  <p className="text-surface/80 font-light leading-relaxed text-base lg:text-lg">A government agency needed a digital screening capability at scale, replacing a paper-based process that could not handle the operational volume during a sustained crisis.</p>
                </div>
                <div>
                  <p className="text-surface/40 font-bold tracking-[0.15em] text-[11px] uppercase mb-2">The gap</p>
                  <p className="text-surface/80 font-light leading-relaxed text-base lg:text-lg">No digital infrastructure existed. A large workforce required real-time coordination across a politically sensitive and rapidly evolving operation.</p>
                </div>
                <div>
                  <p className="text-surface/40 font-bold tracking-[0.15em] text-[11px] uppercase mb-2">The result</p>
                  <p className="text-surface/80 font-light leading-relaxed text-base lg:text-lg">Designed and commanded the programme from the ground up. Paper process replaced entirely. Operation delivered without incident.</p>
                </div>
              </div>
            </div>

            <div className="relative p-10 xl:p-14 flex flex-col">
              <p className="text-accent font-bold tracking-[0.2em] text-xs uppercase mb-6">Government / Intelligence Architecture</p>
              <div className="space-y-5 flex-grow">
                <div>
                  <p className="text-surface/40 font-bold tracking-[0.15em] text-[11px] uppercase mb-2">The situation</p>
                  <p className="text-surface/80 font-light leading-relaxed text-base lg:text-lg">A government agency's intelligence infrastructure existed in disconnected systems, with no single operational picture available to frontline commanders.</p>
                </div>
                <div>
                  <p className="text-surface/40 font-bold tracking-[0.15em] text-[11px] uppercase mb-2">The gap</p>
                  <p className="text-surface/80 font-light leading-relaxed text-base lg:text-lg">Intelligence was not reaching the people who needed it at the speed they needed it.</p>
                </div>
                <div>
                  <p className="text-surface/40 font-bold tracking-[0.15em] text-[11px] uppercase mb-2">The result</p>
                  <p className="text-surface/80 font-light leading-relaxed text-base lg:text-lg">Led the architecture and deployment of a real-time intelligence environment, aggregating multiple sources into a single actionable picture integrated with frontline systems.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section id="manifesto" ref={philRef} className="relative py-20 w-full bg-primary z-10 border-y border-silver/5">
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center">
          <h2 className="phil-elem font-light text-4xl md:text-[3rem] text-silver/80 leading-tight tracking-wide">
            Strategic vision without capability is a liability.<br />I engineer <span className="text-surface font-serif italic font-normal">genuine operational reality.</span>
          </h2>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 px-6 w-full bg-surface relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-5 order-1 rounded-[2rem] overflow-hidden shadow-2xl bg-background border border-silver/20 sticky top-32">
            <img
              src="/Brad_Professional_Shot_clean.webp"
              alt="Brad Warburton - Principal Advisor"
              className="w-full h-[400px] object-cover object-top"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary to-transparent p-10 pt-32">
              <p className="text-surface font-semibold text-2xl tracking-wide">Brad Warburton</p>
              <p className="text-accent font-bold tracking-[0.2em] text-xs uppercase mt-2">Principal Advisor</p>
            </div>
          </div>
          <div className="lg:col-span-7 order-2 space-y-8">
            <div>
              <h2 className="font-light text-4xl lg:text-[3.2rem] text-primary leading-tight tracking-tight">
                <span className="font-semibold block mb-2">Law enforcement precision.</span>
                Private sector scalability.
              </h2>
            </div>

            <div className="space-y-5 text-textDark/80 leading-relaxed text-xl font-light">
              <p>
                With 30 years in law enforcement command, I drove operational and technological transformation under budgetary and compliance pressures, delivering outcomes amid complex policy and legislative demands. My achievements include designing a digital border screening programme processing over one million traveller applications, establishing a real-time crime centre, and leading high-governance programme delivery from conception to deployment.
              </p>
              <p>
                I have since applied the same rigour to the private sector, establishing a law enforcement presence across all Australian states and territories, influencing successful operations nationally, and delivering measurable outcomes in complex environments.
              </p>
              <p>
                I help you identify and resolve breakdowns in your systems, processes, and workflows. Drawing on my network, I connect you with the right technology partners to deliver measurable improvements within your operational constraints.
              </p>
            </div>

            <div className="flex flex-col gap-0 pt-6 border-t border-silver/20 mt-2">
              {[
                "Systems & Process Optimisation",
                "Technology Integration & Capability Deployment",
                "Organisational Design & Change Management",
                "Strategic Advisory & Programme Leadership",
                "Closing the Intent-Execution Gap"
              ].map((skill, index) => (
                <div key={index} className="group relative py-4 border-b border-silver/20 flex items-center justify-between overflow-hidden cursor-default transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out pointer-events-none"></div>
                  <div className="flex items-center gap-6 relative z-10 w-full transform group-hover:translate-x-3 transition-transform duration-500 ease-out">
                    <div className="w-1.5 h-1.5 bg-primary/20 group-hover:bg-gold rotate-45 transform group-hover:rotate-90 group-hover:scale-125 transition-all duration-500 ease-out flex-shrink-0"></div>
                    <span className="font-semibold text-primary text-[13px] md:text-[15px] tracking-[0.15em] group-hover:tracking-[0.18em] uppercase group-hover:text-accent transition-all duration-500 pr-4">
                      {skill}
                    </span>
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-[1px] bg-accent group-hover:w-16 md:group-hover:w-28 transition-all duration-700 ease-out z-10 opacity-0 group-hover:opacity-100"></div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <a href="https://portal.bwadvisorysolutions.com.au/intake.html" className="inline-block group relative overflow-hidden bg-[#1A3560]/90 backdrop-blur-xl border border-[#1B6EC2]/50 px-10 py-4 rounded-full text-surface font-semibold text-sm hover:border-[#1B6EC2] hover:bg-[#1B6EC2]/20 transition-all duration-500 tracking-[0.2em] uppercase flex items-center justify-center gap-4 shadow-[0_4px_16px_rgba(27,110,194,0.15)] hover:shadow-[0_6px_20px_rgba(27,110,194,0.3)] w-max">
                Request a scoping session
                <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE ENGAGEMENT ── */}
      <HowWeWorkTogether />

      {/* ── 8-MINUTE DIAGNOSTIC MOMENT ── */}
      <section className="py-20 w-full relative z-10 bg-[#0A1E3D] overflow-hidden border-t border-silver/[0.06]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px" />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <p className="text-accent/70 font-bold tracking-[0.28em] uppercase text-[11px] mb-8">
            Before the first conversation &nbsp;·&nbsp; 8 min &nbsp;·&nbsp; 10 questions
          </p>
          <h2 className="font-light text-3xl md:text-4xl lg:text-5xl text-surface tracking-tight mb-5 leading-[1.2]">
            Understand exactly where your operation is exposed<br />
            <span className="font-serif italic text-accent">before any conversation.</span>
          </h2>
          <p className="text-lg text-surface/50 font-light leading-relaxed max-w-xl mx-auto mb-10">
            Four diagnostics across two practice areas. Ten questions each, eight minutes. Each report is reviewed by Brad before it reaches you — no automated output.
          </p>
          <Link
            to="/diagnostics"
            className="group relative overflow-hidden bg-accent px-10 py-4 rounded-full text-white font-bold text-sm hover:bg-[#155A9E] border border-white/20 transition-all duration-500 tracking-[0.2em] uppercase inline-flex items-center gap-4 shadow-[0_4px_16px_rgba(27,110,194,0.25)] hover:shadow-[0_6px_24px_rgba(27,110,194,0.4)] ring-1 ring-accent/50"
          >
            See the diagnostics
            <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </Link>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 px-6 w-full bg-surface border-t border-silver/5 relative z-10 flex items-center justify-center font-sans">
        <div className="max-w-[960px] w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

          <div className="flex flex-col gap-6">
            <p className="text-[14px] md:text-[16px] font-bold tracking-[0.22em] uppercase text-accent">
              Get in touch
            </p>
            <h2 className="font-light text-[clamp(1.8rem,3.5vw,2.6rem)] text-primary leading-[1.2] tracking-tight">
              The gap between intent and reality{' '}
              <em className="font-serif italic text-primary/60">
                starts with a conversation.
              </em>
            </h2>
            <p className="text-[16px] text-textDark/80 leading-[1.8] max-w-[380px] font-light">
              Thirty minutes is enough. I will understand your challenge, and you will understand my approach. No proposal until we have talked.
            </p>

            <div className="w-8 h-[2px] bg-gold" />

            <div className="flex flex-col gap-4 pt-4">
              {[
                { prefix: 'E //', href: 'mailto:brad@bwadvisorysolutions.com.au', label: 'brad@bwadvisorysolutions.com.au' },
                { prefix: 'M //', href: 'tel:+61407779474', label: '+61 407 779 474' },
                { prefix: 'LI //', href: 'https://linkedin.com/in/bradwarburton', label: 'linkedin.com/in/bradwarburton', external: true },
              ].map(({ prefix, href, label, external }) => (
                <div key={prefix} className="flex items-center gap-4 group">
                  <span className="text-[12px] md:text-[13px] font-bold tracking-[0.18em] uppercase text-accent w-[3rem] flex-shrink-0">
                    {prefix}
                  </span>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="text-[15px] md:text-[17px] text-textDark/90 transition-all duration-200 group-hover:text-accent font-medium tracking-wide underline decoration-silver/60 hover:decoration-accent underline-offset-4"
                  >
                    {label}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-[#1A3560] border border-[#1B6EC2]/40 rounded-3xl p-10 lg:p-12 flex flex-col gap-6 shadow-[0_8px_32px_rgba(10,28,66,0.25)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B6EC2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <h3 className="font-light text-2xl lg:text-3xl text-surface leading-[1.3] tracking-wide">
                Book a 30-minute consultation
              </h3>
              <p className="text-[15px] lg:text-[16px] text-silver/90 leading-[1.7] font-light">
                A direct conversation about your challenge. We will determine whether there is a fit and what an engagement would involve.
              </p>
              <a
                href="https://portal.bwadvisorysolutions.com.au/intake.html"
                className="group relative overflow-hidden bg-accent px-10 py-5 rounded-full text-white font-bold text-sm md:text-base hover:bg-[#155A9E] border border-white/20 transition-all duration-500 tracking-[0.2em] uppercase text-center flex items-center justify-center gap-4 shadow-[0_4px_16px_rgba(27,110,194,0.25)] hover:shadow-[0_6px_24px_rgba(27,110,194,0.4)] ring-1 ring-accent/50 group-hover:ring-accent mt-4 z-10 w-full"
              >
                Schedule your call
                <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
