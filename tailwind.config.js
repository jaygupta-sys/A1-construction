/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        navy: {
          950: "#071827", // Midnight Navy (primary dark)
          900: "#0B2236",
          800: "#102C43", // Deep Blue (secondary dark / panels)
          700: "#1A3D5A",
        },
        ivory: {
          50: "#FAF8F4",
          100: "#F5F2EA", // Warm Ivory
          200: "#ECE7DA",
          300: "#DDD6C3",
        },
        gold: {
          300: "#E2CCA3",
          400: "#D4B885",
          500: "#C5A46D", // Champagne Gold
          600: "#A68652",
          700: "#856839",
        },
        orange: {
          construction: "#E97832", // Construction Orange (CTA only)
          hover: "#D66723",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: "0.2em",
        ultra: "0.3em",
      },
      boxShadow: {
        'luxury': '0 30px 60px -12px rgba(7, 24, 39, 0.45)',
        'gold-glow': '0 0 25px rgba(197, 164, 109, 0.2)',
        'subtle-panel': '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #E2CCA3 0%, #C5A46D 50%, #A68652 100%)',
      },
    },
  },
  plugins: [],
}
