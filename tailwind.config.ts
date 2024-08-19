import type { Config } from "tailwindcss";

const config: Config = {
  "content": [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  "theme": {
    "extend": {
      "fontFamily": {
        "sans": [
          "var(--font-sans)",
          "sans-serif"
        ]
      },
      "colors": {
        "background": "#FFFFFF",
        "foreground": "#000000",
        "neutral": {
          "50": "#fafafa",
          "100": "#f4f4f4",
          "200": "#e6e6e6",
          "300": "#d4d4d4",
          "400": "#a2a2a2",
          "500": "#727272",
          "600": "#535353",
          "700": "#404040",
          "800": "#272727",
          "900": "#181818"
        },
        "brand": {
          "50": "#f0fdfa",
          "100": "#ccfbf1",
          "200": "#99f6e4",
          "300": "#5eead4",
          "400": "#2dd4bf",
          "500": "#14b8a6",
          "600": "#0d9488",
          "700": "#0f766e",
          "800": "#115e59",
          "900": "#134e4a"
        },
        "highlight": {
          "50": "#ecfdf5",
          "100": "#d1fae5",
          "200": "#a7f3d0",
          "300": "#6ee7b7",
          "400": "#34d399",
          "500": "#10b981",
          "600": "#059669",
          "700": "#047857",
          "800": "#065f46",
          "900": "#064e3b"
        }
      },
      "borderRadius": {
        "sm": "0.0625rem",
        "default": "0.125rem",
        "md": "0.375rem",
        "lg": "0.5625rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem"
      },
      "keyframes": {
        "accordion-down": {
          "from": {
            "height": "0"
          },
          "to": {
            "height": "var(--radix-accordion-content-height)"
          }
        },
        "accordion-up": {
          "from": {
            "height": "var(--radix-accordion-content-height)"
          },
          "to": {
            "height": "0"
          }
        }
      },
      "animation": {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  "plugins": []
};

export default config;
