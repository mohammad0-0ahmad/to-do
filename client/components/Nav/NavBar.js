import Logo from "../Svg/Logo";
import Container from "../Container";
import { AppBar, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ palette: { color3, color4, type } }) => ({
  NavBar: { backgroundColor: color3[type] },
  logo: {
    fontSize: "3em",
    color: color4[type],
  },
}));
const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.NavBar}>
      <Container>
        <Button>
          <Logo className={classes.logo} />
        </Button>
      </Container>
    </AppBar>
  );
};

export default NavBar;
