import { useState } from 'react';
import { Grid, Paper, Divider, makeStyles } from '@material-ui/core';
import Button from '../Inputs/Button';
import TextField from '../Inputs/TextField';
import Trans from '../Trans';
import Link from '../Link';
import { oneOf, func } from 'prop-types';
import Router from 'next/router';
import {
    logIn,
    signUp,
    resetPasswordReq,
    confirmPasswordReset,
} from '../../services/auth';
import withSnackbarManager from '../withSnackbarManager';

const useStyles = makeStyles(
    ({ palette: { color2, color3, color4, color5, type } }) => ({
        EntryBox: {
            padding: 15,
            width: 400,
            backgroundColor: color5[type],
        },
        form: {
            color: color4[type],
            '&>*': {
                margin: '10px 0',
            },
        },
        link: {
            color: color4[type],
        },
        divider: {
            margin: '20px 0!important',
            backgroundColor: type === 'dark' ? 'rgba(255, 255, 255, 0.2)' : '',
        },
        submitButton: { backgroundColor: color2[type], color: color4[type] },
        alternativeButton: {
            backgroundColor: color4[type],
            color: color3[type],
        },
    })
);

const EntryForm = ({ variant, showSnackbar, ...props }) => {
    const classes = useStyles();
    const [formValues, setFormValues] = useState({});

    const handleChange = ({ target: { name, value } }) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        switch (variant) {
            case 'login':
                showSnackbar(await logIn(formValues));

                break;
            case 'signup':
                showSnackbar(await signUp(formValues));
                break;
            case 'reset-password':
                showSnackbar(await resetPasswordReq(formValues));
                break;
            case 'new-password':
                {
                    if (
                        formValues.password ===
                        formValues['password-repetition']
                    ) {
                        showSnackbar(
                            await confirmPasswordReset({
                                newPassword: formValues.password,
                                code: Router.router.query.token,
                            })
                        );
                    } else {
                        showSnackbar({
                            status: 'error',
                            code: 'auth/password-repetition-mismatch',
                        });
                    }
                }
                break;
        }
    };

    return (
        <Grid container item justify="center" {...props}>
            <Paper elevation={4} className={classes.EntryBox}>
                <Grid container direction="column">
                    <form
                        className={classes.form}
                        method="post"
                        onSubmit={handleSubmit}
                    >
                        {/***************** Input fields *****************/}
                        {variant === 'signup' && (
                            <>
                                <TextField
                                    name="firstName"
                                    onChange={handleChange}
                                    variant="outlined"
                                    label={<Trans id="EntryForm.firstName" />}
                                    required
                                />
                                <TextField
                                    name="lastName"
                                    onChange={handleChange}
                                    variant="outlined"
                                    label={<Trans id="EntryForm.lastName" />}
                                    required
                                />
                            </>
                        )}
                        {variant !== 'new-password' && (
                            <TextField
                                name="email"
                                onChange={handleChange}
                                variant="outlined"
                                label={<Trans id="EntryForm.email" />}
                                required
                            />
                        )}
                        {variant !== 'reset-password' && (
                            <TextField
                                name="password"
                                variant="outlined"
                                onChange={handleChange}
                                type="password"
                                label={
                                    <Trans
                                        id={
                                            variant === 'new-password'
                                                ? 'EntryForm.newPassword'
                                                : 'EntryForm.password'
                                        }
                                    />
                                }
                                autoComplete="on"
                                required
                            />
                        )}
                        {variant === 'new-password' && (
                            <TextField
                                name="password-repetition"
                                variant="outlined"
                                onChange={handleChange}
                                type="password"
                                label={
                                    <Trans id="EntryForm.newPasswordRepetition" />
                                }
                                autoComplete="on"
                                required
                            />
                        )}
                        {/***************** Submit button *****************/}
                        {variant === 'login' && (
                            <>
                                <Button
                                    className={classes.submitButton}
                                    type="submit"
                                >
                                    <Trans id="EntryForm.logIn" />
                                </Button>
                                <Link
                                    href="/reset-password"
                                    className={classes.link}
                                >
                                    <Trans id="EntryForm.forgotPassword" />
                                </Link>
                            </>
                        )}
                        {variant === 'signup' && (
                            <Button
                                className={classes.submitButton}
                                type="submit"
                            >
                                <Trans id="EntryForm.signUp" />
                            </Button>
                        )}
                        {variant === 'reset-password' && (
                            <>
                                <Button
                                    className={classes.submitButton}
                                    type="submit"
                                >
                                    <Trans id="EntryForm.resetPassword" />
                                </Button>
                                <Link href="/login" className={classes.link}>
                                    <Trans id="EntryForm.tryToLogInAgain" />
                                </Link>
                            </>
                        )}
                        {variant === 'new-password' && (
                            <Button
                                className={classes.submitButton}
                                type="submit"
                            >
                                <Trans id="EntryForm.save" />
                            </Button>
                        )}
                        {variant !== 'new-password' && (
                            <Divider className={classes.divider} />
                        )}
                        {/***************** Alternative button *****************/}
                        {(variant === 'login' ||
                            variant === 'reset-password') && (
                            <Button
                                className={classes.alternativeButton}
                                onClick={() => Router.push('/signup')}
                            >
                                <Trans id="EntryForm.signUp" />
                            </Button>
                        )}
                        {variant === 'signup' && (
                            <Button
                                className={classes.alternativeButton}
                                onClick={() => Router.push('/login')}
                            >
                                <Trans id="EntryForm.haveAccount" />
                            </Button>
                        )}
                    </form>
                </Grid>
            </Paper>
        </Grid>
    );
};

EntryForm.propTypes = {
    variant: oneOf(['login', 'signup', 'reset-password', 'new-password']),
    showSnackbar: func.isRequired,
};

EntryForm.defaultProps = {
    variant: 'login',
};

export default withSnackbarManager(EntryForm);
