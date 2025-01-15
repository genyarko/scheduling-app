/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the src folder
    "./public/index.html",        // Include your main HTML file
  ],
  theme: {
    extend: {
      // Add any custom styles or configurations here
      colors: {
        primary: "#1E40AF", // Example: Define a custom primary color
        secondary: "#64748B",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // Example: Plugin for better form styling
    require("@tailwindcss/typography"), // Example: Plugin for rich text styling
  ],
};

