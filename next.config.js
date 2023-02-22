/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/core',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/timegrid',
  '@fullcalendar/interaction'
])

module.exports = withTM({
  // any other general next.js settings
  reactStrictMode: false,
  swcMinify: true,
  eslint: { ignoreDuringBuilds: true },
  images:{
    domains:['cloudflare-ipfs.com']
  }
})


