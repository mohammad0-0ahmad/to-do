import Seo from 'frontend/components/Seo';
import Container from 'frontend/components/Container';
import {
    Grid,
    makeStyles,
    Slide,
    Typography,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import Logo from 'frontend/components/Svg/Logo';
import EntryForm from 'frontend/components/Forms/EntryForm';
import { useAuth } from 'frontend/providers/AuthProvider';
import { useTranslation } from '@m0-0a/next-intl';
import Trans from 'frontend/components/Trans';

const Home = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { breakpoints } = useTheme();
    const smallScreen = useMediaQuery(breakpoints.down('sm'));
    const { isAuthenticated } = useAuth();

    return (
        <>
            <Seo title={t('home.seo.title')} />
            {/* Hint: if a user is authenticated UserLayout component will be the responsible to render the content */}
            {!isAuthenticated && (
                <>
                    <Container pageContainer>
                        <Slide in timeout={{ enter: smallScreen ? 0 : 300 }}>
                            <Grid
                                container
                                alignItems="center"
                                className={classes.gridContainer}
                            >
                                <Grid
                                    container
                                    direction="column"
                                    item
                                    xs={12}
                                    md={6}
                                    alignItems="center"
                                >
                                    <Grid
                                        container
                                        direction="column"
                                        item
                                        className={classes.intro}
                                    >
                                        <Grid
                                            container
                                            justifyContent={
                                                smallScreen
                                                    ? 'center'
                                                    : 'flex-start'
                                            }
                                        >
                                            <Logo className={classes.logo} />
                                        </Grid>
                                        <Grid
                                            container
                                            justifyContent={
                                                smallScreen
                                                    ? 'center'
                                                    : 'flex-start'
                                            }
                                        >
                                            <Typography
                                                variant={
                                                    smallScreen ? 'h5' : 'h4'
                                                }
                                                component="h1"
                                            >
                                                <Trans id="home.title" />
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            container
                                            justifyContent={
                                                smallScreen
                                                    ? 'center'
                                                    : 'flex-start'
                                            }
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                component="h2"
                                            >
                                                <Trans id="home.description" />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <EntryForm xs={12} md={6} />
                            </Grid>
                        </Slide>
                    </Container>
                </>
            )}
        </>
    );
};

export default Home;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { primary, text } }) => ({
    gridContainer: {
        minHeight: 'calc(100vh - 70px)',
        color: text.primary,
    },
    logo: { color: primary.main, fontSize: '5em', marginBottom: 30 },
    intro: { width: 'fit-content' },
}));
