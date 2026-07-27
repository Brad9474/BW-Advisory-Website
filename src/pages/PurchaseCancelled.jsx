import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const PurchaseCancelled = () => (
  <div className="relative z-10 min-h-screen flex flex-col">
    <section className="flex-1 flex items-center justify-center px-6 pt-40 pb-24">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <p className="text-silver/50 font-mono text-xs tracking-[0.3em] uppercase font-bold">Payment cancelled</p>
          <h1 className="font-display font-bold text-3xl text-white">No charge was made.</h1>
          <p className="text-silver/70 font-light text-base leading-relaxed">
            Your payment was cancelled and nothing has been charged to your card.
          </p>
        </div>
        <Link
          to="/pricing"
          className="inline-block bg-[#C9A84C] px-10 py-4 rounded-full text-[#0F172A] font-bold text-sm tracking-[0.15em] uppercase hover:bg-[#E0BC60] transition-all duration-300 shadow-[0_8px_24px_rgba(201,168,76,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60"
        >
          Back to pricing
        </Link>
      </div>
    </section>
    <Footer />
  </div>
);

export default PurchaseCancelled;
