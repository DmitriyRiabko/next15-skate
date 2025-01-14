import type { Config } from "tailwindcss";
import fluid, { extract, screens, fontSize, FluidThemeConfig } from 'fluid-tailwind'



export default {
  content: {
    files: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extract
  },
  theme: {
    screens,
    fontSize,
    extend: {
      fontFamily:{
        sans:['var(--font-bowlby-sc)'],
        mono:['var(--font-dm-mono)']
      },
      colors: {
        "brand-blue": "#4876ff",
        "brand-lime": "#d9f154",
        "brand-navy": "#2e3192",
        "brand-orange": "#ff7347",
        "brand-pink": "#f7d0e9",
        "brand-purple": "#692e54",
        "brand-gray": "#fffdf9",
      },
    },


    fluid: (({ theme }) => ({
      defaultScreens: ['20rem', theme('screens.lg')]
    })) satisfies FluidThemeConfig
  },
  plugins: [fluid],
} satisfies Config;
