// tailwind.config.js (PERBAIKAN FINAL)

// 1. Impor tema default menggunakan 'require'
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
// 2. Ekspor menggunakan 'module.exports'
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 3. PERBAIKAN: Ganti 'defaultTheme.font.sans' menjadi 'defaultTheme.fontFamily.sans'
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'chatalog-primary': 'var(--color-chatalog-primary)',
        'chatalog-secondary': 'var(--color-chatalog-secondary)',
        'text-dark': 'var(--color-text-dark)',
        'text-body': 'var(--color-text-body)',
        'background-light': 'var(--color-background-light)',
        'placeholder': 'var(--color-placeholder)',
      }
    },
  },
  plugins: [
    // 4. Impor plugin 'forms' menggunakan 'require'
    require('@tailwindcss/forms'),
  ],
}