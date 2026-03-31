/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",
    "./static/js/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-tertiary": "#3e2e00",
        "on-secondary-fixed-variant": "#474646",
        "primary-fixed-dim": "#00daf3",
        "primary-fixed": "#9cf0ff",
        "surface-container-lowest": "#0e0e0e",
        "on-tertiary-fixed": "#251a00",
        "inverse-primary": "#006875",
        "on-tertiary-fixed-variant": "#594400",
        "surface-container": "#201f1f",
        "error": "#ffb4ab",
        "on-primary-fixed-variant": "#004f58",
        "on-secondary-fixed": "#1c1b1b",
        "on-surface-variant": "#bac9cc",
        "error-container": "#93000a",
        "surface-container-high": "#2a2a2a",
        "secondary-fixed-dim": "#c8c6c5",
        "tertiary-fixed": "#ffdf96",
        "secondary": "#c8c6c5",
        "tertiary": "#ffeac0",
        "tertiary-container": "#fec931",
        "background": "#131313",
        "on-error-container": "#ffdad6",
        "surface-variant": "#353534",
        "surface-container-highest": "#353534",
        "on-primary": "#00363d",
        "surface-container-low": "#1c1b1b",
        "on-secondary": "#313030",
        "surface-dim": "#131313",
        "primary-container": "#00e5ff",
        "surface": "#131313",
        "secondary-fixed": "#e5e2e1",
        "inverse-surface": "#e5e2e1",
        "surface-tint": "#00daf3",
        "on-secondary-container": "#bab8b7",
        "tertiary-fixed-dim": "#f3bf26",
        "on-primary-fixed": "#001f24",
        "secondary-container": "#4a4949",
        "primary": "#c3f5ff",
        "on-background": "#e5e2e1",
        "outline": "#849396",
        "on-surface": "#e5e2e1",
        "surface-bright": "#3a3939",
        "inverse-on-surface": "#313030",
        "on-tertiary-container": "#6f5500",
        "outline-variant": "#3b494c",
        "on-error": "#690005",
        "on-primary-container": "#00626e"
      },
      fontFamily: {
        headline: ["Newsreader", "serif"],
        body: ["Inter", "sans-serif"],
        label: ["Space Grotesk", "monospace"]
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};