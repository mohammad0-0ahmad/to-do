import { makeStyles, Switch, useTheme } from '@material-ui/core';
import Sun from '../Svg/Sun';
import Moon from '../Svg/Moon';
import { usePreferences } from '../../providers/PreferencesProvider';

const ColorModeSB: FC<ColorModeSBPropsType> = ({
    storeInLocalStorage,
    value,
}) => {
    const classes = useStyles({ value });
    const {
        setPaletteType,
        palette: { type },
    } = useTheme();
    const { updateLocalPreferences } = usePreferences();

    const handleTogglePaletteType = () => {
        const newPaletteType = type === 'light' ? 'dark' : 'light';
        setPaletteType(newPaletteType);
        storeInLocalStorage &&
            updateLocalPreferences({ paletteType: newPaletteType });
    };

    return (
        <Switch
            icon={<Sun />}
            checkedIcon={<Moon />}
            classes={{ root: classes.ColorModeSwitch, track: classes.track }}
            checked={value ? value === 'dark' : type === 'dark'}
            onClick={handleTogglePaletteType}
            color="primary"
        />
    );
};

export default ColorModeSB;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type ColorModeSBPropsType = {
    storeInLocalStorage?: boolean;
    value?: string;
};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(
    ({ palette: { color1, color4, yellow, type } }) => ({
        ColorModeSwitch: {
            padding: 5,
            '& svg': {
                fontSize: 20,
                '&#Sun': {
                    //@ts-ignore
                    color: ({ value }) => yellow[value || type],
                },
                '&#Moon': {
                    //@ts-ignore
                    color: ({ value }) => color1[value || type],
                },
            },
            '& .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track': {
                //@ts-ignore
                backgroundColor: ({ value }) => color4[value || type],
            },
            '& .MuiTouchRipple-root': {
                color: 'currentColor',
            },
        },
        track: {
            borderRadius: 50,
            //@ts-ignore
            backgroundColor: ({ value }) => color4[value || type],
            opacity: 1,
            border: '1px solid currentColor',
        },
    })
);
