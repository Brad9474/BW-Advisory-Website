const NoiseOverlay = () => (
  <svg className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

export default NoiseOverlay;
