/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A1C42',      // Deep navy
        accent: '#1B6EC2',       // Electric blue
        background: '#EBF3FA',   // Light blue
        surface: '#FFFFFF',      // White surface for cards
        silver: '#C0C8D0',       // Supporting silver
        textDark: '#0A1C42',     // Text color on light bg
        textLight: '#EBF3FA',    // Text color on dark bg
      },
      fontFamily: {
        sans: ['Calibri', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
