import Seo from '../client/components/Seo';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import EntryForm from '../client/components/Forms/EntryForm';
import Container from '../client/components/Container';
import Logo from '../client/components/Svg/Logo';
import useTranslation from 'next-translate/useTranslation';
import Trans from '../client/components/Trans';

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

const SignUp = () => {
    const classes = useStyles();
    const { t: tr } = useTranslation();

    return (
        <>
            <Seo title={tr('common:signUp.seo.title')} />
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
                            <Trans id="signUp.title" />
                        </Typography>
                    </Grid>
                    <EntryForm variant="signup" />
                </Grid>
            </Container>
        </>
    );
};

export default SignUp;
