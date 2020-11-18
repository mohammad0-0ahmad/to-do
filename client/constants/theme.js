import { createMuiTheme } from "@material-ui/core";
import colors from "./colors";
import fonts from "./fonts";

export default createMuiTheme({
  palette: { ...colors },
  fonts: { ...fonts },
  typography: {
    fontFamily: fonts.family.primary,
    fontSize: 16,
  },
});
