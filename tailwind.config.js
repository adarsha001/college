module.exports = {
  content: [
    './index.html',                   // Include the root index.html
    './src/**/*.{js,jsx,ts,tsx}',     // Include all files within src folder
    './components/**/*.{js,jsx}',     // If components are outside src folder
    './pages/**/*.{js,jsx}',          // If pages are outside src folder
    './*/*.{js,jsx,ts,tsx}',           // Any other folders outside src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
