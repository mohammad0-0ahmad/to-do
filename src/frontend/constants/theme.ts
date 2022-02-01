import fonts from './fonts';
import { CustomPaletteColors } from './palettes';

export default {
    //@ts-ignore
    fonts: { ...fonts },
    typography: {
        fontFamily: fonts.family.primary,
    },
};

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
