import { Grid, makeStyles, Typography } from '@material-ui/core';
import EntryForm from '../../client/components/Forms/EntryForm';
import Container from '../../client/components/Container';
import Logo from '../../client/components/Svg/Logo';
import Trans from '../../client/components/Trans';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { verifyPasswordResetCode } from '../../client/services/auth';
import withRedirectionManger from '../../client/components/withRedirectionManger';
import { getServerSidePropsForNextTranslate } from '../client/utils';
export const getServerSideProps = getServerSidePropsForNextTranslate;

const useStyles = makeStyles(({ palette: { color1, color4, type } }) => ({
    gridContainer: {
        minHeight: '100vh',
        color: color1[type],
    },
    logo: { color: color4[type], fontSize: '5em', marginBottom: 30 },
    title: {
        marginBottom: 15,
    },
}));

const ResetPassword = () => {
    const classes = useStyles();
    const [isValidToken, setIsValidToken] = useState(false);

    useEffect(() => {
        verifyPasswordResetCode(
            {
                code: Router.router.query.token,
            },
            {
                onSuccess: () => setIsValidToken(true),
                onFail: () => Router.push('/'),
            }
        );
    }, []);

    return isValidToken ? (
        <Container pageContainer>
            <Grid
                container
                justify="center"
                alignItems="center"
                className={classes.gridContainer}
                direction="column"
            >
                <Grid item xs={12}>
                    <Logo className={classes.logo} />
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        component="h1"
                        variant="h5"
                        className={classes.title}
                    >
                        <Trans id="resetPassword.newPasswordTitle" />
                    </Typography>
                </Grid>
                <EntryForm variant="new-password" />
            </Grid>
        </Container>
    ) : (
        <div>loading..</div>
    );
};

export default withRedirectionManger(ResetPassword);
