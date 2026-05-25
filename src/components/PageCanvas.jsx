import { useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
//  BW ADVISORY — PAGE CANVAS
//
//  Organic glowing cable network matching the Gemini reference.
//
//  Key techniques:
//  · Cubic bezier curves (two control points) → genuine S-curves
//    that sag and flow, not simple arcs
//  · Per-wire randomised paths stored at build time → strands in
//    each bundle genuinely separate and reconverge at nodes
//  · Color palette: bright gold → warm amber → orange-red amber
//  · Multi-pass glow: wide soft pass + medium + bright core
//  · ctx.shadowBlur only on bright core & node centres (perf)
//  · Cage nodes: rotating lattice structure with hot glowing core
//  · 8-dot light trails behind each particle
//  · Depth: lower-canvas nodes larger/brighter (perspective)
// ═══════════════════════════════════════════════════════════════

export default function PageCanvas() {
  const cvRef = useRef(null);

  useEffect(() => {
    const CV = cvRef.current;
    if (!CV) return;
    const CX = CV.getContext('2d');

    let W, H, animId = null;
    let NODES = [], CABLES = [];

    // ── COLOUR PALETTE ────────────────────────────────────────
    // Bright gold → warm gold → amber → orange-amber → red-amber
    const PAL = [
      [255, 235, 148],  // 0 bright gold
      [240, 200, 100],  // 1 mid gold
      [218, 172,  68],  // 2 warm gold  (BW Advisory base)
      [208, 145,  48],  // 3 amber
      [212, 122,  36],  // 4 orange-amber
      [205, 100,  28],  // 5 red-amber (the warm "red" Brad wants)
    ];

    function rc(c, a) { return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }

    // ── MATHS HELPERS ─────────────────────────────────────────
    // Perpendicular unit vector and length for A→B
    function perp(ax, ay, bx, by) {
      const dx = bx - ax, dy = by - ay;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      return { nx: -dy / len, ny: dx / len, len };
    }

    // Point on cubic bezier at t ∈ [0,1]
    function cbez(ax, ay, c1x, c1y, c2x, c2y, bx, by, t) {
      const m = 1 - t;
      return {
        x: m*m*m*ax + 3*m*m*t*c1x + 3*m*t*t*c2x + t*t*t*bx,
        y: m*m*m*ay + 3*m*m*t*c1y + 3*m*t*t*c2y + t*t*t*by,
      };
    }

    // ── NODE ──────────────────────────────────────────────────
    class Node {
      constructor(fx, fy, sz, depth) {
        this.bx = W * fx; this.by = H * fy;
        this.x  = this.bx; this.y  = this.by;
        this.sz    = sz;
        this.depth = depth;
        this.fp  = Math.random() * Math.PI * 2;
        this.fs  = 0.000072 + Math.random() * 0.000058;
        this.fax = 9 + Math.random() * 14;
        this.fay = 6 + Math.random() * 10;
        this.ph  = Math.random() * Math.PI * 2;
        this.ps  = 0.12 + Math.random() * 0.18;
        this.rot = Math.random() * Math.PI * 2;
        this.rotSpd = (Math.random() < 0.5 ? 1 : -1) *
                      (0.0018 + Math.random() * 0.0028);
      }

      update(t) {
        this.x   = this.bx + Math.sin(t * this.fs + this.fp) * this.fax;
        this.y   = this.by + Math.cos(t * this.fs * 0.71 + this.fp + 1.2) * this.fay;
        this.ph += this.ps * 0.017;
        this.rot += this.rotSpd;
      }

      draw() {
        const pulse = 0.86 + 0.14 * Math.sin(this.ph);
        const sz    = this.sz * pulse;
        const d     = this.depth;
        const x = this.x, y = this.y;

        // Outer soft bloom (no shadow — large radius, low op)
        const bloom = sz * 9;
        const og = CX.createRadialGradient(x, y, 0, x, y, bloom);
        og.addColorStop(0,   `rgba(218,155,55,${0.13 * d})`);
        og.addColorStop(0.45,`rgba(200,130,40,${0.042 * d})`);
        og.addColorStop(1,   'transparent');
        CX.beginPath(); CX.arc(x, y, bloom, 0, Math.PI * 2);
        CX.fillStyle = og; CX.fill();

        // Mid glow
        const midG = sz * 4;
        const mg = CX.createRadialGradient(x, y, 0, x, y, midG);
        mg.addColorStop(0,   `rgba(255,215,115,${0.27 * d})`);
        mg.addColorStop(0.6, `rgba(220,165,60,${0.084 * d})`);
        mg.addColorStop(1,   'transparent');
        CX.beginPath(); CX.arc(x, y, midG, 0, Math.PI * 2);
        CX.fillStyle = mg; CX.fill();

        // === CAGE LATTICE =====================================
        CX.save();
        CX.shadowBlur  = 10;
        CX.shadowColor = `rgba(255,225,130,${0.45 * d})`;

        // Outer ring
        CX.beginPath(); CX.arc(x, y, sz * 1.55, 0, Math.PI * 2);
        CX.strokeStyle = `rgba(255,222,128,${0.31 * d})`;
        CX.lineWidth   = 0.85;
        CX.stroke();

        // Inner ring
        CX.beginPath(); CX.arc(x, y, sz * 0.88, 0, Math.PI * 2);
        CX.strokeStyle = `rgba(240,195,90,${0.24 * d})`;
        CX.lineWidth   = 0.60;
        CX.stroke();

        // Rotating spokes (4)
        CX.strokeStyle = `rgba(255,222,128,${0.23 * d})`;
        CX.lineWidth   = 0.55;
        for (let i = 0; i < 4; i++) {
          const a = this.rot + i * Math.PI / 4;
          CX.beginPath();
          CX.moveTo(x + Math.cos(a) * sz * 0.88, y + Math.sin(a) * sz * 0.88);
          CX.lineTo(x + Math.cos(a + Math.PI) * sz * 0.88, y + Math.sin(a + Math.PI) * sz * 0.88);
          CX.stroke();
        }

        // 6 vertex dots on outer ring
        for (let i = 0; i < 6; i++) {
          const a  = this.rot * 0.4 + i * Math.PI / 3;
          const vx = x + Math.cos(a) * sz * 1.55;
          const vy = y + Math.sin(a) * sz * 1.55;
          CX.beginPath(); CX.arc(vx, vy, 0.90, 0, Math.PI * 2);
          CX.fillStyle = `rgba(255,232,148,${0.39 * d})`;
          CX.fill();
        }
        CX.restore();

        // Bright hot core
        CX.save();
        CX.shadowBlur  = 18;
        CX.shadowColor = 'rgba(255,252,200,0.6)';
        CX.beginPath(); CX.arc(x, y, sz * 0.40, 0, Math.PI * 2);
        CX.fillStyle   = `rgba(255,252,215,${0.57 * d * pulse})`;
        CX.fill();
        CX.restore();
      }
    }

    // ── CABLE ─────────────────────────────────────────────────
    class Cable {
      constructor(ai, bi) {
        this.ai = ai; this.bi = bi;

        // Bundle: N strands, each with fully random control points
        // anywhere on canvas (NetworkCanvas approach — strong S-curves)
        this.N = 5 + Math.floor(Math.random() * 4);  // 5–8 strands

        this.strands = Array.from({ length: this.N }, () => {
          const palIdx = Math.floor(Math.random() * PAL.length);
          return {
            col: PAL[palIdx],
            op:  0.14 + Math.random() * 0.22,
            w:   0.50 + Math.random() * 0.38,
            // Random absolute control points anywhere on canvas
            cp1x: Math.random() * W,
            cp1y: Math.random() * H,
            cp2x: Math.random() * W,
            cp2y: Math.random() * H,
            // Slow sine drift around each control point — gentler than before
            // to eliminate snap-jitter on the curves.
            f1: 0.00008 + Math.random() * 0.00006,   // 0.00008–0.00014
            a1: 0.015 + Math.random() * 0.02,        // 0.015–0.035 (× W/H)
            p1: Math.random() * Math.PI * 2,
            f2: 0.00008 + Math.random() * 0.00006,
            a2: 0.015 + Math.random() * 0.02,
            p2: Math.random() * Math.PI * 2,
          };
        });

        // Particle
        this.prog  = Math.random();
        this.spd   = 0.00016 + Math.random() * 0.00026;
        this.pSz   = 2.0 + Math.random() * 2.4;
        this.trail = 9;
      }

      // Compute animated cubic bezier control points for one strand
      cps(s, t) {
        return {
          c1x: s.cp1x + Math.sin(t * s.f1 + s.p1) * s.a1 * W,
          c1y: s.cp1y + Math.cos(t * s.f1 + s.p1) * s.a1 * H,
          c2x: s.cp2x + Math.sin(t * s.f2 + s.p2) * s.a2 * W,
          c2y: s.cp2y + Math.cos(t * s.f2 + s.p2) * s.a2 * H,
        };
      }

      draw(t) {
        const a = NODES[this.ai], b = NODES[this.bi];
        if (!a || !b) return;
        const ax = a.x, ay = a.y, bx = b.x, by = b.y;
        const avgD = (a.depth + b.depth) * 0.5;

        for (const s of this.strands) {
          const { c1x, c1y, c2x, c2y } = this.cps(s, t);
          const op = s.op * avgD;

          // Wide glow pass
          CX.beginPath();
          CX.moveTo(ax, ay);
          CX.bezierCurveTo(c1x, c1y, c2x, c2y, bx, by);
          CX.strokeStyle = rc(s.col, op * 0.18);
          CX.lineWidth   = 3.2;
          CX.stroke();

          // Medium pass
          CX.beginPath();
          CX.moveTo(ax, ay);
          CX.bezierCurveTo(c1x, c1y, c2x, c2y, bx, by);
          CX.strokeStyle = rc(s.col, op * 0.31);
          CX.lineWidth   = 1.5;
          CX.stroke();

          // Bright core (with shadowBlur for glow)
          CX.save();
          CX.shadowBlur  = 7;
          CX.shadowColor = rc(s.col, 0.48);
          CX.beginPath();
          CX.moveTo(ax, ay);
          CX.bezierCurveTo(c1x, c1y, c2x, c2y, bx, by);
          CX.strokeStyle = rc(s.col, op * 0.53);
          CX.lineWidth   = s.w;
          CX.stroke();
          CX.restore();
        }

        // ── Particle with light trail on centre strand ─────────
        this.prog += this.spd;
        if (this.prog > 1) this.prog = 0;

        const mid = this.strands[Math.floor(this.strands.length / 2)];
        const { c1x: mc1x, c1y: mc1y, c2x: mc2x, c2y: mc2y } =
          this.cps(mid, t);

        for (let j = this.trail; j >= 0; j--) {
          const tp  = Math.max(0, this.prog - j * 0.016);
          const pos = cbez(ax, ay, mc1x, mc1y, mc2x, mc2y, bx, by, tp);
          const fade = 1 - j / this.trail;
          const tSz  = this.pSz * (j === 0 ? 1.0 : fade * 0.55);

          if (j === 0) {
            // Particle head — hot bright dot
            CX.save();
            CX.shadowBlur  = 16;
            CX.shadowColor = 'rgba(255,248,185,0.57)';
            CX.beginPath(); CX.arc(pos.x, pos.y, tSz, 0, Math.PI * 2);
            CX.fillStyle = `rgba(255,252,215,${0.56 * avgD})`;
            CX.fill();
            CX.restore();
          } else {
            // Trail — fading amber dots
            CX.beginPath(); CX.arc(pos.x, pos.y, tSz, 0, Math.PI * 2);
            CX.fillStyle = `rgba(218,155,55,${fade * 0.22 * avgD})`;
            CX.fill();
          }
        }
      }
    }

    // ── BUILD NETWORK ─────────────────────────────────────────
    function build() {
      NODES = []; CABLES = [];

      // [fracX, fracY, cageSize, depth]
      // Sparser layout — 13 nodes (40% fewer), each capped at 3 connections
      // so the lattice reads as atmosphere, not a dominant structure.
      const nDef = [
        // Main hubs
        [0.30, 0.50, 14, 1.00],   //  0  primary hub
        [0.62, 0.34, 12, 0.94],   //  1  upper-right hub
        [0.62, 0.68, 12, 0.92],   //  2  lower-right hub
        [0.48, 0.50,  9, 0.86],   //  3  centre bridge

        // Upper ring
        [0.18, 0.16,  7, 0.66],   //  4
        [0.44, 0.12,  7, 0.66],   //  5
        [0.80, 0.16,  6, 0.62],   //  6

        // Left / lower-left
        [0.08, 0.40,  6, 0.62],   //  7
        [0.12, 0.66,  7, 0.68],   //  8
        [0.30, 0.88,  7, 0.70],   //  9

        // Right / lower-right
        [0.88, 0.42,  7, 0.67],   // 10
        [0.86, 0.66,  7, 0.68],   // 11
        [0.66, 0.88,  7, 0.69],   // 12
      ];

      nDef.forEach(([fx, fy, sz, dep]) =>
        NODES.push(new Node(fx, fy, sz, dep))
      );

      // Connection pairs — every node has at most 3 connections
      const pairs = [
        [0, 1], [0, 2], [0, 7],
        [1, 2], [1, 5],
        [2, 12],
        [3, 5], [3, 8], [3, 10],
        [4, 5], [4, 6], [4, 7],
        [6, 10], [6, 11],
        [7, 8],
        [8, 9],
        [9, 12],
        [10, 11], [11, 12],
      ];

      pairs.forEach(([ai, bi]) => CABLES.push(new Cable(ai, bi)));
    }

    // ── RENDER LOOP ───────────────────────────────────────────
    function render(t) {
      animId = requestAnimationFrame(render);

      // Deep navy base
      CX.fillStyle = '#050d1a';
      CX.fillRect(0, 0, W, H);

      // Subtle warm depth gradient
      const dg = CX.createRadialGradient(W * 0.50, H * 0.50, 0, W * 0.50, H * 0.50, W * 0.62);
      dg.addColorStop(0, 'rgba(12,22,46,0.68)');
      dg.addColorStop(1, 'transparent');
      CX.fillStyle = dg; CX.fillRect(0, 0, W, H);

      for (const n of NODES) n.update(t);
      for (const c of CABLES) c.draw(t);
      for (const n of NODES) n.draw();
    }

    // ── RESIZE ────────────────────────────────────────────────
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

  return <canvas ref={cvRef} className="absolute inset-0 w-full h-full" />;
}
