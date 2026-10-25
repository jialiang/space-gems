export default {
  multipass: true,
  floatPrecision: 2,
  js2svg: { pretty: true },
  plugins: [
    {
      name: "preset-default",
      params: { overrides: { convertTransform: { transformPrecision: 2 } } },
    },
    "cleanupListOfValues",
    "convertStyleToAttrs",
  ],
};
