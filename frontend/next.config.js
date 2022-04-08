module.exports = {
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `http://localhost:5000/api/:path*`,
        },
      ],
    }
  },
}
