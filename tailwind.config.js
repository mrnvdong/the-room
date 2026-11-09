/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        room: {
          dark: '#0f1115',
          panel: 'rgba(20, 24, 33, 0.85)',
          border: 'rgba(255, 255, 255, 0.12)',
          accent: '#38bdf8',
          accentHover: '#0ea5e9',
          gold: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
