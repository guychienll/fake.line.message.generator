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
};

module.exports = nextConfig;
