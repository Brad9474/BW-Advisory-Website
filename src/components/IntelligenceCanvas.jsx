import { useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
//  BW ADVISORY — INTELLIGENCE CANVAS
//  Progressive network-building animation for Loss Intelligence.
//
//  Hub-and-spoke topology: each cluster has a larger central hub
//  surrounded by spokes. Growers fan multiple edges from a hub
//  before bridging via a spoke to another cluster's hub.
//  Multiple concurrent growers operate in different regions.
//  Pauses on full picture, fades, resets, repeats.
// ═══════════════════════════════════════════════════════════════

export default function IntelligenceCanvas() {
  const cvRef = useRef(null);

  useEffect(() => {
    const CV = cvRef.current;
    if (!CV) return;
    const CX = CV.getContext('2d');

    let W, H, animId;
    let pendingTimeouts = [];

    const LINE_DURATION = 800;
    const PAUSE_DURATION = 2000;
    const FADE_DURATION = 1500;
    const PULSE_DURATION = 700;
    const INTER_EDGE_GAP = 90;
    const FIRST_NODE_DELAY = 550;
    const MAX_GROWERS = 3;

    // Central text column — node placement avoids this band
    const TEXT_X_MIN = 0.32;
    const TEXT_X_MAX = 0.68;

    let nodes = [];
    let edges = [];
    let edgeSet = new Set();
    let visitedOrder = [];
    let visitedSet = new Set();
    let connectionIdx = 0;
    let totalConnections = 0;

    let growers = [];   // { lastIdx, edge, retired }
    let phase = 'drawing';
    let phaseStart = 0;

    const rn = (a, b) => a + Math.random() * (b - a);
    const now = () => performance.now();
    const edgeKey = (a, b) => a < b ? `${a}-${b}` : `${b}-${a}`;
    const hasEdge = (a, b) => edgeSet.has(edgeKey(a, b));

    function schedule(fn, ms) {
      const id = setTimeout(() => {
        pendingTimeouts = pendingTimeouts.filter(x => x !== id);
        fn();
      }, ms);
      pendingTimeouts.push(id);
    }

    function clearScheduled() {
      for (const id of pendingTimeouts) clearTimeout(id);
      pendingTimeouts = [];
    }

    // ── BUILD ─────────────────────────────────────────────────
    // 6 clusters, each with a hub at the centre and spokes around it.
    // Hubs target high degree (fan-out); spokes are bridges/leaves.
    function buildNodes() {
      nodes = [];
      const minDist = 0.040;

      const tryAdd = (xF, yF, attrs) => {
        if (xF < 0.04 || xF > 0.96 || yF < 0.05 || yF > 0.95) return false;
        if (xF > TEXT_X_MIN && xF < TEXT_X_MAX && yF > 0.10 && yF < 0.90) return false;
        for (const n of nodes) {
          const dx = n.xF - xF, dy = n.yF - yF;
          if (dx * dx + dy * dy < minDist * minDist) return false;
        }
        nodes.push({
          xF, yF,
          activatedAt: null,
          degree: 0,
          isHub: false,
          cluster: -1,
          targetDegree: 0,
          ...attrs,
        });
        return true;
      };

      const clusters = [
        { cx: 0.10, cy: 0.17, spokes: 4, spread: 0.085, hubDegree: 5 },
        { cx: 0.89, cy: 0.20, spokes: 4, spread: 0.080, hubDegree: 5 },
        { cx: 0.06, cy: 0.55, spokes: 3, spread: 0.085, hubDegree: 4 },
        { cx: 0.93, cy: 0.52, spokes: 3, spread: 0.075, hubDegree: 4 },
        { cx: 0.17, cy: 0.88, spokes: 2, spread: 0.060, hubDegree: 3 },
        { cx: 0.84, cy: 0.86, spokes: 2, spread: 0.065, hubDegree: 3 },
      ];

      clusters.forEach((c, cIdx) => {
        tryAdd(c.cx, c.cy, { isHub: true, targetDegree: c.hubDegree, cluster: cIdx });
        let placed = 0, tries = 0;
        while (placed < c.spokes && tries < 400) {
          tries++;
          const angle = rn(0, Math.PI * 2);
          const r = rn(c.spread * 0.55, c.spread * 1.05);
          if (tryAdd(c.cx + Math.cos(angle) * r, c.cy + Math.sin(angle) * r,
                    { isHub: false, cluster: cIdx, targetDegree: 2 })) {
            placed++;
          }
        }
      });

      // Compute total connections from hub targets + a few cross-links
      let degreeSum = 0;
      for (const n of nodes) if (n.isHub) degreeSum += n.targetDegree;
      // hub edges are shared, so approximate edge count = degreeSum (one end is hub)
      totalConnections = degreeSum + 4; // small cross-link allowance
    }

    function startSequence() {
      edges = [];
      edgeSet = new Set();
      growers = [];
      connectionIdx = 0;
      visitedOrder = [];
      visitedSet = new Set();
      for (const n of nodes) { n.activatedAt = null; n.degree = 0; }
      phase = 'drawing';

      // Start at the first hub (node 0)
      const startIdx = 0;
      nodes[startIdx].activatedAt = now();
      visitedOrder.push(startIdx);
      visitedSet.add(startIdx);

      const g = { lastIdx: startIdx, edge: null, retired: false };
      growers.push(g);
      schedule(() => pickEdgeFor(g), FIRST_NODE_DELAY);
    }

    function nodeClaimedByOther(idx, self) {
      for (const og of growers) {
        if (og === self) continue;
        if (og.edge && og.edge.toIdx === idx) return true;
      }
      return false;
    }

    function nearestInPool(fromIdx, pool) {
      const fn = nodes[fromIdx];
      let best = pool[0], bestD = Infinity;
      for (const i of pool) {
        const dx = nodes[i].xF - fn.xF, dy = nodes[i].yF - fn.yF;
        const d = dx * dx + dy * dy;
        if (d < bestD) { bestD = d; best = i; }
      }
      return best;
    }

    function pickEdgeFor(g) {
      if (phase !== 'drawing' || g.retired) return;
      if (connectionIdx >= totalConnections) {
        g.retired = true; g.edge = null; maybeFinish(); return;
      }

      const fromIdx = g.lastIdx;
      const fromNode = nodes[fromIdx];
      const unvisitedRemain = visitedOrder.length < nodes.length;
      let isCross = ((connectionIdx + 1) % 4 === 0) && visitedOrder.length >= 2;
      if (!unvisitedRemain) isCross = true;

      let toIdx = -1;

      if (isCross) {
        const cands = visitedOrder.filter(i => i !== fromIdx && !hasEdge(fromIdx, i));
        if (cands.length > 0) {
          toIdx = cands[Math.floor(Math.random() * cands.length)];
        } else {
          isCross = false;
        }
      }

      if (toIdx === -1) {
        const candidates = [];
        for (let i = 0; i < nodes.length; i++) {
          if (visitedSet.has(i)) continue;
          if (nodeClaimedByOther(i, g)) continue;
          candidates.push(i);
        }

        if (candidates.length === 0) {
          // Other growers still in flight — wait and retry
          const others = growers.some(og => og !== g && og.edge);
          if (others) { schedule(() => pickEdgeFor(g), 120); return; }
          // Otherwise fall back to a cross-link
          const cands = visitedOrder.filter(i => i !== fromIdx && !hasEdge(fromIdx, i));
          if (cands.length === 0) { g.retired = true; g.edge = null; maybeFinish(); return; }
          toIdx = cands[Math.floor(Math.random() * cands.length)];
          isCross = true;
        } else if (fromNode.isHub && fromNode.degree < fromNode.targetDegree) {
          // Hub fan-out — prefer same-cluster spokes
          const sameCluster = candidates.filter(i => !nodes[i].isHub && nodes[i].cluster === fromNode.cluster);
          const pool = sameCluster.length > 0 ? sameCluster : candidates;
          toIdx = nearestInPool(fromIdx, pool);
        } else if (!fromNode.isHub) {
          // Spoke bridging — prefer unvisited hubs anywhere on canvas
          const unvisitedHubs = candidates.filter(i => nodes[i].isHub);
          if (unvisitedHubs.length > 0) {
            toIdx = nearestInPool(fromIdx, unvisitedHubs);
          } else {
            toIdx = nearestInPool(fromIdx, candidates);
          }
        } else {
          // Hub saturated — pick nearest unvisited (likely a far cluster)
          toIdx = nearestInPool(fromIdx, candidates);
        }
      }

      g.edge = { fromIdx, toIdx, startedAt: now(), isCross };
      connectionIdx++;
    }

    function maybeSpawnNewGrower() {
      if (phase !== 'drawing') return;
      const active = growers.filter(g => !g.retired);
      if (active.length >= MAX_GROWERS) return;
      if (visitedOrder.length < 3) return;
      if (connectionIdx >= totalConnections - 5) return;
      const spawnChance = 0.45 + (MAX_GROWERS - active.length) * 0.12;
      if (Math.random() > spawnChance) return;

      const tips = active.map(g => g.lastIdx);
      // Prefer un-saturated hubs as new tips — drives more fan-out activity
      let candidates = visitedOrder.filter(i =>
        !tips.includes(i) && nodes[i].isHub && nodes[i].degree < nodes[i].targetDegree
      );
      if (candidates.length === 0) {
        candidates = visitedOrder.filter(i => !tips.includes(i));
      }
      if (candidates.length === 0) return;

      // Pick farthest from existing tips so concurrent growth is spatially distinct
      let best = candidates[0], bestDist = -1;
      for (const i of candidates) {
        let minDist = Infinity;
        for (const tip of tips) {
          const dx = nodes[i].xF - nodes[tip].xF;
          const dy = nodes[i].yF - nodes[tip].yF;
          const d = dx * dx + dy * dy;
          if (d < minDist) minDist = d;
        }
        if (minDist > bestDist) { bestDist = minDist; best = i; }
      }

      const ng = { lastIdx: best, edge: null, retired: false };
      growers.push(ng);
      schedule(() => pickEdgeFor(ng), rn(150, 450));
    }

    function maybeFinish() {
      const anyActive = growers.some(g => g.edge);
      if (!anyActive && connectionIdx >= totalConnections) {
        phase = 'pause';
        phaseStart = now();
      } else if (!anyActive && growers.every(g => g.retired)) {
        phase = 'pause';
        phaseStart = now();
      }
    }

    // ── DRAW HELPERS ──────────────────────────────────────────
    function drawLine(fromIdx, toIdx, prog) {
      const a = nodes[fromIdx], b = nodes[toIdx];
      const ax = a.xF * W, ay = a.yF * H;
      const bx = b.xF * W, by = b.yF * H;
      const ex = ax + (bx - ax) * prog;
      const ey = ay + (by - ay) * prog;
      CX.beginPath();
      CX.moveTo(ax, ay);
      CX.lineTo(ex, ey);
      CX.strokeStyle = 'rgba(201, 168, 76, 0.28)';
      CX.lineWidth = 0.6;
      CX.stroke();
    }

    function drawTravellingDot(x, y) {
      CX.save();
      CX.shadowBlur = 14;
      CX.shadowColor = 'rgba(255, 235, 150, 0.90)';
      CX.beginPath();
      CX.arc(x, y, 3, 0, Math.PI * 2);
      CX.fillStyle = 'rgba(255, 235, 150, 0.90)';
      CX.fill();
      CX.restore();
    }

    function drawNode(i, t) {
      const n = nodes[i];
      const x = n.xF * W, y = n.yF * H;
      const isActive = visitedSet.has(i);
      const isHub = n.isHub;

      if (!isActive) {
        const sz = isHub ? 3.6 : 2.6;
        CX.beginPath();
        CX.arc(x, y, sz, 0, Math.PI * 2);
        CX.fillStyle = `rgba(201, 168, 76, ${isHub ? 0.28 : 0.22})`;
        CX.fill();
        return;
      }

      let pulseScale = 1;
      if (n.activatedAt) {
        const since = t - n.activatedAt;
        if (since < PULSE_DURATION) {
          const p = since / PULSE_DURATION;
          const ease = 1 - Math.pow(1 - p, 3);
          pulseScale = 1 + (1 - ease) * (isHub ? 1.1 : 0.9);
        }
      }

      const baseGlow = isHub ? 30 : 18;
      const glowR = baseGlow * pulseScale;
      const glowAlpha = isHub ? 0.11 : 0.08;
      const g = CX.createRadialGradient(x, y, 0, x, y, glowR);
      g.addColorStop(0, `rgba(201, 168, 76, ${glowAlpha})`);
      g.addColorStop(1, 'rgba(201, 168, 76, 0)');
      CX.beginPath();
      CX.arc(x, y, glowR, 0, Math.PI * 2);
      CX.fillStyle = g;
      CX.fill();

      const coreSz = isHub ? 5.2 : 3.5;
      const coreAlpha = isHub ? 0.78 : 0.65;
      CX.beginPath();
      CX.arc(x, y, coreSz, 0, Math.PI * 2);
      CX.fillStyle = `rgba(201, 168, 76, ${coreAlpha})`;
      CX.fill();
    }

    // ── RENDER LOOP ───────────────────────────────────────────
    function render() {
      animId = requestAnimationFrame(render);
      const t = now();
      CX.clearRect(0, 0, W, H);

      let alpha = 1;
      if (phase === 'pause') {
        if (t - phaseStart >= PAUSE_DURATION) {
          phase = 'fade';
          phaseStart = t;
        }
      } else if (phase === 'fade') {
        const e = t - phaseStart;
        alpha = Math.max(0, 1 - e / FADE_DURATION);
        if (e >= FADE_DURATION) {
          clearScheduled();
          buildNodes();
          startSequence();
          return;
        }
      }

      CX.save();
      CX.globalAlpha = alpha;

      for (const c of edges) drawLine(c.fromIdx, c.toIdx, 1);

      if (phase === 'drawing') {
        for (const g of growers) {
          if (!g.edge) continue;
          const elapsed = t - g.edge.startedAt;
          const prog = Math.min(1, elapsed / LINE_DURATION);
          drawLine(g.edge.fromIdx, g.edge.toIdx, prog);

          const a = nodes[g.edge.fromIdx];
          const b = nodes[g.edge.toIdx];
          const ax = a.xF * W, ay = a.yF * H;
          const bx = b.xF * W, by = b.yF * H;
          drawTravellingDot(ax + (bx - ax) * prog, ay + (by - ay) * prog);

          if (prog >= 1) {
            edges.push({ fromIdx: g.edge.fromIdx, toIdx: g.edge.toIdx });
            edgeSet.add(edgeKey(g.edge.fromIdx, g.edge.toIdx));
            const dst = g.edge.toIdx;
            const wasNew = !visitedSet.has(dst);
            if (wasNew) {
              visitedSet.add(dst);
              visitedOrder.push(dst);
            }
            nodes[g.edge.fromIdx].degree++;
            nodes[dst].degree++;
            nodes[dst].activatedAt = t;

            const fromNode = nodes[g.edge.fromIdx];
            // Keep tip on a hub while it still has fan-out budget
            const stayOnHub = wasNew && fromNode.isHub && fromNode.degree < fromNode.targetDegree;
            if (wasNew && !stayOnHub) {
              g.lastIdx = dst;
            }
            // cross-links never move the tip

            g.edge = null;
            schedule(() => pickEdgeFor(g), INTER_EDGE_GAP);
            maybeSpawnNewGrower();
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) drawNode(i, t);

      CX.restore();
    }

    // ── RESIZE ────────────────────────────────────────────────
    function resize() {
      W = CV.width = window.innerWidth;
      H = CV.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();
    buildNodes();
    startSequence();
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      clearScheduled();
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
