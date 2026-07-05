/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        sage: {
          500: "#5c8d89",
          700: "#3f625e",
          900: "#2f4a47",
        },
        ink: "#22332f",
        muted: "#5f7a75",
        cream: "#f4f9f4",
        mint: "#e6f4e6",
        line: "#e2ede9",
        accent: "#e07a5f",
      },
      fontFamily: {
        display: ["Bricolage Grotesque", "sans-serif"],
        body: ["Hanken Grotesk", "sans-serif"],
      },
      borderRadius: {
        lg: "20px",
        pill: "999px",
        btn: "13px",
        checkbox: "7px",
        thumb: "12px",
      },
      boxShadow: {
        card: "0 8px 22px -18px rgba(47,74,71,0.5)",
        hero: "0 24px 50px -22px rgba(47,74,71,0.4)",
      },
      maxWidth: {
        content: "1200px",
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};
