/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1B4332", // Forest Green
        secondary: "#2D6A4F", // Deep Green
        accent: "#D4AF37", // Soft Gold
        lightbg: "#F8F9F5", // Light Warm Gray
        darkheading: "#1B4332",
        talentgray: "#4A4A4A",
        bodytext: "#4A4A4A",
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'premium': '0 10px 30px rgba(0, 0, 0, 0.08)',
      },
      fontSize: {
        '10': '10px',
        '12': '12px',
        '14': '14px',
        '16': '16px',
        '18': '18px',
        '20': '20px',
        '24': '24px',
        '28': '28px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '56': '56px',
        '64': '64px',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};