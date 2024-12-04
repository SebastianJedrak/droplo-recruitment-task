import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          50: '#F9FAFB',
          100: '#F5F5F5',
          200: '#EAECF0',
          300: '#D0D5DD',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
