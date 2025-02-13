/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
            colors: {
              pink: {
                light: '#FEBFC7',
                button: '#FFE5E6',
              },
              grey: {
                light: '#5F5B5B',
              }
            },
            fontFamily: {
              inter: ['Inter', 'sans-serif'],
              poppins: ['Poppins', 'sans-serif'],
            },
          },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), // Add this plugin
  ],
}

