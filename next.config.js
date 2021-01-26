const nextTranslate = require('next-translate');

module.exports = nextTranslate({
    i18n: { localeDetection: false },
    plugins: [
        [
            'styled-components',
            { ssr: true, displayName: true, preprocess: false },
        ],
    ],
});
