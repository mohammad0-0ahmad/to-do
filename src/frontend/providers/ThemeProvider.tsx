import { useEffect, useState } from 'react';
import { CssBaseline, PaletteType, ThemeOptions } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../constants/theme';
import palettes from '../constants/palettes';
import { createTheme } from '@material-ui/core';
import { useLocale } from '@m0-0a/next-intl';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import locales from 'frontend/constants/locales';

const ThemeProvider: FC<any> = ({ children }) => {
    const { lang } = useLocale();
    const [direction, setDirection] = useState('ltr');
    const jss = create({
        plugins: [
            ...jssPreset().plugins,
            direction === 'rtl' ? rtl() : undefined,
        ],
    });

    useEffect(() => {
        const dir = locales.find(({ id }) => id === lang)?.direction || 'ltr';
        setDirection(dir);
        document.body.setAttribute('dir', dir);
    }, [lang]);

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    const [paletteType, setPaletteType] = useState<PaletteType>('light');

    return (
        <StylesProvider jss={jss}>
            <MuiThemeProvider
                theme={createTheme({
                    ...theme,
                    palette: {
                        ...palettes[paletteType],
                        type: paletteType,
                    },
                    setPaletteType,
                    direction,
                } as ThemeOptions)}
            >
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </StylesProvider>
    );
};

export default ThemeProvider;
