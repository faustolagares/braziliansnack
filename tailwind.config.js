/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '2rem',
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1800px",
      }
    },
    extend: {
      colors: {
        brand: {
          dark: '#0e6b3d',
          sea: '#1f8754',
          jungle: '#2fa36b',
          blue: '#0066cc',
          yellow: '#ffc72c',
          mustard: '#ffd768',
          custard: '#ffe7a3',
          onyx: '#0f0f0f',
          porcelain: '#fafaf7',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Kanit', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'fadeInUp': 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fadeInDown': 'fadeInDown 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fadeInLeft': 'fadeInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fadeInRight': 'fadeInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scaleIn': 'scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slideInUp': 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeInDown: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-30px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeInLeft: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(-30px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
        fadeInRight: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(30px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
        scaleIn: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.8)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
        },
        slideInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(50px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      }
    }
  },
  plugins: [],
}

