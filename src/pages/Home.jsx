import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import posthog from 'posthog-js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransparentShield from '../components/TransparentShield';
import TheEngagement from '../components/TheEngagement';
import BookingSection from '../components/BookingSection';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

// Homepage hero background video: scoped playback/accessibility behaviour shared
// by the pause control below. Reduced-motion and mobile visitors get the static
// poster only, until they explicitly press Play (see the skyline handoff spec).
function useHeroBackgroundVideo(sectionRef) {
  const videoRef = useRef(null);
  const [userPaused, setUserPaused] = useState(
    () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(max-width: 767px)').matches
  );
  const [onScreen, setOnScreen] = useState(true);
  // Read real visibility: a page opened in a background tab must wait for the
  // hidden→visible change, or play() is aborted and nothing ever retries it.
  const [tabHidden, setTabHidden] = useState(() => document.hidden);
  const [hasSource, setHasSource] = useState(false);
  const [mediaError, setMediaError] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const pauseForPreference = () => {
      if (reduceQuery.matches || mobileQuery.matches) setUserPaused(true);
    };
    reduceQuery.addEventListener('change', pauseForPreference);
    mobileQuery.addEventListener('change', pauseForPreference);
    return () => {
      reduceQuery.removeEventListener('change', pauseForPreference);
      mobileQuery.removeEventListener('change', pauseForPreference);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionRef]);

  useEffect(() => {
    const handleVisibility = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const shouldPlay = !userPaused && onScreen && !tabHidden && !mediaError;

  useEffect(() => {
    if (shouldPlay && !hasSource) {
      // Mounts the <video>; this effect re-runs once the ref exists.
      setHasSource(true);
      return;
    }
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) {
      // AbortError just means a pause() (off-screen / hidden tab) interrupted
      // this play(); only a real refusal (autoplay blocked) flips to Play.
      video.play().catch((err) => {
        if (err.name !== 'AbortError') setUserPaused(true);
      });
    } else {
      video.pause();
    }
  }, [shouldPlay, hasSource]);

  const togglePlayback = () => setUserPaused((p) => !p);

  return {
    videoRef, userPaused, togglePlayback, hasSource, mediaError, setMediaError,
    videoVisible, onVideoPlaying: () => setVideoVisible(true),
  };
}

const APPLIED_WORK = [
  {
    num: '01',
    title: 'Organisational Redesign',
    tag: 'Law Enforcement / Organisational Command',
    situation: 'A large operational command, adequately resourced, with performance that would not move.',
    gap: 'Intelligence capability had outrun investigative culture. Tools existed. Practice did not.',
    outcome: 'I restructured the workforce and rebuilt investigative practice around it. Regional volume crime fell.',
    impact: 'Practice caught up with capability.',
  },
  {
    num: '02',
    title: 'Digital Operations at Scale',
    tag: 'Government / Large-Scale Border Operations',
    situation: 'A national border operation running on paper, at a volume paper could not carry.',
    gap: 'No digital infrastructure, and a large workforce needing real-time coordination under political scrutiny.',
    outcome: 'I designed and commanded the programme from nothing. Paper was eliminated entirely and the operation ran without incident.',
    impact: 'More than a million people screened.',
  },
  {
    num: '03',
    title: 'Intelligence Architecture',
    tag: 'Law Enforcement / Intelligence Architecture',
    situation: 'Intelligence spread across disconnected systems, with no single picture for the commanders who needed one.',
    gap: 'Information reached decision-makers too late to act on. Silos held it up.',
    outcome: 'I built a real-time environment that pulled every source into one actionable picture, wired into frontline systems.',
    impact: 'Intelligence reached command 40 per cent faster.',
  },
  {
    num: '04',
    title: 'National Retail Crime Intelligence',
    tag: 'Retail Technology / Law Enforcement Partnerships',
    situation: 'A national retail group facing organised crime that moved across stores, regions and state lines faster than it could respond.',
    gap: 'Loss prevention was reactive. Store, regional and national teams each held a different picture. Police engagement was ad hoc.',
    outcome: 'I designed and embedded an intelligence-led framework, with national pattern detection and structured partnerships at state and federal level.',
    impact: 'Reaction replaced with detection.',
  },
  {
    num: '05',
    title: 'Capability Gap Diagnosis',
    tag: 'Private Sector / Capability Diagnostic',
    situation: 'A client with a genuine, hard-to-replicate data advantage and no way to prove it to investors.',
    gap: 'The capability was real. The operating model was undocumented, governance informal, and the evidence base absent.',
    outcome: 'I assessed capability across five dimensions — product, process and technology, relationships, scalability and commercial readiness — then staged a roadmap for what was missing.',
    impact: 'Guesswork replaced with a costed, sequenced plan.',
  },
];

const AW_PAGE_SIZE = 3;
const AW_PAGE_COUNT = Math.ceil(APPLIED_WORK.length / AW_PAGE_SIZE);

const Home = () => {
  const heroRef = useRef(null);
  const philRef = useRef(null);
  const [stickyDismissed, setStickyDismissed] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false);
  const [awPage, setAwPage] = useState(0);
  const [awVisible, setAwVisible] = useState(true);
  const { videoRef, userPaused, togglePlayback, hasSource, mediaError, setMediaError, videoVisible, onVideoPlaying } = useHeroBackgroundVideo(heroRef);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.shield-elem', { y: -50, opacity: 0, scale: 0.95, duration: 0.9, ease: 'power2.out', delay: 0 });
      gsap.from('.logo-letter', { y: 60, opacity: 0, stagger: 0.03, duration: 0.8, ease: 'power3.out', delay: 0.1 });
      gsap.fromTo(
        '.solutions-word',
        { y: 32, opacity: 0, clipPath: 'inset(100% 0 0 0)', filter: 'blur(4px)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', filter: 'blur(0px)', duration: 0.9, ease: 'power4.out', delay: 0.35 }
      );
      gsap.from('.solutions-line', { scaleX: 0, opacity: 0, transformOrigin: 'center', duration: 0.7, ease: 'expo.out', delay: 0.45 });
      gsap.from('.hero-elem', { y: 20, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power2.out', delay: 0.55 });
      gsap.from('.practice-card', {
        scrollTrigger: { trigger: '.practice-card', start: 'top 85%' },
        y: 50, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
      });
      gsap.from('.phil-elem', {
        scrollTrigger: { trigger: philRef.current, start: 'top 75%' },
        y: 20, opacity: 0, stagger: 0.2, duration: 1, ease: 'power2.out',
      });
      gsap.from('.footer-tagline', {
        scrollTrigger: { trigger: '.footer-tagline', start: 'top 90%', toggleActions: 'play none none reverse' },
        x: -50, opacity: 0, duration: 1.5, ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, []);

  // Sticky bar's whole justification was a CTA nobody could see without scrolling —
  // now that the hero button is above the fold, only surface it once the hero has passed.
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroPassed(!entry.isIntersecting),
      { rootMargin: '-100px 0px 0px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goToAwPage = (i) => {
    if (i === awPage) return;
    setAwVisible(false);
    setTimeout(() => {
      setAwPage(i);
      setAwVisible(true);
    }, 900);
  };

  const awCards = Array.from({ length: AW_PAGE_SIZE }, (_, i) => APPLIED_WORK[(awPage * AW_PAGE_SIZE + i) % APPLIED_WORK.length]);

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef} className="group/hero relative min-h-[100dvh] w-full flex flex-col justify-center items-center z-10 text-center overflow-hidden bg-primary">

        <div className="absolute inset-0 z-0" aria-hidden="true">
          {/* hero-mp4.mp4 — Perth → Sydney → Melbourne → Perth boardroom loop.
              Colour grade (blue-lean, tamed sunset/highlights) is baked into the
              source file; no runtime brightness/saturate filter stacked on top. */}
          {/* Poster stays mounted underneath; the video is revealed only once it
              is actually rendering, so there's no element swap or blank frame. */}
          <img
            src="/hero-poster.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: 'scale(1.03)' }}
          />
          {hasSource && !mediaError && (
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 motion-reduce:transition-none ${videoVisible ? 'opacity-100' : 'opacity-0'}`}
              src="/hero-mp4.mp4"
              preload="metadata"
              muted
              loop
              playsInline
              tabIndex={-1}
              onPlaying={onVideoPlaying}
              onError={() => setMediaError(true)}
              style={{ transform: 'scale(1.03)' }}
            />
          )}
          {/* Central reading overlay — soft ellipse, fades toward the edges so the
              skyline stays visible at the perimeter (no broad rectangle/black tint). */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 62% 72% at 50% 50%, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.68) 45%, rgba(15,23,42,0.38) 72%, rgba(15,23,42,0.1) 100%)',
            }}
          />
          <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#0F172A]/55 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-[#0F172A]/55 to-transparent pointer-events-none" />
        </div>

        {/* Kept quiet at rest on pointer devices; always visible on touch, where
            it is the only way to start the video and there is no hover. */}
        <button
          type="button"
          onClick={togglePlayback}
          className="absolute z-20 bottom-5 right-5 md:bottom-7 md:right-7 w-11 h-11 flex items-center justify-center rounded-full text-[#E2E8F0] bg-[#0F172A]/70 border border-white/20 backdrop-blur-sm opacity-100 md:opacity-30 md:group-hover/hero:opacity-100 focus-visible:opacity-100 hover:bg-[#0F172A]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A84C] transition-opacity duration-300"
          aria-label={userPaused ? 'Play background video' : 'Pause background video'}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            {userPaused ? <path d="M8 5v14l11-7z" /> : <path d="M6 5h4v14H6zm8 0h4v14h-4z" />}
          </svg>
        </button>

        <div
          className="relative z-10 w-full flex flex-col items-center pt-[90px] sm:pt-[110px] md:pt-[130px] px-6 sm:px-8 lg:px-12 pb-[104px] md:pb-[14px]"
          style={{ maxWidth: '900px', margin: '0 auto' }}
        >
          {/* 1 — Lockup (reduced ~28% from baseline so the proposition leads) */}
          <div className="flex flex-col items-center gap-1.5 sm:gap-2">
            <div className="flex flex-col items-center gap-1.5 sm:gap-2">
              <div className="shield-elem w-[66px] h-[73px] sm:w-[115px] sm:h-[127px] md:w-[137px] md:h-[150px] drop-shadow-[0_0_40px_rgba(3,105,161,0.6)]">
                <TransparentShield />
              </div>
              <h2
                className="logo-letter platinum-text font-serif font-semibold uppercase inline-block text-[24px] sm:text-[43px] md:text-[55px]"
                style={{
                  letterSpacing: '0.06em',
                  lineHeight: 1.2,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 8px 28px rgba(0,0,0,0.65))',
                }}
              >
                BW ADVISORY
              </h2>
            </div>
            <div className="flex items-center justify-center" style={{ gap: '16px' }}>
              <div className="solutions-line h-px" style={{ width: '46px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4))' }} />
              <p
                className="solutions-word font-sans font-semibold uppercase text-[11px] sm:text-[13px] md:text-[15px]"
                style={{
                  color: '#C9A84C',
                  letterSpacing: '0.3em',
                  filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.9)) drop-shadow(0 0 16px rgba(201,168,76,0.7))',
                }}
              >
                SOLUTIONS
              </p>
              <div className="solutions-line h-px" style={{ width: '46px', background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.6))' }} />
            </div>
          </div>

          {/* 2 — Headline: first reading priority, directly after the lockup */}
          <h1
            className="hero-elem font-display font-semibold text-center text-[32px] sm:text-[34px] md:text-[44px] lg:text-[56px] leading-[1.18] md:leading-[1.15] tracking-[-0.015em] md:tracking-[-0.02em] mt-6 md:mt-8"
            style={{ color: '#F8FAFC', maxWidth: '1000px', filter: 'drop-shadow(0 4px 18px rgba(0,0,0,0.8))' }}
          >
            The gaps you can't see.<br />The capability to close them.
          </h1>

          {/* 3 — Supporting paragraph */}
          <p
            className="hero-elem font-sans font-normal text-[17px] sm:text-[18px] md:text-[19px] leading-[1.6] md:leading-[1.65] mt-5 md:mt-6"
            style={{
              color: '#E2E8F0',
              maxWidth: '760px',
              textWrap: 'pretty',
              textShadow: '0 2px 6px rgba(0,0,0,0.85), 0 1px 14px rgba(0,0,0,0.6)',
            }}
          >
            When your operation stops supporting what the business needs, another system rarely fixes it. I find what is getting in the way, then strengthen the people, processes and technology underneath — so you keep delivering under pressure and adapt when things change.
          </p>

          {/* 4 — CTA */}
          <div className="hero-elem mt-7 md:mt-8">
            <Link
              to="/consultation"
              onClick={() => posthog.capture('scoping_session_cta_clicked', { location: 'hero' })}
              className="group relative overflow-hidden bg-[#C9A84C] rounded-full text-[#0F172A] font-sans font-semibold hover:bg-[#E0BC60] transition-all duration-300 uppercase text-center flex items-center justify-center gap-3 border border-white/10 hover:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F8FAFC] cursor-pointer min-h-[52px] px-8 md:px-16 py-4 text-[15px] md:text-[16px] leading-[1.5]"
              style={{
                minWidth: '280px',
                letterSpacing: '0.15em',
                boxShadow: '0 12px 32px rgba(201,168,76,0.4)',
              }}
            >
              Request a Scoping Session
              <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 px-6 w-full bg-surface relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="w-full max-w-[560px] mx-auto lg:max-w-none lg:mx-0 lg:col-span-5 order-1 flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-background border border-silver/20">
              <img src="/Brad_Professional_Shot_clean.webp" alt="Brad Warburton - Principal Advisor" loading="lazy" className="w-full h-[320px] sm:h-[380px] lg:h-[450px] object-cover object-top grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-primary font-bold text-2xl tracking-wide">Brad Warburton</p>
              <p className="text-accent font-bold tracking-[0.2em] text-xs uppercase">Principal, BW Advisory Solutions</p>
              <a
                href="https://linkedin.com/in/bradwarburton"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-[#C9A84C]/60 hover:text-[#C9A84C] font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 mt-1"
              >
                LinkedIn ↗
              </a>
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
              <p>I built operational systems for large-scale law enforcement long before digital tools existed to support them. Major operational commands ran on processes and disciplines I wrote — not because technology enabled them, but because the thinking underneath was sound.</p>
              <p>When a national health crisis required border management built from scratch, I designed and commanded it: more than a million travellers screened, no existing infrastructure, no tolerance for failure. The intelligence architecture that came next, inside a state-level command environment, existed so frontline operators could act on information while it still mattered.</p>
              <p>Then the private sector, leading law enforcement partnerships for a retail intelligence technology company — sitting between what police need and what a technology business can actually deliver, proved across every Australian state and territory.</p>
              <p>That order matters. Operational practice came first, before the tools existed. Then a seat inside a technology business, watching which products got used and which got bought and shelved. It is why I review a vendor proposal the way I do — not on the demonstration, but on whether the proposal will hold in practice.</p>
              <p className="font-medium text-textDark">The problems look different. The fundamentals are the same.</p>
            </div>
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
              Most of my work is with retailers and multi-site operators carrying loss and operational risk. The same capability applies wherever an operation has outgrown the structure holding it together.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '36px' }}>
            {/* Card 01 — Operational Resilience */}
            <a href="/#advisory" className="practice-card group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/30 to-accent/30 rounded-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 blur-md"></div>
              <div
                className="relative block rounded-3xl h-full flex flex-col border border-[#0369A1]/40 group-hover:border-[#C9A84C] transition-all duration-300 group-hover:shadow-[0_20px_60px_rgba(201,168,76,0.25)] group-hover:-translate-y-1"
                style={{
                  padding: '40px 42px',
                  background: 'linear-gradient(140deg, rgba(26,53,96,0.8), rgba(13,21,32,0.6), rgba(5,16,32,0.8))',
                }}
              >
                <div style={{ gap: '20px' }} className="flex flex-col flex-1">
                  <p className="text-[#C9A84C] font-mono tracking-[0.3em] text-[11px] uppercase font-bold">Practice Area 01</p>
                  <h3 className="font-display font-semibold text-3xl text-white leading-tight">Operational Resilience</h3>
                  <p className="text-[rgba(192,200,208,0.85)] font-light text-base leading-[1.7]" style={{ textWrap: 'pretty' }}>
                    Operations that have grown faster than the structure holding them together — where operational pressure, compliance exposure, and client or patient data risk start to compound. I map what the operation actually does, find where it breaks, and rebuild the parts that don't hold. Delivered without disrupting how you run day to day.
                  </p>
                </div>
              </div>
            </a>

            {/* Card 02 — Technology Advisory */}
            <a href="/#advisory" className="practice-card group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/30 to-accent/30 rounded-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 blur-md"></div>
              <div
                className="relative block rounded-3xl h-full flex flex-col border border-[#0369A1]/40 group-hover:border-[#C9A84C] transition-all duration-300 group-hover:shadow-[0_20px_60px_rgba(201,168,76,0.25)] group-hover:-translate-y-1"
                style={{
                  padding: '40px 42px',
                  background: 'linear-gradient(140deg, rgba(26,53,96,0.8), rgba(13,21,32,0.6), rgba(5,16,32,0.8))',
                }}
              >
                <div style={{ gap: '20px' }} className="flex flex-col flex-1">
                  <p className="text-[#C9A84C] font-mono tracking-[0.3em] text-[11px] uppercase font-bold">Practice Area 02</p>
                  <h3 className="font-display font-semibold text-3xl text-white leading-tight">Technology Advisory</h3>
                  <p className="text-[rgba(192,200,208,0.85)] font-light text-base leading-[1.7] flex-1" style={{ textWrap: 'pretty' }}>
                    Make sense of a vendor's proposal before you commit. I assess how it fits your operation, how it handles your data, and whether its claims are supported. You get clear findings and practical questions to take back to the vendor. The supplier decision stays with you.
                  </p>
                  <div className="pt-[18px] border-t border-white/[0.12]">
                    <p className="text-[rgba(192,200,208,0.7)] font-light text-sm leading-[1.65]">
                      Any commission or other interest I hold in a provider is disclosed in writing before the work starts.
                    </p>
                  </div>
                </div>
              </div>
            </a>

            {/* Card 03 — Privacy Advisory Support */}
            <a href="/#advisory" className="practice-card group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/30 to-accent/30 rounded-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 blur-md"></div>
              <div
                className="relative block rounded-3xl h-full flex flex-col border border-[#0369A1]/40 group-hover:border-[#C9A84C] transition-all duration-300 group-hover:shadow-[0_20px_60px_rgba(201,168,76,0.25)] group-hover:-translate-y-1"
                style={{
                  padding: '40px 42px',
                  background: 'linear-gradient(140deg, rgba(26,53,96,0.8), rgba(13,21,32,0.6), rgba(5,16,32,0.8))',
                }}
              >
                <div style={{ gap: '20px' }} className="flex flex-col flex-1">
                  <p className="text-[#C9A84C] font-mono tracking-[0.3em] text-[11px] uppercase font-bold">Practice Area 03</p>
                  <h3 className="font-display font-semibold text-3xl text-white leading-tight">Privacy Advisory Support</h3>
                  <p className="text-[rgba(192,200,208,0.85)] font-light text-base leading-[1.7]" style={{ textWrap: 'pretty' }}>
                    Surveillance, analytics and AI tools collect more than most organisations realise, and more than most vendors can explain. I work alongside your privacy officer, your counsel or your external assessor — framing the operational questions, pressing the vendor on what the system actually does with personal information, and translating what comes back into something your board can decide on.
                  </p>
                </div>
              </div>
            </a>

            {/* Card 04 — Loss Intelligence */}
            <a href="/loss-intelligence" className="practice-card group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/30 to-accent/30 rounded-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 blur-md"></div>
              <div
                className="relative block rounded-3xl h-full flex flex-col border border-[#0369A1]/40 group-hover:border-[#C9A84C] transition-all duration-300 group-hover:shadow-[0_20px_60px_rgba(201,168,76,0.25)] group-hover:-translate-y-1"
                style={{
                  padding: '40px 42px',
                  background: 'linear-gradient(140deg, rgba(26,53,96,0.8), rgba(13,21,32,0.6), rgba(5,16,32,0.8))',
                }}
              >
                <div style={{ gap: '20px' }} className="flex flex-col flex-1">
                  <p className="text-[#C9A84C] font-mono tracking-[0.3em] text-[11px] uppercase font-bold">Practice Area 04</p>
                  <h3 className="font-display font-semibold text-3xl text-white leading-tight">Loss Intelligence</h3>
                  <p className="text-[rgba(192,200,208,0.85)] font-light text-base leading-[1.7]" style={{ textWrap: 'pretty' }}>
                    Retailers and multi-site operators losing value to theft, organised crime, and process failure — usually without a clear picture of where, or how much. I've worked both sides of this: running large-scale operational commands, then building the intelligence partnerships between retailers and law enforcement. I build that detection capability inside your business, so your team owns and runs it.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── BEFORE YOU SIGN ── */}
      <section id="seat" className="relative w-full z-10" style={{ background: '#0A1520', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '120px 56px' }}>
        <div className="absolute bottom-0 left-0 pointer-events-none" style={{ width: '640px', height: '640px', background: 'rgba(3,105,161,0.09)', filter: 'blur(150px)' }} />
        <div className="relative z-10 mx-auto flex flex-col" style={{ maxWidth: '1000px', gap: '30px' }}>
          <p className="text-[#C9A84C] font-mono tracking-[0.3em] uppercase text-xs font-bold">Before You Sign</p>
          <h2 className="font-display font-bold text-white" style={{ fontSize: '54px', lineHeight: 1.06, letterSpacing: '-0.02em' }}>
            The proposal, not the demonstration.
          </h2>
          <p className="font-sans font-light" style={{ fontSize: '19px', lineHeight: 1.7, color: 'rgba(240,244,248,0.85)', maxWidth: '74ch' }}>
            The market is noise. AI claims that do not survive a question. Privacy exposure nobody costed. I spent years inside a technology business watching which products got used and which were bought and shelved. I read a vendor's proposal against the operation that has to run it.
          </p>
          <p className="font-sans font-light" style={{ fontSize: '19px', lineHeight: 1.7, color: 'rgba(240,244,248,0.85)', maxWidth: '74ch' }}>
            You get a plain answer on what the technology does, how it handles data, and the questions your decision-makers should put to the vendor. Before you sign, not after.
          </p>
          <p className="font-sans font-normal pt-8 mt-4" style={{ fontSize: '18px', lineHeight: 1.7, color: 'rgba(240,244,248,0.92)', maxWidth: '74ch', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            I hold a commissioned referral arrangement with a technology provider. Where that, or any other interest I hold in a provider, touches an engagement, I disclose it in writing before the work starts.
          </p>
          <p className="font-sans font-light" style={{ fontSize: '17px', lineHeight: 1.7, color: 'rgba(240,244,248,0.75)', maxWidth: '74ch' }}>
            My role is advisory. I do not specify, select, design, site, supply, install, configure or price equipment. If equipment is required, you choose and engage a licensed supplier or installer.
          </p>
        </div>
      </section>

      {/* ── STREAM A: OPERATIONAL RESILIENCE & SECURITY ADVISORY ── */}
      <section id="advisory" className="py-32 w-full relative z-10 bg-gradient-to-b from-primary via-[#0D1520] to-primary">
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
          <div className="mb-20 max-w-4xl">
            <p className="text-[#C9A84C] font-mono tracking-[0.3em] uppercase text-xs mb-6 font-bold">For operations and professional services firms</p>
            <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight mb-8">
              Operational Resilience and Technology Capability
            </h2>
            <p className="text-xl md:text-2xl text-silver/75 font-light leading-relaxed">
              Most businesses know they need to modernise — they just don't have time to work out what actually fits. I diagnose the operational reality, then set out what technology must do to support it: practical improvements across operations, automation, and capability.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { num: '01', name: 'Operational Resilience Diagnostic', desc: "Structured assessment of the business's operational, financial and compliance exposure. Delivered as a prioritised action plan." },
              { num: '02', name: 'Process Automation and AI Integration', desc: 'Identify the manual, repetitive, error-prone work consuming partner and staff time. Replace it with automation and AI-assisted workflows that match how the business already operates.' },
              { num: '03', name: 'Vendor Proposal Review', desc: "Before you sign, I review a vendor proposal against the way your operation will actually run it. You get a clear view of whether it holds up, how the technology handles your data, and the questions to put to the vendor. The supplier decision remains yours." },
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
            <Link to="/consultation" onClick={() => posthog.capture('scoping_session_cta_clicked', { location: 'advisory_section' })} className="group relative overflow-hidden bg-[#C9A84C] px-12 md:px-16 py-5 md:py-6 rounded-lg text-[#0F172A] font-bold text-sm md:text-base hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase inline-flex items-center justify-center gap-4 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10 cursor-pointer">
              Request a Scoping Session
              <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── DELIVERY ── */}
      <section id="team" className="py-32 w-full relative z-10 bg-gradient-to-b from-[#0D1520] to-primary">
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
          <div className="max-w-4xl">
            <p className="text-[#C9A84C] font-mono tracking-[0.3em] uppercase text-xs mb-6 font-bold">Delivery</p>
            <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight mb-10">
              Led personally. Specialist developers for the build.
            </h2>
            <div className="space-y-6 text-xl md:text-2xl text-silver/75 font-light leading-relaxed">
              <p>Every engagement is led personally — the diagnostic, the client relationship and the strategic direction. Where an engagement includes building an automation or AI workflow, independent specialist developers complete the build under my direction and my contract. I remain responsible for their work.</p>
              <p>Most operations are running a fraction of the capability they already own. The value lies in reducing duplicated tools, avoidable manual hours and exposure to operational incidents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIAGNOSTICS PATHWAY ── */}
      <section className="py-32 w-full relative z-10 bg-gradient-to-b from-primary via-[#0D1520] to-primary overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
          <div className="space-y-4">
            <p className="font-mono tracking-[0.3em] uppercase text-sm font-bold" style={{ color: '#5FB4F0' }}>Diagnostic Assessment</p>
            <h2 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">Know Your Exposure</h2>
            <p className="text-xl md:text-2xl text-silver/80 font-light leading-relaxed">
              Start with what's true. Five diagnostics across three streams. Four of them come to me — I read every answer and write the assessment myself. The AI Readiness report is fully automated and comes back instantly.
            </p>
          </div>
          <div className="pt-8 flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-white/90 font-normal text-base">
              {['Four written by Brad, within 24 hours', 'One automated, returned instantly', 'About eight minutes each'].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#5FB4F0' }} fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
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
          <div>
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-[900ms] ease-out ${awVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            {awCards.map((cs) => (
              <div key={cs.num} className="group relative lg:grid lg:[grid-row:span_7] lg:[grid-template-rows:subgrid] lg:gap-y-0">
                <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/20 to-accent/15 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-700 blur-md pointer-events-none lg:col-span-full lg:row-span-full"></div>
                <div
                  className="relative bg-white/[0.045] backdrop-blur-sm border border-[#0369A1]/[0.28] group-hover:border-[#C9A84C]/40 rounded-2xl transition-all duration-400 lg:col-span-full lg:grid lg:row-span-full lg:[grid-template-rows:subgrid]"
                  style={{ padding: '32px 32px 30px' }}
                >
                  <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold" style={{ paddingBottom: '14px' }}>Case {cs.num}</p>
                  <h3 className="font-display font-bold text-[26px] text-white leading-[1.2] tracking-[-0.01em]" style={{ paddingBottom: '10px' }}>{cs.title}</h3>
                  <p className="text-[rgba(201,168,76,0.75)] font-mono font-bold uppercase leading-[1.5] text-xs" style={{ letterSpacing: '0.14em', paddingBottom: '22px' }}>{cs.tag}</p>
                  {[['Situation', cs.situation], ['Gap', cs.gap], ['Outcome', cs.outcome]].map(([label, text]) => (
                    <div key={label} style={{ paddingBottom: '16px' }}>
                      <p className="text-[#5FB4F0] font-mono font-bold uppercase mb-1.5 text-xs" style={{ letterSpacing: '0.14em' }}>{label}</p>
                      <p className="text-[rgba(210,216,224,0.92)] font-normal leading-[1.6] text-base" style={{ textWrap: 'pretty' }}>{text}</p>
                    </div>
                  ))}
                  <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(201,168,76,0.28)' }}>
                    <p className="font-mono font-bold uppercase text-xs" style={{ letterSpacing: '0.22em', color: '#E4C978', marginBottom: '10px' }}>Impact</p>
                    <p className="text-white font-semibold text-xl leading-[1.3]">{cs.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {AW_PAGE_COUNT > 1 && (
            <div className="flex justify-center gap-3 mt-12">
              {Array.from({ length: AW_PAGE_COUNT }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToAwPage(i)}
                  aria-label={`Show Applied Work cases, page ${i + 1}`}
                  aria-current={awPage === i}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${awPage === i ? 'w-8 bg-[#C9A84C]' : 'w-2.5 bg-white/20 hover:bg-white/35'}`}
                />
              ))}
            </div>
          )}
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
            <p className="font-mono tracking-[0.3em] text-sm uppercase font-bold" style={{ color: '#5FB4F0' }}>Operational Doctrine</p>
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

      {/* ── THE ENGAGEMENT ── */}
      <TheEngagement />

      {/* ── WHY THIS PRACTICE EXISTS ── */}
      <section id="why" className="py-32 w-full relative z-10 bg-gradient-to-b from-surface via-background to-surface">
        <div className="max-w-5xl mx-auto px-6 xl:px-12">
          <div className="mb-12 space-y-6">
            <p className="text-accent font-mono tracking-[0.3em] uppercase text-xs mb-2 font-bold">Why This Practice Exists</p>
            <h2 className="font-display font-semibold text-primary tracking-tight leading-[1.08]" style={{ fontSize: '52px' }}>
              This discipline was never available at your size.
            </h2>
            <p className="font-serif italic font-medium" style={{ color: '#1B6EC2', fontSize: '36px', lineHeight: 1.15 }}>
              Now it is.
            </p>
          </div>
          <div className="space-y-6 font-light max-w-4xl" style={{ fontSize: '20px', lineHeight: 1.7, color: 'rgba(26,53,96,0.9)' }}>
            <p>Two things are happening at once. Technology is arriving faster than any operation can absorb it, and choosing well takes diligence most businesses cannot spare. At the same time organised loss is moving across sites, stores and supply chains faster than most response capability can match.</p>
            <p>Both problems have the same cause. Capability is being bought instead of built.</p>
            <p>The organisations that get clear on this in the next twelve to eighteen months will hold a structural advantage. The rest will spend years unpicking decisions that were preventable.</p>
            <p className="font-medium text-textDark" style={{ fontSize: '20px' }}>Large organisations solve this with a standing intelligence and operations function. Most businesses cannot carry one. That is the gap this practice exists to close.</p>
          </div>
        </div>
      </section>

      {/* ── PRICING STRIP ── (hidden until VITE_PURCHASE_SURFACE_ENABLED=true) */}
      {import.meta.env.VITE_PURCHASE_SURFACE_ENABLED === 'true' && (
        <section className="py-24 w-full relative z-10 bg-gradient-to-b from-primary via-[#0A1520] to-primary overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 space-y-10">
            <div className="text-center space-y-3">
              <p className="text-[#C9A84C] font-mono tracking-[0.3em] uppercase text-xs font-bold">Paid Reports</p>
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-white tracking-tight">AI readiness reports. Fixed price. No call required.</h2>
              <p className="text-silver/65 font-light text-base">Paid tiers from $497 incl. GST</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to="/pricing#snapshot"
                className="group block bg-gradient-to-br from-white/8 via-white/4 to-white/2 border border-white/15 hover:border-[#C9A84C]/40 rounded-2xl p-8 space-y-3 transition-all duration-300 hover:bg-white/10"
              >
                <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">AI Snapshot Report</p>
                <p className="font-display font-bold text-3xl text-white">$497 <span className="text-sm text-silver/50 font-light">incl. GST</span></p>
                <p className="text-silver/70 font-light text-sm leading-relaxed">Automated — instant delivery. Named tools, verified pricing, and a 4-day setup plan per opportunity.</p>
                <p className="text-[#C9A84C] text-sm font-semibold group-hover:underline">View pricing →</p>
              </Link>
              <Link
                to="/pricing#solution-map"
                className="group block bg-gradient-to-br from-[#C9A84C]/6 via-white/4 to-white/2 border border-[#C9A84C]/20 hover:border-[#C9A84C]/50 rounded-2xl p-8 space-y-3 transition-all duration-300 hover:bg-[#C9A84C]/8"
              >
                <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">AI Solution Map</p>
                <p className="font-display font-bold text-3xl text-white">$1,497 <span className="text-sm text-silver/50 font-light">incl. GST</span></p>
                <p className="text-silver/70 font-light text-sm leading-relaxed">Personally reviewed by Brad. Everything in the Snapshot, plus deeper analysis, sequencing, and a 30-min call.</p>
                <p className="text-[#C9A84C] text-sm font-semibold group-hover:underline">View pricing →</p>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── ENGAGEMENT: THE CONVERSATION ── */}
      <section id="contact" className="py-32 px-6 w-full bg-gradient-to-b from-[#0D1520] via-primary to-primary relative z-10">
        <div className="max-w-5xl mx-auto">
          <BookingSection />
        </div>
      </section>

      <Footer />

      {/* ── STICKY CTA BAR ── */}
      {heroPassed && !stickyDismissed && (
        <div role="region" aria-label="Diagnostic call to action" className="fixed bottom-0 left-0 right-0 z-[90] bg-[#0F172A]/95 backdrop-blur-md border-t border-[#C9A84C]/30 shadow-[0_-8px_24px_rgba(0,0,0,0.35)]">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <p className="text-white font-light text-sm md:text-base flex-1 text-center sm:text-left leading-snug">Find out what your gaps are costing you.</p>
            <div className="flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
              <Link to="/ai-readiness" className="bg-[#C9A84C] hover:bg-[#E0BC60] text-[#0F172A] font-bold text-xs md:text-sm tracking-[0.15em] uppercase px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center gap-2 shadow-[0_4px_12px_rgba(201,168,76,0.3)] hover:shadow-[0_6px_16px_rgba(201,168,76,0.4)] cursor-pointer whitespace-nowrap">
                Know Your Exposure
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
