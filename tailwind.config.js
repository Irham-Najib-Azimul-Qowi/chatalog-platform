import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Atur 'Poppins' sebagai font 'sans' utama
      // (Kita tetap butuh Poppins di sini agar Tailwind tahu namanya)
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.font.sans],
      },
      // 2. Definisikan NAMA warna kita, tapi gunakan Variabel CSS
      colors: {
        'chatalog-primary': 'var(--color-chatalog-primary)',
        'chatalog-secondary': 'var(--color-chatalog-secondary)',
      }
    },
  },
  plugins: [],
}