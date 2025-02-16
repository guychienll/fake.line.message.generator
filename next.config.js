const fs = require('fs');
const path = require('path');
const locales = require('./translation/resource');
const nextI18nextConfig = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack(config) {
        config.resolve.alias['@'] = path.resolve(__dirname, 'src/');

        Object.entries(locales).forEach(([lang, translations]) => {
            const dir = path.join(__dirname, 'public', 'locales', lang);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(
                path.join(dir, 'common.json'),
                JSON.stringify(translations.translation, null, 2)
            );
        });
        return config;
    },
    i18n: nextI18nextConfig.i18n,
};

module.exports = nextConfig;
