/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1B4332",
        secondary: "#2D6A4F",
        accent: "#D4AF37",
        lightbg: "#F8F9F5",
      },
      borderRadius: {
        xl: "16px",
      },
      boxShadow: {
        card: "0 8px 24px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};