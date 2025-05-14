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
        'brand-background': '#121212', // Coincide con el body
        'brand-surface': '#1e1e1e',   // Para tarjetas, modales, etc.
        'brand-primary': '#60a5fa',   // Un azul vibrante para acentos
        'brand-secondary': '#a78bfa', // Un púrpura para otros acentos
      },
      animation: {
        'pulse-bg': 'pulse-bg 2s infinite alternate', // Para Rate Up
      },
      keyframes: {
        'pulse-bg': {
          '0%, 100%': { backgroundColor: 'rgba(168, 85, 247, 0.7)' }, // purple-500 con opacidad
          '50%': { backgroundColor: 'rgba(168, 85, 247, 1)' }, // purple-500
        }
      }
    },
  },
  plugins: [],
}