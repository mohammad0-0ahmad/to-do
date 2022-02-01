import Seo from '../frontend/components/Seo';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import EntryForm from '../frontend/components/Forms/EntryForm';
import Container from '../frontend/components/Container';
import Logo from '../frontend/components/Svg/Logo';
import useTranslation from 'next-translate/useTranslation';
import Trans from '../frontend/components/Trans';
import withRedirectionManger from '../frontend/HOCs/withRedirectionManger';
import { getServerSidePropsForNextTranslate } from '../frontend/utilities';
export const getServerSideProps = getServerSidePropsForNextTranslate;

const SignUp = () => {
    const classes = useStyles();
    const { t: tr } = useTranslation();

    return (
        <>
            <Seo title={tr('common:signUp.seo.title')} />
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
                            <Trans id="signUp.title" />
                        </Typography>
                    </Grid>
                    <EntryForm variant="signup" />
                </Grid>
            </Container>
        </>
    );
};

export default withRedirectionManger(SignUp);

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { primary, text } }) => ({
    gridContainer: {
        color: text.primary,
    },
    logo: {
        color: primary.main,
        fontSize: '5em',
        marginBottom: 30,
        marginTop: 16,
    },
    title: {
        marginBottom: 15,
    },
}));
