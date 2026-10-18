/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#211D35',
          700: '#383158',
          800: '#2C2744',
          900: '#211D35',
          950: '#171426',
        },
        plum: {
          DEFAULT: '#65558F',
          50: '#FAF8FC',
          100: '#F3EEF9',
          200: '#E4D9F3',
          300: '#D9C8F0',
          400: '#8E7CB5',
          500: '#65558F',
          600: '#534577',
          700: '#433760',
          800: '#342B4B',
          900: '#211D35',
        },
        lavender: {
          DEFAULT: '#D9C8F0',
          50: '#FAF7FD',
          100: '#F4EFFB',
          200: '#E7DCF6',
          300: '#D9C8F0',
          400: '#C2ACE4',
          500: '#9F83CC',
        },
        ivory: {
          DEFAULT: '#F7F2EA',
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F7F2EA',
          300: '#ECE3D4',
          400: '#DDD0BC',
        },
        sage: {
          DEFAULT: '#C6D7C0',
          50: '#F5F8F4',
          100: '#E8EFE6',
          200: '#C6D7C0',
          300: '#A6C09D',
          400: '#86A77B',
          500: '#668C5A',
          600: '#4F6F45',
          700: '#3B5333',
        },
        emergency: {
          DEFAULT: '#B42318',
          50: '#FEF3F2',
          100: '#FEE4E2',
          200: '#FECDCA',
          500: '#F04438',
          600: '#D92D20',
          700: '#B42318',
          800: '#912018',
          900: '#7A1C15',
        },
        navy: {
          50: '#FAF7FD',
          100: '#F4EFFB',
          200: '#D9C8F0',
          700: '#383158',
          800: '#2C2744',
          900: '#211D35',
          950: '#171426',
        },
        saffron: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          500: '#F97316',
          600: '#E85D04',
          700: '#C2410C',
        },
        brandGreen: {
          50: '#F5F8F4',
          100: '#E8EFE6',
          200: '#C6D7C0',
          500: '#668C5A',
          600: '#4F6F45',
          700: '#3B5333',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}


