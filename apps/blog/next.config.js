const withTM = require("next-transpile-modules")([
  "@coderdojobraga/ui",
  "bokkenjs",
]);

module.exports = withTM({
  reactStrictMode: true,
  basePath: "/blog",
  env: {
    BASE_URL: process.env.BASE_URL,
  }
});
