import { createContext, useContext, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import { isWeb } from 'frontend/constants/platform';
import { useLocale } from '@m0-0a/next-intl';

const PreferencesContext = createContext(null);

const PreferencesProvider: FC<PropsWithChildren> = ({ children }) => {
    useStyles();
    const {
        palette: { type: paletteType },
        setPaletteType,
    } = useTheme();
    const { parse, stringify } = JSON;
    const { lang, setLang } = useLocale();

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
        if (parsedPreferences.lang !== lang) {
            if (!parsedPreferences.lang) {
                localStorage.preferences = stringify({
                    ...parsedPreferences,
                    lang,
                });
            } else {
                setLang(parsedPreferences.lang);
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
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { primary } }) => ({
    '@global': {
        ':root': {},
        '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            userSelect: 'none',
            '-webkit-user-drag': 'none',
        },
        'html,body ': {
            width: '100%',
            height: '100%',
            '&::-webkit-scrollbar': {
                width: 16,
            },
            '&::-webkit-scrollbar-thumb': {
                borderRadius: 8,
                border: ' 4px solid transparent',
                backgroundClip: 'content-box',
                backgroundColor: '#aaaaaa',
                height: 56,
                '&:hover': {
                    backgroundColor: primary.main,
                },
            },
        },
        '#__next': {
            display: 'flex',
            flexFlow: 'column',
            minHeight: '100%',
        },
        form: {
            display: 'contents',
        },
        input: {
            userSelect: 'unset',
        },
    },
}));

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type UsePreferencesType = () => {
    updateLocalPreferences: updateLocalPreferencesType;
};

type updateLocalPreferencesType = (
    newPreferences: Partial<UserSchema['preferences']>
) => void;
