const { APP_URL } = process.env;

module.exports = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `/:path*`,
      },
      {
        source: "/app",
        destination: `${APP_URL}/blog`,
      },
      {
        source: "/app/:path*",
        destination: `${APP_URL}/blog/:path*`,
      },
    ];
  },
};
