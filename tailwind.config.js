/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/blocks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'green-primary': '#10b981',
        'green-secondary': '#059669',
        'green-tertiary': '#047857',
      },
      animation: {
        'fade-in-up': 'fadeInUp 1.2s ease-out',
        float: 'float 8s ease-in-out infinite',
        'float-reverse': 'float 6s ease-in-out infinite reverse',
        'float-delayed': 'float 7s ease-in-out infinite',
        'elegant-bounce': 'elegantBounce 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(40px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
          },
          '33%': {
            transform: 'translateY(-15px) rotate(1deg)',
          },
          '66%': {
            transform: 'translateY(-25px) rotate(-1deg)',
          },
        },
        elegantBounce: {
          '0%, 100%': {
            transform: 'translateY(0) rotate(-45deg)',
            opacity: '0.6',
          },
          '50%': {
            transform: 'translateY(-12px) rotate(-45deg)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
}
