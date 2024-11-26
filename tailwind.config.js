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
            },
            fontFamily: {
              inter: ['Inter', 'sans-serif'],
              poppins: ['Poppins', 'sans-serif'],
            },
          },
  },
  plugins: [],
}

// export default {
//   content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
//   theme: {
//     extend: {
//       colors: {
//         pink: {
//           light: '#FEBFC7',
//           button: '#FFE5E6',
//         },
//       },
//       fontFamily: {
//         inter: ['Inter', 'sans-serif'],
//         poppins: ['Poppins', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// };

