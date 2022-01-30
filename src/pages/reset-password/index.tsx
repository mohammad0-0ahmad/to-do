import Seo from '../../frontend/components/Seo';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import EntryForm from '../../frontend/components/Forms/EntryForm';
import Logo from '../../frontend/components/Svg/Logo';
import useTranslation from 'next-translate/useTranslation';
import Trans from '../../frontend/components/Trans';
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
    const { t: tr } = useTranslation();

    return (
        <>
            <Seo title={tr('common:resetPassword.seo.title')} />
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
                        <Trans id="resetPassword.title" />
                    </Typography>
                </Grid>
                <EntryForm variant="reset-password" />
            </Grid>
        </>
    );
};

export default withRedirectionManger(ResetPassword);
