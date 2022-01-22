import { Grid, makeStyles, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import Button from '../client/components/Inputs/Button';
import SectionBase from '../client/components/SectionBase';
import Seo from '../client/components/Seo';
import Trans from '../client/components/Trans';
import { useRouter } from 'next/router';
import Logo from '../client/components/Svg/Logo';

const useStyles = makeStyles(
    ({
        palette: { color1, color4, type },
        fonts: {
            family: { secondary },
        },
    }) => ({
        NotFound: { color: color1[type] },
        logo: {
            color: color4[type],
            fontSize: 30,
        },
        text1: {
            color: color4[type],
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
                    <Button
                        backgroundColorVariant="color4"
                        colorVariant="color2"
                        onClick={back}
                    >
                        <Trans id="404.label2" />
                    </Button>
                    <Button
                        backgroundColorVariant="color4"
                        colorVariant="color2"
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
