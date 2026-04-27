import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Framework', href: '/#framework' },
  { name: 'The Engagement', href: '/#protocol' },
  { name: 'Ground Truth', to: '/ground-truth' },
  { name: 'Loss Intelligence', to: '/loss-intelligence' },
  { name: 'Diagnostics', to: '/diagnostics' },
  { name: 'Contact Us', href: '/#contact' },
];

const Navbar = () => {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -50",
        onUpdate: (self) => {
          if (self.direction === 1 || self.progress > 0) {
            setScrolled(true);
            gsap.to(navRef.current, { backgroundColor: "rgba(13, 34, 71, 0.98)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(192, 200, 208, 0.2)", duration: 0.3 });
          } else if (self.progress === 0) {
            setScrolled(false);
            gsap.to(navRef.current, { backgroundColor: "transparent", backdropFilter: "blur(0px)", borderBottom: "1px solid transparent", duration: 0.3 });
          }
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const linkClass = "relative group overflow-hidden whitespace-nowrap";
  const underlineClass = "absolute -bottom-1 left-0 w-full h-[2px] bg-accent transform -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300";

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        <nav ref={navRef} className="px-6 py-4 flex items-center justify-between transition-all duration-300 min-h-[70px] md:min-h-[80px]">

          <div className="w-[120px] lg:w-[300px] flex items-center justify-start">
            <div className={"transition-all duration-500 transform origin-left " + (scrolled ? "opacity-100 scale-100 translate-x-0" : "opacity-0 md:opacity-100 md:scale-100 md:translate-x-0 lg:opacity-0 lg:scale-75 lg:-translate-x-8")}>
              <Link to="/">
                <img src="/BW_Advisory_Solutions_Logo.webp" alt="Logo" className="h-8 md:h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 md:gap-10 font-sans font-bold text-[16px] xl:text-[18px] text-surface tracking-[0.15em] uppercase">
            {navLinks.map((link) =>
              link.to ? (
                <Link key={link.name} to={link.to} className={linkClass}>
                  {link.name}
                  <span className={underlineClass}></span>
                </Link>
              ) : (
                <a key={link.name} href={link.href} className={linkClass}>
                  {link.name}
                  <span className={underlineClass}></span>
                </a>
              )
            )}
          </div>

          <div className="lg:w-[300px] flex justify-end items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden relative p-2 text-surface hover:text-accent transition-colors"
              aria-label="Open Menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </nav>
      </div>

      <div className={`fixed inset-0 bg-[#0D2247]/97 backdrop-blur-xl z-[9999] transition-all duration-500 lg:hidden ${isMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none"}`}>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-5 right-5 p-2 text-surface hover:text-accent transition-colors"
          aria-label="Close Menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="h-full flex flex-col items-center justify-start gap-0 p-8 pt-24 text-center overflow-y-auto">
          {navLinks.map((link) =>
            link.to ? (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-sans font-bold text-surface tracking-widest uppercase hover:text-accent transition-colors block py-4 border-b border-white/5 w-full max-w-xs"
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-sans font-bold text-surface tracking-widest uppercase hover:text-accent transition-colors block py-4 border-b border-white/5 w-full max-w-xs"
              >
                {link.name}
              </a>
            )
          )}
          <div className="mt-6 pt-6 border-t border-white/10 w-full max-w-xs">
            <a
              href="https://portal.bwadvisorysolutions.com.au/intake.html"
              className="inline-block bg-accent text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(27,110,194,0.4)]"
            >
              Schedule Consult
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
