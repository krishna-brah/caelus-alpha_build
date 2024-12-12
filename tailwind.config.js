const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        cosmic: {
          50: '#f8f6ff',
          100: '#f0edff',
          200: '#e4dcff',
          300: '#d0bfff',
          400: '#b794ff',
          500: '#9c27b0',  // Primary purple from logo
          600: '#6a1b9a',  // Darker purple from logo
          700: '#4a148c',  // Deep purple from logo
          800: '#2c0d54',
          900: '#1a0933',
          950: '#0d041a',
        },
        cream: {
          50: '#fdfbf7',   // Background color from logo
          100: '#f7f1e6',
          200: '#ede2cc',
          300: '#e2cba8',
          400: '#d4b182',
          500: '#c69664',
          600: '#b67d4d',
          700: '#96633d',
          800: '#7a5035',
          900: '#63422d',
        },
      },
      fontFamily: {
        'space-grotesk': ['Space Grotesk', ...fontFamily.sans],
        'inter': ['Inter', ...fontFamily.sans],
      },
      backgroundImage: {
        'gradient-cosmic': 'linear-gradient(-45deg, #9C27B0, #6A1B9A, #4A148C, #7B1FA2)',
      },
      animation: {
        'gradient-flow': 'gradient 15s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}