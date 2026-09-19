/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            950: '#060A13',
            900: '#0B1120',
            850: '#0E172C',
            800: '#131E38',
            700: '#1C2B4E',
            600: '#2A3C69',
          },
          gold: {
            50: '#FDFBF4',
            100: '#FAF3DC',
            200: '#F4E3AF',
            300: '#ECCF7C',
            400: '#E2BA4B',
            500: '#D4AF37', // Primary Brand Gold
            600: '#B99327',
            700: '#94721C',
            800: '#6F5315',
            900: '#4E380E',
          },
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FDE68A 0%, #D4AF37 50%, #B45309 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #D4AF37 0%, #FFF4D2 50%, #D4AF37 100%)',
        'navy-radial': 'radial-gradient(ellipse at top, #162447 0%, #0B1120 70%, #060A13 100%)',
      },
      boxShadow: {
        'gold-sm': '0 0 15px rgba(212, 175, 55, 0.15)',
        'gold-md': '0 0 25px rgba(212, 175, 55, 0.25)',
        'gold-lg': '0 0 40px rgba(212, 175, 55, 0.35)',
        'card-dark': '0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(212, 175, 55, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
