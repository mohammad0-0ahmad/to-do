import { useEffect, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../constants/theme';

const ThemeProvider: FC<any> = ({ children }) => {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    const [activeTheme, setActiveTheme] = useState({
        ...theme,
        palette: { ...theme.palette, type: 'light' },
    });

    const setPaletteType = (paletteType) => {
        setActiveTheme({
            ...theme,
            palette: {
                ...theme.palette,
                type: paletteType,
            },
        });
    };

    return (
        <MuiThemeProvider theme={{ ...activeTheme, setPaletteType }}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};

export default ThemeProvider;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
