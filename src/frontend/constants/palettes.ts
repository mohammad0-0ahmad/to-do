import { PaletteOptions } from '@material-ui/core/styles/createPalette';

export const light: PaletteOptions = {
    primary: {
        main: '#559cad',
        contrastText: '#f3f3f3',
    },
    secondary: { main: '#f3f3f3', contrastText: '#559cad' },
    success: { main: '#17d173', contrastText: '#f3f3f3' },
    warning: { main: '#FFDE69', contrastText: '#f3f3f3' },
    error: { main: '#f07373', contrastText: '#f3f3f3' },
    background: { default: '#f3f3f3', paper: '#ffffff' },
    text: { primary: '#202040', secondary: '#f3f3f3' },
    common: { white: '#f3f3f3' },
    transparent: 'rgba(0, 0, 0, 0.54)',
    type: 'light',
};

export const dark: PaletteOptions = {
    primary: {
        main: '#1F84D3',
        contrastText: '#202040',
    },
    secondary: { main: '#171728', contrastText: '#1F84D3' },
    success: { main: '#0dd165', contrastText: '#202040' },
    warning: { main: '#FFD369', contrastText: '#202040' },
    error: { main: '#D13030', contrastText: '#202040' },
    background: { default: '#171728', paper: '#202040' },
    text: { primary: '#f3f3f3', secondary: '#171728' },
    common: { white: '#f3f3f3' },
    transparent: 'rgba(255, 255, 255, 0.70)',
    type: 'dark',
};

export default { light, dark };

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type CustomPaletteColors = {
    transparent?: string;
};
