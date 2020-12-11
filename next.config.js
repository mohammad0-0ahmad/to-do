const { locales, defaultLocale } = require('./i18n.json');

module.exports = {
    i18n: { locales, defaultLocale },
<<<<<<< HEAD
    plugins: [
        [
            'styled-components',
            { ssr: true, displayName: true, preprocess: false },
        ],
=======
    'plugins': [
        ['styled-components', { 'ssr': true, 'displayName': true, 'preprocess': false } ]
>>>>>>> Create auth services instead of auth endpoints.
    ],
};
