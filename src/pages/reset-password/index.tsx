import Seo from 'frontend/components/Seo';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import EntryForm from 'frontend/components/Forms/EntryForm';
import Logo from 'frontend/components/Svg/Logo';
import Trans from 'frontend/components/Trans';
import withRedirectionManger from 'frontend/HOCs/withRedirectionManger';
import { useTranslation } from '@m0-0a/next-intl';

const ResetPassword = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <>
            <Seo title={t('resetPassword.seo.title')} />
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

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { primary, text } }) => ({
    gridContainer: {
        color: text.primary,
    },
    logo: { color: primary.main, fontSize: '5em', marginBottom: 30 },
    title: {
        marginBottom: 15,
    },
}));
