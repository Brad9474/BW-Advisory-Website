const Footer = () => (
  <footer className="bg-[#0A1C3A] py-16 px-6 border-t border-silver/5 relative z-10 overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12">

      <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto overflow-hidden">
        <img src="/BW_Advisory_Solutions_Logo.png" alt="BW Advisory Logo" className="h-20 mb-6 object-contain" />
        <p className="footer-tagline font-sans text-xl md:text-2xl font-light text-surface tracking-wide drop-shadow-md whitespace-nowrap">
          Bridging the gap between your strategic intent and frontline reality.
        </p>
      </div>

      <div className="flex flex-col gap-4 font-sans font-medium text-xs uppercase tracking-[0.2em] text-center md:text-right">
        <a href="/#framework" className="text-silver/70 hover:text-accent transition-colors">Framework</a>
        <a href="/#protocol" className="text-silver/70 hover:text-accent transition-colors">The Engagement</a>
        <a href="/#about" className="text-silver/70 hover:text-accent transition-colors">About</a>
        <a href="https://portal.bwadvisorysolutions.com.au/client/" className="text-silver/70 hover:text-accent transition-colors">Client Login</a>
      </div>

    </div>

    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-silver/10 flex flex-col items-center justify-center font-sans font-medium text-[10px] text-silver/40 tracking-[0.2em] uppercase">
      <div>&copy; {new Date().getFullYear()} BW Advisory Solutions. All rights reserved.</div>
    </div>
  </footer>
);

export default Footer;
