/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fgo-gold': '#ffd700',
        'fgo-silver': '#c0c0c0',
        'fgo-bronze': '#cd7f32',
        'brand-background': '#121212', 
        'brand-surface': '#1e1e1e',   
        'brand-primary': '#60a5fa',   
        'brand-secondary': '#a78bfa',
      },
      animation: {
        'pulse-bg': 'pulse-bg 2s infinite alternate', 
      },
      keyframes: {
        'pulse-bg': {
          '0%, 100%': { backgroundColor: 'rgba(168, 85, 247, 0.7)' }, 
          '50%': { backgroundColor: 'rgba(168, 85, 247, 1)' }, 
        }
      }
    },
  },
  plugins: [],
}