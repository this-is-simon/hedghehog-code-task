/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: {
      displayName: process.env.NODE_ENV === "development",
      ssr: true,
      fileName: false,
      topLevelImportPaths: ["@emotion/react", "@emotion/styled"],
      cssProp: true,
      // Not supported yet.
      // minify?: boolean,
      // Not supported yet.
      // transpileTemplateLiterals?: boolean,
      // Not supported yet.
      // pure?: boolean,
    },
  },
  images: {
    domains: ["i.pravatar.cc"],
  },
  webpack(config) {
    config.resolve.fallback = { fs: false };

    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              memo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        removeViewBox: false,
                        convertColors: false,
                      },
                    },
                  },
                  "prefixIds",
                ],
              },
            },
          },
        ],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;

// module.exports = {
//   entry: './src/index.js',
//   module: {
//     rules: [
//       //...
//       {
//         test: /\.svg$/,
//         use: ['@svgr/webpack'],
//       },
//     ],
//   },
//   //...
// };
