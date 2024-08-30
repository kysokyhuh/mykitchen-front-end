/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF5E4', 
        redorange: '#CD5C08',
        sage: '#C1D8C3', 
        darksage: '#6A9C89',
      },
      fontFamily: {
        cormorant: ["Cormorant Garamond", 'system-ui'],
        albert: ["Albert sans", 'system-ui'],
        literata: ["Literata", 'serif']
      },
    },
  },
  plugins: [],
}

