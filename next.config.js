/* eslint-disable @typescript-eslint/no-var-requires */
const { i18n } = require('./next-i18next.config');
const path = require('path');

module.exports = {
  i18n,
  output: 'standalone',
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    REACT_APP_CORE_URL: process.env.REACT_APP_CORE_URL,
  },
  images: {
    minimumCacheTTL: 60,
    domains: [],
  },
};
