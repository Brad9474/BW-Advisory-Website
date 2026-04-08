import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const phases = [
  {
    step: "01",
    title: "Engage.",
    desc: "Every engagement starts with strategic intent. We sit down, listen, and establish what you're trying to achieve — and the distance between where you are and where you need to be."
  },
  {
    step: "02",
    title: "Scope.",
    desc: "We define the boundaries of the work before we start. What we examine, what we don't, and what a successful outcome looks like — so there are no surprises on either side."
  },
  {
    step: "03",
    title: "Diagnose.",
    desc: "We go beneath the surface. The friction points, blind spots, and operational realities that don't appear in strategy documents get identified and named."
  },
  {
    step: "04",
    title: "Plan & Align.",
    desc: "We build the bridge between strategic intent and frontline reality. A clear roadmap with shared ownership of outcomes — from the boardroom to the ground."
  },
  {
    step: "05",
    title: "Operationalise.",
    desc: "This is where strategy becomes reality. We stay accountable to the outcome — embedding the change, aligning the people, and measuring what matters until the gap between intent and frontline performance is closed."
  }
];

const HowWeWorkTogether = () => {

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Timeline progress line
      gsap.to(".timeline-progress", {
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top center",
          end: "bottom center",
          scrub: 1
        },
        height: "100%",
        ease: "none"
      });

      // Fade up each node
      gsap.utils.toArray('.timeline-node').forEach((node) => {
        gsap.from(node, {
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" className="relative w-full pb-40 bg-primary z-10 pt-10 overflow-hidden">
      <div className="text-center px-6 max-w-6xl mx-auto mb-24">
        <h2 className="font-light text-4xl lg:text-5xl text-surface tracking-wide border-b border-silver/10 pb-6 mt-2 inline-block">How we will work together.</h2>
      </div>

      <div className="timeline-container max-w-5xl mx-auto px-6 relative">
        {/* Background Line */}
        <div className="absolute left-6 md:left-[50%] top-0 bottom-0 w-[2px] bg-silver/5 md:-translate-x-1/2" />

        {/* Animated Laser Progress Line */}
        <div className="timeline-progress absolute left-6 md:left-[50%] top-0 h-0 w-[2px] bg-accent md:-translate-x-1/2 shadow-[0_0_15px_rgba(27,110,194,0.8)]" />

        <div className="space-y-16 md:space-y-20 relative z-10 py-10">
          {phases.map((phase, i) => (
            <div key={i} className="timeline-node relative w-full flex flex-col md:flex-row justify-between items-center group">

              {/* Glowing Node Marker */}
              <div className="absolute left-6 md:left-1/2 w-5 h-5 rounded-full bg-[#061124] border-2 border-accent transform -translate-x-[9px] md:-translate-x-1/2 top-4 md:top-auto transition-all duration-500 shadow-[0_0_15px_rgba(27,110,194,0.5)] group-hover:scale-[1.5] group-hover:bg-accent z-20" />

              {/* Content Block */}
              <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-16 text-left' : 'md:order-2 md:text-left md:pl-16'} flex flex-col pt-2 md:pt-0`}>
                <p className="text-silver/50 font-bold tracking-[0.3em] text-lg md:text-xl uppercase mb-3 drop-shadow-sm">Phase {phase.step}</p>
                <h3 className="font-light text-4xl lg:text-[2.8rem] leading-tight text-surface tracking-tight mb-5 drop-shadow-sm">{phase.title}</h3>
                <div className={`h-[1px] w-16 bg-accent/40 mb-6 ${i % 2 === 0 ? 'md:ml-auto md:mr-0' : ''}`} />
                <p className="text-[17px] lg:text-xl text-surface/70 leading-relaxed font-light">{phase.desc}</p>
              </div>

              {/* Empty spacer for alternating grid */}
              <div className={`hidden md:block w-[45%] ${i % 2 === 0 ? 'md:order-2' : ''}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Protocol Section CTA */}
      <div className="mt-32 flex justify-center w-full relative z-10 px-6">
        <a href="https://calendly.com/brad-bwadvisorysolutions/30min" target="_blank" rel="noreferrer" className="group relative overflow-hidden bg-accent px-12 py-4 md:py-5 rounded-full text-white font-bold text-sm md:text-base hover:bg-[#155A9E] border border-white/20 transition-all duration-500 tracking-[0.2em] uppercase text-center flex items-center justify-center gap-4 shadow-[0_0_25px_rgba(27,110,194,0.5)] hover:shadow-[0_0_40px_rgba(27,110,194,0.8)] ring-1 ring-accent/50 group-hover:ring-accent w-full md:w-auto">
          Schedule a 30 minute consultation
          <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </a>
      </div>
    </section>
  );
};

gsap.registerPlugin(ScrollTrigger);

const NoiseOverlay = () => (
  <svg className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

// Shield component with white background removal logic
const TransparentShield = () => {
  const canvasRef = useRef(null);
  const [rotationY, setRotationY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    setIsAnimating(false);
    lastX.current = e.clientX;
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastX.current;
    
    setRotationY(prev => prev + deltaX * 1.5);
    lastX.current = e.clientX;
  };

  const handlePointerUp = (e) => {
    isDragging.current = false;
    setIsAnimating(true);
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
    e.target.releasePointerCapture(e.pointerId);
    
    // Smoothly snap to exactly the nearest 360-degree perfect resting position
    setRotationY(prev => Math.round(prev / 360) * 360);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animationFrameId;
    let startTime;
    let originalCanvas = document.createElement('canvas');

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = '/shield.jpg';
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      originalCanvas.width = img.width;
      originalCanvas.height = img.height;

      const oCtx = originalCanvas.getContext('2d');
      oCtx.drawImage(img, 0, 0);

      const imageData = oCtx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 220 && data[i + 1] > 220 && data[i + 2] > 220) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          if (avg > 245) data[i + 3] = 0;
          else data[i + 3] = Math.max(0, 255 - (avg - 220) * 8);
        }
      }
      oCtx.putImageData(imageData, 0, 0);

      const animate = (time) => {
        if (!startTime) startTime = time;
        const elapsed = time - startTime;

        const progress = (elapsed % 3000) / 3000;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(originalCanvas, 0, 0);

        ctx.globalCompositeOperation = 'source-atop';

        ctx.save();
        const sweepX = -canvas.width + (progress * canvas.width * 3);
        ctx.translate(sweepX, 0);
        ctx.transform(1, 0, Math.tan(-20 * Math.PI / 180), 1, 0, 0);

        const gradient = ctx.createLinearGradient(0, 0, canvas.width * 0.5, 0);
        gradient.addColorStop(0, 'rgba(255,255,255,0)');
        gradient.addColorStop(0.5, 'rgba(255,255,255,0.7)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(-200, 0, canvas.width * 0.5 + 400, canvas.height);
        ctx.restore();

        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="shield-elem w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(27,110,194,0.6)] touch-none" 
      style={{ 
        transform: `rotateY(${rotationY}deg)`, 
        cursor: 'grab',
        transition: isAnimating ? 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    />
  );
};

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
            gsap.to(navRef.current, { backgroundColor: "rgba(7, 19, 43, 0.98)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(192, 200, 208, 0.2)", duration: 0.3 });
          } else if (self.progress === 0) {
            setScrolled(false);
            gsap.to(navRef.current, { backgroundColor: "transparent", backdropFilter: "blur(0px)", borderBottom: "1px solid transparent", duration: 0.3 });
          }
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Our Framework', href: '#framework' },
    { name: 'How We Work', href: '#protocol' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <nav ref={navRef} className="px-6 py-4 flex items-center justify-between transition-all duration-300 min-h-[70px] md:min-h-[80px]">

        {/* Left Side: Logo */}
        <div className="w-[120px] lg:w-[300px] flex items-center justify-start">
          <div className={"transition-all duration-500 transform origin-left " + (scrolled ? "opacity-100 scale-100 translate-x-0" : "opacity-0 md:opacity-100 md:scale-100 md:translate-x-0 lg:opacity-0 lg:scale-75 lg:-translate-x-8")}>
            <a href="#">
              <img src="/BW_Advisory_Solutions_Logo.png" alt="Logo" className="h-8 md:h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
            </a>
          </div>
        </div>

        {/* Center: Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8 md:gap-10 font-sans font-bold text-[16px] xl:text-[18px] text-surface tracking-[0.15em] uppercase">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="relative group overflow-hidden whitespace-nowrap">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-accent transform -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300"></span>
            </a>
          ))}
        </div>

        {/* Right Side: Hamburger Toggle (Mobile Only) */}
        <div className="lg:w-[300px] flex justify-end items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative z-50 p-2 text-surface hover:text-accent transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-[#07132B]/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${isMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none"}`}>
          <div className="h-full flex flex-col items-center justify-center gap-10 p-8 pt-24 text-center">
            {navLinks.map((link, i) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-sans font-bold text-surface tracking-widest uppercase hover:text-accent transition-colors block"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {link.name}
              </a>
            ))}
            <div className="mt-10 pt-10 border-t border-white/10 w-full max-w-xs">
              <a 
                href="https://calendly.com/brad-bwadvisorysolutions/30min"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-accent text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(27,110,194,0.4)]"
              >
                Schedule Consult
              </a>
            </div>
          </div>
        </div>

      </nav>
    </div>
  );
};

// ------------- CARDS -------------

const GapAnalysisCard = () => {
  return (
    <div className="relative h-[220px] w-full mt-6 bg-primary/40 rounded-[1.5rem] p-5 shadow-inner overflow-hidden flex items-center justify-center border border-silver/5 group">

      {/* Penetrating the blockage animation */}
      <svg className="w-full h-full relative z-10" viewBox="0 0 300 150">
        <defs>
          <filter id="glowBlue">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Layered Blockage (The Gap/Problem) */}
        <path d="M 150 30 L 150 120" stroke="#050C1C" strokeWidth="20" strokeLinecap="round" opacity="0.8" />
        <path d="M 150 40 L 150 110" stroke="#1B6EC2" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" />

        {/* Flow Line establishing connection */}
        <path d="M 20 75 Q 100 75, 120 75 C 130 75, 140 30, 150 30 C 160 30, 170 75, 180 75 Q 200 75, 280 75" fill="none" stroke="#C0C8D0" strokeWidth="2" opacity="0.3" />

        {/* Dynamic connection penetrating blockage */}
        <path d="M 20 75 Q 100 75, 120 75 C 130 75, 140 30, 150 30 C 160 30, 170 75, 180 75 Q 200 75, 280 75" fill="none" stroke="#1B6EC2" strokeWidth="3" filter="url(#glowBlue)" className="animate-[dashReveal_4s_linear_infinite]" strokeDasharray="300" strokeDashoffset="300" />

        {/* Data points breaching */}
        <circle r="4" fill="#EBF3FA" filter="url(#glowBlue)">
          <animateMotion path="M 20 75 Q 100 75, 120 75 C 130 75, 140 30, 150 30 C 160 30, 170 75, 180 75 Q 200 75, 280 75" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};

const TargetedAnalyticsCard = () => {
  return (
    <div className="h-[220px] w-full bg-primary/40 rounded-[1.5rem] p-6 flex flex-col relative overflow-hidden mt-6 shadow-inner border border-silver/5">

      {/* Abstract Constellation / Mesh Network */}
      <svg className="w-full h-full relative z-10" viewBox="0 0 300 150">
        {/* Static framework */}
        <g stroke="#1B6EC2" strokeWidth="0.5" opacity="0.4">
          <line x1="50" y1="40" x2="120" y2="75" />
          <line x1="50" y1="110" x2="120" y2="75" />
          <line x1="120" y1="75" x2="180" y2="75" />
          <line x1="180" y1="75" x2="250" y2="40" />
          <line x1="180" y1="75" x2="250" y2="110" />
          <line x1="150" y1="20" x2="180" y2="75" />
          <line x1="150" y1="130" x2="120" y2="75" />
        </g>

        {/* Nodes */}
        <circle cx="50" cy="40" r="3" fill="#C0C8D0" opacity="0.5" />
        <circle cx="50" cy="110" r="3" fill="#C0C8D0" opacity="0.5" />
        <circle cx="250" cy="40" r="3" fill="#C0C8D0" opacity="0.5" />
        <circle cx="250" cy="110" r="3" fill="#C0C8D0" opacity="0.5" />
        <circle cx="150" cy="20" r="3" fill="#C0C8D0" opacity="0.5" />
        <circle cx="150" cy="130" r="3" fill="#C0C8D0" opacity="0.5" />

        <circle cx="120" cy="75" r="5" fill="#1B6EC2" className="animate-[pulse_2s_infinite]" />
        <circle cx="180" cy="75" r="5" fill="#1B6EC2" className="animate-[pulse_3s_infinite]" />

        {/* Active Data Streams */}
        <circle r="2" fill="#EBF3FA">
          <animateMotion path="M 50 40 L 120 75" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle r="2" fill="#EBF3FA">
          <animateMotion path="M 250 110 L 180 75" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle r="2" fill="#EBF3FA">
          <animateMotion path="M 150 20 L 180 75" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle r="2" fill="#EBF3FA">
          <animateMotion path="M 120 75 L 180 75" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};

const PlanExecuteCard = () => {
  return (
    <div className="h-[220px] w-full bg-primary/40 rounded-[1.5rem] p-6 relative overflow-hidden mt-6 shadow-inner border border-silver/5">

      {/* Blueprint / Architectural Grid lighting up */}
      <svg className="w-full h-full relative z-10" viewBox="0 0 300 150">
        <defs>
          <pattern id="archGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#C0C8D0" strokeWidth="0.5" opacity="0.1" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#archGrid)" />

        {/* Dynamic Architect Lines filling in */}
        <path d="M 20 130 L 20 20 L 280 20 L 280 130 Z" fill="none" stroke="#1B6EC2" strokeWidth="1" opacity="0.3" />

        <path d="M 20 130 L 20 20 L 280 20 L 280 130 Z" fill="none" stroke="#1B6EC2" strokeWidth="2" strokeDasharray="800" strokeDashoffset="800" className="animate-[dashReveal_5s_ease-in-out_infinite]" />

        {/* Sub-structures drawing */}
        <path d="M 100 130 L 100 80 L 150 80 L 150 130" fill="none" stroke="#C0C8D0" strokeWidth="1" strokeDasharray="200" strokeDashoffset="200" className="animate-[dashReveal_4s_ease-out_infinite_1s]" />
        <path d="M 180 130 L 180 50 L 250 50 L 250 130" fill="none" stroke="#C0C8D0" strokeWidth="1" strokeDasharray="300" strokeDashoffset="300" className="animate-[dashReveal_5s_ease-out_infinite_2s]" />

        {/* Focus Nodes */}
        <circle cx="100" cy="80" r="3" fill="#1B6EC2" className="animate-[ping_3s_infinite]" />
        <circle cx="180" cy="50" r="3" fill="#1B6EC2" className="animate-[ping_4s_infinite]" />
      </svg>
    </div>
  );
};

// ------------- MAIN APP -------------

const App = () => {
  const heroRef = useRef(null);
  const philRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Smooth elegant entry for BW ADVISORY letters
      gsap.from(".logo-letter", {
        y: 60,
        opacity: 0,
        stagger: 0.03,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.1
      });

      // Shield lands
      gsap.from(".shield-elem", {
        y: -50,
        opacity: 0,
        scale: 0.95,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.1
      });

      // Solutions pops out after BW Advisory
      gsap.from(".solutions-word", {
        scale: 1.8,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "expo.out",
        delay: 1.5
      });

      // Lines laser in
      gsap.from(".solutions-line", {
        scaleX: 0,
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut",
        delay: 2.6
      });

      // Clean intro
      gsap.from(".hero-elem", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "power2.out",
        delay: 1.5
      });

      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: "#framework",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out"
      });

      // Elegant sequential sequence for Framework numbers - Each pulses independently
      const frameworkTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#framework",
          start: "top 65%",
        }
      });

      // We animate each number individually to ensure they don't 'hold' brightness
      gsap.utils.toArray('.framework-number').forEach((num, i) => {
        frameworkTl.fromTo(num, 
          { 
            opacity: 0, 
            y: 20,
            scale: 0.98,
            filter: "brightness(1) blur(4px)"
          },
          {
            opacity: 0.15, // Bright pulse
            y: 0,
            scale: 1,
            filter: "brightness(1.8) blur(0px)",
            duration: 1,
            ease: "power2.out"
          }, 
          i * 0.8 // stagger start time
        ).to(num, {
          opacity: 0.015, // Return to ghost state
          duration: 1.5,
          ease: "power2.inOut"
        }, ">-0.4"); // Start fade out before flash ends for softness
      });

      gsap.from(".phil-elem", {
        scrollTrigger: {
          trigger: philRef.current,
          start: "top 75%",
        },
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
      });

      gsap.from(".footer-tagline", {
        scrollTrigger: {
          trigger: ".footer-tagline",
          start: "top 90%",
          toggleActions: "play none none reverse"
        },
        x: -50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
      });
    });

    return () => ctx.revert();
  }, []);

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
      `}</style>

      {/* GLOBAL BACKGROUND with new Data Grid Overlay */}
      <div className="fixed inset-0 z-0 bg-[#0A1C42] overflow-hidden">
        <img
          src="/punchy.jpg"
          alt="Digital Network Cityscape"
          className="w-full h-full object-cover object-center opacity-80 scale-[1.05] origin-bottom-right"
        />
        <div className="absolute inset-0 bg-[#0A1C42]/50 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1C42]/20 via-[#0A1C42]/50 to-[#0A1C42]"></div>
      </div>

      <NoiseOverlay />
      <Navbar />

      {/* 1) HERO SECTION */}
      <section ref={heroRef} className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center pt-32 pb-24 px-8 z-10 text-center">

        {/* Massive Centered Text Logo - Puzzle Assembly */}
        <div className="w-full max-w-[800px] mx-auto mb-16 relative flex flex-col items-center justify-center select-none pt-10">

          {/* Technical Shield */}
          <div className="mb-8 w-28 h-32 md:w-36 md:h-40 relative z-20 mx-auto">
            <TransparentShield />
          </div>

          <div className="flex flex-wrap justify-center gap-x-1 sm:gap-x-2 gap-y-1 sm:gap-y-2 pb-4">
            {"BW ADVISORY".split("").map((char, i) => (
              <span key={i} className="logo-letter font-sans font-bold text-4xl sm:text-5xl md:text-[5rem] lg:text-[6.5rem] tracking-[-0.03em] platinum-text drop-shadow-[0_4px_15px_rgba(255,255,255,0.1)] leading-none inline-block pb-1 sm:pb-2 pr-[0.1em]">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4 mt-4 sm:mt-6 w-full justify-center overflow-hidden">
            <div className="solutions-line h-[2px] w-8 sm:w-16 md:w-24 bg-accent shadow-[0_0_15px_rgba(27,110,194,0.8)] origin-right"></div>
            {"SOLUTIONS".split("").map((char, i) => (
              <span key={i} className="solutions-word font-sans font-bold text-accent tracking-[0.4em] sm:tracking-[0.6em] md:tracking-[0.8em] text-lg sm:text-2xl md:text-4xl drop-shadow-[0_0_15px_rgba(27,110,194,0.6)]">
                {char}
              </span>
            ))}
            <div className="solutions-line h-[2px] w-8 sm:w-16 md:w-24 bg-accent shadow-[0_0_15px_rgba(27,110,194,0.8)] origin-left"></div>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto mt-2 relative z-20">
          {/* Tagline */}
          <h1 className="hero-elem font-semibold font-sans text-[2.5rem] sm:text-4xl md:text-6xl lg:text-[4.5rem] tracking-tight leading-[1.1] text-surface drop-shadow-md">
            Translating strategic intent <br />into <span className="font-serif italic text-accent pr-2 drop-shadow-[0_0_15px_rgba(27,110,194,0.3)]">operational success.</span>
          </h1>

          {/* Subtext - sleek font but stands out heavily */}
          <p className="hero-elem text-surface mx-auto text-2xl lg:text-[1.6rem] leading-relaxed mt-10 font-medium drop-shadow-[0_0_15px_rgba(27,110,194,0.5)] max-w-4xl tracking-wide">
            We bridge the gap between your strategic vision and frontline reality by identifying gaps and developing a capability roadmap.
          </p>

          {/* Bold CTA */}
          <div className="hero-elem pt-14 flex items-center justify-center">
            <a href="https://calendly.com/brad-bwadvisorysolutions/30min" target="_blank" rel="noreferrer" className="group relative overflow-hidden bg-accent px-12 py-4 md:py-5 rounded-full text-white font-bold text-sm md:text-base hover:bg-[#155A9E] border border-white/20 transition-all duration-500 tracking-[0.2em] uppercase text-center flex items-center justify-center gap-4 shadow-[0_0_25px_rgba(27,110,194,0.5)] hover:shadow-[0_0_40px_rgba(27,110,194,0.8)] ring-1 ring-accent/50 group-hover:ring-accent">
              Schedule a 30 minute consultation
              <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </div>
        </div>
      </section>

      {/* 2) OUR FRAMEWORK */}
      <section id="framework" className="py-32 md:py-40 w-full relative z-10 bg-[#061124] border-t border-silver/5">
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12">

          <div className="mb-20 max-w-[1200px]">
            <p className="text-accent font-semibold tracking-[0.2em] uppercase text-lg mb-4">Our Framework</p>
            <div className="pl-6 border-l-2 border-accent">
              <h2 className="font-light text-5xl md:text-6xl text-surface tracking-tight mb-8 mt-2">How we solve the problem.</h2>
              <p className="text-2xl text-surface font-medium leading-relaxed drop-shadow-md lg:whitespace-nowrap">
                Every contact follows the same disciplined path — from understanding your reality to delivering positive change.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 bg-[#0a152e] rounded-3xl border border-[#1B6EC2]/20 shadow-2xl relative overflow-hidden">

            {/* Abstract Grid background for the card body */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C0C8D0 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

            {/* Col 1 */}
            <div className="relative p-10 xl:p-14 border-b lg:border-b-0 lg:border-r border-silver/10 flex flex-col group overflow-hidden hover:bg-white/[0.02] transition-colors duration-700">
              <div className="framework-number absolute -top-4 sm:-top-6 right-2 text-[6rem] sm:text-[8rem] lg:text-[11rem] leading-none font-sans font-light text-silver opacity-0 select-none pointer-events-none transition-all duration-1000 group-hover:opacity-10 group-hover:scale-105">01</div>
              <h3 className="font-light text-4xl lg:text-5xl text-surface mb-6 relative z-10 mt-6">Identify.</h3>
              <p className="text-[#1B6EC2] tracking-[0.2em] text-sm md:text-base font-bold uppercase mb-8 relative z-10 drop-shadow-[0_0_10px_rgba(27,110,194,0.3)]">Understand the problem</p>
              <p className="text-surface/80 leading-relaxed font-light relative z-10 text-[15px] lg:text-lg flex-grow">
                We engage directly with your strategic and operational environment through structured conversation. This surfaces what matters: your true strategic intent, operational gaps, and the hidden friction that undermines execution — before solutions begin.
              </p>
            </div>

            {/* Col 2 */}
            <div className="relative p-10 xl:p-14 border-b lg:border-b-0 lg:border-r border-silver/10 flex flex-col group overflow-hidden hover:bg-white/[0.02] transition-colors duration-700">
              <div className="framework-number absolute -top-4 sm:-top-6 right-2 text-[6rem] sm:text-[8rem] lg:text-[11rem] leading-none font-sans font-light text-silver opacity-0 select-none pointer-events-none transition-all duration-1000 group-hover:opacity-10 group-hover:scale-105">02</div>
              <h3 className="font-light text-4xl lg:text-5xl text-surface mb-6 relative z-10 mt-6">Strategise.</h3>
              <p className="text-[#1B6EC2] tracking-[0.2em] text-sm md:text-base font-bold uppercase mb-8 relative z-10 drop-shadow-[0_0_10px_rgba(27,110,194,0.3)]">Design the solution</p>
              <p className="text-surface/80 leading-relaxed font-light relative z-10 text-[15px] lg:text-lg flex-grow">
                We diagnose the root cause, not surface symptoms. Backed by 30 years of operational experience across law enforcement and the private sector, we build executable strategies that close the gap between intent and reality — with clear ownership at every level.
              </p>
            </div>

            {/* Col 3 */}
            <div className="relative p-10 xl:p-14 flex flex-col group overflow-hidden hover:bg-white/[0.02] transition-colors duration-700">
              <div className="framework-number absolute -top-4 sm:-top-6 right-2 text-[6rem] sm:text-[8rem] lg:text-[11rem] leading-none font-sans font-light text-silver opacity-0 select-none pointer-events-none transition-all duration-1000 group-hover:opacity-10 group-hover:scale-105">03</div>
              <h3 className="font-light text-4xl lg:text-5xl text-surface mb-6 relative z-10 mt-6">Operationalise.</h3>
              <p className="text-[#1B6EC2] tracking-[0.2em] text-sm md:text-base font-bold uppercase mb-8 relative z-10 drop-shadow-[0_0_10px_rgba(27,110,194,0.3)]">Apply the treatment</p>
              <p className="text-surface/80 leading-relaxed font-light relative z-10 text-[15px] lg:text-lg flex-grow">
                We develop aligned solutions and stay accountable to outcomes. Strategy without execution is theory. We embed the change, align the people, and measure what matters — until the gap between your intent and frontline reality closes.
              </p>
            </div>

          </div>

          {/* Framework Section CTA */}
          <div className="mt-16 flex justify-center w-full relative z-10 px-6">
            <a href="https://calendly.com/brad-bwadvisorysolutions/30min" target="_blank" rel="noreferrer" className="group relative overflow-hidden bg-accent px-12 py-4 md:py-5 rounded-full text-white font-bold text-sm md:text-base hover:bg-[#155A9E] border border-white/20 transition-all duration-500 tracking-[0.2em] uppercase text-center flex items-center justify-center gap-4 shadow-[0_0_25px_rgba(27,110,194,0.5)] hover:shadow-[0_0_40px_rgba(27,110,194,0.8)] ring-1 ring-accent/50 group-hover:ring-accent w-full md:w-auto">
              Schedule a 30 minute consultation
              <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </div>

        </div>
      </section>

      {/* 3) THE MANIFESTO */}
      <section id="manifesto" ref={philRef} className="relative py-40 w-full bg-primary z-10 border-y border-silver/5">
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center">
          <h2 className="phil-elem font-light text-4xl md:text-[3rem] text-silver/80 leading-tight tracking-wide">
            Strategic vision without capability is a liability.<br />We engineer <span className="text-surface font-serif italic font-normal">genuine operational reality.</span>
          </h2>
        </div>
      </section>

      {/* 4) ABOUT US */}
      <section id="about" className="py-40 px-6 w-full bg-surface relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-5 order-1 rounded-[2rem] overflow-hidden shadow-2xl bg-background border border-silver/20 sticky top-32">
            <img
              src="/Brad_Professional_Shot_clean.jpg"
              alt="Brad Warburton - Principal Advisor"
              className="w-full h-[600px] object-cover object-top"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary to-transparent p-10 pt-32">
              <p className="text-surface font-semibold text-2xl tracking-wide">Brad Warburton</p>
              <p className="text-accent font-bold tracking-[0.2em] text-xs uppercase mt-2">Principal Advisor</p>
            </div>
          </div>
          <div className="lg:col-span-7 order-2 space-y-8">
            <div>
              <h2 className="font-light text-4xl lg:text-[3.2rem] text-primary leading-tight tracking-tight">
                <span className="font-semibold block mb-2">Law enforcement precision.</span>
                Private sector scalability.
              </h2>
            </div>

            <div className="space-y-5 text-textDark/80 leading-relaxed text-lg font-light">
              <p>
                Thirty years in law enforcement command—leading operations, integrating technology at scale, navigating policy and legislative frameworks under real budget and compliance pressure. I've since applied that same rigour to the private sector, delivering measurable outcomes across complex organisational networks.
              </p>
              <p>
                I work with you to identify where your systems, processes, and workflows are breaking down. Together we map the gaps and close them within the constraints that actually matter to your operation. I bring my network to connect you with the right technology and capability.
              </p>
              <p className="text-primary font-medium text-xl pt-3 border-l-2 border-accent pl-6">
                The gap between intent and execution is where organisations lose value. I find it and close it.
              </p>
            </div>

            <div className="flex flex-col gap-0 pt-6 border-t border-silver/20 mt-2">
              {[
                "Systems & Process Optimisation",
                "Technology Integration & Capability Deployment",
                "Organisational Design & Change Management",
                "Strategic Advisory & Programme Leadership",
                "Closing the Intent-Execution Gap"
              ].map((skill, index) => (
                <div key={index} className="group relative py-4 border-b border-silver/20 flex items-center justify-between overflow-hidden cursor-default transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out pointer-events-none"></div>
                  
                  <div className="flex items-center gap-6 relative z-10 w-full transform group-hover:translate-x-3 transition-transform duration-500 ease-out">
                    <div className="w-1.5 h-1.5 bg-primary/20 group-hover:bg-accent rotate-45 transform group-hover:rotate-90 group-hover:scale-125 transition-all duration-500 ease-out flex-shrink-0"></div>
                    <span className="font-semibold text-primary text-[13px] md:text-[15px] tracking-[0.15em] group-hover:tracking-[0.18em] uppercase group-hover:text-accent transition-all duration-500 pr-4">
                      {skill}
                    </span>
                  </div>
                  
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-[1px] bg-accent group-hover:w-16 md:group-hover:w-28 transition-all duration-700 ease-out z-10 opacity-0 group-hover:opacity-100"></div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <a href="https://calendly.com/brad-bwadvisorysolutions/30min" target="_blank" rel="noreferrer" className="inline-block group relative overflow-hidden bg-[#0A1C42]/80 backdrop-blur-xl border border-[#1B6EC2]/50 px-10 py-4 rounded-full text-surface font-semibold text-sm hover:border-[#1B6EC2] hover:bg-[#1B6EC2]/20 transition-all duration-500 tracking-[0.2em] uppercase flex items-center justify-center gap-4 shadow-[0_0_20px_rgba(27,110,194,0.15)] hover:shadow-[0_0_30px_rgba(27,110,194,0.4)] w-max">
                Schedule a 30 minute consultation
                <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 5) HOW WE WILL WORK TOGETHER (Extract) */}
      <HowWeWorkTogether />

      {/* CONTACT US */}
      <section id="contact" className="py-32 px-6 w-full bg-surface border-t border-silver/5 relative z-10 flex items-center justify-center font-sans">
        <div className="max-w-[960px] w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

          {/* Left - copy + contact details */}
          <div className="flex flex-col gap-6">
            <p className="text-[14px] md:text-[16px] font-bold tracking-[0.22em] uppercase text-accent">
              Get in touch
            </p>
            <h2 className="font-light text-[clamp(1.8rem,3.5vw,2.6rem)] text-primary leading-[1.2] tracking-tight">
              The gap between intent and reality{' '}
              <em className="font-serif italic text-primary/60">
                starts with a conversation.
              </em>
            </h2>
            <p className="text-[16px] text-textDark/80 leading-[1.8] max-w-[380px] font-light">
              Thirty minutes is enough to understand your challenge and whether
              I'm the right person to help. No obligation, no proposal until
              we've talked.
            </p>
            
            <div className="w-8 h-[2px] bg-accent/70" />

            <div className="flex flex-col gap-4 pt-4">
              {[
                { prefix: 'E //', href: 'mailto:brad@bwadvisorysolutions.com.au', label: 'brad@bwadvisorysolutions.com.au' },
                { prefix: 'M //', href: 'tel:+61407779474',                       label: '+61 407 779 474' },
                { prefix: 'LI //', href: 'https://linkedin.com/in/bradwarburton', label: 'linkedin.com/in/bradwarburton', external: true },
              ].map(({ prefix, href, label, external }) => (
                <div key={prefix} className="flex items-center gap-4 group">
                  <span className="text-[12px] md:text-[13px] font-bold tracking-[0.18em] uppercase text-accent w-[3rem] flex-shrink-0">
                    {prefix}
                  </span>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="text-[15px] md:text-[17px] text-textDark/90 transition-all duration-200 group-hover:text-accent font-medium tracking-wide underline decoration-silver/60 hover:decoration-accent underline-offset-4"
                  >
                    {label}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right - booking card */}
          <div>
            <div className="bg-[#0A1C42] border border-[#1B6EC2]/40 rounded-3xl p-10 lg:p-12 flex flex-col gap-6 shadow-[0_20px_50px_rgba(10,28,66,0.3)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B6EC2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <h3 className="font-light text-2xl lg:text-3xl text-surface leading-[1.3] tracking-wide">
                Book a 30-minute consultation
              </h3>

              <p className="text-[15px] lg:text-[16px] text-silver/90 leading-[1.7] font-light">
                A direct conversation about your challenge. We'll establish whether
                there's a fit — and what working together looks like.
              </p>

              <a
                href="https://calendly.com/brad-bwadvisorysolutions/30min"
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden bg-accent px-10 py-5 rounded-full text-white font-bold text-sm md:text-base hover:bg-[#155A9E] border border-white/20 transition-all duration-500 tracking-[0.2em] uppercase text-center flex items-center justify-center gap-4 shadow-[0_0_25px_rgba(27,110,194,0.5)] hover:shadow-[0_0_40px_rgba(27,110,194,0.8)] ring-1 ring-accent/50 group-hover:ring-accent mt-4 z-10 w-full"
              >
                Schedule your call
                <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>

              <p className="text-[13px] text-silver/60 leading-[1.6] pt-2 font-light text-center">
                You'll be taken to Calendly to select a time that works for you.
                Booking confirms to your calendar automatically.
              </p>

            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#030811] py-16 px-6 border-t border-silver/5 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12">

          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto overflow-hidden">
            <img src="/BW_Advisory_Solutions_Logo.png" alt="BW Advisory Logo" className="h-20 mb-6 object-contain" />
            <p className="footer-tagline font-sans text-xl md:text-2xl font-light text-surface tracking-wide drop-shadow-md whitespace-nowrap">
              Bridging the gap between your strategic vision and frontline reality.
            </p>
          </div>

          <div className="flex flex-col gap-4 font-sans font-medium text-xs uppercase tracking-[0.2em] text-center md:text-right">
            <a href="#framework" className="text-silver/70 hover:text-accent transition-colors">Our Framework</a>
            <a href="#protocol" className="text-silver/70 hover:text-accent transition-colors">How We Work With You</a>
            <a href="#about" className="text-silver/70 hover:text-accent transition-colors">About Us</a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-silver/10 flex flex-col items-center justify-center font-sans font-medium text-[10px] text-silver/40 tracking-[0.2em] uppercase">
          <div>&copy; {new Date().getFullYear()} BW Advisory Solutions. All rights reserved.</div>
        </div>
      </footer>

      <style>{`
        @keyframes dashReveal {
          to { stroke-dashoffset: 0; }
        }
        @keyframes revealRight {
          0% { width: 0; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default App;
