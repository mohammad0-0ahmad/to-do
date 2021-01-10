import Nav from './Nav';
import FriendsSection from './Sections/FriendsSection';
import MainSection from './Sections/MainSection';
import PeopleSection from './Sections/PeopleSection';
import I18nProvider from 'next-translate/I18nProvider';
import { any, object, string } from 'prop-types';
import { useMediaQuery, useTheme, Grid } from '@material-ui/core';
import Container from './Container';
import Router from 'next/router';
import { isItLayoutBased } from '../utils';

const Layout = ({ children, _ns, _lang }) => {
    const currentRoute = Router.route;
    const primarySection = () => {
        switch (currentRoute) {
            case '/':
                return <MainSection />;
            case '/friends':
                return <FriendsSection />;
            case '/people':
                return <PeopleSection />;
            default:
                return children;
        }
    };
    const {
        breakpoints: { up },
    } = useTheme();
    const twoSections = useMediaQuery(up(900));
    const threeSections = useMediaQuery(up(1300));

    const amountVisibleSections = threeSections ? 3 : twoSections ? 2 : 1;

    const SectionWrapper = (props) => (
        <Grid item xs={12 / amountVisibleSections} {...props} />
    );

    const visibleSections = () => {
        if (amountVisibleSections === 1) {
            return [primarySection()];
        }
        if (amountVisibleSections === 2) {
            if (currentRoute === '/' || currentRoute === '/friends') {
                return [<MainSection />, <FriendsSection />];
            } else if (currentRoute === '/people') {
                [<MainSection />, <PeopleSection />];
            } else {
                [<MainSection />, children];
            }
        }
        if (amountVisibleSections === 3) {
            return currentRoute === '/' ||
                currentRoute === '/friends' ||
                currentRoute === '/people'
                ? [<FriendsSection />, <MainSection />, <PeopleSection />]
                : [<FriendsSection />, <MainSection />, children];
        }
    };
    return (
        <I18nProvider lang={_lang} namespaces={_ns}>
            <Nav />
            <Container pageContainer upperPadding>
                {isItLayoutBased() ? (
                    <Grid container spacing={4}>
                        {visibleSections().map((section, i) => (
                            <SectionWrapper key={i}>{section}</SectionWrapper>
                        ))}
                    </Grid>
                ) : (
                    children
                )}
            </Container>
        </I18nProvider>
    );
};

Layout.propTypes = {
    children: any,
    _ns: object,
    _lang: string,
};
export default Layout;
