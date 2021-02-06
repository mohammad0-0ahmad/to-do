import Seo from '../client/components/Seo';
import Container from '../client/components/Container';
import {
    Grid,
    makeStyles,
    Slide,
    Typography,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import Logo from '../client/components/Svg/Logo';
import Trans from '../client/components/Trans';
import EntryForm from '../client/components/Forms/EntryForm';
import useTranslation from 'next-translate/useTranslation';
import { useAuth } from '../client/context/AuthProvider';

const useStyles = makeStyles(({ palette: { color1, color4, type } }) => ({
    gridContainer: {
        minHeight: 'calc(100vh - 70px)',
        color: color1[type],
    },
    logo: { color: color4[type], fontSize: '5em', marginBottom: 30 },
    intro: { width: 'fit-content' },
}));
const Home = () => {
    const classes = useStyles();
    const { t: tr } = useTranslation();
    const { breakpoints } = useTheme();
    const smallScreen = useMediaQuery(breakpoints.down('sm'));
    const { isAuthenticated } = useAuth();

    return (
        <>
            <Seo title={tr('common:home.seo.title')} />
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
                                            justify={
                                                smallScreen
                                                    ? 'center'
                                                    : 'flex-start'
                                            }
                                        >
                                            <Logo className={classes.logo} />
                                        </Grid>
                                        <Grid
                                            container
                                            justify={
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
                                            justify={
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