import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#e31c23", // قرمز اصلی اینترپید
          gray: "#222222", // رنگ متن مشکی
          cream: "#f4f1eb", // رنگ پس‌زمینه کرم که در سایت هست
        },
      },
    },
  },
  plugins: [],
};
export default config;
