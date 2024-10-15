/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", // Incluir el archivo principal si existe
    "./app/**/*.{js,jsx,ts,tsx}", // Todas las rutas dentro de la carpeta "app"
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}", // Si utilizas clases Tailwind dentro de hooks
    "./services/**/*.{js,jsx,ts,tsx}", // Si usas Tailwind en servicios
    "./store/**/*.{js,jsx,ts,tsx}", // En caso de tener clases Tailwind dentro de la store
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
