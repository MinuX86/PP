const { withTV } = require("tailwind-variants/transformer");

/** @type {import('tailwindcss').Config} */
module.exports = withTV({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      xs: "320px", // Extra Small devices (phones, portrait)
      sm: "576px", // Small devices (phones, landscape)
      md: "768px", // Medium devices (tablets)
      lg: "992px", // Large devices (desktops)
      xl: "1200px", // Extra Large devices (large desktops)
      "2xl": "1536px", // Extra Extra Large devices (larger desktops)
    },
  },
  plugins: [],
});
