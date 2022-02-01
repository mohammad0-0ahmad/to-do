import { Grid, makeStyles, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import Button from 'frontend/components/Inputs/Button';
import SectionBase from 'frontend/components/SectionBase';
import Seo from 'frontend/components/Seo';
import Trans from 'frontend/components/Trans';
import { useRouter } from 'next/router';
import Logo from 'frontend/components/Svg/Logo';

const NotFound = () => {
    const classes = useStyles();
    const { t: tr } = useTranslation();
    const { back, replace } = useRouter();

    return (
        <>
            <Seo title={tr('common:404.seo.title')} />
            <SectionBase
                alignItems="center"
                justifyContent="center"
                className={classes.NotFound}
            >
                <Logo className={classes.logo} />
                <Typography
                    className={classes.text1}
                    component="p"
                    variant="h1"
                >
                    404
                </Typography>
                <Typography
                    className={classes.text2}
                    component="p"
                    variant="h6"
                >
                    <Trans id="404.label1" />
                </Typography>
                <Grid container justifyContent="space-between" item xs={8}>
                    <Button backgroundColorVariant="primary" onClick={back}>
                        <Trans id="404.label2" />
                    </Button>
                    <Button
                        backgroundColorVariant="primary"
                        onClick={() => replace('/')}
                    >
                        <Trans id="404.label3" />
                    </Button>
                </Grid>
            </SectionBase>
        </>
    );
};

export default NotFound;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(
    ({
        palette: { primary, text },
        fonts: {
            family: { secondary },
        },
    }) => ({
        NotFound: {
            color: text.secondary,
        },
        logo: {
            color: primary.main,
            fontSize: 30,
        },
        text1: {
            color: primary.main,
            fontFamily: secondary,
            marginTop: '0 !important',
            marginBottom: 32,
        },
        text2: {
            whiteSpace: 'pre-line',
            textAlign: 'center',
            marginBottom: 16,
        },
    })
);
