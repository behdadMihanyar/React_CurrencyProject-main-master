import scrollbarHide from "tailwind-scrollbar-hide"; // ES6 Import

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [scrollbarHide],
};
