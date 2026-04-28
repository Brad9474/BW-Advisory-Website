import ShieldLogo from './ShieldLogo';

const Footer = () => (
  <footer className="bg-gradient-to-b from-primary to-[#051020] pt-24 pb-12 px-6 border-t border-[#C9A84C]/20 relative z-10 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-16">
        {/* Brand Column */}
        <div className="md:col-span-4 flex flex-col gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 group">
              <ShieldLogo className="w-11 h-11 drop-shadow-[0_0_16px_rgba(201,168,76,0.4)] group-hover:drop-shadow-[0_0_22px_rgba(201,168,76,0.6)] transition-all duration-700 flex-shrink-0" />
              <div className="flex flex-col justify-center leading-tight">
                <span className="font-sans font-bold text-sm tracking-[0.06em] text-white uppercase">
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
            </div>
            <p className="text-silver/60 font-light text-sm leading-relaxed">
              Operational excellence through strategic clarity and disciplined execution.
            </p>
          </div>

          {/* Credentials */}
          <div className="pt-4 border-t border-[#C9A84C]/10 space-y-3">
            <p className="text-[#C9A84C]/70 font-mono text-xs tracking-widest uppercase font-bold">Company Details</p>
            <div className="space-y-2 text-silver/70 font-light text-sm">
              <p>BW Advisory Solutions</p>
              <p>ABN 11 892 244 979</p>
            </div>
          </div>
        </div>

        {/* Contact Column */}
        <div className="md:col-span-4 space-y-8">
          <div className="space-y-4">
            <p className="text-[#C9A84C]/70 font-mono text-xs tracking-widest uppercase font-bold">Contact</p>
            <div className="space-y-3">
              <a href="mailto:brad@bwadvisorysolutions.com.au" className="flex items-start gap-3 group">
                <span className="text-[#C9A84C] font-mono text-xs tracking-widest uppercase font-bold flex-shrink-0 w-10">Email</span>
                <span className="text-silver/80 hover:text-[#C9A84C] transition-colors font-light">
                  brad@bwadvisorysolutions.com.au
                </span>
              </a>
              <a href="tel:+61407779474" className="flex items-start gap-3 group">
                <span className="text-[#C9A84C] font-mono text-xs tracking-widest uppercase font-bold flex-shrink-0 w-10">Phone</span>
                <span className="text-silver/80 hover:text-[#C9A84C] transition-colors font-light">
                  +61 407 779 474
                </span>
              </a>
              <a href="https://linkedin.com/in/bradwarburton" target="_blank" rel="noreferrer" className="flex items-start gap-3 group">
                <svg className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-silver/80 group-hover:text-[#C9A84C] transition-colors font-light text-sm">
                  linkedin.com/in/bradwarburton
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Column */}
        <div className="md:col-span-4 space-y-8">
          <div className="space-y-4">
            <p className="text-[#C9A84C]/70 font-mono text-xs tracking-widest uppercase font-bold">Navigation</p>
            <nav className="space-y-2 flex flex-col">
              <a href="/#framework" className="text-silver/70 hover:text-[#C9A84C] transition-colors font-light text-sm">
                Methodology
              </a>
              <a href="/#about" className="text-silver/70 hover:text-[#C9A84C] transition-colors font-light text-sm">
                About Brad
              </a>
              <a href="/diagnostics" className="text-silver/70 hover:text-[#C9A84C] transition-colors font-light text-sm">
                8-Min Diagnostic
              </a>
              <a href="/loss-intelligence" className="text-silver/70 hover:text-[#C9A84C] transition-colors font-light text-sm">
                Loss Intelligence
              </a>
              <a href="/ground-truth" className="text-silver/70 hover:text-[#C9A84C] transition-colors font-light text-sm">
                Investigations
              </a>
              <a href="https://portal.bwadvisorysolutions.com.au/client/" className="text-silver/70 hover:text-[#C9A84C] transition-colors font-light text-sm">
                Client Login
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent"></div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-center pt-6">
        <p className="text-silver/40 font-light text-xs tracking-widest text-center">
          &copy; {new Date().getFullYear()} BW Advisory Solutions ABN 11 892 244 979. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
