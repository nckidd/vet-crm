import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

/* mapping out base colors so that we can automatically set them to the opposite colors with shade mapping */
const baseColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];
/* mapping out opposite value for light v dark mode */
const shadeMapping = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};

/* function to generate colors based on theme value using shade mapping */
const generateThemeObject = (colors:any, mapping: any, invert = false) => {
  const theme: any = {};
  baseColors.forEach((color) => {
    theme[color] = {};
    Object.entries(mapping).forEach(([key,value]: any) => {
      const shadeKey = invert ? value : key; //inverting depending on whether we're in dark or light mode
      theme[color][key] = colors[color][shadeKey];
    });
  });
  return theme;
}

/* generating theme color object based on mode */
const lightTheme = generateThemeObject(colors, shadeMapping); 
const darkTheme = generateThemeObject(colors, shadeMapping, true);

/* adding a few extra colors */
const themes = {
  light: {
    ...lightTheme,
    white: "#ffffff"
  },
  dark: {
    ...darkTheme,
    white: colors.gray["950"],
    black: colors.gray["50"],
  }
}

const config: Config = {
  darkMode: "class", //provides dark mode class variable for tailwind config
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [createThemes(themes)], //passing in light and dark themes to tailwind
};
export default config;
