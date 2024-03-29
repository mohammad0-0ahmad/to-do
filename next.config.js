const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
require('./globals')();

module.exports = withPWA({
    pwa: {
        dest: 'public',
        runtimeCaching,
        mode: 'production',
        disable:
            process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV_NATIVE === 'enabled',
    },
    plugins: [
        [
            'styled-components',
            { ssr: true, displayName: true, preprocess: false },
        ],
    ],
    eslint: {
        ignoreDuringBuilds: true,
    },
});
