var en = require('./en/common.json');
var sv = require('./sv/common.json');
var ar = require('./ar/common.json');
var de = require('./de/common.json');

const i18n = {
    translations: {
        en,
        sv,
        ar,
        de,
    },
    defaultLanguage: 'en',
};

module.exports = i18n;
