import { useState } from "react";
import { Grid, Paper, Divider, makeStyles } from "@material-ui/core";
import Button from "../Inputs/Button";
import TextField from "../Inputs/TextField";
import Trans from "../Trans";
import Link from "../Link";
import ColorModeSwitch from "../Inputs/ColorModeSB";
import { oneOf } from "prop-types";
import Router from "next/router";

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
      backgroundColor: type === "dark" ? "rgba(255, 255, 255, 0.2)" : "",
    },
    submitButton: { backgroundColor: color2[type], color: color4[type] },
    alternativeButton: { backgroundColor: color4[type], color: color3[type] },
  })
);
const EntryForm = ({ variant, ...props }) => {
  const [formValues, setFormValues] = useState({});
  const classes = useStyles();

  const handleChange = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Grid container item justify="center" {...props}>
      <Paper elevation={10} className={classes.EntryBox}>
        <Grid container direction="column">
          <form className={classes.form} method="post" onSubmit={handleSubmit}>
            {variant === "signup" && (
              <>
                <TextField
                  name="firstName"
                  onChange={handleChange}
                  variant="outlined"
                  label={<Trans id="EntryForm.firstName" />}
                  className={classes.inputField}
                  required
                />
                <TextField
                  name="lastName"
                  onChange={handleChange}
                  variant="outlined"
                  label={<Trans id="EntryForm.lastName" />}
                  className={classes.inputField}
                  required
                />
              </>
            )}
            <TextField
              name="email"
              onChange={handleChange}
              variant="outlined"
              label={<Trans id="EntryForm.email" />}
              className={classes.inputField}
              required
            />
            {variant !== "reset-password" && (
              <TextField
                name="password"
                variant="outlined"
                onChange={handleChange}
                type="password"
                label={<Trans id="EntryForm.password" />}
                className={classes.inputField}
                autoComplete="on"
                required
              />
            )}
            {variant === "login" && (
              <>
                <Button className={classes.submitButton} type="submit">
                  <Trans id="EntryForm.logIn" />
                </Button>
                <Link href="/reset-password" className={classes.link}>
                  <Trans id="EntryForm.forgotPassword" />
                </Link>
              </>
            )}
            {variant === "signup" && (
              <Button className={classes.submitButton} type="submit">
                <Trans id="EntryForm.signUp" />
              </Button>
            )}
            {variant === "reset-password" && (
              <>
                <Button className={classes.submitButton} type="submit">
                  <Trans id="EntryForm.resetPassword" />
                </Button>
                <Link href="/login" className={classes.link}>
                  <Trans id="EntryForm.tryToLogInAgain" />
                </Link>
              </>
            )}
            <Divider className={classes.divider} />
            {variant !== "signup" && (
              <Button
                className={classes.alternativeButton}
                onClick={() => Router.push("/signup")}
              >
                <Trans id="EntryForm.signUp" />
              </Button>
            )}
            {variant === "signup" && (
              <Button
                className={classes.alternativeButton}
                onClick={() => Router.push("/login")}
              >
                <Trans id="EntryForm.haveAccount" />
              </Button>
            )}
            {/*TODO:Replace ColorModeSwitch */}
            <ColorModeSwitch />
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

EntryForm.propTypes = {
  variant: oneOf(["login", "signup", "reset-password"]),
};

EntryForm.defaultProps = {
  variant: "login",
};

export default EntryForm;
