/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          main: '#080B14',
          sec: '#0E1422',
          card: '#141C2E',
          surface: '#1A2438',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(124, 92, 252, 0.35)',
        },
        accent: {
          primary: '#7C5CFC',     // Electric violet
          hover: '#6845f0',
          cyan: '#22D3EE',        // Cyan
          highlight: '#A78BFA',   // Soft lavender
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        },
        slate: {
          950: '#080B14',
          900: '#0E1422',
          850: '#141C2E',
          800: '#1A2438',
          700: '#334155',
          400: '#94A3B8',
          200: '#E2E8F0',
          100: '#F1F5F9',
          50: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 30px -5px rgba(124, 92, 252, 0.35)',
        'glow-cyan': '0 0 30px -5px rgba(34, 211, 238, 0.35)',
        'glow-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 15px -3px rgba(124, 92, 252, 0.15)',
        'dark-card': '0 8px 30px rgba(0, 0, 0, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulseGlow 3s infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'spin-slow': 'spin 15s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.04)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
