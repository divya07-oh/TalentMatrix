/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B4332",
        secondary: "#132A20",
        accent: "#D4AF37",
        background: "#0F1F17",
        text: "#F5F5F5",
        "text-muted": "#CFCFCF",
        border: "#2A3A33",
        "primary-accent": "#2D6A4F",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
