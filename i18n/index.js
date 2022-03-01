const en = require('./en/common.json');
const sv = require('./sv/common.json');
const ar = require('./ar/common.json');
const de = require('./de/common.json');

const i18n = {
    locales: {
        en,
        sv,
        ar,
        de,
    },
    defaultLocale: 'en',
};

exports.default = i18n;
