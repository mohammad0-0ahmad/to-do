const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
    pwa: {
        dest: 'public',
        runtimeCaching,
        mode: 'production',
        disable: process.env.NODE_ENV === 'development',
    },
    plugins: [
        [
            'styled-components',
            { ssr: true, displayName: true, preprocess: false },
        ],
    ],
});
