/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',      // Deep navy — premium feel
        accent: '#0369A1',       // Vibrant blue CTA — electric, modern
        secondary: '#334155',    // Professional mid-tone
        gold: '#C9A84C',         // Prestige accent
        background: '#F5F4F0',   // Warm off-white
        surface: '#FFFFFF',
        silver: '#C0C8D0',
        textDark: '#1A3560',
        textLight: '#F5F4F0',
        'premium-dark': '#0A1520',  // Ultra dark for depth
        'premium-light': '#1A3560',  // Lighter navy for contrast
      },
      fontFamily: {
        display: ['"Poppins"', 'system-ui', 'sans-serif'],
        sans: ['"Open Sans"', '"Freight Text Pro"', '"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Garamond Premier Pro"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['Courier Prime', 'monospace'],
      }
    },
  },
  plugins: [],
}
