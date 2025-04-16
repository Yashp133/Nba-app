// next.config.js

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.nba.com',
        port: '',
        pathname: '/**/*',
      },
    ],
  },
}


