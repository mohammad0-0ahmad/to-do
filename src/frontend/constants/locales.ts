import { LocaleVariant } from 'src/db_schemas';

export default [
    { id: LocaleVariant.en, label: 'English' },
    { id: LocaleVariant.sv, label: 'Svenska' },
    { id: LocaleVariant.ar, label: 'عربي', direction: 'rtl' },
    { id: LocaleVariant.de, label: 'Deutsch' },
];

declare module '@m0-0a/next-intl' {
    export interface NextIntlTypes {
        LocaleType: LocaleVariant;
    }
}
