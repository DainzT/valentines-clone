import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        loker: ['Loker', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
