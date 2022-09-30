/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/core',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/timegrid',
  
])

module.exports = withTM({
  // any other general next.js settings
  reactStrictMode: true,
  swcMinify: true,
})


// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig


