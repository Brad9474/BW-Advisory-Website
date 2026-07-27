import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import posthog from 'posthog-js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const groups = [
  {
    label: "Stream 01",
    name: "AI Readiness",
    desc: "For professional services firms and healthcare practices.",
    items: [
      {
        id: "ai-readiness-diagnostic",
        short: "AI Readiness",
        num: "01",
        badge: "AI Readiness Diagnostic",
        audience: "Professional services firms · Allied health and healthcare practices",
        duration: "5 min · 5 sections · 28 questions",
        desc: "Five sections. Five minutes. A scored result covering AI readiness, process optimisation opportunities, and security posture — with an opportunity estimate of what your gaps are costing you.",
        href: "/ai-readiness",
        internal: true,
        icon: "/ai-icon.svg",
        aiPowered: true,
      },
    ]
  },
  {
    label: "Stream 02",
    name: "Strategic & Operational",
    desc: "Identify the gap between intent and execution.",
    items: [
      {
        id: "strategic-diagnostic",
        short: "Strategic",
        num: "02",
        badge: "Strategic Diagnostic",
        audience: "CEO · Board · Senior Leadership",
        duration: "8 min · 10 questions",
        desc: "Maps the systemic gap between leadership intent and organisational delivery. Focuses on alignment, execution, and risk posture.",
        href: "/strategic-diagnostic",
        internal: true,
      },
      {
        id: "operational-diagnostic",
        short: "Operational",
        num: "03",
        badge: "Operational Diagnostic",
        audience: "GM · Head of Operations · Delivery Lead",
        duration: "8 min · 10 questions",
        desc: "Surfaces the functional friction between tactical decisions and frontline capability across processes, systems, and accountability.",
        href: "/operational-diagnostic",
        internal: true,
      },
    ]
  },
  {
    label: "Stream 03",
    name: "Loss Intelligence & Investigations",
    desc: "Assess your retail crime defence and investigation capability.",
    items: [
      {
        id: "loss-intelligence-diagnostic",
        short: "Loss Intelligence",
        num: "04",
        badge: "Loss Intelligence Diagnostic",
        audience: "GM · CEO · CFO",
        duration: "8 min · 10 questions",
        desc: "Assesses your capability to transform incident data into actionable loss intelligence. For leaders seeking to disrupt systemic retail crime and minimise exposure.",
        href: "/loss-intelligence-diagnostic",
        internal: true,
      },
      {
        id: "investigations-capability-diagnostic",
        short: "Investigations",
        num: "05",
        badge: "Investigations Capability Diagnostic",
        audience: "LP Manager · Head of Security · Risk Manager",
        duration: "8 min · 10 questions",
        desc: "Assesses the integrity of the investigation lifecycle from signal collection to defensible documentation and outcome.",
        href: "/investigations-diagnostic",
        internal: true,
      },
    ]
  }
];

const allItems = groups.flatMap((group) => group.items);

const cardGlyph = (item) => {
  if (item.aiPowered && item.icon) {
    return (
      <div className="flex items-center gap-2.5 bg-gradient-to-r from-[#C9A84C]/20 to-accent/20 border border-[#C9A84C]/40 rounded-full pl-3 pr-4 py-2 shrink-0">
        <img src={item.icon} alt="" className="w-8 h-8" />
        <span className="flex items-center gap-1.5 text-[#C9A84C] font-mono text-[10px] tracking-[0.2em] uppercase font-bold whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
          AI-Powered
        </span>
      </div>
    );
  }
  if (item.icon) return <img src={item.icon} alt="" className="w-14 h-14 shrink-0" />;
  return null;
};

const DiagnosticCardBody = ({ item }) => (
  <>
    {!item.comingSoon && (
      <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/40 to-accent/20 rounded-3xl opacity-0 group-hover:opacity-50 transition-all duration-700 blur-lg"></div>
    )}
    <div className={`relative bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-10 lg:p-12 transition-all duration-500 flex flex-col h-full ${item.comingSoon ? 'opacity-70' : 'group-hover:border-[#C9A84C]/50 group-hover:bg-white/22'}`}>
      <div className="flex items-start justify-between mb-8 gap-6">
        <div className="space-y-3">
          <p className="text-[#C9A84C] font-mono tracking-[0.2em] text-xs uppercase font-bold">{item.badge}</p>
          <span className="text-silver/70 font-light text-sm font-mono tracking-[0.15em]">{item.duration}</span>
        </div>
        {cardGlyph(item)}
      </div>

      <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-8 leading-tight flex-1">
        {item.desc}
      </h3>

      <div className="flex items-end justify-between pt-8 border-t border-accent/15 mt-auto">
        <p className="text-silver/70 text-xs font-mono tracking-widest uppercase font-bold">{item.audience}</p>
        {item.comingSoon ? (
          <span className="text-silver/60 font-mono text-xs tracking-[0.15em] uppercase font-bold">
            {item.ctaLabel || "Coming 2026"}
          </span>
        ) : (
          <span className="flex items-center gap-3 text-[#C9A84C] font-bold text-sm tracking-[0.15em] uppercase group-hover:gap-4 transition-all duration-300">
            <span>{item.ctaLabel || "Start"}</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        )}
      </div>
    </div>
  </>
);

const DiagnosticCard = ({ item }) => {
  const className = "diag-card group relative overflow-hidden h-full flex flex-col scroll-mt-32";
  const handleClick = () => posthog.capture('diagnostic_card_clicked', { diagnostic: item.id, badge: item.badge });
  if (item.comingSoon) {
    return (
      <div id={item.id} className={className} aria-disabled="true">
        <DiagnosticCardBody item={item} />
      </div>
    );
  }
  if (item.internal) {
    return (
      <Link id={item.id} to={item.href} onClick={handleClick} className={className}>
        <DiagnosticCardBody item={item} />
      </Link>
    );
  }
  return (
    <a id={item.id} href={item.href} onClick={handleClick} className={className}>
      <DiagnosticCardBody item={item} />
    </a>
  );
};

const Diagnostics = () => {
  const [activeId, setActiveId] = useState(null);
  const [navPinned, setNavPinned] = useState(false);
  const [navHeight, setNavHeight] = useState(76);
  const streamsWrapRef = useRef(null);
  const navInnerRef = useRef(null);

  useEffect(() => {
    const measure = () => {
      if (navInnerRef.current) setNavHeight(navInnerRef.current.offsetHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const wrap = streamsWrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      setNavPinned(rect.top <= 110 && rect.bottom > 110 + navHeight);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navHeight]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".diag-hero-elem", { y: 24, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power2.out", delay: 0.1 });
      gsap.from(".diag-nav", { y: 16, opacity: 0, duration: 0.8, ease: "power2.out", delay: 0.5 });

      gsap.utils.toArray(".stream-header").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 82%" },
          y: 24, opacity: 0, duration: 0.8, ease: "power2.out",
        });
      });

      gsap.utils.toArray(".stream-block").forEach((block) => {
        gsap.from(block.querySelectorAll(".diag-card"), {
          scrollTrigger: { trigger: block, start: "top 80%" },
          y: 30, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power2.out",
        });
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0.1 }
    );
    allItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
  <div className="bg-primary min-h-screen">
    {/* ── HERO ── */}
    <section className="relative pt-36 md:pt-44 pb-10 md:pb-14 px-6 w-full z-10 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#0369A1]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-silver/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        <div className="space-y-8">
          <p className="diag-hero-elem text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Diagnostic Assessment</p>
          <h1 className="diag-hero-elem font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]">
            Start with what's true.
          </h1>
          <p className="diag-hero-elem text-2xl md:text-3xl text-silver/75 font-light leading-relaxed max-w-5xl">
            The gap doesn't close until you know exactly where it is.<br />
            <span className="text-white font-semibold">Five diagnostics. Three streams.</span>
          </p>
        </div>

        <div className="diag-hero-elem flex flex-wrap gap-8 text-silver/60 text-sm font-light">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
            5 proprietary diagnostics
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
            Personally reviewed
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
            3 stream assessment
          </span>
        </div>
      </div>
    </section>

    <div ref={streamsWrapRef} className="relative">
      {/* ── QUICK NAVIGATION (fixed-pin, scroll-spy) ── */}
      {/* overflow-x-hidden on the root layout breaks position:sticky, so this pins via
          position:fixed once scrolled into range, with a spacer reserving its flow height. */}
      <div style={navPinned ? { height: navHeight } : undefined}>
        <div
          ref={navInnerRef}
          className={`diag-nav ${navPinned ? 'fixed top-[110px] left-0 right-0' : 'relative'} z-40 py-4 px-6 w-full`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 bg-primary/75 backdrop-blur-xl border border-accent/20 rounded-2xl px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
              <span className="text-silver/50 font-mono text-[10px] tracking-[0.25em] uppercase font-bold mr-2 shrink-0">Jump to</span>
              {allItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 text-sm font-light ${
                      isActive
                        ? 'border-[#C9A84C]/70 bg-[#C9A84C]/15 text-[#C9A84C]'
                        : 'border-accent/20 hover:border-[#C9A84C]/60 hover:bg-white/5 text-silver/75 hover:text-[#C9A84C]'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-[#C9A84C] font-bold">{item.num}</span>
                    {item.short}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── DIAGNOSTIC STREAMS ── */}
      <section className="pt-8 md:pt-10 pb-20 px-6 w-full relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          {groups.map((group) => (
            <div key={group.name} className="stream-block space-y-10">
              {/* Stream Header */}
              <div className="stream-header max-w-4xl space-y-6">
                <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">{group.label}</p>
                <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">{group.name}</h2>
                <p className="text-xl md:text-2xl text-silver/75 font-light leading-relaxed">{group.desc}</p>
              </div>

              {/* Diagnostic Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
                {group.items.map((item) => (
                  <DiagnosticCard key={item.badge} item={item} />
                ))}
              </div>

              {/* Paid-tier note under Stream 01 only */}
              {group.label === 'Stream 01' && import.meta.env.VITE_PURCHASE_SURFACE_ENABLED === 'true' && (
                <p className="text-silver/50 font-light text-sm">
                  Paid tiers from $497 incl. GST —{' '}
                  <Link to="/pricing" className="text-[#C9A84C] hover:underline">see pricing</Link>.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>

    {/* ── METHODOLOGY ── */}
    <section className="py-20 px-6 w-full relative z-10 bg-gradient-to-b from-primary to-[#051020] border-t border-accent/10">
      <div className="max-w-5xl mx-auto text-center space-y-10">
        <div className="space-y-6">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Rigorous Process</p>
          <h2 className="font-display font-bold text-5xl md:text-7xl text-white tracking-tight">
            Every Assessment is Reviewed Personally
          </h2>
        </div>
        <p className="text-xl md:text-2xl text-silver/75 font-light leading-relaxed">
          No automated output. No templated responses. Each diagnostic receives a specific, written capability assessment delivered within 24 hours by Brad — <span className="text-white font-semibold">not a machine.</span>
        </p>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="py-28 px-6 w-full relative z-10 bg-primary">
      <div className="max-w-5xl mx-auto">
        <div className="relative group overflow-hidden">
          <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/40 to-accent/20 rounded-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 blur-xl"></div>
          <div className="relative bg-gradient-to-br from-white/15 via-white/12 to-white/10 backdrop-blur-xl border border-accent/30 group-hover:border-[#C9A84C]/60 rounded-3xl p-14 lg:p-20 transition-all duration-500 group-hover:bg-white/20">
            <div className="space-y-8 text-center">
              <h3 className="font-display font-bold text-4xl md:text-6xl text-white">
                Ready to Understand Your Exposure?
              </h3>
              <p className="text-lg md:text-2xl text-silver/75 font-light leading-relaxed">
                Direct engagement. No proposal until we've talked.
              </p>
              <Link
                to="/consultation"
                className="group/btn relative overflow-hidden bg-[#C9A84C] px-12 md:px-16 py-5 md:py-6 rounded-lg text-[#0F172A] font-bold text-sm md:text-base hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase inline-flex items-center justify-center gap-4 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10 cursor-pointer"
              >
                Start Your Assessment
                <svg className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
  );
};

export default Diagnostics;
