const path = require('path');
const locales = require('./translation/resource');

module.exports = {
    i18n: {
        defaultLocale: 'zh-TW',
        locales: Object.keys(locales),
    },
    localePath: path.resolve('./public/locales'),
    defaultNS: 'common',
};
