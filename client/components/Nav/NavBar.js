import Logo from "../Svg/Logo";
import Container from "../Container";
import { AppBar, Button, makeStyles } from "@material-ui/core";
import ColorModeSB from "../Inputs/ColorModeSB";

const useStyles = makeStyles(({ palette: { color3, color4, type } }) => ({
  NavBar: { backgroundColor: color4[type], padding: 5, height: 70 },
  logo: {
    fontSize: "3em",
    color: color3[type],
  },
}));
const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.NavBar}>
      <Container>
        <Button className={classes.logo}>
          <Logo />
        </Button>
        <ColorModeSB />
      </Container>
    </AppBar>
  );
};

export default NavBar;
