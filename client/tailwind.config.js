/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', 
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        prime: '#ffde00',
        second: '#9200ff',
        light: '#e0e0e0',
        dark: '#070707',

        weak: '#999999',
        low: '#008000',
        medium: '#ffa500',
        high: '#dc143c',
      },
      fontFamily: {
        main: ['Josefin Sans', 'Helvetica', 'Arial', 'sans-serif'],
      },
      screens: {
        'sc-sm': '300px',
        'sc-mid': '480px',
        'sc-tablet': '768px',
        'sc-laptop': '1024px',
        'sc-desktop': '1280px',
      },
    },
  },
  plugins: [],
};
