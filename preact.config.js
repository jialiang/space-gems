import svgToDataUri from "mini-svg-data-uri";

export default (config) => {
  config.output.publicPath = "./";

  // Inline CSS-referenced SVGs as data URIs instead of separate files
  const assetRule = config.module.rules.find((rule) => rule.test && rule.test.test(".svg"));
  assetRule.exclude = /\.svg$/i;

  config.module.rules.push({
    test: /\.svg$/i,
    loader: require.resolve("url-loader"),
    options: {
      generator: (content) => svgToDataUri(content.toString().replace(/>\s+</g, "><")),
    },
  });
};
