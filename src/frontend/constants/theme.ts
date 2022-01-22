import { createTheme } from '@material-ui/core';
import colors from './colors';
import fonts from './fonts';

export default createTheme({
    palette: { ...colors },
    fonts: { ...fonts },
    typography: {
        fontFamily: fonts.family.primary,
    },
});
