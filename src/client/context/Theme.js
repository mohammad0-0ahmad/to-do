import { useEffect, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../constants/theme';

const Theme = ({ children }) => {
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

    const togglePaletteType = () => {
        setActiveTheme({
            ...theme,
            palette: {
                ...theme.palette,
                type: activeTheme.palette.type === 'light' ? 'dark' : 'light',
            },
        });
    };

    return (
        <ThemeProvider theme={{ ...activeTheme, togglePaletteType }}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default Theme;
