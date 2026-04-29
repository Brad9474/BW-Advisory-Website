import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};
import Navbar from './components/Navbar';
import NoiseOverlay from './components/NoiseOverlay';
import Home from './pages/Home';
import LossIntelligence from './pages/LossIntelligence';
import Diagnostics from './pages/Diagnostics';
import PROVED from './pages/PROVED';
import Privacy from './pages/Privacy';

gsap.registerPlugin(ScrollTrigger);

const Layout = ({ children }) => (
  <div className="w-full min-h-screen selection:bg-accent/40 selection:text-surface font-sans text-textDark bg-primary relative overflow-x-hidden">
    <style>{`
      @keyframes shine-platinum {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      .platinum-text {
        background: linear-gradient(110deg, #d8d8d8 20%, #ffffff 40%, #b2bcc9 50%, #ffffff 60%, #cbd2da 80%);
        background-size: 200% auto;
        color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        animation: shine-platinum 6s linear infinite;
      }
      @keyframes dashReveal {
        to { stroke-dashoffset: 0; }
      }
      @keyframes revealRight {
        0% { width: 0; }
        100% { width: 100%; }
      }
      @keyframes kenBurns {
        0%   { transform: scale(1.05) translate(0, 0); }
        50%  { transform: scale(1.12) translate(-1.5%, -1%); }
        100% { transform: scale(1.05) translate(0, 0); }
      }
    `}</style>

    {/* Fixed background with living city movement */}
    <div className="fixed inset-0 z-0 bg-[#0D2247] overflow-hidden">
      <img
        src="/punchy.webp"
        alt="Digital Network Cityscape"
        className="w-full h-full object-cover object-center opacity-55"
        style={{ animation: 'kenBurns 30s ease-in-out infinite' }}
      />
      <div className="absolute inset-0 bg-[#0D2247]/55 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D2247]/30 via-[#0D2247]/50 to-[#0D2247]"></div>
    </div>

    <NoiseOverlay />
    <Navbar />

    {children}
  </div>
);

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/loss-intelligence" element={<Layout><LossIntelligence /></Layout>} />
      <Route path="/diagnostics" element={<Layout><Diagnostics /></Layout>} />
      <Route path="/proved" element={<Layout><PROVED /></Layout>} />
      <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
    </Routes>
  </BrowserRouter>
);

export default App;
