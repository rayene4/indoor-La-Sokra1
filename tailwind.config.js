/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        'primary-dark': '#1D4ED8',
        'primary-light': '#60A5FA',
        'primary-bg': '#EFF6FF',
        'primary-border': '#BFDBFE',
        navy: '#1E3A8A',
        sport: '#0EA5E9',
      },
      boxShadow: {
        blue: '0 4px 24px rgba(37,99,235,0.18)',
        'blue-lg': '0 8px 40px rgba(37,99,235,0.25)',
        card: '0 2px 16px rgba(0,0,0,0.07)',
        'card-hover': '0 8px 32px rgba(37,99,235,0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fadeIn 0.5s ease both',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
