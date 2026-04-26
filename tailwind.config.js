/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A3560',      // True navy — identifiably blue at scale
        accent: '#1B6EC2',       // Electric blue
        gold: '#C9A84C',         // Prestige accent — navy + gold = authority
        background: '#F5F4F0',   // Warm off-white (replaces cold clinical blue)
        surface: '#FFFFFF',
        silver: '#C0C8D0',
        textDark: '#1A3560',
        textLight: '#F5F4F0',
      },
      fontFamily: {
        sans: ['Calibri', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
