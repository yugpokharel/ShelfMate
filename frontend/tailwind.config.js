/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#f0f0f0',
        accent: '#059669',
        destructive: '#dc2626',
        muted: '#e5e5e5',
        border: '#e0e0e0',
        background: '#ffffff',
        foreground: '#0a0a0a',
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      borderRadius: {
        lg: '0.5rem',
      },
    },
  },
  plugins: [],
}
