import { useEffect, useState } from 'react';

// Rotating hero background — same boardroom-over-skyline composition,
// crossfading between Australian cities to signal national reach.
//
// To add a city: drop /public/hero-bg_<City>.webp (same framing/lighting as
// the Perth shot — dusk, empty chair, window wall, table with the etched
// network pattern) and add a line below. With one entry it just renders
// statically; the ticker and cycling only kick in once there's more than one.
const CITIES = [
  { name: 'Perth', image: '/hero-bg_PerthCity.webp' },
  { name: 'Sydney', image: '/hero-bg_SydneyCity.webp' },
  { name: 'Melbourne', image: '/hero-bg_MelbourneCity.webp' },
];

const CYCLE_MS = 6000;
const FADE_MS = 1800;

export default function CityCrossfade() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (CITIES.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CITIES.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {CITIES.map((city, i) => (
        <div
          key={city.name}
          className="absolute inset-0 bg-cover bg-no-repeat transition-opacity ease-in-out"
          style={{
            backgroundImage: `url("${city.image}")`,
            backgroundPosition: 'center 35%',
            filter: 'blur(1px)',
            transform: 'scale(1.03)',
            opacity: i === index ? 1 : 0,
            transitionDuration: `${FADE_MS}ms`,
          }}
        />
      ))}
      {CITIES.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/60">
          {CITIES.map((city, i) => (
            <span key={city.name} className={`transition-colors duration-500 ${i === index ? 'text-[#C9A84C] font-bold' : ''}`}>
              {city.name}{i < CITIES.length - 1 ? ' ·' : ''}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
