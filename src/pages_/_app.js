import {useEffect} from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../client/constants/theme';
import '../client/base.css';
import { useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import AuthProvider from '../client/context/AuthProvider';

const MyApp = ({ Component, pageProps }) => {
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
        <AuthProvider>
            <ThemeProvider theme={{ ...activeTheme, togglePaletteType }}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </AuthProvider>
    );
};

export default MyApp;
