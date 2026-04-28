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
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1
      });

      gsap.from(".shield-elem", {
        y: -50,
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        ease: "power2.out",
        delay: 0.1
      });

      gsap.from(".solutions-word", {
        scale: 1.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "expo.out",
        delay: 0.8
      });

      gsap.from(".solutions-line", {
        scaleX: 0,
        opacity: 0,
        duration: 0.6,
        ease: "power3.inOut",
        delay: 1.2
      });

      gsap.from(".hero-elem", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power2.out",
        delay: 1.0
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
      <section ref={heroRef} className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center pt-24 pb-16 px-8 z-10 text-center overflow-hidden bg-primary">
        {/* Professional Tech City Background */}
        <div className="absolute inset-0 z-0">
          {/* Background Image - Tech City Skyline */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")',
              backgroundPosition: 'center 20%',
              transform: 'scale(1.05)',
              animation: 'subtle-zoom 8s ease-in-out infinite'
            }}
          ></div>

          {/* Professional Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/50 via-[#0F172A]/60 to-[#0A1520]/70"></div>

          {/* Side Angle Overlay - Creates depth effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1520]/40 via-transparent to-[#0A1520]/20"></div>

          {/* Premium Accent Glow */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#0369A1]/6 rounded-full blur-3xl opacity-30" style={{
            animation: 'float 8s ease-in-out infinite'
          }}></div>

          {/* Bottom Vignette */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0A1520] via-[#0A1520]/50 to-transparent"></div>
        </div>

        <style>{`
          @keyframes subtle-zoom {
            0%, 100% { transform: scale(1.05); }
            50% { transform: scale(1.08); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(15px); }
          }
        `}</style>

        <div className="w-full max-w-[900px] mx-auto mb-12 relative flex flex-col items-center justify-center select-none pt-4 z-10">
          <div className="shield-elem mb-16 w-28 h-32 md:w-40 md:h-44 relative z-20 mx-auto drop-shadow-[0_0_60px_rgba(3,105,161,0.6)] hover:drop-shadow-[0_0_80px_rgba(3,105,161,0.8)] transition-all duration-500">
            <TransparentShield />
          </div>

          <div className="flex flex-col items-center gap-10">
            <h2 className="logo-letter font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-[0.02em] text-white leading-tight inline-block drop-shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
              BW ADVISORY
            </h2>
            <div className="flex items-center gap-8 w-full justify-center">
              <div className="h-[1px] flex-grow max-w-[80px] bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-[#C9A84C]/60"></div>
              <p className="font-sans font-semibold text-[#C9A84C] tracking-[0.2em] text-xs md:text-sm uppercase opacity-90">
                SOLUTIONS
              </p>
              <div className="h-[1px] flex-grow max-w-[80px] bg-gradient-to-l from-transparent via-[#C9A84C]/40 to-[#C9A84C]/60"></div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto mt-16 relative z-20">
          <h1 className="hero-elem font-display font-bold text-6xl md:text-8xl lg:text-[6.5rem] tracking-tight leading-[1.1] text-white drop-shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            Strategic Clarity.<br className="hidden md:block" />
            <span className="font-serif italic text-[#C9A84C] block mt-4 text-5xl md:text-7xl lg:text-6xl">Operational Reality.</span>
          </h1>

          <p className="hero-elem text-silver/75 mx-auto text-xl md:text-2xl leading-relaxed mt-12 font-light tracking-wide max-w-4xl">
            The distance between what leadership intends and what happens at the frontline is where organisations lose value. <span className="text-white font-semibold">I close that gap.</span>
          </p>

          <div className="hero-elem pt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="https://portal.bwadvisorysolutions.com.au/" className="group relative overflow-hidden bg-[#C9A84C] px-12 md:px-16 py-5 md:py-6 rounded-full text-[#0F172A] font-bold text-base md:text-lg hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase text-center flex items-center justify-center gap-3 shadow-[0_12px_32px_rgba(201,168,76,0.4)] hover:shadow-[0_16px_48px_rgba(201,168,76,0.6)] border border-white/10 hover:border-white/20 cursor-pointer min-w-[280px]">
              Schedule Consultation
              <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </a>
          </div>
        </div>

      </section>

      {/* ── INSIGHT CARD ── */}
      <section className="py-24 w-full relative z-10 bg-gradient-to-b from-primary via-[#0D1520] to-primary">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative bg-white/5 backdrop-blur-sm border border-accent/30 rounded-3xl p-12 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <div className="absolute -top-1 -left-1 w-12 h-12 border-t-2 border-l-2 border-accent/50 rounded-full"></div>
            <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-2 border-r-2 border-accent/50 rounded-full"></div>

            <div className="space-y-6 text-center">
              <p className="text-xs font-mono tracking-[0.3em] uppercase text-accent/70 font-bold">Strategic Reality</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                Organisations lose millions where intent collides with execution.
              </h2>
              <p className="text-base md:text-lg text-silver/80 font-light leading-relaxed max-w-3xl mx-auto">
                I locate that friction and engineer genuine operational reality.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ── PRACTICE AREAS ── */}
      <section className="py-32 w-full relative z-10 bg-primary">
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
          <div className="mb-24 max-w-4xl">
            <p className="text-[#C9A84C] font-mono tracking-[0.3em] uppercase text-xs mb-6 font-bold">How I Close The Gap</p>
            <h2 className="font-display font-bold text-6xl md:text-7xl lg:text-8xl text-white tracking-tight mb-8">Two Focus Areas.</h2>
            <p className="text-xl md:text-2xl text-silver/75 font-light leading-relaxed">
              Every engagement is tailored to your challenge. These are the areas where I deliver measurable outcomes and lasting operational change.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* General Advisory */}
            <a href="/#framework" className="group relative overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/30 to-accent/30 rounded-3xl opacity-0 group-hover:opacity-70 transition-all duration-700 blur-xl"></div>
              <div className="relative block bg-gradient-to-br from-[#1A3560]/80 via-[#0D1520]/60 to-[#051020]/80 border border-accent/40 group-hover:border-[#C9A84C]/60 rounded-3xl p-12 md:p-16 transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(201,168,76,0.2)] h-full flex flex-col">
                <div className="flex items-start justify-between mb-10">
                  <div className="space-y-4">
                    <p className="text-[#C9A84C] font-mono tracking-[0.3em] text-xs uppercase font-bold">Service Area 01</p>
                    <h3 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">Strategic & Operational Advisory</h3>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#C9A84C]/20 to-accent/10 rounded-2xl group-hover:from-[#C9A84C]/40 group-hover:to-accent/20 transition-all duration-500 flex-shrink-0">
                    <svg className="w-10 h-10 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <p className="text-silver/85 font-light text-lg leading-relaxed mb-10">
                  Identifying where execution breaks down. Rebuilding the path from strategic intent to frontline performance across law enforcement, government, and the private sector.
                </p>
                <div className="mt-auto">
                  <div className="flex items-center gap-3 text-[#C9A84C] font-bold text-sm tracking-[0.15em] uppercase group-hover:gap-4 transition-all duration-300">
                    <span>Explore Our Method</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* Loss Intelligence */}
            <Link to="/loss-intelligence" className="group relative overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/30 to-accent/30 rounded-3xl opacity-0 group-hover:opacity-70 transition-all duration-700 blur-xl"></div>
              <div className="relative block bg-gradient-to-br from-[#1A3560]/80 via-[#0D1520]/60 to-[#051020]/80 border border-accent/40 group-hover:border-[#C9A84C]/60 rounded-3xl p-12 md:p-16 transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(201,168,76,0.2)] h-full flex flex-col">
                <div className="flex items-start justify-between mb-10">
                  <div className="space-y-4">
                    <p className="text-[#C9A84C] font-mono tracking-[0.3em] text-xs uppercase font-bold">Service Area 02</p>
                    <h3 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">Loss Intelligence & Investigations</h3>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#C9A84C]/20 to-accent/10 rounded-2xl group-hover:from-[#C9A84C]/40 group-hover:to-accent/20 transition-all duration-500 flex-shrink-0">
                    <svg className="w-10 h-10 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-silver/85 font-light text-lg leading-relaxed mb-10">
                  Building structured capability to detect, investigate, and prevent retail loss — from governance framework to active intelligence pipeline. One engagement. Embedded results.
                </p>
                <div className="mt-auto">
                  <div className="flex items-center gap-3 text-[#C9A84C] font-bold text-sm tracking-[0.15em] uppercase group-hover:gap-4 transition-all duration-300">
                    <span>Learn More</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY: THE APPROACH ── */}
      <section id="framework" className="py-32 w-full relative z-10 bg-gradient-to-b from-[#0D1520] to-primary">
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
          <div className="mb-24 max-w-3xl">
            <p className="text-accent font-mono tracking-[0.3em] uppercase text-xs font-bold mb-6">Proprietary Methodology</p>
            <h2 className="font-display font-bold text-6xl md:text-7xl lg:text-8xl text-white tracking-tight mb-8">The Approach</h2>
            <p className="text-xl md:text-2xl text-silver/80 font-light leading-relaxed">
              Every engagement follows a disciplined three-stage protocol, from understanding your operational reality to closing the gap.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Stage 01 */}
            <div className="feature-card group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-accent/40 to-accent/0 rounded-2xl opacity-0 group-hover:opacity-50 transition-all duration-700 blur-lg"></div>
              <div className="relative bg-white/3 backdrop-blur-sm border border-accent/20 hover:border-accent/40 rounded-2xl p-10 h-full transition-all duration-500 group-hover:bg-white/5">
                <div className="space-y-6">
                  <div className="framework-number text-8xl md:text-9xl font-display font-bold text-silver/10 leading-none select-none">01</div>
                  <h3 className="font-display font-bold text-4xl text-white">Identify.</h3>
                  <p className="text-accent font-mono tracking-[0.2em] text-xs uppercase font-bold">Understand the reality</p>
                  <p className="text-silver/80 leading-relaxed font-light text-lg">
                    Structured conversations reveal your true strategic intent, operational gaps, and the hidden friction undermining execution.
                  </p>
                </div>
              </div>
            </div>

            {/* Stage 02 */}
            <div className="feature-card group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-accent/40 to-accent/0 rounded-2xl opacity-0 group-hover:opacity-50 transition-all duration-700 blur-lg"></div>
              <div className="relative bg-white/3 backdrop-blur-sm border border-accent/20 hover:border-accent/40 rounded-2xl p-10 h-full transition-all duration-500 group-hover:bg-white/5">
                <div className="space-y-6">
                  <div className="framework-number text-8xl md:text-9xl font-display font-bold text-silver/10 leading-none select-none">02</div>
                  <h3 className="font-display font-bold text-4xl text-white">Strategise.</h3>
                  <p className="text-accent font-mono tracking-[0.2em] text-xs uppercase font-bold">Design the solution</p>
                  <p className="text-silver/80 leading-relaxed font-light text-lg">
                    With 30 years of law enforcement and private sector experience, I diagnose root cause and develop executable strategies with clear accountability.
                  </p>
                </div>
              </div>
            </div>

            {/* Stage 03 */}
            <div className="feature-card group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-accent/40 to-accent/0 rounded-2xl opacity-0 group-hover:opacity-50 transition-all duration-700 blur-lg"></div>
              <div className="relative bg-white/3 backdrop-blur-sm border border-accent/20 hover:border-accent/40 rounded-2xl p-10 h-full transition-all duration-500 group-hover:bg-white/5">
                <div className="space-y-6">
                  <div className="framework-number text-8xl md:text-9xl font-display font-bold text-silver/10 leading-none select-none">03</div>
                  <h3 className="font-display font-bold text-4xl text-white">Operationalise.</h3>
                  <p className="text-accent font-mono tracking-[0.2em] text-xs uppercase font-bold">Embed the reality</p>
                  <p className="text-silver/80 leading-relaxed font-light text-lg">
                    I remain accountable for outcomes. I embed change, align people, and measure what matters until execution closes the gap.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center w-full pt-8">
            <a href="https://portal.bwadvisorysolutions.com.au/" className="group relative overflow-hidden bg-[#C9A84C] px-12 md:px-16 py-5 md:py-6 rounded-lg text-[#0F172A] font-bold text-sm md:text-base hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase inline-flex items-center justify-center gap-4 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10 cursor-pointer">
              Request a Scoping Session
              <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES: APPLIED WORK ── */}
      <section className="py-32 w-full relative z-10 bg-primary">
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
          <div className="mb-24 max-w-4xl">
            <p className="text-[#C9A84C] font-mono tracking-[0.3em] uppercase text-xs font-bold mb-6">Operational Proof</p>
            <h2 className="font-display font-bold text-6xl md:text-7xl lg:text-8xl text-white tracking-tight mb-8">Applied Work</h2>
            <p className="text-xl md:text-2xl text-silver/75 font-light leading-relaxed">
              Details remain confidential. The problems solved and outcomes delivered are not.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Case Study 01 */}
            <div className="relative group overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/40 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-50 transition-all duration-700 blur-lg"></div>
              <div className="relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-sm border border-accent/30 group-hover:border-[#C9A84C]/50 rounded-2xl p-10 md:p-12 h-full transition-all duration-500 group-hover:bg-white/12">
                <div className="absolute top-6 right-6 w-14 h-14 bg-gradient-to-br from-[#C9A84C]/20 to-accent/10 rounded-full flex items-center justify-center group-hover:from-[#C9A84C]/30 group-hover:to-accent/20 transition-all duration-500">
                  <span className="text-[#C9A84C] font-display font-bold text-xl">01</span>
                </div>
                <h3 className="font-display font-bold text-3xl text-white mb-2 pr-16">Organisational Redesign</h3>
                <p className="text-[#C9A84C] text-xs font-mono tracking-widest uppercase font-bold mb-6">Law Enforcement / Government</p>
                <div className="space-y-6">
                  <div className="pb-5 border-b border-accent/15">
                    <p className="text-accent/70 font-mono text-xs tracking-widest uppercase font-bold mb-2">The Situation</p>
                    <p className="text-silver/85 font-light leading-relaxed text-sm">Large operational unit with entrenched practices and persistent performance gaps despite adequate resourcing.</p>
                  </div>
                  <div className="pb-5 border-b border-accent/15">
                    <p className="text-accent/70 font-mono text-xs tracking-widest uppercase font-bold mb-2">The Gap</p>
                    <p className="text-silver/85 font-light leading-relaxed text-sm">Investigative culture lagged behind intelligence capability. Tools existed. Practice did not.</p>
                  </div>
                  <div className="pb-5 border-b border-accent/15">
                    <p className="text-accent/70 font-mono text-xs tracking-widest uppercase font-bold mb-2">The Outcome</p>
                    <p className="text-silver/85 font-light leading-relaxed text-sm">Workforce restructured, investigative practice modernised. Regional volume crime decreased measurably.</p>
                  </div>
                  <div className="pt-2">
                    <p className="text-[#C9A84C] font-mono text-xs tracking-widest uppercase font-bold mb-2">Impact</p>
                    <p className="text-white font-bold text-lg">↓ 28% Crime Volume</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 02 */}
            <div className="relative group overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/40 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-50 transition-all duration-700 blur-lg"></div>
              <div className="relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-sm border border-accent/30 group-hover:border-[#C9A84C]/50 rounded-2xl p-10 md:p-12 h-full transition-all duration-500 group-hover:bg-white/12">
                <div className="absolute top-6 right-6 w-14 h-14 bg-gradient-to-br from-[#C9A84C]/20 to-accent/10 rounded-full flex items-center justify-center group-hover:from-[#C9A84C]/30 group-hover:to-accent/20 transition-all duration-500">
                  <span className="text-[#C9A84C] font-display font-bold text-xl">02</span>
                </div>
                <h3 className="font-display font-bold text-3xl text-white mb-2 pr-16">Digital Operations at Scale</h3>
                <p className="text-[#C9A84C] text-xs font-mono tracking-widest uppercase font-bold mb-6">Government / Crisis Response</p>
                <div className="space-y-6">
                  <div className="pb-5 border-b border-accent/15">
                    <p className="text-accent/70 font-mono text-xs tracking-widest uppercase font-bold mb-2">The Situation</p>
                    <p className="text-silver/85 font-light leading-relaxed text-sm">Government agency required digital screening at scale during crisis, replacing inadequate paper-based process.</p>
                  </div>
                  <div className="pb-5 border-b border-accent/15">
                    <p className="text-accent/70 font-mono text-xs tracking-widest uppercase font-bold mb-2">The Gap</p>
                    <p className="text-silver/85 font-light leading-relaxed text-sm">No digital infrastructure. Large workforce needed real-time coordination across politically sensitive operation.</p>
                  </div>
                  <div className="pb-5 border-b border-accent/15">
                    <p className="text-accent/70 font-mono text-xs tracking-widest uppercase font-bold mb-2">The Outcome</p>
                    <p className="text-silver/85 font-light leading-relaxed text-sm">Programme designed and commanded from ground up. Paper process eliminated entirely. Operation delivered without incident.</p>
                  </div>
                  <div className="pt-2">
                    <p className="text-[#C9A84C] font-mono text-xs tracking-widest uppercase font-bold mb-2">Impact</p>
                    <p className="text-white font-bold text-lg">2.1K+ Processed / 6 Days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 03 */}
            <div className="relative group overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/40 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-50 transition-all duration-700 blur-lg"></div>
              <div className="relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-sm border border-accent/30 group-hover:border-[#C9A84C]/50 rounded-2xl p-10 md:p-12 h-full transition-all duration-500 group-hover:bg-white/12">
                <div className="absolute top-6 right-6 w-14 h-14 bg-gradient-to-br from-[#C9A84C]/20 to-accent/10 rounded-full flex items-center justify-center group-hover:from-[#C9A84C]/30 group-hover:to-accent/20 transition-all duration-500">
                  <span className="text-[#C9A84C] font-display font-bold text-xl">03</span>
                </div>
                <h3 className="font-display font-bold text-3xl text-white mb-2 pr-16">Intelligence Architecture</h3>
                <p className="text-[#C9A84C] text-xs font-mono tracking-widest uppercase font-bold mb-6">Government / Multi-Agency</p>
                <div className="space-y-6">
                  <div className="pb-5 border-b border-accent/15">
                    <p className="text-accent/70 font-mono text-xs tracking-widest uppercase font-bold mb-2">The Situation</p>
                    <p className="text-silver/85 font-light leading-relaxed text-sm">Government intelligence infrastructure fragmented across disconnected systems. No single operational picture for frontline commanders.</p>
                  </div>
                  <div className="pb-5 border-b border-accent/15">
                    <p className="text-accent/70 font-mono text-xs tracking-widest uppercase font-bold mb-2">The Gap</p>
                    <p className="text-silver/85 font-light leading-relaxed text-sm">Intelligence didn't reach decision-makers at speed. Information silos prevented unified command.</p>
                  </div>
                  <div className="pb-5 border-b border-accent/15">
                    <p className="text-accent/70 font-mono text-xs tracking-widest uppercase font-bold mb-2">The Outcome</p>
                    <p className="text-silver/85 font-light leading-relaxed text-sm">Real-time intelligence environment deployed. Multiple sources aggregated into single actionable picture integrated with frontline systems.</p>
                  </div>
                  <div className="pt-2">
                    <p className="text-[#C9A84C] font-mono text-xs tracking-widest uppercase font-bold mb-2">Impact</p>
                    <p className="text-white font-bold text-lg">↓ 40% Decision Latency</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO: THE DOCTRINE ── */}
      <section id="manifesto" ref={philRef} className="relative py-32 w-full bg-gradient-to-r from-[#051020] via-primary to-[#051020] z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-silver/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center">
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-accent"></div>
            <p className="text-accent font-mono tracking-[0.3em] text-xs uppercase font-bold">Operational Doctrine</p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-accent"></div>
          </div>

          <h2 className="phil-elem font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-6">
            Vision without capability is liability.
          </h2>
          <p className="phil-elem font-light text-2xl md:text-4xl text-silver/80 leading-relaxed">
            I engineer <span className="font-display font-bold text-accent italic">genuine operational reality.</span>
          </p>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 px-6 w-full bg-surface relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-5 order-1 flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-background border border-silver/20">
              <img
                src="/Brad_Professional_Shot_clean.webp"
                alt="Brad Warburton - Principal Advisor"
                className="w-full h-[450px] object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="text-center">
              <p className="text-primary font-bold text-2xl tracking-wide">Brad Warburton</p>
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

            <div className="space-y-6 text-textDark/90 leading-relaxed text-xl font-light">
              <p>
                Thirty years in law enforcement command. Decades of operational and technological transformation under extreme pressure. From designing digital border programmes processing millions to establishing real-time crime centres, I bridge the gap between policy and deployment.
              </p>
              <p>
                In the private sector, I have established national law enforcement partnerships and delivered measurable outcomes in high-governance environments across all Australian states and territories.
              </p>
              <p>
                I identify and resolve the friction points in your systems. By leveraging a global network of technology partners, I deliver measurable operational improvements within your specific constraints.
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

            <div className="pt-8">
              <a href="https://portal.bwadvisorysolutions.com.au/" className="inline-block group relative overflow-hidden bg-[#C9A84C] px-12 py-4 rounded-full text-[#0F172A] font-bold text-sm hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase flex items-center justify-center gap-3 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10 w-max cursor-pointer">
                Request a Scoping Session
                <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE ENGAGEMENT ── */}
      <HowWeWorkTogether />

      {/* ── DIAGNOSTICS PATHWAY ── */}
      <section className="py-32 w-full relative z-10 bg-gradient-to-b from-primary via-[#0D1520] to-primary overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
          <div className="space-y-4">
            <p className="text-accent font-mono tracking-[0.3em] uppercase text-xs font-bold">Diagnostic Assessment</p>
            <h2 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
              Know Your Exposure
            </h2>
            <p className="text-xl md:text-2xl text-silver/80 font-light leading-relaxed">
              Before any conversation. Eight minutes. Ten questions. Reviewed by Brad — no automated output.
            </p>
          </div>

          <div className="pt-8 flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-silver/70 font-light text-sm">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                4 diagnostics
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                2 practice areas
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                8 minutes each
              </span>
            </div>

            <Link
              to="/diagnostics"
              className="group relative overflow-hidden bg-[#C9A84C] px-12 md:px-16 py-5 md:py-6 rounded-lg text-[#0F172A] font-bold text-sm md:text-base hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase inline-flex items-center justify-center gap-4 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10"
            >
              Access All Diagnostics
              <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENT: THE CONVERSATION ── */}
      <section id="contact" className="py-32 px-6 w-full bg-gradient-to-b from-[#0D1520] via-primary to-primary relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Side: Messaging */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-accent font-mono tracking-[0.3em] uppercase text-xs font-bold">Let's Talk</p>
                <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight">
                  The Gap Closes with Conversation
                </h2>
              </div>

              <p className="text-xl text-silver/80 font-light leading-relaxed">
                Thirty minutes is enough. I'll understand your challenge. You'll understand my approach. No proposal until we've talked.
              </p>

              <div className="space-y-6 pt-8 border-t border-accent/20">
                <div className="space-y-3">
                  <p className="text-accent/70 font-mono text-xs tracking-widest uppercase font-bold">Email</p>
                  <a href="mailto:brad@bwadvisorysolutions.com.au" className="text-silver/80 hover:text-accent transition-colors font-light text-lg">
                    brad@bwadvisorysolutions.com.au
                  </a>
                </div>
                <div className="space-y-3">
                  <p className="text-accent/70 font-mono text-xs tracking-widest uppercase font-bold">Phone</p>
                  <a href="tel:+61407779474" className="text-silver/80 hover:text-accent transition-colors font-light text-lg">
                    +61 407 779 474
                  </a>
                </div>
                <div className="space-y-3">
                  <p className="text-accent/70 font-mono text-xs tracking-widest uppercase font-bold">LinkedIn</p>
                  <a href="https://linkedin.com/in/bradwarburton" target="_blank" rel="noreferrer" className="text-silver/80 hover:text-accent transition-colors font-light text-lg">
                    linkedin.com/in/bradwarburton
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: CTA Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-accent/40 to-accent/0 rounded-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 blur-xl"></div>
              <div className="relative bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border border-accent/30 hover:border-accent/60 rounded-3xl p-12 lg:p-16 transition-all duration-500 group-hover:bg-white/12">
                <div className="space-y-6">
                  <h3 className="font-display font-bold text-4xl text-white">
                    Schedule a Consultation
                  </h3>
                  <p className="text-silver/80 font-light text-lg leading-relaxed">
                    A direct conversation about your challenge. We'll determine fit and what an engagement would involve.
                  </p>
                  <a
                    href="https://portal.bwadvisorysolutions.com.au/"
                    className="group/btn relative overflow-hidden bg-[#C9A84C] px-12 md:px-14 py-5 md:py-6 rounded-lg text-[#0F172A] font-bold text-sm md:text-base hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase inline-flex items-center justify-center gap-4 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10 w-full cursor-pointer"
                  >
                    Schedule Call
                    <svg className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
