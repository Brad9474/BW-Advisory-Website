import { useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
//  BW ADVISORY — HERO NETWORK CANVAS
//  Organic animated streams converging on wall shield.
//  Target calibrated at TX_F=0.20, TY_F=0.38
//  (centre of shield in hero-bg.webp at standard screen sizes)
// ═══════════════════════════════════════════════════════════════

export default function NetworkCanvas() {
  const cvRef = useRef(null);

  useEffect(() => {
    const CV = cvRef.current;
    if (!CV) return;
    const CX = CV.getContext('2d');
    let W, H, animId, CABLES = [];
    let gPulse = 0;
    let lastT = 0;

    // Shield centre — calibrated to wall shield in hero-bg.webp
    const TX_F = 0.20;
    const TY_F = 0.38;
    const getTarget = () => ({ x: W * TX_F, y: H * TY_F });

    const PAL = [
      [252,228,132],[240,202,102],[222,178,72],
      [210,150,52],[215,128,42]
    ];
    const rc = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
    const rn = (a, b) => a + Math.random() * (b - a);

    function cbez(ax,ay,c1x,c1y,c2x,c2y,bx,by,t) {
      const m = 1 - t;
      return {
        x: m*m*m*ax + 3*m*m*t*c1x + 3*m*t*t*c2x + t*t*t*bx,
        y: m*m*m*ay + 3*m*m*t*c1y + 3*m*t*t*c2y + t*t*t*by
      };
    }

    class Cable {
      constructor() {
        // All-edges origins
        const e = Math.floor(rn(0, 4));
        if      (e === 0) { this.oxF = rn(.05,.95); this.oyF = rn(0,.04); }
        else if (e === 1) { this.oxF = rn(.05,.95); this.oyF = rn(.92,1.02); }
        else if (e === 2) { this.oxF = rn(0,.04);   this.oyF = rn(.08,.92); }
        else              { this.oxF = rn(.94,1.02); this.oyF = rn(.08,.92); }

        this.col = PAL[Math.floor(rn(0, PAL.length))];
        this.op  = rn(.26, .48);
        this.lw  = rn(.40, .78);

        // Organic control points — random positions create flowing S-curves
        this.c1xF = rn(.08,.92); this.c1yF = rn(.08,.92);
        this.c2xF = rn(.08,.92); this.c2yF = rn(.08,.92);

        // Slow wave animation on control points
        this.f1 = rn(.00012,.00020); this.a1 = rn(.030,.070); this.p1 = rn(0,Math.PI*2);
        this.f2 = rn(.00010,.00018); this.a2 = rn(.025,.060); this.p2 = rn(0,Math.PI*2);

        // Data particles
        const np = 1 + Math.floor(rn(0, 3));
        this.pts = Array.from({ length: np }, (_, i) => ({
          prog: (i / Math.max(np,1)) + rn(0,.18),
          spd:  rn(.00028,.00050),
          sz:   rn(2.0, 3.8),
          op:   rn(.55, .88),
          col:  PAL[Math.floor(rn(0, PAL.length))]
        }));
      }

      draw(t) {
        const tgt = getTarget();
        const tx = tgt.x, ty = tgt.y;
        const ox = this.oxF * W, oy = this.oyF * H;

        // Animated organic control points
        const c1x = this.c1xF*W + Math.sin(t*this.f1+this.p1)*this.a1*W;
        const c1y = this.c1yF*H + Math.cos(t*this.f1+this.p1+1.4)*this.a1*H;
        const c2x = this.c2xF*W + Math.sin(t*this.f2+this.p2)*this.a2*W;
        const c2y = this.c2yF*H + Math.cos(t*this.f2+this.p2+0.9)*this.a2*H;
        const op = this.op;

        // Fade lines in the text/content area
        const midX = (ox+tx)/2, midY = (oy+ty)/2;
        const inZone = midX>W*.28 && midX<W*.72 && midY>H*.22 && midY<H*.78;
        const fop = inZone ? op*.50 : op;

        // Wide glow
        CX.beginPath(); CX.moveTo(ox,oy);
        CX.bezierCurveTo(c1x,c1y,c2x,c2y,tx,ty);
        CX.strokeStyle = rc(this.col, fop*.09);
        CX.lineWidth = this.lw*8; CX.stroke();

        // Mid glow
        CX.beginPath(); CX.moveTo(ox,oy);
        CX.bezierCurveTo(c1x,c1y,c2x,c2y,tx,ty);
        CX.strokeStyle = rc(this.col, fop*.25);
        CX.lineWidth = this.lw*2.4; CX.stroke();

        // Bright core — no shadowBlur for performance
        CX.beginPath(); CX.moveTo(ox,oy);
        CX.bezierCurveTo(c1x,c1y,c2x,c2y,tx,ty);
        CX.strokeStyle = rc(this.col, fop*.92);
        CX.lineWidth = this.lw; CX.stroke();

        // Data particles — simplified for performance (no radial gradients or shadowBlur)
        for (const p of this.pts) {
          p.prog += p.spd;
          if (p.prog > 1) p.prog = 0;
          const pos = cbez(ox,oy,c1x,c1y,c2x,c2y,tx,ty,p.prog);
          const pInZone = pos.x>W*.26 && pos.x<W*.74 && pos.y>H*.20 && pos.y<H*.80;
          const pop = pInZone ? p.op*.40 : p.op;

          // Core diamond
          CX.save();
          CX.translate(pos.x,pos.y); CX.rotate(Math.PI/4);
          const h = p.sz*.65;
          CX.fillStyle = rc(p.col, pop);
          CX.fillRect(-h,-h,h*2,h*2);
          CX.restore();

          // Single trail dot
          const bp = cbez(ox,oy,c1x,c1y,c2x,c2y,tx,ty,Math.max(0,p.prog-.022));
          CX.beginPath(); CX.arc(bp.x,bp.y,p.sz*.7,0,Math.PI*2);
          CX.fillStyle = rc(p.col, pInZone?p.op*.12:p.op*.20);
          CX.fill();
        }
      }
    }

    function drawGlow() {
      gPulse += 0.011;
      const p = 0.80 + 0.20*Math.sin(gPulse);
      const t = getTarget();
      const r = Math.min(W,H);

      const b = CX.createRadialGradient(t.x,t.y,0,t.x,t.y,r*0.20*p);
      b.addColorStop(0,   `rgba(40,90,210,${.26*p})`);
      b.addColorStop(.38, `rgba(25,60,150,${.09*p})`);
      b.addColorStop(1,   'transparent');
      CX.beginPath(); CX.arc(t.x,t.y,r*0.20*p,0,Math.PI*2);
      CX.fillStyle = b; CX.fill();

      const g = CX.createRadialGradient(t.x,t.y,0,t.x,t.y,r*0.08*p);
      g.addColorStop(0,  `rgba(230,170,50,${.24*p})`);
      g.addColorStop(.6, `rgba(155,100,22,${.07*p})`);
      g.addColorStop(1,  'transparent');
      CX.beginPath(); CX.arc(t.x,t.y,r*0.08*p,0,Math.PI*2);
      CX.fillStyle = g; CX.fill();
    }

    function render(t) {
      animId = requestAnimationFrame(render);
      // throttle to ~40fps to reduce main-thread pressure on load
      if (t - lastT < 25) return;
      lastT = t;
      CX.clearRect(0,0,W,H);
      drawGlow();
      for (const c of CABLES) c.draw(t);
    }

    function build() {
      CABLES = [];
      for (let i=0; i<12; i++) CABLES.push(new Cable());
    }

    function resize() {
      W = CV.width  = window.innerWidth;
      H = CV.height = window.innerHeight;
      build();
    }

    window.addEventListener('resize', resize);
    resize();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!animId) animId = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(animId);
          animId = null;
        }
      },
      { threshold: 0 }
    );
    observer.observe(CV);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={cvRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    />
  );
}
