import { useEffect, useState } from 'react';
import { Grid, Paper, Divider, makeStyles, useTheme } from '@material-ui/core';
import Button from '../Inputs/Button';
import TextField from '../Inputs/TextField';
import Trans from '../Trans';
import Link from '../Link';
import Router from 'next/router';
import {
    logIn,
    signUp,
    resetPasswordReq,
    confirmPasswordReset,
} from '../../services/auth';
import withSnackbarManager, {
    WithSnackbarManagerType,
} from '../../HOCs/withSnackbarManager';
import { ResponseStatus } from 'src/globalConstants';
import { useLocale } from '@m0-0a/next-intl';

const EntryForm = ({ variant = 'login', showSnackbar, ...props }) => {
    const classes = useStyles();
    const { lang } = useLocale();
    const routerPush = (href: string) => Router.push({ pathname: href });
    const {
        palette: { type: paletteType },
    } = useTheme();
    const [formValues, setFormValues] = useState(null);

    useEffect(() => {
        setFormValues((currentFromValues) => ({
            ...currentFromValues,
            preferences: {
                paletteType,
                lang,
            },
        }));
    }, [paletteType, lang]);

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
                {
                    const response = await signUp(formValues);
                    await showSnackbar(response);
                    if (response.status === 'success') {
                        routerPush('/');
                    }
                }
                break;
            case 'reset-password':
                showSnackbar(await resetPasswordReq(formValues));
                routerPush('/');
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
                                code: Router.router.query.token as string,
                            })
                        );
                    } else {
                        showSnackbar({
                            status: ResponseStatus.error,
                            code: 'auth/password-repetition-mismatch',
                        });
                    }
                }
                break;
        }
    };

    return (
        <Grid container item justifyContent="center" {...props}>
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
                                    backgroundColorVariant="secondary"
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
                                backgroundColorVariant="secondary"
                                type="submit"
                            >
                                <Trans id="EntryForm.signUp" />
                            </Button>
                        )}
                        {variant === 'reset-password' && (
                            <>
                                <Button
                                    backgroundColorVariant="secondary"
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
                                backgroundColorVariant="secondary"
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
                                backgroundColorVariant="primary"
                                onClick={() => routerPush('/signup')}
                            >
                                <Trans id="EntryForm.signUp" />
                            </Button>
                        )}
                        {variant === 'signup' && (
                            <Button
                                backgroundColorVariant="primary"
                                onClick={() => routerPush('/login')}
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

export default withSnackbarManager(EntryForm);

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export type EntryFormPropsType = WithSnackbarManagerType<{
    variant?: 'login' | 'signup' | 'reset-password' | 'new-password';
}>;
/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { primary, background, type } }) => ({
    EntryBox: {
        padding: 15,
        width: 400,
        backgroundColor: background.paper,
        marginBottom: 16,
    },
    form: {
        color: primary.main,
        '&>*': {
            margin: '10px 0',
        },
    },
    link: {
        color: primary.main,
    },
    divider: {
        margin: '20px 0!important',
        backgroundColor: type === 'dark' ? 'rgba(255, 255, 255, 0.2)' : '',
    },
}));
