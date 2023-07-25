/** @type {import('tailwindcss').Config} */
import Home from "./src/assets/background.jpg";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: "'Roboto', sans-serif;",
      },
      backgroundImage: {
        home: "url(./src/assets/background.jpg)",
      },
    },
  },
  plugins: [],
};
