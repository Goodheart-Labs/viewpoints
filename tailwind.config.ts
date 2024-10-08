import type { Config } from "tailwindcss";

const orange = {
  DEFAULT: "#fd7e04",
  50: "#fef7ed",
  100: "#fff0d7",
  200: "#ffdcac",
  300: "#fec176",
  400: "#fd9b3a",
  500: "#fd7e04",
  600: "#ea6400",
  700: "#c04a00",
  800: "#9a3700",
  900: "#7b2f06",
};
const purple = {
  DEFAULT: "#9b80b8",
  50: "#f7f2fe",
  100: "#e9e1f2",
  200: "#d5c9e5",
  300: "#baa6d1",
  400: "#9b80b8",
  500: "#885db4",
  600: "#7f44b3",
  700: "#7531ae",
  800: "#67219d",
  900: "#5b138a",
};
const teal = {
  DEFAULT: "#71d6bf",
  50: "#f0fdf9",
  100: "#d2fdf0",
  200: "#abf8e3",
  300: "#87ecd3",
  400: "#71d6bf",
  500: "#55b9a4",
  600: "#3c9585",
  700: "#29776b",
  800: "#1c5e56",
  900: "#154e47",
};
const red = {
  DEFAULT: "#e76f51",
  50: "#fef2f0",
  100: "#fadfda",
  200: "#f6c5bc",
  300: "#f0a08f",
  400: "#e76f51",
  500: "#e14905",
  600: "#c54400",
  700: "#a63900",
  800: "#8e2e00",
  900: "#7c2500",
};

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      colors: {
        background: "#fafcff",
        foreground: "#141b1f",
        neutral: {
          50: "#f8fafd",
          100: "#f3f6f9",
          200: "#e5e9ec",
          300: "#d3d8dc",
          400: "#a2a7ab",
          500: "#71767a",
          600: "#51575b",
          700: "#3d4448",
          800: "#242a2e",
          900: "#141b1f",
          950: "#0a0d10",
        },
        brand: orange,
        highlight: purple,
        orange,
        purple,
        red,
        teal,
      },
      borderRadius: {
        sm: "0.0625rem",
        default: "0.125rem",
        md: "0.375rem",
        lg: "0.5625rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
