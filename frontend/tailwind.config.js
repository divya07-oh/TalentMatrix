/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A0A0A",
        secondary: "#111111",
        accent: "#D4AF37",
        background: "#0F1F17", // Dark Forest Green
        surface: "#1B3022",
        text: "#FFFFFF",
        "text-muted": "#A1A1AA",
        border: "#1F1F1F",
        "accent-bright": "#FACC15",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
