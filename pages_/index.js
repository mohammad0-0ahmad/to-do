import Seo from "../client/components/Seo";
import Container from "../client/components/Container";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import Logo from "../client/components/Svg/Logo";
import Trans from "../client/components/Trans";
import EntryForm from "../client/components/Forms/EntryForm";

const useStyles = makeStyles(({ palette: { color1, color4, type } }) => ({
  gridContainer: {
    height: "inherit",
    color: color1[type],
  },
  logo: { color: color4[type], fontSize: "5em", marginBottom: 30 },
}));
const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Seo title="Home" />
      <Container pageContainer>
        <Grid container alignItems="center" className={classes.gridContainer}>
          <Grid container item xs={12} md={6}>
            <Logo className={classes.logo} />
            <Typography variant="h4" component="h1">
              <Trans id="home.title" />
            </Typography>
            <Typography variant="subtitle1" component="h2">
              <Trans id="home.description" />
            </Typography>
          </Grid>
          <EntryForm xs={12} md={6} />
        </Grid>
      </Container>
    </>
  );
};

export default Home;
