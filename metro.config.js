// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

//module.exports = getDefaultConfig(__dirname);

module.exports = (async () => {
  const {
    resolver: { assetExts },
  } = await getDefaultConfig(__dirname);

  return {
    resolver: {
      assetExts: [
        ...assetExts,
        "obj",
        "mtl",
        "JPG",
        "vrx",
        "hdr",
        "gltf",
        "glb",
        "GLB",
        "bin",
        "arobject",
        "gif",
        "png",
      ],
    },
  };
})();