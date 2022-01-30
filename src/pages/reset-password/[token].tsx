import { Grid, makeStyles, Typography } from '@material-ui/core';
import EntryForm from '../../frontend/components/Forms/EntryForm';
import Container from '../../frontend/components/Container';
import Logo from '../../frontend/components/Svg/Logo';
import Trans from '../../frontend/components/Trans';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { verifyPasswordResetCode } from '../../frontend/services/auth';
import withRedirectionManger from '../../frontend/HOCs/withRedirectionManger';
import { getServerSidePropsForNextTranslate } from '../../frontend/utilities';
export const getServerSideProps = getServerSidePropsForNextTranslate;

const useStyles = makeStyles(({ palette: { color1, color4, type } }) => ({
    gridContainer: {
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
    //TODO: Activate this page.
    Router.push('/404');
    useEffect(() => {
        verifyPasswordResetCode({
            code: Router.router.query.token,
        });
    }, []);

    return isValidToken ? (
        <Container pageContainer>
            <Grid
                container
                justifyContent="center"
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
