import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      animation: {
        fade: "fadeIn 1.6s ease-in-out",
      },
      dropShadow: {
        "behind-dark": "0 -0.625rem .6rem rgba(40, 40, 40, 0.3)",
        "behind-light": "0.125rem -0.625rem .5rem rgba(19, 36, 61, 0.6)",
        "behind-white": "-2.8rem -4.5rem .5rem rgba(225, 225, 225, 1)",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
