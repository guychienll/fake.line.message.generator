const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack(config) {
        config.resolve.alias['@'] = path.resolve(__dirname, 'src/');
        return config;
    },
    i18n: {
        locales: ['en', 'zh-TW'],
        defaultLocale: 'en',
        localeDetection: false,
    },
};

module.exports = nextConfig;
