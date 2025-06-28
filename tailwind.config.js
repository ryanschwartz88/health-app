/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          primary: '#000000',
        },
        fontFamily: {
          // Define font families for use with className="font-light", etc.
          'Outfit-Light': ['Outfit-Light'],
          'Outfit-Regular': ['Outfit-Regular'],
          'Outfit-Medium': ['Outfit-Medium'],
          'Outfit-SemiBold': ['Outfit-SemiBold'],
          'Outfit-Bold': ['Outfit-Bold'],
          'caslon-regular': ['caslon-regular'],
          'caslon-italic': ['caslon-italic'],
          'caslon-bold': ['caslon-bold'],
          'caslon-medium': ['caslon-medium'],
          'caslon-medium-italic': ['caslon-medium-italic'],
          'caslon-semibold': ['caslon-semibold'],
          'caslon-semibold-italic': ['caslon-semibold-italic'],
        },
      },
    },
    plugins: [],
  }