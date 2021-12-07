const nextTranslate = require('next-translate');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA(
    nextTranslate({
        pwa: {
            dest: 'public',
            runtimeCaching,
            mode: 'production',
            disable: process.env.NODE_ENV === 'development',
        },
        i18n: { localeDetection: false },
        plugins: [
            [
                'styled-components',
                { ssr: true, displayName: true, preprocess: false },
            ],
        ],
    })
);
