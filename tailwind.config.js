/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // Lo que hace la sintaxis ** hace de que entre en cada carpeta para aplicar los estilos de este framework
    "./src//**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}