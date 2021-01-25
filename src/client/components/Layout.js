import Nav from './Nav';
import FriendsSection from './Sections/FriendsSection';
import MainSection from './Sections/MainSection';
import PeopleSection from './Sections/PeopleSection';
import { any } from 'prop-types';
import { useMediaQuery, useTheme, Grid } from '@material-ui/core';
import Container from './Container';
import Router from 'next/router';
import { isItLayoutBased } from '../utils';

const Layout = ({ children }) => {
    const currentRoute = Router.route;
    const primarySection = () => {
        switch (currentRoute) {
            case '/':
                return <MainSection />;
            case '/friends':
                return <FriendsSection />;
            case '/friends/send-request':
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
                return [
                    <>
                        {children}
                        <MainSection />
                    </>,
                    <FriendsSection />,
                ];
            } else if (currentRoute === '/friends/send-request') {
                return [
                    <>
                        {children}
                        <MainSection />
                    </>,
                    <PeopleSection />,
                ];
            } else {
                return [<MainSection />, children];
            }
        }
        if (amountVisibleSections === 3) {
            return currentRoute === '/' ||
                currentRoute === '/friends' ||
                currentRoute === '/friends/send-request'
                ? [
                      <>
                          {children}
                          <FriendsSection />
                      </>,
                      <MainSection />,
                      <PeopleSection />,
                  ]
                : [<FriendsSection />, <MainSection />, children];
        }
    };
    const sections = visibleSections();
    return (
        <>
            <Nav />
            <Container pageContainer upperPadding>
                {isItLayoutBased() ? (
                    <Grid container spacing={4}>
                        {sections.map((section, i) => (
                            <SectionWrapper key={i}>{section}</SectionWrapper>
                        ))}
                    </Grid>
                ) : (
                    children
                )}
            </Container>
        </>
    );
};

Layout.propTypes = {
    children: any,
};

export default Layout;
