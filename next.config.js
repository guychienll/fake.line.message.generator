const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack(config) {
        config.resolve.alias['@'] = path.resolve(__dirname, 'src/');
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'https://avatars.githubusercontent.com',
                port: '',
                pathname: 'u/**',
            },
        ],
    },
    i18n: {
        locales: ['en', 'zh-TW'],
        defaultLocale: 'en',
        localeDetection: false,
    },
};

module.exports = nextConfig;
