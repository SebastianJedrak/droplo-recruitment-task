import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          50: '#F9FAFB',
          100: '#F5F5F5',
          200: '#EAECF0', 
          300: '#D0D5DD', 
          400: '#475467', 
          500: '#344054', 
          600: '#101828', 
        },
      },
      boxShadow: {
        'custom-shadow': '0px 1px 2px 0px #1018280D',
      },
    },
  },
  plugins: [],
} satisfies Config;
