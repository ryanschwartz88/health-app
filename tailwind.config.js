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
          'sans': ['Outfit-Regular'],
          'light': ['Outfit-Light'],
          'regular': ['Outfit-Regular'],
          'medium': ['Outfit-Medium'],
          'semibold': ['Outfit-SemiBold'],
          'bold': ['Outfit-Bold'],
          'caslon-regular': ['LibreCaslonText_400Regular'],
          'caslon-italic': ['LibreCaslonText_400Regular_Italic'],
          'caslon-bold': ['LibreCaslonText_700Bold'],
          'caslon-medium': ['LibreCaslonText-Medium'],
          'caslon-medium-italic': ['LibreCaslonText-MediumItalic'],
          'caslon-semibold': ['LibreCaslonText-Semibold'],
          'caslon-semibold-italic': ['LibreCaslonText-SemiboldItalic'],
        },
      },
    },
    plugins: [],
  }