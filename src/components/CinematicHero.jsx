import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Immersive video hero: the background video is scoped to this section only
// (not the full page). Autoplay is suppressed for prefers-reduced-motion and
// for mobile viewports — in both cases the poster is shown and the MP4 is
// never fetched until the visitor explicitly presses Play, to save data.
const CinematicHero = ({
  eyebrow,
  heading,
  body,
  ctaLabel,
  ctaHref,
  videoSrc,
  posterSrc,
  crossLinkTo,
  crossLinkLabel,
}) => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  // Lazy initializers run synchronously on first render, so autoplay is never
  // even momentarily true for reduced-motion/mobile visitors (no race with
  // the effect below, which only needs to react to *later* preference changes).
  const [userPaused, setUserPaused] = useState(
    () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(max-width: 767px)').matches
  );
  const [onScreen, setOnScreen] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);
  const [hasSource, setHasSource] = useState(false);

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
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibility = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const shouldPlay = !userPaused && onScreen && !tabHidden;

  useEffect(() => {
    if (shouldPlay && !hasSource) {
      // Mounts the <video> element; this effect re-runs once the ref exists.
      setHasSource(true);
      return;
    }
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [shouldPlay, hasSource]);

  const togglePlayback = () => setUserPaused((prev) => !prev);

  return (
    <section ref={sectionRef} className="group/hero relative isolate min-h-[660px] flex items-center justify-center overflow-hidden px-6 py-28 md:py-32">
      <div className="absolute inset-0 -z-20 bg-[#1A3560]">
        {hasSource && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover object-center"
            src={videoSrc}
            poster={posterSrc}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}
        {!hasSource && (
          <img
            src={posterSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}
      </div>

      {/* Navy reading overlay for text legibility across the whole loop */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(0deg, #0F172A 0%, transparent 20%, transparent 88%, rgba(15,23,42,0.5) 100%), radial-gradient(ellipse 60% 80% at 50% 50%, rgba(15,23,42,0.93) 0%, rgba(15,23,42,0.85) 46%, rgba(15,23,42,0.55) 78%, rgba(15,23,42,0.15) 100%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        <p className="text-[#C9A84C] font-sans font-semibold text-xs tracking-[0.2em] uppercase">{eyebrow}</p>
        <h1 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] tracking-tight text-balance">
          {heading}
        </h1>
        <p className="font-sans text-lg md:text-xl text-[#E2E8F0] font-light leading-relaxed max-w-3xl mx-auto">
          {body}
        </p>
        <div className="flex flex-col items-center gap-6 pt-2">
          <Link
            to={ctaHref}
            className="inline-flex items-center gap-3 bg-[#C9A84C] hover:bg-[#E0BC60] text-[#0F172A] font-sans font-semibold text-sm tracking-[0.1em] uppercase px-10 py-4 rounded-lg transition-all duration-300 shadow-[0_8px_24px_rgba(201,168,76,0.3)]"
          >
            {ctaLabel}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          </Link>
          {crossLinkTo && (
            <Link to={crossLinkTo} className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#E0BC60] font-mono text-xs tracking-[0.2em] uppercase font-bold transition-colors">
              {crossLinkLabel}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </Link>
          )}
        </div>
      </div>

      {/* Kept quiet at rest on pointer devices; always visible on touch, where
          it is the only way to start the video and there is no hover. */}
      <button
        type="button"
        onClick={togglePlayback}
        className="absolute right-5 bottom-5 z-10 w-11 h-11 flex items-center justify-center rounded-full text-[#E2E8F0] bg-[#0F172A]/70 border border-white/20 backdrop-blur-sm opacity-100 md:opacity-30 md:group-hover/hero:opacity-100 focus-visible:opacity-100 hover:bg-[#0F172A]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A84C] transition-opacity duration-300"
        aria-label={userPaused ? 'Play background video' : 'Pause background video'}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          {userPaused ? <path d="M8 5v14l11-7z" /> : <path d="M6 5h4v14H6zm8 0h4v14h-4z" />}
        </svg>
      </button>
    </section>
  );
};

export default CinematicHero;
