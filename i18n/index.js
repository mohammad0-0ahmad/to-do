var en = require('./en/common.json');
var sv = require('./sv/common.json');

const i18n = {
    translations: {
        en,
        sv,
    },
    defaultLang: 'en',
    useBrowserDefault: true,
};

module.exports = i18n;
