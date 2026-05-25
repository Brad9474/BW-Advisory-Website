import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Fallback for document element
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};
import Navbar from './components/Navbar';
import NoiseOverlay from './components/NoiseOverlay';
import PageCanvas from './components/PageCanvas';
import IntelligenceCanvas from './components/IntelligenceCanvas';
const Home = React.lazy(() => import('./pages/Home'));
const LossIntelligence = React.lazy(() => import('./pages/LossIntelligence'));
const Diagnostics = React.lazy(() => import('./pages/Diagnostics'));
const Investigations = React.lazy(() => import('./pages/Investigations'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const AIReadiness = React.lazy(() => import('./pages/AIReadiness'));
const Consultation = React.lazy(() => import('./pages/Consultation'));

gsap.registerPlugin(ScrollTrigger);

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const Canvas = pathname === '/loss-intelligence' ? IntelligenceCanvas : PageCanvas;
  return (
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
      <Canvas />
      <div className="absolute inset-0 bg-[#0D2247]/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D2247]/20 via-transparent to-[#0D2247]" />
    </div>

    <NoiseOverlay />
    <Navbar />

    {children}
  </div>
  );
};

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Suspense fallback={<div className="min-h-screen bg-primary" />}>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/loss-intelligence" element={<Layout><LossIntelligence /></Layout>} />
        <Route path="/diagnostics" element={<Layout><Diagnostics /></Layout>} />
        <Route path="/investigations" element={<Layout><Investigations /></Layout>} />
        <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
        <Route path="/ai-readiness" element={<Layout><AIReadiness /></Layout>} />
        <Route path="/consultation" element={<Layout><Consultation /></Layout>} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
