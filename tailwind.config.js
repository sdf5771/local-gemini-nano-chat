/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
          "pop-blob": {
          "0%": { transform: "scale(1)" },
          "33%": { transform: "scale(1.2)" },
          "66%": { transform: "scale(0.8)" },
          "100%": { transform: "scale(1)" },
          "bg-position": {
            "0%": { backgroundPosition: "0% 50%" },
            "100%": { backgroundPosition: "100% 50%" },
          },
          sparkle: {
            "0%, 100%": { opacity: "0.75", scale: "0.9" },
            "50%": { opacity: "1", scale: "1" },
          },
  
        },
        colors: {
          filter: {
         "blur-20": "blur(20px)",
         "blur-25": "blur(25px)",
          },
        },
      animation: {
        "pop-blob": "pop-blob 5s infinite",
        "bg-position": "bg-position 3s infinite alternate",
        "sparkle": "sparkle 2s ease-in-out infinite",
      }
    },
   },
  },
  plugins: [],
} 