const withTM = require("next-transpile-modules")([
  "@coderdojobraga/ui",
  "bokkenjs",
]);

module.exports = withTM({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: `${process.env.APP_URL}`,
        permanent: true,
      },
      {
        source: "/dashboard/:path*",
        destination: `${process.env.APP_URL}/:path*`,
        permanent: true,
      },
      {
        source: "/web",
        destination: `${process.env.WEB_URL}`,
        permanent: true,
      },
      {
        source: "/web/:path",
        destination: `${process.env.WEB_URL}/:path`,
        permanent: true,
      },
      {
        source: "/blog",
        destination: `${process.env.BLOG_URL}/`,
        permanent: true,
      },
      {
        source: "/blog/posts/:slug",
        destination: `${process.env.BLOG_URL}/posts/:slug`,
        permanent: true,
      },
    ];
  },
});
