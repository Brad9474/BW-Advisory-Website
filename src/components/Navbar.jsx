import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShieldLogo from './ShieldLogo';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Diagnostics', to: '/diagnostics' },
  { name: 'AI Readiness', to: '/ai-readiness' },
  { name: 'Loss Intelligence', to: '/loss-intelligence' },
  { name: 'Investigations', to: '/investigations' },
  { name: 'Contact', href: '/#contact' },
];

const Navbar = () => {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLinkActive = (to) => {
    if (!to) return false;
    if (to === '/') return pathname === '/';
    return pathname === to || pathname.startsWith(`${to}/`);
  };

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl pointer-events-none">
        <nav
          ref={navRef}
          className={`
            pointer-events-auto
            flex items-center justify-between
            px-8 lg:px-12 py-4 rounded-full border border-white/5
            transition-all duration-1000 cubic-bezier(0.2, 0.8, 0.2, 1)
            ${scrolled ? 'bg-primary/60 backdrop-blur-2xl border-accent/20 shadow-[0_20px_50px_rgba(3,105,161,0.3)]' : 'bg-primary/20 backdrop-blur-xl border-accent/10'}
          `}
        >
          <Link
            to="/"
            className="group flex items-center gap-2 hover:opacity-80 transition-all duration-300 flex-shrink-0"
          >
            <ShieldLogo className="w-11 h-11 drop-shadow-[0_0_16px_rgba(201,168,76,0.4)] group-hover:drop-shadow-[0_0_22px_rgba(201,168,76,0.7)] transition-all duration-300 flex-shrink-0" />
            <div className="hidden sm:flex flex-col justify-center leading-tight">
              <span className="font-sans font-semibold text-[13px] tracking-[0.18em] text-white uppercase">
                BW ADVISORY
              </span>
              <div className="flex items-center gap-1.5">
                <div className="h-px w-2 bg-gradient-to-r from-transparent to-[#C9A84C]/50"></div>
                <span className="text-[9px] tracking-[0.1em] uppercase text-[#C9A84C] font-semibold">
                  Solutions
                </span>
                <div className="h-px w-2 bg-gradient-to-l from-transparent to-[#C9A84C]/50"></div>
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8 font-sans text-[11px] tracking-[0.2em] uppercase text-silver/60 flex-1 justify-center px-8">
            {navLinks.slice(0, 5).map((link) => {
              const active = isLinkActive(link.to);
              const isCta = link.name === 'AI Readiness';

              if (isCta) {
                const ctaClass = `relative font-bold whitespace-nowrap px-4 py-1.5 rounded-full border transition-all duration-300 ${
                  active
                    ? 'bg-[#C9A84C]/20 border-[#C9A84C]/70 text-white shadow-[0_0_18px_rgba(201,168,76,0.18)]'
                    : 'bg-transparent border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/10 hover:border-[#C9A84C]/70 hover:text-[#E0BC60]'
                }`;
                return (
                  <Link key={link.name} to={link.to} className={ctaClass}>
                    {link.name}
                  </Link>
                );
              }

              const linkClass = `relative font-normal whitespace-nowrap transition-all duration-300 ${
                active ? 'text-white' : 'text-silver/60 hover:text-white'
              }`;
              const underline = active && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] w-6 bg-[#C9A84C] rounded-full" />
              );

              return link.to ? (
                <Link key={link.name} to={link.to} className={linkClass}>
                  {link.name}
                  {underline}
                </Link>
              ) : (
                <a key={link.name} href={link.href} className={linkClass}>
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <a
              href="/consultation"
              className="group relative overflow-hidden bg-[#C9A84C] px-8 lg:px-10 py-3.5 rounded-full text-primary font-bold text-[11px] tracking-[0.15em] uppercase hover:bg-[#E0BC60] transition-all duration-300 transform hover:scale-[1.05] shadow-lg shadow-[#C9A84C]/20 cursor-pointer whitespace-nowrap"
            >
              Consultation
            </a>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 text-silver/60 hover:text-white transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-primary/98 backdrop-blur-3xl z-[200] transition-all duration-500 lg:hidden overflow-y-auto ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 p-3 text-silver/60 hover:text-white transition-colors"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="min-h-full flex flex-col items-center justify-center gap-10 p-8 pt-20 text-center">
          {navLinks.map((link) => {
            const active = isLinkActive(link.to);
            const isCta = link.name === 'AI Readiness';
            const base = 'text-3xl font-bold uppercase tracking-[0.3em] transition-colors';
            const cls = isCta
              ? `${base} px-6 py-2 rounded-full border ${
                  active
                    ? 'bg-[#C9A84C]/20 border-[#C9A84C]/70 text-white'
                    : 'border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/10 hover:text-[#E0BC60]'
                }`
              : `${base} ${active ? 'text-white' : 'text-white/70 hover:text-gold'}`;
            return link.to ? (
              <Link key={link.name} to={link.to} onClick={() => setIsMenuOpen(false)} className={cls}>
                {link.name}
              </Link>
            ) : (
              <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className={cls}>
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
