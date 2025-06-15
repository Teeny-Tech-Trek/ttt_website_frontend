/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1f528c',
          light: '#3e6aa7',
          dark: '#153a69',
          100: '#e9eff7',
          200: '#c3d4ea',
          300: '#9db9dd',
          400: '#779fd0',
          500: '#3e6aa7',
          600: '#1f528c',
          700: '#153a69',
          800: '#0b2546',
          900: '#041223',
        },
        secondary: {
          DEFAULT: '#34d399',
          light: '#6ee7b7',
          dark: '#059669',
        },
        accent: {
          DEFAULT: '#f97316',
          light: '#fdba74',
          dark: '#c2410c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 0 20px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 30px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};