import { makeStyles, Switch, useTheme } from "@material-ui/core";
import Sun from "../Svg/Sun";
import Moon from "../Svg/Moon";

const useStyles = makeStyles(
  ({ palette: { color1, color2, color4, yellow, type } }) => ({
    ColorModeSwitch: {
      padding: 5,
      "& svg": {
        fontSize: 20,
        "&#Sun": {
          color: yellow[type],
        },
        "&#Moon": {
          color: color1[type],
        },
      },
      "& .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track": {
        backgroundColor: color2[type],
      },
      "& .MuiTouchRipple-root": {
        color: "currentColor",
      },
    },
    track: {
      borderRadius: 50,
      backgroundColor: color4[type],
      opacity: 1,
    },
  })
);

const ColorModeSB = () => {
  const classes = useStyles();
  const {
    togglePaletteType,
    palette: { type },
  } = useTheme();

  return (
    <Switch
      icon={<Sun />}
      checkedIcon={<Moon />}
      classes={{ root: classes.ColorModeSwitch, track: classes.track }}
      checked={type === "dark"}
      onClick={togglePaletteType}
      color="primary"
    />
  );
};

export default ColorModeSB;
