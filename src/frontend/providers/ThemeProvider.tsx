import { useEffect, useState } from 'react';
import { CssBaseline, PaletteType, ThemeOptions } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../constants/theme';
import palettes from '../constants/palettes';
import { createTheme } from '@material-ui/core';

const ThemeProvider: FC<any> = ({ children }) => {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    const [paletteType, setPaletteType] = useState<PaletteType>('light');

    return (
        <MuiThemeProvider
            theme={createTheme({
                ...theme,
                palette: {
                    ...palettes[paletteType],
                    type: paletteType,
                },
                setPaletteType,
            } as ThemeOptions)}
        >
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};

export default ThemeProvider;
