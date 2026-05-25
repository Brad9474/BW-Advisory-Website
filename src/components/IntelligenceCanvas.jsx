import { useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
//  BW ADVISORY — INTELLIGENCE CANVAS
//  Progressive network-building animation for Loss Intelligence.
//
//  Hub-and-spoke topology: each cluster has a larger central hub
//  surrounded by spokes. Top-2 hubs by degree are "super hubs"
//  that get a dramatic fan-reveal when first reached.
// ═══════════════════════════════════════════════════════════════

export default function IntelligenceCanvas() {
  const cvRef = useRef(null);

  useEffect(() => {
    const CV = cvRef.current;
    if (!CV) return;
    const CX = CV.getContext('2d');

    let W, H, animId;
    let pendingTimeouts = [];

    const LINE_DURATION      = 800;
    const PAUSE_DURATION     = 2000;
    const FADE_DURATION      = 1500;
    const PULSE_DURATION     = 700;
    const INTER_EDGE_GAP     = 90;
    const FIRST_NODE_DELAY   = 550;
    const MAX_GROWERS        = 3;
    const HUB_FLASH_DURATION = 100;
    const HUB_BLOOM_DURATION = 400;
    const HUB_RING_PERIOD    = 2500;
    const HUB_FAN_MIN        = 4;
    const HUB_FAN_MAX        = 6;

    const TEXT_X_MIN = 0.32;
    const TEXT_X_MAX = 0.68;

    let nodes = [];
    let edges = [];
    let hubFanEdges = [];
    let edgeSet = new Set();
    let visitedOrder = [];
    let visitedSet = new Set();
    let connectionIdx = 0;
    let totalConnections = 0;

    let growers = [];
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

    // ── COLOUR ────────────────────────────────────────────────
    // Degree → colour: gold → amber → deep-orange → red-orange
    function nodeColourRGB(node) {
      if (node.isSuperHub) return [200, 30, 20];
      const td = node.targetDegree;
      if (td >= 5) return [200, 30, 20];
      if (td >= 4) return [230, 80, 20];
      if (td >= 3) return [255, 140, 30];
      return [201, 168, 76];
    }

    // Line colour comes from the higher-degree endpoint
    function edgeDominantNode(fromIdx, toIdx) {
      const na = nodes[fromIdx], nb = nodes[toIdx];
      if (na.isSuperHub) return na;
      if (nb.isSuperHub) return nb;
      return na.targetDegree >= nb.targetDegree ? na : nb;
    }

    // ── BUILD ─────────────────────────────────────────────────
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
          firstActivatedAt: null,
          degree: 0,
          isHub: false,
          isSuperHub: false,
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

      // Mark top-2 hubs by targetDegree as super hubs
      const hubsSorted = nodes
        .map((n, i) => ({ n, i }))
        .filter(x => x.n.isHub)
        .sort((a, b) => b.n.targetDegree - a.n.targetDegree);
      for (let k = 0; k < Math.min(2, hubsSorted.length); k++) {
        hubsSorted[k].n.isSuperHub = true;
      }

      let degreeSum = 0;
      for (const n of nodes) if (n.isHub) degreeSum += n.targetDegree;
      totalConnections = degreeSum + 4;
    }

    function startSequence() {
      edges = [];
      hubFanEdges = [];
      edgeSet = new Set();
      growers = [];
      connectionIdx = 0;
      visitedOrder = [];
      visitedSet = new Set();
      for (const n of nodes) {
        n.activatedAt = null;
        n.firstActivatedAt = null;
        n.degree = 0;
      }
      phase = 'drawing';

      const startIdx = 0;
      const t0 = now();
      nodes[startIdx].activatedAt = t0;
      nodes[startIdx].firstActivatedAt = t0;
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
      for (const fe of hubFanEdges) {
        if (fe.toIdx === idx) return true;
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
          const others = growers.some(og => og !== g && og.edge);
          if (others) { schedule(() => pickEdgeFor(g), 120); return; }
          const cands = visitedOrder.filter(i => i !== fromIdx && !hasEdge(fromIdx, i));
          if (cands.length === 0) { g.retired = true; g.edge = null; maybeFinish(); return; }
          toIdx = cands[Math.floor(Math.random() * cands.length)];
          isCross = true;
        } else if (fromNode.isHub && fromNode.degree < fromNode.targetDegree) {
          const sameCluster = candidates.filter(i => !nodes[i].isHub && nodes[i].cluster === fromNode.cluster);
          const pool = sameCluster.length > 0 ? sameCluster : candidates;
          toIdx = nearestInPool(fromIdx, pool);
        } else if (!fromNode.isHub) {
          const unvisitedHubs = candidates.filter(i => nodes[i].isHub);
          if (unvisitedHubs.length > 0) {
            toIdx = nearestInPool(fromIdx, unvisitedHubs);
          } else {
            toIdx = nearestInPool(fromIdx, candidates);
          }
        } else {
          toIdx = nearestInPool(fromIdx, candidates);
        }
      }

      g.edge = { fromIdx, toIdx, startedAt: now(), isCross };
      connectionIdx++;
    }

    // Fan out 4-6 simultaneous connections from a super hub on first arrival
    function triggerHubFan(hubIdx, arrivingGrower) {
      const hubNode = nodes[hubIdx];
      const fanCount = Math.round(rn(HUB_FAN_MIN, HUB_FAN_MAX + 0.99));

      // Collect claimed targets from in-flight edges
      const claimed = new Set();
      for (const fe of hubFanEdges) claimed.add(fe.toIdx);
      for (const og of growers) {
        if (og !== arrivingGrower && og.edge) claimed.add(og.edge.toIdx);
      }

      // Same-cluster spokes first, then anything reachable, sorted by distance
      const distFrom = (i) => {
        const dx = nodes[i].xF - hubNode.xF, dy = nodes[i].yF - hubNode.yF;
        return dx * dx + dy * dy;
      };
      const sameCluster = [], other = [];
      for (let i = 0; i < nodes.length; i++) {
        if (i === hubIdx || hasEdge(hubIdx, i) || claimed.has(i)) continue;
        (nodes[i].cluster === hubNode.cluster ? sameCluster : other).push(i);
      }
      sameCluster.sort((a, b) => distFrom(a) - distFrom(b));
      other.sort((a, b) => distFrom(a) - distFrom(b));
      const targets = [...sameCluster, ...other].slice(0, fanCount);

      if (targets.length === 0) {
        arrivingGrower.edge = null;
        schedule(() => pickEdgeFor(arrivingGrower), INTER_EDGE_GAP);
        return;
      }

      // Extend budget and fire all fan edges simultaneously
      totalConnections += targets.length;
      const fanStartTime = now();
      for (const toIdx of targets) {
        connectionIdx++;
        hubFanEdges.push({ fromIdx: hubIdx, toIdx, startedAt: fanStartTime });
      }

      arrivingGrower.edge = null;
      arrivingGrower.retired = true;
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
      let candidates = visitedOrder.filter(i =>
        !tips.includes(i) && nodes[i].isHub && nodes[i].degree < nodes[i].targetDegree
      );
      if (candidates.length === 0) {
        candidates = visitedOrder.filter(i => !tips.includes(i));
      }
      if (candidates.length === 0) return;

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
      if (hubFanEdges.length > 0) return;
      const anyActive = growers.some(g => g.edge);
      if (!anyActive && connectionIdx >= totalConnections) {
        phase = 'pause'; phaseStart = now();
      } else if (!anyActive && growers.every(g => g.retired)) {
        phase = 'pause'; phaseStart = now();
      }
    }

    // ── DRAW HELPERS ──────────────────────────────────────────
    function drawLine(fromIdx, toIdx, prog) {
      const na = nodes[fromIdx], nb = nodes[toIdx];
      const ax = na.xF * W, ay = na.yF * H;
      const bx = nb.xF * W, by = nb.yF * H;
      const [cr, cg, cb] = nodeColourRGB(edgeDominantNode(fromIdx, toIdx));
      CX.beginPath();
      CX.moveTo(ax, ay);
      CX.lineTo(ax + (bx - ax) * prog, ay + (by - ay) * prog);
      CX.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, 0.28)`;
      CX.lineWidth = 0.6;
      CX.stroke();
    }

    // prog is 0→1 along the line; trail dots drawn behind the main dot
    function drawTravellingDot(prog, fromIdx, toIdx) {
      const na = nodes[fromIdx], nb = nodes[toIdx];
      const ax = na.xF * W, ay = na.yF * H;
      const bx = nb.xF * W, by = nb.yF * H;
      const isHubConn = na.isSuperHub || nb.isSuperHub;
      const dotRadius = isHubConn ? 5 : 3;
      const dotAlpha  = isHubConn ? 1.0 : 0.90;
      const trailCount = isHubConn ? 4 : 2;
      const [cr, cg, cb] = nodeColourRGB(edgeDominantNode(fromIdx, toIdx));

      // Trail dots — farthest first so main dot renders on top
      for (let i = trailCount; i >= 1; i--) {
        const tp = Math.max(0, prog - i * 0.035);
        const fade = 1 - i / (trailCount + 1);
        CX.beginPath();
        CX.arc(
          ax + (bx - ax) * tp,
          ay + (by - ay) * tp,
          Math.max(0.5, dotRadius * fade * 0.65),
          0, Math.PI * 2
        );
        CX.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${dotAlpha * fade * 0.45})`;
        CX.fill();
      }

      // Main dot
      CX.save();
      CX.shadowBlur = isHubConn ? 22 : 14;
      CX.shadowColor = `rgba(${cr}, ${cg}, ${cb}, ${dotAlpha})`;
      CX.beginPath();
      CX.arc(ax + (bx - ax) * prog, ay + (by - ay) * prog, dotRadius, 0, Math.PI * 2);
      CX.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${dotAlpha})`;
      CX.fill();
      CX.restore();
    }

    function drawNode(i, t) {
      const n = nodes[i];
      const x = n.xF * W, y = n.yF * H;
      const isActive = visitedSet.has(i);
      const [cr, cg, cb] = nodeColourRGB(n);
      const col = (a) => `rgba(${cr}, ${cg}, ${cb}, ${a})`;

      if (!isActive) {
        const sz = n.isSuperHub ? 4.5 : n.isHub ? 3.2 : 2.6;
        CX.beginPath();
        CX.arc(x, y, sz, 0, Math.PI * 2);
        CX.fillStyle = col(n.isHub ? 0.28 : 0.22);
        CX.fill();
        // Subtle pre-activation ring hints at hub status
        if (n.isHub) {
          const pulse = 0.5 + 0.5 * Math.sin(t / HUB_RING_PERIOD * Math.PI * 2);
          CX.beginPath();
          CX.arc(x, y, sz * 2.5, 0, Math.PI * 2);
          CX.strokeStyle = col(0.07 * pulse);
          CX.lineWidth = 1;
          CX.stroke();
        }
        return;
      }

      const since      = n.activatedAt      ? t - n.activatedAt      : Infinity;
      const sinceFirst = n.firstActivatedAt ? t - n.firstActivatedAt : Infinity;

      // Super hub: expanding bloom glow (10 → 80px over HUB_BLOOM_DURATION)
      if (n.isSuperHub) {
        const bp = Math.min(1, sinceFirst / HUB_BLOOM_DURATION);
        const bloomR = 10 + bp * 70;
        const bloomA = 0.18 * (1 - bp * 0.6);
        const bg = CX.createRadialGradient(x, y, 0, x, y, bloomR);
        bg.addColorStop(0,   col(bloomA));
        bg.addColorStop(0.6, col(bloomA * 0.4));
        bg.addColorStop(1,   col(0));
        CX.beginPath();
        CX.arc(x, y, bloomR, 0, Math.PI * 2);
        CX.fillStyle = bg;
        CX.fill();
      }

      // Pulse scale on (re-)activation
      let pulseScale = 1;
      if (since < PULSE_DURATION) {
        const p = since / PULSE_DURATION;
        const ease = 1 - Math.pow(1 - p, 3);
        pulseScale = 1 + (1 - ease) * (n.isSuperHub ? 1.5 : n.isHub ? 1.1 : 0.9);
      }

      // Ambient glow halo
      const baseGlow = n.isSuperHub ? 50 : n.isHub ? 30 : 18;
      const glowA    = n.isSuperHub ? 0.13 : n.isHub ? 0.11 : 0.08;
      const gg = CX.createRadialGradient(x, y, 0, x, y, baseGlow * pulseScale);
      gg.addColorStop(0, col(glowA));
      gg.addColorStop(1, col(0));
      CX.beginPath();
      CX.arc(x, y, baseGlow * pulseScale, 0, Math.PI * 2);
      CX.fillStyle = gg;
      CX.fill();

      // Persistent pulsing outer ring for hub nodes
      if (n.isHub) {
        const coreSzBase = n.isSuperHub ? 8 : 5.2;
        const pulse = 0.5 + 0.5 * Math.sin(t / HUB_RING_PERIOD * Math.PI * 2);
        CX.beginPath();
        CX.arc(x, y, coreSzBase * 2.5, 0, Math.PI * 2);
        CX.strokeStyle = col(0.35 * pulse);
        CX.lineWidth = 1;
        CX.stroke();
      }

      // Core dot — flash white on super hub first activation, then settle to colour
      const coreSz = Math.min(pulseScale, 1.8) * (n.isSuperHub ? 8 : n.isHub ? 5.2 : 3.5);
      CX.beginPath();
      CX.arc(x, y, coreSz, 0, Math.PI * 2);
      if (n.isSuperHub && sinceFirst < HUB_FLASH_DURATION) {
        CX.fillStyle = 'rgba(255, 255, 255, 1.0)';
      } else {
        CX.fillStyle = col(n.isSuperHub ? 0.90 : n.isHub ? 0.78 : 0.65);
      }
      CX.fill();
    }

    // ── RENDER LOOP ───────────────────────────────────────────
    function render() {
      animId = requestAnimationFrame(render);
      const t = now();
      CX.clearRect(0, 0, W, H);

      let alpha = 1;
      if (phase === 'pause') {
        if (t - phaseStart >= PAUSE_DURATION) { phase = 'fade'; phaseStart = t; }
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

      // Completed edges
      for (const c of edges) drawLine(c.fromIdx, c.toIdx, 1);

      if (phase === 'drawing') {
        // Regular grower in-progress edges
        for (const g of growers) {
          if (!g.edge) continue;
          const prog = Math.min(1, (t - g.edge.startedAt) / LINE_DURATION);
          drawLine(g.edge.fromIdx, g.edge.toIdx, prog);
          drawTravellingDot(prog, g.edge.fromIdx, g.edge.toIdx);

          if (prog >= 1) {
            const { fromIdx, toIdx: dst } = g.edge;
            edges.push({ fromIdx, toIdx: dst });
            edgeSet.add(edgeKey(fromIdx, dst));
            const wasNew = !visitedSet.has(dst);
            if (wasNew) {
              visitedSet.add(dst);
              visitedOrder.push(dst);
              nodes[dst].firstActivatedAt = t;
            }
            nodes[dst].activatedAt = t;
            nodes[fromIdx].degree++;
            nodes[dst].degree++;

            if (wasNew && nodes[dst].isSuperHub) {
              // Hub reveal — fan replaces normal continuation
              triggerHubFan(dst, g);
            } else {
              const fromNode = nodes[fromIdx];
              const stayOnHub = wasNew && fromNode.isHub && fromNode.degree < fromNode.targetDegree;
              if (wasNew && !stayOnHub) g.lastIdx = dst;
              g.edge = null;
              schedule(() => pickEdgeFor(g), INTER_EDGE_GAP);
              maybeSpawnNewGrower();
            }
          }
        }

        // Hub fan in-progress edges
        let anyFanCompleted = false;
        for (let i = hubFanEdges.length - 1; i >= 0; i--) {
          const fe = hubFanEdges[i];
          const prog = Math.min(1, (t - fe.startedAt) / LINE_DURATION);
          drawLine(fe.fromIdx, fe.toIdx, prog);
          drawTravellingDot(prog, fe.fromIdx, fe.toIdx);

          if (prog >= 1) {
            const { fromIdx, toIdx: dst } = fe;
            edges.push({ fromIdx, toIdx: dst });
            edgeSet.add(edgeKey(fromIdx, dst));
            const wasNew = !visitedSet.has(dst);
            if (wasNew) {
              visitedSet.add(dst);
              visitedOrder.push(dst);
              nodes[dst].firstActivatedAt = t;
            }
            nodes[dst].activatedAt = t;
            nodes[fromIdx].degree++;
            nodes[dst].degree++;
            hubFanEdges.splice(i, 1);
            anyFanCompleted = true;
          }
        }

        if (anyFanCompleted && hubFanEdges.length === 0) {
          maybeSpawnNewGrower();
          maybeFinish();
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
      clearScheduled();
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
