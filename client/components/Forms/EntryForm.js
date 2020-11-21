import { Grid, Paper, Divider, makeStyles } from "@material-ui/core";
import Button from "../Inputs/Button";
import TextField from "../Inputs/TextField";
import Trans from "../Trans";
import Link from "../Link";
import ColorModeSwitch from "../Inputs/ColorModeSB";

const useStyles = makeStyles(
  ({ palette: { color2, color3, color4, color5, type } }) => ({
    EntryBox: {
      padding: 15,
      width: 400,
      backgroundColor: color5[type],
    },
    form: {
      "&>*": {
        margin: "10px 0",
      },
    },
    inputField: {
      color: color4[type],
    },
    link: {
      color: color4[type],
    },
    divider: {
      margin: "20px 0!important",
    },
    logInButton: { backgroundColor: color2[type], color: color4[type] },
    signUpButton: { backgroundColor: color4[type], color: color3[type] },
  })
);
const EntryBox = (props) => {
  const classes = useStyles();

  return (
    <Grid container item justify="center" {...props}>
      <Paper elevation={10} className={classes.EntryBox}>
        <Grid container direction="column">
          <form className={classes.form} method="post">
            <TextField
              variant="outlined"
              label={<Trans id="EntryForm.input1" />}
              className={classes.inputField}
            />
            <TextField
              variant="outlined"
              type="password"
              label={<Trans id="EntryForm.input2" />}
              className={classes.inputField}
              autoComplete="on"
            />
            <Button className={classes.logInButton} type="submit">
              {<Trans id="EntryForm.button1" />}
            </Button>
            <Link href="/reset-password" className={classes.link}>
              {<Trans id="EntryForm.link" />}
            </Link>
            <Divider className={classes.divider} />
            <Button className={classes.signUpButton}>
              {<Trans id="EntryForm.button2" />}
            </Button>
            {/*TODO:Replace ColorModeSwitch */}
            <ColorModeSwitch />
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default EntryBox;
