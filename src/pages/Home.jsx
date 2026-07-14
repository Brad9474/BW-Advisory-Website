import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransparentShield from '../components/TransparentShield';
import HowWeWorkTogether from '../components/HowWeWorkTogether';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const COMMAND_CENTRE_ENDPOINT = "https://command.bwadvisorysolutions.com.au/api/intake/contact";

const HELP_OPTIONS = [
  { label: "AI Readiness & Process Optimisation", area: "smb_advisory" },
  { label: "Technology Matching & Security Hardening", area: "smb_advisory" },
  { label: "Operational Resilience Diagnostic", area: "smb_advisory" },
  { label: "Loss Intelligence & Investigations", area: "loss_intelligence" },
  { label: "Strategic & Operational Advisory", area: "strategic_advisory" },
  { label: "Not sure yet — I just know something needs to change", area: "both" },
];

const ConsultationForm = () => {
  const [values, setValues] = useState({
    name: "", email: "", organisation: "", role: "",
    phone: "", objective: "", constraint: "", helpWith: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("idle");

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setStatus("idle");
    const selected = HELP_OPTIONS.find((o) => o.label === values.helpWith);
    const areaOfInterest = selected?.area ?? "smb_advisory";
    const objective = selected
      ? `[Interest: ${selected.label}]\n\n${values.objective.trim()}`
      : values.objective.trim();
    try {
      const res = await fetch(COMMAND_CENTRE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(), email: values.email.trim(),
          organisation: values.organisation.trim(), role: values.role.trim(),
          phone: values.phone.trim(), objective,
          constraint: values.constraint.trim(), areaOfInterest,
          source: "website_consultation", brand: "BW_ADVISORY",
        }),
      });
      if (res.status === 201) { setStatus("success"); }
      else { setStatus("error"); }
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

  const inputClass = "w-full bg-white/5 border border-white/15 focus:border-[#C9A84C]/70 focus:bg-white/10 rounded-lg px-4 py-3 text-white placeholder-silver/40 font-light text-base outline-none transition-colors";
  const labelClass = "block text-silver/70 font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-2";
  const sectionLabelClass = "text-accent font-mono tracking-[0.3em] uppercase text-[10px] font-bold";

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className={sectionLabelClass}>BOOK A CONSULTATION</p>
        <h3 className="font-display font-bold text-4xl text-white">Thirty minutes. No pitch.</h3>
        <p className="text-silver/80 font-light text-lg leading-relaxed">
          Tell us what's not working. This helps me prepare — so the call is about your situation, not introductions.
        </p>
      </div>
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
        <div className="pt-2 space-y-5">
          <p className={sectionLabelClass}>YOUR SITUATION</p>
          <div>
            <label htmlFor="cf-objective" className={labelClass}>What are you trying to fix or improve?</label>
            <textarea id="cf-objective" name="objective" required rows={3} value={values.objective} onChange={onChange} placeholder="What does better look like for your practice or business?" className={`${inputClass} resize-y min-h-[90px]`} />
          </div>
          <div>
            <label htmlFor="cf-constraint" className={labelClass}>What's getting in the way?</label>
            <textarea id="cf-constraint" name="constraint" required rows={3} value={values.constraint} onChange={onChange} placeholder="Time, systems, compliance, security — or something else?" className={`${inputClass} resize-y min-h-[90px]`} />
          </div>
          <div>
            <label htmlFor="cf-helpWith" className={labelClass}>What do you need help with?</label>
            <select id="cf-helpWith" name="helpWith" required value={values.helpWith} onChange={onChange} className={`${inputClass} appearance-none cursor-pointer`}>
              <option value="" disabled>Select one</option>
              {HELP_OPTIONS.map((o) => (
                <option key={o.label} value={o.label} className="bg-[#0F172A] text-white">{o.label}</option>
              ))}
            </select>
          </div>
        </div>
        {status === "error" && (
          <p role="alert" className="text-sm text-[#F5A98C] font-light leading-relaxed">
            Something went wrong — please email{" "}
            <a href="mailto:brad@bwadvisorysolutions.com.au" className="underline decoration-[#F5A98C]/40 underline-offset-2">brad@bwadvisorysolutions.com.au</a>{" "}directly.
          </p>
        )}
        <button type="submit" disabled={submitting} className="group/btn relative overflow-hidden bg-[#C9A84C] px-12 md:px-14 py-5 md:py-6 rounded-lg text-[#0F172A] font-bold text-sm md:text-base hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase inline-flex items-center justify-center gap-4 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10 w-full cursor-pointer disabled:opacity-60 disabled:cursor-wait">
          {submitting ? "Sending..." : "START THE CONVERSATION"}
          {!submitting && (
            <svg className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          )}
        </button>
      </form>
    </div>
  );
};

const Home = () => {
  const heroRef = useRef(null);
  const philRef = useRef(null);
  const [stickyDismissed, setStickyDismissed] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".logo-letter", { y: 60, opacity: 0, stagger: 0.03, duration: 0.8, ease: "power3.out", delay: 0.1 });
      gsap.from(".shield-elem", { y: -50, opacity: 0, scale: 0.95, duration: 0.9, ease: "power2.out", delay: 0.1 });
      gsap.fromTo(".solutions-word",
        { y: 32, opacity: 0, clipPath: "inset(100% 0 0 0)", filter: "blur(4px)" },
        { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", filter: "blur(0px)", duration: 0.9, ease: "power4.out", delay: 0.9 }
      );
      gsap.from(".solutions-line", { scaleX: 0, opacity: 0, transformOrigin: "center", duration: 0.7, ease: "expo.out", delay: 1.5 });
      gsap.from(".hero-elem", { y: 20, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power2.out", delay: 1.0 });
      gsap.from(".phil-elem", {
        scrollTrigger: { trigger: philRef.current, start: "top 75%" },
        y: 20, opacity: 0, stagger: 0.2, duration: 1, ease: "power2.out"
      });
      gsap.from(".footer-tagline", {
        scrollTrigger: { trigger: ".footer-tagline", start: "top 90%", toggleActions: "play none none reverse" },
        x: -50, opacity: 0, duration: 1.5, ease: "power3.out"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center pt-24 pb-16 px-8 z-10 text-center overflow-hidden bg-primary">

        <div className="absolute inset-0 z-0">
          {/* hero-mp4.mp4 — Perth → Sydney → Melbourne → Perth boardroom loop */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/hero-mp4.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ transform: 'scale(1.03)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#08101f]/30 via-[#0a1428]/18 to-[#08101f]/40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[#08101f]/78 via-[#08101f]/32 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08101f]/40 via-[#08101f]/10 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[16%] bg-gradient-to-b from-[#08101f]/35 to-transparent pointer-events-none" />
          {/* Wordmark vignette — extra depth behind shield/title/SOLUTIONS/tagline so they pop without heavier type */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 62% 56% at 50% 36%, rgba(5,10,20,0.58) 0%, rgba(5,10,20,0.32) 55%, transparent 85%)',
            }}
          />
        </div>

        <div className="w-full max-w-[900px] mx-auto mb-12 relative flex flex-col items-center justify-center select-none pt-4 z-10">
          <div className="shield-elem mb-16 w-28 h-32 md:w-40 md:h-44 relative z-20 mx-auto drop-shadow-[0_0_60px_rgba(3,105,161,0.6)] hover:drop-shadow-[0_0_80px_rgba(3,105,161,0.8)] transition-all duration-500">
            <TransparentShield />
          </div>
          <div className="flex flex-col items-center gap-10">
            <h2 className="logo-letter float-breathe font-serif font-semibold text-5xl md:text-7xl lg:text-8xl tracking-[0.06em] leading-tight inline-block drop-shadow-[0_4px_40px_rgba(0,0,0,0.5)] platinum-text">
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
          <div className="hero-elem mb-10 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
            <p className="font-sans italic font-semibold text-[#C9A84C] text-2xl md:text-3xl lg:text-4xl leading-snug">
              The gaps you can't see. The capability to close them.{' '}
              <span className="not-italic font-bold text-white">I deliver both.</span>
            </p>
          </div>
          <div className="hero-elem relative mt-12 max-w-4xl mx-auto">
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#C9A84C]/40 via-accent/20 to-[#C9A84C]/10 pointer-events-none" />
            <div className="relative bg-white/8 backdrop-blur-sm border border-[#C9A84C]/30 rounded-3xl p-10 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_60px_rgba(201,168,76,0.08)]">
              <div className="space-y-5 text-center">
                <p className="text-xs font-mono tracking-[0.35em] uppercase text-[#C9A84C] font-bold">Operational Reality</p>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-white leading-tight">
                  Diagnose first. Build capability second. Guess never.
                </h2>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent mx-auto" />
                <p className="text-base md:text-lg text-silver/85 font-light leading-relaxed max-w-3xl mx-auto">
                  Businesses are losing value every day to operational gaps they haven't identified — and losing more to fixes that don't hold. I diagnose what's actually happening inside your operation, then build the capability to close it: redesigned process, embedded accountability, and — where the fix is a system, not a structure — technology that's vetted and matched to how you work. The return is measurable: reduced exposure, lower costs, and an operation running on capability, not patches.
                </p>
              </div>
            </div>
          </div>
          <div className="hero-elem pt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="/consultation" className="group relative overflow-hidden bg-[#C9A84C] px-12 md:px-16 py-5 md:py-6 rounded-full text-[#0F172A] font-bold text-base md:text-lg hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase text-center flex items-center justify-center gap-3 shadow-[0_12px_32px_rgba(201,168,76,0.4)] hover:shadow-[0_16px_48px_rgba(201,168,76,0.6)] border border-white/10 hover:border-white/20 cursor-pointer min-w-[280px]">
              Request a Scoping Session
              <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>

      </section>

      {/* ── PRACTICE AREAS ── */}
      <section className="py-32 w-full relative z-10 bg-primary">
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
          <div className="mb-24 max-w-4xl">
            <p className="text-[#C9A84C] font-mono tracking-[0.3em] uppercase text-xs mb-6 font-bold">How I Close The Gap</p>
            <h2 className="font-display font-bold text-6xl md:text-7xl lg:text-8xl text-white tracking-tight mb-8">Practice Areas.</h2>
            <p className="text-xl md:text-2xl text-silver/75 font-light leading-relaxed">
              Every engagement is tailored to your challenge. These are the areas where I deliver measurable outcomes and lasting operational change.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <a href="/loss-intelligence" className="group relative overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/30 to-accent/30 rounded-3xl opacity-0 group-hover:opacity-70 transition-all duration-700 blur-xl"></div>
              <div className="relative block bg-gradient-to-br from-[#1A3560]/80 via-[#0D1520]/60 to-[#051020]/80 border border-accent/40 group-hover:border-[#C9A84C]/60 rounded-3xl p-8 md:p-10 transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(201,168,76,0.2)] h-full flex flex-col">
                <div className="mb-6">
                  <p className="text-[#C9A84C] font-mono tracking-[0.3em] text-xs uppercase font-bold mb-4">Practice Area 01</p>
                  <h3 className="font-display font-semibold text-2xl md:text-3xl text-white leading-snug min-h-[5rem]">Operational Resilience</h3>
                </div>
                <p className="text-silver/85 font-light text-sm md:text-base leading-relaxed mb-8 flex-1">
                  Organisations carrying operational risk and loss exposure across sites, stores, and supply chains — retail, logistics, and field operations among them. I built and ran some of Western Australia's largest, highest-stakes operational commands — that same capability, now available directly to your business.
                </p>
              </div>
            </a>
            <a href="/#advisory" className="group relative overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/30 to-accent/30 rounded-3xl opacity-0 group-hover:opacity-70 transition-all duration-700 blur-xl"></div>
              <div className="relative block bg-gradient-to-br from-[#1A3560]/80 via-[#0D1520]/60 to-[#051020]/80 border border-accent/40 group-hover:border-[#C9A84C]/60 rounded-3xl p-8 md:p-10 transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(201,168,76,0.2)] h-full flex flex-col">
                <div className="mb-6">
                  <p className="text-[#C9A84C] font-mono tracking-[0.3em] text-xs uppercase font-bold mb-4">Practice Area 02</p>
                  <h3 className="font-display font-semibold text-2xl md:text-3xl text-white leading-snug min-h-[5rem]">Professional &amp; Healthcare Practices</h3>
                </div>
                <p className="text-silver/85 font-light text-sm md:text-base leading-relaxed mb-8 flex-1">
                  Accounting, legal, financial advice, chiropractic, physiotherapy, dental, and GP practices — where operational pressure, compliance exposure, and client or patient data risk combine. Diagnostic-led, practically delivered, without disrupting how the practice runs.
                </p>
              </div>
            </a>
            <a href="/#advisory" className="group relative overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/30 to-accent/30 rounded-3xl opacity-0 group-hover:opacity-70 transition-all duration-700 blur-xl"></div>
              <div className="relative block bg-gradient-to-br from-[#1A3560]/80 via-[#0D1520]/60 to-[#051020]/80 border border-accent/40 group-hover:border-[#C9A84C]/60 rounded-3xl p-8 md:p-10 transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(201,168,76,0.2)] h-full flex flex-col">
                <div className="mb-6">
                  <p className="text-[#C9A84C] font-mono tracking-[0.3em] text-xs uppercase font-bold mb-4">Practice Area 03</p>
                  <h3 className="font-display font-semibold text-2xl md:text-3xl text-white leading-snug min-h-[5rem]">Technology Advisory</h3>
                </div>
                <p className="text-silver/85 font-light text-sm md:text-base leading-relaxed mb-8 flex-1">
                  Cutting through an overcrowded technology market — as the end user who's needed these systems to work, not the vendor selling them. I diagnose what your operation actually needs, then identify and connect best-in-class technology: vetted, matched, and integrated to how you already work.
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── STREAM A: OPERATIONAL RESILIENCE & SECURITY ADVISORY ── */}
      <section id="advisory" className="py-32 w-full relative z-10 bg-gradient-to-b from-primary via-[#0D1520] to-primary">
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
          <div className="mb-20 max-w-4xl">
            <p className="text-[#C9A84C] font-mono tracking-[0.3em] uppercase text-xs mb-6 font-bold">For operations, professional services firms, and healthcare practices</p>
            <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight mb-8">
              Operational Resilience and Technology Capability
            </h2>
            <p className="text-xl md:text-2xl text-silver/75 font-light leading-relaxed">
              Most businesses know they need to modernise — they just don't have time to work out what actually fits. I diagnose the operational reality, then identify and connect the technology built for it: practical improvements across operations, automation, and capability.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { num: "01", name: "Operational Resilience Diagnostic", desc: "Structured assessment of where the business is exposed — operationally, financially, and from a security and compliance standpoint. Delivered as a prioritised action plan." },
              { num: "02", name: "Process Automation and AI Integration", desc: "Identify the manual, repetitive, error-prone work consuming partner and staff time. Replace it with automation and AI-assisted workflows that match how the business already operates." },
              { num: "03", name: "Technology Matching", desc: "The market is crowded and everyone's short on time. I do the diligence most businesses can't — evaluating the technology landscape and connecting you with best-in-class solutions, vetted and matched to how you operate." },
            ].map((tile) => (
              <div key={tile.num} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/30 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-50 transition-all duration-700 blur-lg"></div>
                <div className="relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-sm border border-accent/30 group-hover:border-[#C9A84C]/60 rounded-2xl p-8 md:p-10 h-full transition-all duration-500">
                  <div className="mb-6">
                    <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Service {tile.num}</p>
                  </div>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-5 leading-tight">{tile.name}</h3>
                  <p className="text-silver/80 font-light text-sm leading-relaxed">{tile.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center w-full">
            <a href="/consultation" className="group relative overflow-hidden bg-[#C9A84C] px-12 md:px-16 py-5 md:py-6 rounded-lg text-[#0F172A] font-bold text-sm md:text-base hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase inline-flex items-center justify-center gap-4 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10 cursor-pointer">
              Request a Scoping Session
              <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── DELIVERY ── */}
      <section id="team" className="py-32 w-full relative z-10 bg-gradient-to-b from-[#0D1520] to-primary">
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
          <div className="max-w-4xl">
            <p className="text-[#C9A84C] font-mono tracking-[0.3em] uppercase text-xs mb-6 font-bold">Delivery</p>
            <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight mb-10">
              Led by Brad. Specialists when required.
            </h2>
            <div className="space-y-6 text-xl md:text-2xl text-silver/75 font-light leading-relaxed">
              <p>Every engagement is led personally. The diagnostic, the client relationship, the strategic direction — all Brad. When the work requires deeper technical execution, it is delivered by best-in-class specialists drawn from cyber security, digital forensics, and IT infrastructure — practitioners at the top of their disciplines, matched to the specific need.</p>
              <p>Most businesses are running at less than half the capability of the systems they already own. The right engagement pays for itself — through automation savings, reduced overhead, and the cost of a breach you never have to absorb.</p>
            </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Organisational Redesign", tag: "Law Enforcement / Organisational Command", situation: "Large operational unit with entrenched practices and persistent performance gaps despite adequate resourcing.", gap: "Investigative culture lagged behind intelligence capability. Tools existed. Practice did not.", outcome: "Workforce restructured, investigative practice modernised. Regional volume crime decreased measurably.", impact: "Investigative culture rebuilt. Crime rate fell." },
              { num: "02", title: "Digital Operations at Scale", tag: "Government / Large-Scale Border Operations", situation: "Government agency required digital screening at scale during crisis, replacing inadequate paper-based process.", gap: "No digital infrastructure. Large workforce needed real-time coordination across politically sensitive operation.", outcome: "Programme designed and commanded from ground up. Paper process eliminated entirely. Operation delivered without incident.", impact: "1M+ People Screened at Scale" },
              { num: "03", title: "Intelligence Architecture", tag: "Law Enforcement / Intelligence Architecture", situation: "Government intelligence infrastructure fragmented across disconnected systems. No single operational picture for frontline commanders.", gap: "Intelligence didn't reach decision-makers at speed. Information silos prevented unified command.", outcome: "Real-time intelligence environment deployed. Multiple sources aggregated into single actionable picture integrated with frontline systems.", impact: "Intelligence reached command 40% faster." },
              { num: "04", title: "National Retail Crime Intelligence", tag: "Retail Technology / Law Enforcement Partnerships", situation: "National retail group exposed to coordinated organised crime activity across stores, regions, and state lines. Incident response running well behind threat velocity.", gap: "Loss prevention operating reactively. No shared intelligence picture between store, regional, and national teams. Police engagement ad hoc.", outcome: "Intelligence-led loss prevention framework designed and embedded. National pattern detection in place. Structured law enforcement partnerships at state and federal level.", impact: "Reactive posture replaced with detection capability." },
              { num: "05", title: "Capability Gap Diagnosis", tag: "Private Sector / Capability Diagnostic", situation: "A client held a genuine, hard-to-replicate data advantage, but couldn't yet prove it to investors or partners.", gap: "The capability wasn't the problem. The operating model was undocumented, governance was informal, and there was no investor-grade evidence base.", outcome: "Assessed capability across five dimensions — product quality, process and technology, external relationships, scalability, and commercial readiness — with a staged roadmap to close what was missing.", impact: "Confirmed the capability was real. Replaced guesswork with a costed, sequenced plan to prove it." },
            ].map((cs) => (
              <div key={cs.num} className="group relative h-full">
                <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/30 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-60 transition-all duration-700 blur-lg"></div>
                <div className="relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-sm border border-accent/30 group-hover:border-[#C9A84C]/60 rounded-2xl p-8 md:p-10 h-full flex flex-col transition-all duration-500 group-hover:bg-white/12">
                  <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold mb-4">Case {cs.num}</p>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-2 leading-tight">{cs.title}</h3>
                  <p className="text-[#C9A84C]/70 text-xs font-mono tracking-widest uppercase font-bold mb-6">{cs.tag}</p>
                  <div className="space-y-4 flex-1">
                    {[['The Situation', cs.situation], ['The Gap', cs.gap], ['The Outcome', cs.outcome]].map(([label, text]) => (
                      <div key={label}>
                        <p className="text-accent/60 font-mono text-[10px] tracking-widest uppercase font-bold mb-1">{label}</p>
                        <p className="text-silver/80 font-light leading-relaxed text-sm">{text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-[#C9A84C]/25">
                    <p className="text-[#C9A84C] font-mono text-[10px] tracking-[0.3em] uppercase font-bold mb-2">Impact</p>
                    <p className="text-white font-bold text-lg md:text-xl leading-snug">{cs.impact}</p>
                  </div>
                </div>
              </div>
            ))}
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
              <img src="/Brad_Professional_Shot_clean.webp" alt="Brad Warburton - Principal Advisor" className="w-full h-[320px] sm:h-[380px] lg:h-[450px] object-cover object-top grayscale hover:grayscale-0 transition-all duration-500" />
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
              <p>Brad built operational systems for large-scale law enforcement organisations long before digital tools existed to support them. Running some of Western Australia's largest operational units, he developed the systems, processes, and disciplines that made complex operations function — not because technology enabled it, but because the operational thinking was sound.</p>
              <p>When a national health crisis required border management systems built from scratch, he led the design and command of the operation — processing over one million travellers with no existing infrastructure and no tolerance for failure. He then delivered intelligence capability through a state-level command environment, building the information architecture that enabled frontline operators to work effectively across high-pressure, high-stakes conditions.</p>
              <p>He moved into the private sector to lead law enforcement partnerships for a retail intelligence technology company — building the bridge between what law enforcement needs and what a technology business can deliver, proved across every Australian state and territory.</p>
              <p>He now brings that same discipline — blended with private sector technology experience and practical AI capability — to operations, professional services firms, and healthcare practices.</p>
              <p className="font-medium text-textDark">The problems look different. The fundamentals are the same.</p>
            </div>
            <div className="pt-8 border-t border-silver/20 mt-2">
              <a href="/consultation" className="inline-block group relative overflow-hidden bg-[#C9A84C] px-12 py-4 rounded-full text-[#0F172A] font-bold text-sm hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase flex items-center justify-center gap-3 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10 w-max cursor-pointer">
                Request a Scoping Session
                <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE ENGAGEMENT ── */}
      <HowWeWorkTogether />

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
            <p>Operations, professional services firms, and healthcare practices are at a genuine inflection point. AI is available but confusing, and choosing the right technology from an overcrowded market costs time most businesses don't have. Operational risk and loss exposure are climbing just as fast — coordinated threats moving across sites, stores, and supply chains quicker than most response capability can match. Cyber threats are escalating — health data, client records, and operational data are among the most targeted in Australia. Compliance obligations are tightening with no sign of reversal.</p>
            <p>The practices that get clear on this in the next 12 to 18 months will have a structural advantage. The ones that don't will spend years cleaning up problems that were preventable.</p>
            <p className="font-medium text-textDark">Most have never had access to operational expertise at this level. That gap is what this practice exists to close.</p>
          </div>
        </div>
      </section>

      {/* ── DIAGNOSTICS PATHWAY ── */}
      <section className="py-32 w-full relative z-10 bg-gradient-to-b from-primary via-[#0D1520] to-primary overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
          <div className="space-y-4">
            <p className="text-accent font-mono tracking-[0.3em] uppercase text-xs font-bold">Diagnostic Assessment</p>
            <h2 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">Know Your Exposure</h2>
            <p className="text-xl md:text-2xl text-silver/80 font-light leading-relaxed">
              Start with what's true. Five diagnostics across three streams — each result reviewed by Brad, never automated.
            </p>
          </div>
          <div className="pt-8 flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-silver/70 font-light text-sm">
              {["5 proprietary diagnostics","Personally reviewed","3 stream assessment"].map(t => (
                <span key={t} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                  {t}
                </span>
              ))}
            </div>
            <Link to="/diagnostics" className="group relative overflow-hidden bg-[#C9A84C] px-12 md:px-16 py-5 md:py-6 rounded-lg text-[#0F172A] font-bold text-sm md:text-base hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase inline-flex items-center justify-center gap-4 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10">
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
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-accent font-mono tracking-[0.3em] uppercase text-xs font-bold">Let's Talk</p>
                <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight">The Gap Closes with Conversation</h2>
              </div>
              <p className="text-xl text-silver/80 font-light leading-relaxed">Thirty minutes is enough. I'll understand your challenge. You'll understand my approach. No proposal until we've talked.</p>
              <p className="text-base text-silver/55 font-light leading-relaxed">Working outside these sectors? The fundamentals apply everywhere — <a href="mailto:brad@bwadvisorysolutions.com.au" className="text-silver/70 hover:text-accent underline decoration-silver/30 hover:decoration-accent/60 underline-offset-4 transition-colors duration-300">get in touch</a>.</p>
              <div className="space-y-6 pt-8 border-t border-accent/20">
                {[
                  { label: "Email", href: "mailto:brad@bwadvisorysolutions.com.au", text: "brad@bwadvisorysolutions.com.au" },
                  { label: "Phone", href: "tel:+61407779474", text: "+61 407 779 474" },
                  { label: "LinkedIn", href: "https://linkedin.com/in/bradwarburton", text: "linkedin.com/in/bradwarburton", external: true },
                ].map(({ label, href, text, external }) => (
                  <div key={label} className="space-y-3">
                    <p className="text-accent/70 font-mono text-xs tracking-widest uppercase font-bold">{label}</p>
                    <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className="text-silver/80 hover:text-accent transition-colors font-light text-lg">{text}</a>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-accent/40 to-accent/0 rounded-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 blur-xl"></div>
              <div className="relative bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border border-accent/30 hover:border-accent/60 rounded-3xl p-12 lg:p-16 transition-all duration-500 group-hover:bg-white/12">
                <ConsultationForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── STICKY CTA BAR ── */}
      {!stickyDismissed && (
        <div role="region" aria-label="Diagnostic call to action" className="fixed bottom-0 left-0 right-0 z-[90] bg-[#0F172A]/95 backdrop-blur-md border-t border-[#C9A84C]/30 shadow-[0_-8px_24px_rgba(0,0,0,0.35)]">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <p className="text-white font-light text-sm md:text-base flex-1 text-center sm:text-left leading-snug">Find out what your gaps are costing you.</p>
            <div className="flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
              <Link to="/ai-readiness" className="bg-[#C9A84C] hover:bg-[#E0BC60] text-[#0F172A] font-bold text-xs md:text-sm tracking-[0.15em] uppercase px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center gap-2 shadow-[0_4px_12px_rgba(201,168,76,0.3)] hover:shadow-[0_6px_16px_rgba(201,168,76,0.4)] cursor-pointer whitespace-nowrap">
                See Where You're Exposed
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
              <button type="button" onClick={() => setStickyDismissed(true)} aria-label="Dismiss" className="text-silver/50 hover:text-white p-2 transition-colors duration-200 cursor-pointer flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
