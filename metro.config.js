const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// 👇 ESTA LÍNEA es la que resuelve el problema
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
