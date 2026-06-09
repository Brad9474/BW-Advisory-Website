import { useEffect, useRef } from 'react';

export default function PageCanvas() {
  const cvRef = useRef(null);

  useEffect(() => {
    const CV = cvRef.current;
    if (!CV) return;
    const CX = CV.getContext('2d');

    let W, H, animId = null;
    let NODES = [], CABLES = [];

    const PAL = [
      [255, 235, 148],
      [240, 200, 100],
      [218, 172,  68],
      [208, 145,  48],
      [212, 122,  36],
    ];
    const rc = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
    const rn = (a, b) => a + Math.random() * (b - a);

    function cbez(ax, ay, c1x, c1y, c2x, c2y, bx, by, t) {
      const m = 1 - t;
      return {
        x: m*m*m*ax + 3*m*m*t*c1x + 3*m*t*t*c2x + t*t*t*bx,
        y: m*m*m*ay + 3*m*m*t*c1y + 3*m*t*t*c2y + t*t*t*by,
      };
    }

    class Node {
      constructor(xF, yF) {
        this.xF  = xF; this.yF  = yF;
        this.sz  = rn(2.5, 5.0);
        this.col = PAL[Math.floor(rn(0, PAL.length))];
        this.fp  = rn(0, Math.PI * 2);
        this.fs  = 0.000052 + Math.random() * 0.000042;
        this.fax = 5 + Math.random() * 9;
        this.fay = 4 + Math.random() * 7;
        this.rot    = rn(0, Math.PI * 2);
        this.rotSpd = (Math.random() < 0.5 ? 1 : -1) * (0.0008 + Math.random() * 0.0015);
        this.ph  = rn(0, Math.PI * 2);
        this.x   = xF * W;
        this.y   = yF * H;
      }

      update(t) {
        this.x   = this.xF * W + Math.sin(t * this.fs + this.fp) * this.fax;
        this.y   = this.yF * H + Math.cos(t * this.fs * 0.73 + this.fp + 1.3) * this.fay;
        this.ph += 0.007;
        this.rot += this.rotSpd;
      }

      draw() {
        const pulse = 0.84 + 0.16 * Math.sin(this.ph);
        const sz = this.sz * pulse;
        const { x, y } = this;

        const bloom = CX.createRadialGradient(x, y, 0, x, y, sz * 8);
        bloom.addColorStop(0,   rc(this.col, 0.07));
        bloom.addColorStop(0.5, rc(this.col, 0.02));
        bloom.addColorStop(1,   'transparent');
        CX.beginPath(); CX.arc(x, y, sz * 8, 0, Math.PI * 2);
        CX.fillStyle = bloom; CX.fill();

        CX.beginPath(); CX.arc(x, y, sz * 1.5, 0, Math.PI * 2);
        CX.strokeStyle = rc(this.col, 0.14 * pulse);
        CX.lineWidth = 0.65; CX.stroke();

        CX.save();
        CX.shadowBlur  = 8;
        CX.shadowColor = rc(this.col, 0.50);
        CX.beginPath(); CX.arc(x, y, sz * 0.42, 0, Math.PI * 2);
        CX.fillStyle = rc(this.col, 0.44);
        CX.fill();
        CX.restore();

        CX.strokeStyle = rc(this.col, 0.11 * pulse);
        CX.lineWidth = 0.5;
        for (let i = 0; i < 2; i++) {
          const a = this.rot + i * Math.PI;
          CX.beginPath();
          CX.moveTo(x + Math.cos(a) * sz * 0.6, y + Math.sin(a) * sz * 0.6);
          CX.lineTo(x + Math.cos(a) * sz * 1.5, y + Math.sin(a) * sz * 1.5);
          CX.stroke();
        }
      }
    }

    class Cable {
      constructor(ai, bi) {
        this.ai = ai; this.bi = bi;
        this.col   = PAL[Math.floor(rn(0, PAL.length))];
        this.op    = rn(0.08, 0.18);
        this.lw    = rn(0.30, 0.65);
        this.cp1xF = rn(0.05, 0.95); this.cp1yF = rn(0.05, 0.95);
        this.cp2xF = rn(0.05, 0.95); this.cp2yF = rn(0.05, 0.95);
        this.f1 = 0.000052 + Math.random() * 0.000052;
        this.a1 = 0.012 + Math.random() * 0.018;
        this.p1 = rn(0, Math.PI * 2);
        this.f2 = 0.000052 + Math.random() * 0.000052;
        this.a2 = 0.012 + Math.random() * 0.018;
        this.p2 = rn(0, Math.PI * 2);
        this.prog = Math.random();
        this.spd  = 0.00010 + Math.random() * 0.00018;
        this.pSz  = 1.6 + Math.random() * 1.8;
      }

      draw(t) {
        const a = NODES[this.ai], b = NODES[this.bi];
        if (!a || !b) return;
        const ax = a.x, ay = a.y, bx = b.x, by = b.y;

        const c1x = this.cp1xF * W + Math.sin(t * this.f1 + this.p1) * this.a1 * W;
        const c1y = this.cp1yF * H + Math.cos(t * this.f1 + this.p1) * this.a1 * H;
        const c2x = this.cp2xF * W + Math.sin(t * this.f2 + this.p2) * this.a2 * W;
        const c2y = this.cp2yF * H + Math.cos(t * this.f2 + this.p2) * this.a2 * H;

        CX.beginPath(); CX.moveTo(ax, ay);
        CX.bezierCurveTo(c1x, c1y, c2x, c2y, bx, by);
        CX.strokeStyle = rc(this.col, this.op * 0.12);
        CX.lineWidth = 4; CX.stroke();

        CX.beginPath(); CX.moveTo(ax, ay);
        CX.bezierCurveTo(c1x, c1y, c2x, c2y, bx, by);
        CX.strokeStyle = rc(this.col, this.op * 0.30);
        CX.lineWidth = 1.3; CX.stroke();

        CX.save();
        CX.shadowBlur  = 4;
        CX.shadowColor = rc(this.col, 0.25);
        CX.beginPath(); CX.moveTo(ax, ay);
        CX.bezierCurveTo(c1x, c1y, c2x, c2y, bx, by);
        CX.strokeStyle = rc(this.col, this.op * 0.60);
        CX.lineWidth = this.lw; CX.stroke();
        CX.restore();

        this.prog += this.spd;
        if (this.prog > 1) this.prog = 0;
        const pos = cbez(ax, ay, c1x, c1y, c2x, c2y, bx, by, this.prog);

        for (let j = 3; j >= 1; j--) {
          const tp = Math.max(0, this.prog - j * 0.016);
          const bp = cbez(ax, ay, c1x, c1y, c2x, c2y, bx, by, tp);
          CX.beginPath(); CX.arc(bp.x, bp.y, this.pSz * (1 - j * 0.28), 0, Math.PI * 2);
          CX.fillStyle = rc(this.col, (1 - j / 4) * 0.13);
          CX.fill();
        }
        CX.save();
        CX.shadowBlur  = 8;
        CX.shadowColor = rc(this.col, 0.45);
        CX.beginPath(); CX.arc(pos.x, pos.y, this.pSz, 0, Math.PI * 2);
        CX.fillStyle = rc(this.col, 0.40);
        CX.fill();
        CX.restore();
      }
    }

    function build() {
      NODES = []; CABLES = [];
      const minDist = 0.085;

      for (let attempts = 0; NODES.length < 20 && attempts < 3000; attempts++) {
        const xF = rn(0.04, 0.96), yF = rn(0.04, 0.96);
        let ok = true;
        for (const n of NODES) {
          const dx = n.xF - xF, dy = n.yF - yF;
          if (dx * dx + dy * dy < minDist * minDist) { ok = false; break; }
        }
        if (ok) NODES.push(new Node(xF, yF));
      }

      const deg  = new Array(NODES.length).fill(0);
      const used = new Set();
      const pairs = [];
      for (let i = 0; i < NODES.length; i++) {
        for (let j = i + 1; j < NODES.length; j++) {
          const dx = NODES[i].xF - NODES[j].xF, dy = NODES[i].yF - NODES[j].yF;
          pairs.push({ i, j, d: dx * dx + dy * dy });
        }
      }
      pairs.sort((a, b) => a.d - b.d);
      for (const { i, j } of pairs) {
        if (deg[i] >= 3 || deg[j] >= 3) continue;
        const key = `${i}-${j}`;
        if (used.has(key)) continue;
        used.add(key); deg[i]++; deg[j]++;
        CABLES.push(new Cable(i, j));
      }
    }

    function render(t) {
      animId = requestAnimationFrame(render);
      CX.clearRect(0, 0, W, H);
      for (const n of NODES) n.update(t);
      for (const c of CABLES) c.draw(t);
      for (const n of NODES) n.draw();
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
    />
  );
}
