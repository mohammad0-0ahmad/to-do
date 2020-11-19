import { Grid, Paper, Divider, makeStyles } from "@material-ui/core";
import Button from "../Inputs/Button";
import TextField from "../Inputs/TextField";

const useStyles = makeStyles(({ palette: { color3, color4, type } }) => ({
  EntryBox: {
    padding: 15,
    width: 400,
    "&>div>*": {
      margin: "10px 0",
    },
  },
  logInButton: {},
  divider: {
    margin: "20px 0!important",
  },
  logInButton: { backgroundColor: color3[type], color: color4[type] },
  signUpButton: { backgroundColor: color4[type], color: color3[type] },
}));
const EntryBox = (props) => {
  const classes = useStyles();

  return (
    <Grid container item {...props} justify="center">
      <Paper elevation={10} className={classes.EntryBox}>
        <Grid container direction="column">
          <TextField variant="outlined" label="Email" />
          <TextField variant="outlined" label="Password" />
          <Button className={classes.logInButton}>Log in</Button>
          <Divider className={classes.divider} />
          <Button className={classes.signUpButton}>Sign up</Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default EntryBox;
