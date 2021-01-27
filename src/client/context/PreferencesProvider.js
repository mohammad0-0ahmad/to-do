import { useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import { any } from 'prop-types';
import { createContext, useContext, useEffect } from 'react';

const PreferencesContext = createContext();
const PreferencesProvider = ({ children }) => {
    const {
        palette: { type: paletteType },
        setPaletteType,
    } = useTheme();
    const { push, pathname, asPath, locale, query } = useRouter();
    const { parse, stringify } = JSON;

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
        if (parsedPreferences.lang !== locale) {
            if (!parsedPreferences.lang) {
                localStorage.preferences = stringify({
                    ...parsedPreferences,
                    lang: locale,
                });
                parsedPreferences.lang = locale;
            } else {
                push({ pathname, query }, asPath, {
                    locale: parsedPreferences.lang,
                });
            }
        }
    }, []);

    return (
        <PreferencesContext.Provider value={{ updateLocalPreferences }}>
            {children}
        </PreferencesContext.Provider>
    );
};

PreferencesProvider.propTypes = { children: any };

export const usePreferences = () => useContext(PreferencesContext);

export default PreferencesProvider;
