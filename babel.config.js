module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
      plugins: [
        // Add this line if it's not already there
        'react-native-reanimated/plugin',
        // ...other plugins
      ],
    };
  };