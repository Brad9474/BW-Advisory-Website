import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransparentShield from '../components/TransparentShield';
import HowWeWorkTogether from '../components/HowWeWorkTogether';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const COMMAND_CENTRE_ENDPOINT = "https://command.bwadvisorysolutions.com.au/api/intake/contact";

const ConsultationForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    organisation: "",
    role: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("idle"); // 'idle' | 'success' | 'error'

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setStatus("idle");
    try {
      const res = await fetch(COMMAND_CENTRE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          organisation: values.organisation.trim(),
          role: values.role.trim(),
          phone: values.phone.trim(),
          objective: values.message.trim(),
          constraint: "",
          areaOfInterest: "smb_advisory",
          source: "website_consultation",
          brand: "BW_ADVISORY",
        }),
      });
      if (res.status === 201) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <div className="space-y-6 text-center">
        <h3 className="font-display font-bold text-4xl text-white">Thank you</h3>
        <p className="text-silver/85 font-light text-lg leading-relaxed">
          Thanks — we'll be in touch within one business day.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-white/5 border border-white/15 focus:border-[#C9A84C]/70 focus:bg-white/10 rounded-lg px-4 py-3 text-white placeholder-silver/40 font-light text-base outline-none transition-colors";
  const labelClass =
    "block text-silver/70 font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-2";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="cf-name" className={labelClass}>Name</label>
        <input id="cf-name" name="name" type="text" required value={values.name} onChange={onChange} className={inputClass} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="cf-email" className={labelClass}>Email</label>
        <input id="cf-email" name="email" type="email" required value={values.email} onChange={onChange} className={inputClass} autoComplete="email" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-organisation" className={labelClass}>Organisation</label>
          <input id="cf-organisation" name="organisation" type="text" required value={values.organisation} onChange={onChange} className={inputClass} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="cf-role" className={labelClass}>Role</label>
          <input id="cf-role" name="role" type="text" required value={values.role} onChange={onChange} className={inputClass} autoComplete="organization-title" />
        </div>
      </div>
      <div>
        <label htmlFor="cf-phone" className={labelClass}>Phone <span className="text-silver/40 font-normal lowercase tracking-normal">(optional)</span></label>
        <input id="cf-phone" name="phone" type="tel" value={values.phone} onChange={onChange} className={inputClass} autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="cf-message" className={labelClass}>What you'd like to discuss</label>
        <textarea id="cf-message" name="message" required rows={4} value={values.message} onChange={onChange} className={`${inputClass} resize-y min-h-[110px]`} />
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm text-[#F5A98C] font-light leading-relaxed">
          Something went wrong — please email{" "}
          <a href="mailto:brad@bwadvisorysolutions.com.au" className="underline decoration-[#F5A98C]/40 underline-offset-2">
            brad@bwadvisorysolutions.com.au
          </a>{" "}
          directly.
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="group/btn relative overflow-hidden bg-[#C9A84C] px-12 md:px-14 py-5 md:py-6 rounded-lg text-[#0F172A] font-bold text-sm md:text-base hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase inline-flex items-center justify-center gap-4 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10 w-full cursor-pointer disabled:opacity-60 disabled:cursor-wait"
      >
        {submitting ? "Sending..." : "Schedule Call"}
        {!submitting && (
          <svg className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
        )}
      </button>
    </form>
  );
};

const Home = () => {
  const heroRef = useRef(null);
  const philRef = useRef(null);
  const [stickyDismissed, setStickyDismissed] = useState(false);

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

      gsap.fromTo(".solutions-word", {
        y: 32,
        opacity: 0,
        clipPath: "inset(100% 0 0 0)",
        filter: "blur(4px)",
      }, {
        y: 0,
        opacity: 1,
        clipPath: "inset(0% 0 0 0)",
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power4.out",
        delay: 0.9
      });

      gsap.from(".solutions-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "center",
        duration: 0.7,
        ease: "expo.out",
        delay: 1.5
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
              backgroundImage: 'url("/hero-bg.webp")',
              backgroundPosition: 'center center',
              animation: 'ken-burns 16s ease-in-out infinite'
            }}
          ></div>

          {/* Dark overlay — calibrated for this image */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1E3D]/55 via-[#0F172A]/50 to-[#0A1520]/80"></div>

          {/* Side vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1520]/50 via-transparent to-[#0A1520]/30"></div>

          {/* Bottom vignette */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0A1520] via-[#0A1520]/60 to-transparent"></div>
        </div>

        <style>{`
          @keyframes ken-burns {
            0%   { transform: scale(1.05) translateX(0px) translateY(0px); }
            33%  { transform: scale(1.09) translateX(-12px) translateY(-4px); }
            66%  { transform: scale(1.07) translateX(8px) translateY(-2px); }
            100% { transform: scale(1.05) translateX(0px) translateY(0px); }
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
            <div className="flex items-center gap-8 w-full justify-center overflow-hidden">
              <div className="solutions-line h-[1px] flex-grow max-w-[80px] bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-[#C9A84C]/60"></div>
              <p className="solutions-word font-sans font-semibold text-[#C9A84C] tracking-[0.3em] text-base md:text-xl uppercase drop-shadow-[0_0_16px_rgba(201,168,76,0.7)]">
                SOLUTIONS
              </p>
              <div className="solutions-line h-[1px] flex-grow max-w-[80px] bg-gradient-to-l from-transparent via-[#C9A84C]/40 to-[#C9A84C]/60"></div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto mt-16 relative z-20">
          <h1 className="hero-elem font-display font-bold text-6xl md:text-8xl lg:text-[6.5rem] tracking-tight leading-[1.1] text-white drop-shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            You Can't Fix What You Can't See.
            <span className="font-serif italic text-[#C9A84C] block mt-4 text-5xl md:text-7xl lg:text-6xl">Operational gaps. Security risks. Inefficient systems. All of it.</span>
          </h1>

          <p className="hero-elem text-silver/75 mx-auto text-xl md:text-2xl leading-relaxed mt-12 font-light tracking-wide max-w-4xl">
            I work with allied health and healthcare practices, and professional services firms to fix that — practically, without jargon, and with a measurable return.
          </p>

          <p className="hero-elem text-silver/55 mx-auto text-base md:text-lg leading-relaxed mt-8 font-light max-w-3xl">
            Thirty years of operational command experience — law enforcement command, large-scale government operations, national retail crime intelligence — applied to the operational problems allied health and healthcare practices, and professional services firms have never had a senior operator in the room to solve.
          </p>

          <div className="hero-elem pt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="https://portal.bwadvisorysolutions.com.au/intake.html" className="group relative overflow-hidden bg-[#C9A84C] px-12 md:px-16 py-5 md:py-6 rounded-full text-[#0F172A] font-bold text-base md:text-lg hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase text-center flex items-center justify-center gap-3 shadow-[0_12px_32px_rgba(201,168,76,0.4)] hover:shadow-[0_16px_48px_rgba(201,168,76,0.6)] border border-white/10 hover:border-white/20 cursor-pointer min-w-[280px]">
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
              <p className="text-xs font-mono tracking-[0.3em] uppercase text-accent/70 font-bold">Operational Reality</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                You can't fix what you can't see.
              </h2>
              <p className="text-base md:text-lg text-silver/80 font-light leading-relaxed max-w-3xl mx-auto">
                Allied health and healthcare practices, and professional services firms are losing value every day to operational gaps they haven't identified. I find them and close them — practically, without jargon, with a measurable return.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ── STREAM A: OPERATIONAL RESILIENCE & SECURITY ADVISORY ── */}
      <section id="advisory" className="py-32 w-full relative z-10 bg-gradient-to-b from-primary via-[#0D1520] to-primary">
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
          <div className="mb-20 max-w-4xl">
            <p className="text-[#C9A84C] font-mono tracking-[0.3em] uppercase text-xs mb-6 font-bold">For Allied Health, Healthcare & Professional Services</p>
            <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight mb-8">
              Operational Resilience and Security Advisory
            </h2>
            <p className="text-xl md:text-2xl text-silver/75 font-light leading-relaxed">
              Most allied health and healthcare practices, and professional services firms know they need to modernise — they just don't know where to begin. I cut through the noise, identify what actually needs to change, and deliver practical improvements across operations, automation, and security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                num: "01",
                name: "Operational Resilience Diagnostic",
                price: "$3,500 – $7,000",
                desc: "Structured assessment of where the practice or firm is exposed — operationally, financially, and from a security and compliance standpoint. Delivered as a prioritised action plan."
              },
              {
                num: "02",
                name: "Security Hardening",
                price: "from $15,000",
                desc: "Essential Eight aligned remediation across endpoints, identity, backups, email, and access. Delivered with senior cyber security specialists. Ongoing maintenance via dedicated MSP support."
              },
              {
                num: "03",
                name: "Process Automation and AI Integration",
                price: "from $8,000",
                desc: "Identify the manual, repetitive, error-prone work consuming partner and staff time. Replace it with automation and AI-assisted workflows that match how the business already operates."
              },
              {
                num: "04",
                name: "Quarterly Advisory Retainer",
                price: "$600 – $2,500 / month",
                desc: "Ongoing strategic advisory. Quarterly reviews of operations, security posture, and growth priorities. Direct access between reviews when something material changes."
              }
            ].map((tile) => (
              <div key={tile.num} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/30 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-50 transition-all duration-700 blur-lg"></div>
                <div className="relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-sm border border-accent/30 group-hover:border-[#C9A84C]/60 rounded-2xl p-10 md:p-12 h-full transition-all duration-500">
                  <div className="flex items-start justify-between mb-6">
                    <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Service {tile.num}</p>
                    <p className="text-[#C9A84C] font-mono text-xs tracking-[0.15em] font-bold">{tile.price}</p>
                  </div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-5 leading-tight">{tile.name}</h3>
                  <p className="text-silver/80 font-light text-base leading-relaxed">{tile.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center w-full">
            <a href="#contact" className="group relative overflow-hidden bg-[#C9A84C] px-12 md:px-16 py-5 md:py-6 rounded-lg text-[#0F172A] font-bold text-sm md:text-base hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase inline-flex items-center justify-center gap-4 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10 cursor-pointer">
              Book a Discovery Call
              <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── PRACTICE AREAS ── */}
      <section className="py-32 w-full relative z-10 bg-primary">
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
          <div className="mb-24 max-w-4xl">
            <p className="text-[#C9A84C] font-mono tracking-[0.3em] uppercase text-xs mb-6 font-bold">How I Close The Gap</p>
            <h2 className="font-display font-bold text-6xl md:text-7xl lg:text-8xl text-white tracking-tight mb-8">Two Practice Areas.</h2>
            <p className="text-xl md:text-2xl text-silver/75 font-light leading-relaxed">
              Every engagement is tailored to your challenge. These are the areas where I deliver measurable outcomes and lasting operational change.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Allied Health & Healthcare Practices */}
            <a href="/#framework" className="group relative overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/30 to-accent/30 rounded-3xl opacity-0 group-hover:opacity-70 transition-all duration-700 blur-xl"></div>
              <div className="relative block bg-gradient-to-br from-[#1A3560]/80 via-[#0D1520]/60 to-[#051020]/80 border border-accent/40 group-hover:border-[#C9A84C]/60 rounded-3xl p-12 md:p-16 transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(201,168,76,0.2)] h-full flex flex-col">
                <div className="flex items-start justify-between mb-10">
                  <div className="space-y-4">
                    <p className="text-[#C9A84C] font-mono tracking-[0.3em] text-xs uppercase font-bold">Service Area 01</p>
                    <h3 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">Allied Health & Healthcare Practices</h3>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#C9A84C]/20 to-accent/10 rounded-2xl group-hover:from-[#C9A84C]/40 group-hover:to-accent/20 transition-all duration-500 flex-shrink-0">
                    <svg className="w-10 h-10 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <p className="text-silver/85 font-light text-lg leading-relaxed mb-10">
                  Chiropractic, physiotherapy, occupational therapy, dental, and GP practices — where operational gaps, patient data risk, and compliance exposure combine. Diagnostic-led, practically delivered, without disrupting how the practice runs.
                </p>
                <div className="mt-auto">
                  <div className="flex items-center gap-3 text-[#C9A84C] font-bold text-sm tracking-[0.15em] uppercase group-hover:gap-4 transition-all duration-300">
                    <span>Explore our method</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* Professional Services Firms */}
            <a href="/#advisory" className="group relative overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/30 to-accent/30 rounded-3xl opacity-0 group-hover:opacity-70 transition-all duration-700 blur-xl"></div>
              <div className="relative block bg-gradient-to-br from-[#1A3560]/80 via-[#0D1520]/60 to-[#051020]/80 border border-accent/40 group-hover:border-[#C9A84C]/60 rounded-3xl p-12 md:p-16 transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(201,168,76,0.2)] h-full flex flex-col">
                <div className="flex items-start justify-between mb-10">
                  <div className="space-y-4">
                    <p className="text-[#C9A84C] font-mono tracking-[0.3em] text-xs uppercase font-bold">Service Area 02</p>
                    <h3 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">Professional Services Firms</h3>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#C9A84C]/20 to-accent/10 rounded-2xl group-hover:from-[#C9A84C]/40 group-hover:to-accent/20 transition-all duration-500 flex-shrink-0">
                    <svg className="w-10 h-10 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-silver/85 font-light text-lg leading-relaxed mb-10">
                  Accounting, legal, and financial advice practices facing the same operational pressures with less tolerance for downtime or breach. Clear process, protected data, competitive advantage.
                </p>
                <div className="mt-auto">
                  <div className="flex items-center gap-3 text-[#C9A84C] font-bold text-sm tracking-[0.15em] uppercase group-hover:gap-4 transition-all duration-300">
                    <span>Learn more</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY: THE APPROACH ── */}
      <section id="framework" className="py-32 w-full relative z-10 bg-gradient-to-b from-[#0D1520] to-primary">
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
          <div className="mb-24 max-w-3xl">
            <p className="text-accent font-mono tracking-[0.3em] uppercase text-xs font-bold mb-6">
              Proprietary Methodology
              <Link to="/investigations" className="ml-1 text-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors duration-200 text-[10px] align-super" title="PROVED — BW Advisory Solutions' proprietary investigations framework">*</Link>
            </p>
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
            <a href="https://portal.bwadvisorysolutions.com.au/intake.html" className="group relative overflow-hidden bg-[#C9A84C] px-12 md:px-16 py-5 md:py-6 rounded-lg text-[#0F172A] font-bold text-sm md:text-base hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase inline-flex items-center justify-center gap-4 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10 cursor-pointer">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Case Study 01 */}
            <div className="relative group overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/40 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-50 transition-all duration-700 blur-lg"></div>
              <div className="relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-sm border border-accent/30 group-hover:border-[#C9A84C]/50 rounded-2xl p-10 md:p-12 h-full transition-all duration-500 group-hover:bg-white/12">
                <div className="absolute top-6 right-6 w-14 h-14 bg-gradient-to-br from-[#C9A84C]/20 to-accent/10 rounded-full flex items-center justify-center group-hover:from-[#C9A84C]/30 group-hover:to-accent/20 transition-all duration-500">
                  <span className="text-[#C9A84C] font-display font-bold text-xl">01</span>
                </div>
                <h3 className="font-display font-bold text-3xl text-white mb-2 pr-16 min-h-[5rem]">Organisational Redesign</h3>
                <p className="text-[#C9A84C] text-xs font-mono tracking-widest uppercase font-bold mb-6">Law Enforcement / Organisational Command</p>
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
                    <p className="text-white font-bold text-lg">Investigative culture rebuilt. Crime rate fell.</p>
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
                <h3 className="font-display font-bold text-3xl text-white mb-2 pr-16 min-h-[5rem]">Digital Operations at Scale</h3>
                <p className="text-[#C9A84C] text-xs font-mono tracking-widest uppercase font-bold mb-6">Government / Large-Scale Border Operations</p>
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
                    <p className="text-white font-bold text-lg">1M+ People Screened at Scale</p>
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
                <h3 className="font-display font-bold text-3xl text-white mb-2 pr-16 min-h-[5rem]">Intelligence Architecture</h3>
                <p className="text-[#C9A84C] text-xs font-mono tracking-widest uppercase font-bold mb-6">Law Enforcement / Intelligence Architecture</p>
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
                    <p className="text-white font-bold text-lg">Intelligence reached command 40% faster.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 04 */}
            <div className="relative group overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/40 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-50 transition-all duration-700 blur-lg"></div>
              <div className="relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-sm border border-accent/30 group-hover:border-[#C9A84C]/50 rounded-2xl p-10 md:p-12 h-full transition-all duration-500 group-hover:bg-white/12">
                <div className="absolute top-6 right-6 w-14 h-14 bg-gradient-to-br from-[#C9A84C]/20 to-accent/10 rounded-full flex items-center justify-center group-hover:from-[#C9A84C]/30 group-hover:to-accent/20 transition-all duration-500">
                  <span className="text-[#C9A84C] font-display font-bold text-xl">04</span>
                </div>
                <h3 className="font-display font-bold text-3xl text-white mb-2 pr-16 min-h-[5rem]">National Retail Crime Intelligence</h3>
                <p className="text-[#C9A84C] text-xs font-mono tracking-widest uppercase font-bold mb-6">National Retail / Crime Intelligence</p>
                <div className="space-y-6">
                  <div className="pb-5 border-b border-accent/15">
                    <p className="text-accent/70 font-mono text-xs tracking-widest uppercase font-bold mb-2">The Situation</p>
                    <p className="text-silver/85 font-light leading-relaxed text-sm">National retail group exposed to coordinated organised crime activity across stores, regions, and state lines. Incident response running well behind threat velocity.</p>
                  </div>
                  <div className="pb-5 border-b border-accent/15">
                    <p className="text-accent/70 font-mono text-xs tracking-widest uppercase font-bold mb-2">The Gap</p>
                    <p className="text-silver/85 font-light leading-relaxed text-sm">Loss prevention operating reactively. No shared intelligence picture between store, regional, and national teams. Police engagement ad hoc.</p>
                  </div>
                  <div className="pb-5 border-b border-accent/15">
                    <p className="text-accent/70 font-mono text-xs tracking-widest uppercase font-bold mb-2">The Outcome</p>
                    <p className="text-silver/85 font-light leading-relaxed text-sm">Intelligence-led loss prevention framework designed and embedded. National pattern detection in place. Structured law enforcement partnerships at state and federal level.</p>
                  </div>
                  <div className="pt-2">
                    <p className="text-[#C9A84C] font-mono text-xs tracking-widest uppercase font-bold mb-2">Impact</p>
                    <p className="text-white font-bold text-lg">Reactive posture replaced with detection capability.</p>
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
                Brad built operational systems for large-scale law enforcement organisations long before digital tools existed to support them. Running some of Western Australia's largest operational units, he developed the systems, processes, and disciplines that made complex operations function — not because technology enabled it, but because the operational thinking was sound.
              </p>
              <p>
                When a national health crisis required border management systems built from scratch, he led the design and command of the operation — processing over one million travellers with no existing infrastructure and no tolerance for failure. He then delivered intelligence capability through a state-level command environment, building the information architecture that enabled frontline operators to work effectively across high-pressure, high-stakes conditions.
              </p>
              <p>
                He moved into the private sector to lead law enforcement partnerships for a retail intelligence technology company — building the bridge between what law enforcement needs and what a technology business can deliver, proved across every Australian state and territory.
              </p>
              <p>
                He now brings that same discipline — blended with private sector technology experience and practical AI capability — to allied health and healthcare practices, and professional services firms.
              </p>
              <p className="font-medium text-textDark">
                The problems look different. The fundamentals are the same.
              </p>
            </div>

            <div className="flex flex-col gap-0 pt-6 border-t border-silver/20 mt-2">
              {[
                "AI Adoption & Process Automation",
                "Operational Resilience & Security",
                "Systems & Process Optimisation",
                "Technology Integration & Capability Deployment",
                "Retail Loss Intelligence & Investigations",
                "Law Enforcement & Government Advisory"
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
              <a href="https://portal.bwadvisorysolutions.com.au/intake.html" className="inline-block group relative overflow-hidden bg-[#C9A84C] px-12 py-4 rounded-full text-[#0F172A] font-bold text-sm hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase flex items-center justify-center gap-3 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10 w-max cursor-pointer">
                Request a Scoping Session
                <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY THIS PRACTICE EXISTS ── */}
      <section id="why" className="py-32 w-full relative z-10 bg-gradient-to-b from-surface via-background to-surface">
        <div className="max-w-5xl mx-auto px-6 xl:px-12">
          <div className="mb-12">
            <p className="text-accent font-mono tracking-[0.3em] uppercase text-xs mb-6 font-bold">Why This Practice Exists</p>
            <h2 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-primary tracking-tight leading-tight mb-10">
              Most have never had access to operational expertise at this level.
            </h2>
          </div>
          <div className="space-y-6 text-textDark/90 font-light text-xl leading-relaxed max-w-4xl">
            <p>
              Allied health and healthcare practices, and professional services firms are at a genuine inflection point. AI is available but confusing. Cyber threats are escalating — health data and professional services data are among the most targeted in Australia. Compliance obligations are tightening with no sign of reversal.
            </p>
            <p>
              The practices that get clear on this in the next 12 to 18 months will have a structural advantage. The ones that don't will spend years cleaning up problems that were preventable.
            </p>
            <p className="font-medium text-textDark">
              Most have never had access to operational expertise at this level. That gap is what this practice exists to close.
            </p>
          </div>
        </div>
      </section>

      {/* ── DELIVERY ── */}
      <section id="team" className="py-32 w-full relative z-10 bg-gradient-to-b from-primary via-[#0D1520] to-primary">
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
          <div className="max-w-4xl">
            <p className="text-[#C9A84C] font-mono tracking-[0.3em] uppercase text-xs mb-6 font-bold">Delivery</p>
            <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight mb-10">
              Led by Brad. Specialists when required.
            </h2>
            <div className="space-y-6 text-xl md:text-2xl text-silver/75 font-light leading-relaxed">
              <p>
                Every engagement is led personally. The diagnostic, the client relationship, the strategic direction — all Brad. When the work requires deeper technical execution, it is delivered by best-in-class specialists drawn from cyber security, digital forensics, and IT infrastructure — practitioners at the top of their disciplines, matched to the specific need.
              </p>
              <p>
                Most businesses are running at less than half the capability of the systems they already own. The right engagement pays for itself — through automation savings, reduced overhead, and the cost of a breach you never have to absorb.
              </p>
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
              Start with what's true. Five diagnostics across three streams — each result reviewed by Brad, never automated.
            </p>
          </div>

          <div className="pt-8 flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-silver/70 font-light text-sm">
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

              <p className="text-base text-silver/55 font-light leading-relaxed">
                Working outside these sectors? The fundamentals apply everywhere — <a href="mailto:brad@bwadvisorysolutions.com.au" className="text-silver/70 hover:text-accent underline decoration-silver/30 hover:decoration-accent/60 underline-offset-4 transition-colors duration-300">get in touch</a>.
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
                  <ConsultationForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── STICKY CTA BAR (homepage only) ── */}
      {!stickyDismissed && (
        <div
          role="region"
          aria-label="Diagnostic call to action"
          className="fixed bottom-0 left-0 right-0 z-[90] bg-[#0F172A]/95 backdrop-blur-md border-t border-[#C9A84C]/30 shadow-[0_-8px_24px_rgba(0,0,0,0.35)]"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <p className="text-white font-light text-sm md:text-base flex-1 text-center sm:text-left leading-snug">
              Find out what your gaps are costing you.
            </p>
            <div className="flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
              <Link
                to="/ai-readiness"
                className="bg-[#C9A84C] hover:bg-[#E0BC60] text-[#0F172A] font-bold text-xs md:text-sm tracking-[0.15em] uppercase px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center gap-2 shadow-[0_4px_12px_rgba(201,168,76,0.3)] hover:shadow-[0_6px_16px_rgba(201,168,76,0.4)] cursor-pointer whitespace-nowrap"
              >
                See Where You're Exposed
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <button
                type="button"
                onClick={() => setStickyDismissed(true)}
                aria-label="Dismiss"
                className="text-silver/50 hover:text-white p-2 transition-colors duration-200 cursor-pointer flex-shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
