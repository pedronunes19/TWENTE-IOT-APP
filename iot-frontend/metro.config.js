const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = (() => {
  // Get the default configuration
  const config = getDefaultConfig(__dirname);
  
  // Apply NativeWind configuration
  return withNativeWind(config, { input: "./global.css" });
})();
