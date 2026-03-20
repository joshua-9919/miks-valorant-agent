/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        valorant: {
          red: '#FF4655',
          dark: '#0F1923',
          light: '#ECE8E1',
          gray: '#8B929A',
        }
      },
    },
  },
  plugins: [],
}
