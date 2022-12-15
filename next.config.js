/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "abstracts/_mixins.scss";`,
  },
};

module.exports = nextConfig;
