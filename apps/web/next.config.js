const withTM = require("next-transpile-modules")([
  "@coderdojobraga/ui",
  "bokkenjs",
]);

module.exports = withTM({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/app",
        destination: "http://localhost:3002/app",
      },
      {
        source: "/app/:path*",
        destination: "http://localhost:3002/app/:path*",
      },
      {
        source: "/blog",
        destination: "http://localhost:3001/blog",
      },
      {
        source: "/blog/:path*",
        destination: "http://localhost:3001/blog/:path*",
      },
    ];
  },
});
