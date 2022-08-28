const withTM = require("next-transpile-modules")([
  "@coderdojobraga/ui",
  "bokkenjs",
]);

module.exports = withTM({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "http://localhost:3002/dashboard/login",
      },
      {
        source: "/dashboard",
        destination: "http://localhost:3002/dashboard",
      },
      {
        source: "/dashboard/:path*",
        destination: "http://localhost:3002/dashboard/:path*",
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
