import Seo from "../client/components/Seo";
import Container from "../client/components/Container";
import {
  Grid,
  makeStyles,
  Slide,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Logo from "../client/components/Svg/Logo";
import Trans from "../client/components/Trans";
import EntryForm from "../client/components/Forms/EntryForm";

const useStyles = makeStyles(({ palette: { color1, color4, type } }) => ({
  gridContainer: {
    minHeight: "100vh",
    color: color1[type],
  },
  logo: { color: color4[type], fontSize: "5em", marginBottom: 30 },
}));
const Home = () => {
  const classes = useStyles();
  const { breakpoints } = useTheme();
  const smallScreen = useMediaQuery(breakpoints.down("xs"));

  return (
    <>
      <Seo title="Home" />
      <Container pageContainer>
        <Slide in timeout={{ enter: smallScreen ? 0 : 300 }}>
          <Grid container alignItems="center" className={classes.gridContainer}>
            <Grid
              container
              item
              xs={12}
              md={6}
              justify={smallScreen ? "center" : "flex-start"}
            >
              <Logo className={classes.logo} />
              <Typography variant={smallScreen ? "h5" : "h4"} component="h1">
                <Trans id="home.title" />
              </Typography>
              <Typography variant="subtitle1" component="h2">
                <Trans id="home.description" />
              </Typography>
            </Grid>
            <EntryForm xs={12} md={6} />
          </Grid>
        </Slide>
      </Container>
    </>
  );
};

export default Home;
