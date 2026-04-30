import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShieldLogo from './ShieldLogo';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Framework', href: '/#framework' },
  { name: 'Engagement', href: '/#protocol' },
  { name: 'Investigations', to: '/investigations' },
  { name: 'Loss Intelligence', to: '/loss-intelligence' },
  { name: '8-Min Diagnostic', to: '/diagnostics' },
  { name: 'Contact', href: '/#contact' },
];

const Navbar = () => {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = "hover:text-gold transition-all duration-300 transform hover:translate-y-[-1px] whitespace-nowrap";

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl pointer-events-none">
        <nav
          ref={navRef}
          className={`
            pointer-events-auto
            flex items-center justify-between
            px-12 py-4 rounded-full border border-white/5
            transition-all duration-1000 cubic-bezier(0.2, 0.8, 0.2, 1)
            ${scrolled ? 'bg-primary/60 backdrop-blur-2xl border-accent/20 shadow-[0_20px_50px_rgba(3,105,161,0.3)]' : 'bg-primary/20 backdrop-blur-xl border-accent/10'}
          `}
        >
          <Link
            to="/"
            className="group flex items-center gap-2 hover:opacity-80 transition-all duration-300"
          >
            <ShieldLogo className="w-11 h-11 drop-shadow-[0_0_16px_rgba(201,168,76,0.4)] group-hover:drop-shadow-[0_0_22px_rgba(201,168,76,0.7)] transition-all duration-300 flex-shrink-0" />
            <div className="hidden sm:flex flex-col justify-center leading-tight">
              <span className="font-display font-bold text-[13px] tracking-[0.08em] text-white uppercase">
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

          <div className="hidden lg:flex items-center gap-10 font-sans font-semibold text-[11px] tracking-[0.2em] uppercase text-silver/60 flex-1 justify-center px-8">
            {navLinks.slice(0, 6).map((link) => (
              link.to ? (
                <Link
                  key={link.name}
                  to={link.to}
                  className={link.name === '8-Min Diagnostic'
                    ? "text-[#C9A84C] hover:text-[#E0BC60] transition-all duration-300"
                    : "text-silver/60 hover:text-white transition-all duration-300"}
                >
                  {link.name}
                </Link>
              ) : (
                <a key={link.name} href={link.href} className="text-silver/60 hover:text-white transition-all duration-300">
                  {link.name}
                </a>
              )
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://portal.bwadvisorysolutions.com.au/intake.html"
              className="group relative overflow-hidden bg-[#C9A84C] px-10 py-3.5 rounded-full text-primary font-bold text-[11px] tracking-[0.15em] uppercase hover:bg-[#E0BC60] transition-all duration-300 transform hover:scale-[1.05] shadow-lg shadow-[#C9A84C]/20 cursor-pointer"
            >
              Consultation
            </a>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 text-silver/60 hover:text-white transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-primary/98 backdrop-blur-3xl z-[200] transition-all duration-500 lg:hidden ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 p-3 text-silver/60 hover:text-white transition-colors"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="h-full flex flex-col items-center justify-center gap-10 p-8 text-center">
          {navLinks.map((link) => (
            link.to ? (
              <Link key={link.name} to={link.to} onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold text-white/70 hover:text-gold uppercase tracking-[0.3em]">
                {link.name}
              </Link>
            ) : (
              <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold text-white/70 hover:text-gold uppercase tracking-[0.3em]">
                {link.name}
              </a>
            )
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
