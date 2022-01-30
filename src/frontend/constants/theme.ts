import { createTheme } from '@material-ui/core';
import colors, { CustomPaletteType } from './palettes';
import fonts from './fonts';

export default createTheme({
    //@ts-ignore
    palette: { ...colors },
    fonts: { ...fonts },
    typography: {
        fontFamily: fonts.family.primary,
    },
});

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
//TODO: Refact type after migrating to v5
declare module '@material-ui/core/styles/createTheme' {
    interface Theme {
        setPaletteType: (any) => void;
        fonts:any
    }
}
declare module '@material-ui/core/styles/createPalette' {
    interface Palette extends CustomPaletteType {}
    // allow configuration using `createTheme`
    interface PaletteOptions extends CustomPaletteType {}
}
