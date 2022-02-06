import { createContext, useContext, useEffect } from 'react';
import { useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useLanguageQuery } from 'next-export-i18n';

const PreferencesContext = createContext(null);

const PreferencesProvider: FC<PropsWithChildren> = ({ children }) => {
    const [query] = useLanguageQuery();
    const {
        palette: { type: paletteType },
        setPaletteType,
    } = useTheme();
    const { push, pathname, asPath } = useRouter();
    const { parse, stringify } = JSON;
    const locale = query?.lang;

    const updateLocalPreferences = (newPreferences) => {
        localStorage.preferences = stringify({
            ...parse(localStorage.preferences),
            ...newPreferences,
        });
    };

    useEffect(() => {
        if (!localStorage.preferences) {
            localStorage.preferences = stringify({});
        }
        const parsedPreferences = parse(localStorage.preferences);
        // Load palette
        if (parsedPreferences.paletteType !== paletteType) {
            if (!parsedPreferences.paletteType) {
                localStorage.preferences = stringify({
                    ...parsedPreferences,
                    paletteType,
                });
                parsedPreferences.paletteType = paletteType;
            } else {
                setPaletteType(parsedPreferences.paletteType);
            }
        }
        // Load language
        if (parsedPreferences.lang !== locale) {
            if (!parsedPreferences.lang) {
                localStorage.preferences = stringify({
                    ...parsedPreferences,
                    lang: locale,
                });
                push({ pathname, query }, asPath);
            } else {
                push(
                    { pathname, query: { lang: parsedPreferences.lang } },
                    asPath
                );
            }
        }
    }, []);

    return (
        <PreferencesContext.Provider value={{ updateLocalPreferences }}>
            {children}
        </PreferencesContext.Provider>
    );
};

export const usePreferences: UsePreferencesType = () =>
    useContext(PreferencesContext);

export default PreferencesProvider;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type UsePreferencesType = () => {
    updateLocalPreferences: updateLocalPreferencesType;
};

type updateLocalPreferencesType = (
    newPreferences: Partial<UserSchema['preferences']>
) => void;
