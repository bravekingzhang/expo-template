/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [],
}

//https://github.com/nativewind/nativewind/issues/803
// shadow-x-{n} and space-y-{n} not working 。注意，space 换成 gap