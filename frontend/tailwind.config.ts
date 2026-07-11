import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22C55E',
          dark: '#15803D',
          light: '#DCFCE7',
          hover: '#16A34A',
        },
        ink: {
          DEFAULT: '#0F0F0F',
          2: '#374151',
          3: '#6B7280',
          4: '#9CA3AF',
        },
        surface: '#F8F9FA',
        border: '#E5E7EB',
        error: '#EF4444',
        warning: '#F59E0B',
        success: '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
        btn: '10px',
        input: '10px',
        pill: '20px',
        chip: '8px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 20px rgba(0,0,0,0.10)',
        modal: '0 8px 40px rgba(0,0,0,0.15)',
        nav: '0 1px 8px rgba(0,0,0,0.04)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
