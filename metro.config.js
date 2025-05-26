const { withNativeWind } = require('nativewind/metro');
const { getDefaultConfig } = require("expo/metro-config");

// Create a function that sets up the config
const configureMetro = () => {
  const config = getDefaultConfig(__dirname);
  const { transformer, resolver } = config;

  // Add SVG transformer configuration
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo")
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"]
  };

  return config;
};

// Apply both configurations: first set up the base config, then apply NativeWind
module.exports = withNativeWind(configureMetro(), { input: './global.css' });