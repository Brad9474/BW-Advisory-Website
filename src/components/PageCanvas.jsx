// ═══════════════════════════════════════════════════════════════
//  BW ADVISORY — PAGE CANVAS
//
//  Ambient background for inner pages: the brand shield with
//  circuit-trace connections flowing from it, sourced from a
//  generated static image rather than a coded animation — matches
//  the brand gold and sits quietly behind content at low opacity.
// ═══════════════════════════════════════════════════════════════

export default function PageCanvas() {
  return (
    <div
      className="absolute inset-0 w-full h-full bg-no-repeat opacity-[0.16]"
      style={{
        backgroundImage: 'url("/shield-network-bg.webp")',
        backgroundPosition: 'left 8% bottom 12%',
        backgroundSize: 'min(55vw, 700px) auto',
      }}
    />
  );
}
