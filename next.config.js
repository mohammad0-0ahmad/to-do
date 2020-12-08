const { locales, defaultLocale } = require('./i18n.json');

module.exports = {
    i18n: { locales, defaultLocale },
    'plugins': [
        ['styled-components', { 'ssr': true, 'displayName': true, 'preprocess': false } ]
    ]
};
