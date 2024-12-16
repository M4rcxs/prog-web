/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/views/**/*.edge',  // Inclui todos os arquivos .edge na pasta views
    './resources/js/**/*.js',       // Inclui todos os arquivos .js na pasta js
    './resources/css/**/*.css'      // Inclui todos os arquivos .css na pasta css
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
