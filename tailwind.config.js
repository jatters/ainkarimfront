const { addDynamicIconSelectors } = require('@iconify/tailwind');
import typography from '@tailwindcss/typography'
/** @type {import('tailwindcss').Config} */
module.exports = {
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
      colors:{
        '--light-green':'#00af50',
        '--dark-green':'#062f1d',
        '--light-red': '#cd181b',
        '--dark-red': '#94191a', 
        '--gray':"#f4f4f4",        
      }, 
      fontFamily: {
        montserrat: ['Montserrat  ', 'sans-serif'],
        marcellus: ['Marcellus', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Marcellus', 'serif'],
      },
    }
  },
  plugins: [
    typography,
    addDynamicIconSelectors(),
  ],
};
