import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 py-32 text-center z-10">
    <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold mb-6">404</p>
    <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight mb-6">
      That page doesn't exist.
    </h1>
    <p className="text-silver/75 font-light text-lg md:text-xl leading-relaxed max-w-xl mb-12">
      The link may be out of date, or the page may have moved. If you were looking for something specific, get in touch directly.
    </p>
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <Link
        to="/"
        className="text-silver/70 hover:text-white font-mono text-xs tracking-[0.2em] uppercase font-bold transition-colors"
      >
        Back to home
      </Link>
      <Link
        to="/consultation"
        className="group relative overflow-hidden bg-[#C9A84C] px-10 py-4 rounded-full text-[#0F172A] font-bold text-sm hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase flex items-center justify-center gap-3 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10 cursor-pointer"
      >
        Request a Scoping Session
        <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  </section>
);

export default NotFound;
