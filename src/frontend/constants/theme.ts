import { Theme } from '@material-ui/core';
import fonts from './fonts';
import { CustomPaletteColors } from './palettes';

export default {
    fonts,
    typography: {
        fontFamily: fonts.family.primary,
        h6: {
            fontWeight: 600,
            letterSpacing: 0.3,
        },
    },
} as Theme;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
//TODO: Refact type after migrating to v5
declare module '@material-ui/core/styles/createTheme' {
    interface Theme {
        setPaletteType: (any) => void;
        fonts: any;
    }
}
declare module '@material-ui/core/styles/createPalette' {
    interface Palette extends CustomPaletteColors {}
    // allow configuration using `createTheme`
    interface PaletteOptions extends CustomPaletteColors {}
}
