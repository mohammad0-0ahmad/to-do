import { makeStyles, Switch, useTheme } from '@material-ui/core';
import Sun from '../Svg/Sun';
import Moon from '../Svg/Moon';
import { usePreferences } from '../../providers/PreferencesProvider';
import { bool, string } from 'prop-types';

const useStyles = makeStyles(
    ({ palette: { color1, color4, yellow, type } }) => ({
        ColorModeSwitch: {
            padding: 5,
            '& svg': {
                fontSize: 20,
                '&#Sun': {
                    color: ({ value }) => yellow[value || type],
                },
                '&#Moon': {
                    color: ({ value }) => color1[value || type],
                },
            },
            '& .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track': {
                backgroundColor: ({ value }) => color4[value || type],
            },
            '& .MuiTouchRipple-root': {
                color: 'currentColor',
            },
        },
        track: {
            borderRadius: 50,
            backgroundColor: ({ value }) => color4[value || type],
            opacity: 1,
            border: '1px solid currentColor',
        },
    })
);

const ColorModeSB = ({ storeInLocalStorage, value }) => {
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

ColorModeSB.propTypes = {
    storeInLocalStorage: bool,
    value: string,
};

export default ColorModeSB;
