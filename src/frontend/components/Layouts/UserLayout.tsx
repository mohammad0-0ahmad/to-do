import Nav from '../Nav';
import FriendsSection from '../Sections/FriendsSection';
import MainSection from '../Sections/MainSection';
import PeopleSection from '../Sections/PeopleSection';
import {
    useMediaQuery,
    useTheme,
    Grid,
    Slide,
    GridSize,
    makeStyles,
} from '@material-ui/core';
import Container from '../Container';
import { useRouter } from 'next/router';

const UserLayout: FC<PropsWithChildren> = ({ children }) => {
    const classes = useStyles();
    const { pathname: currentPath } = useRouter();
    const {
        breakpoints: { up },
    } = useTheme();
    const twoSections = useMediaQuery(up(900));
    const threeSections = useMediaQuery(up(1300));

    const amountVisibleSections = threeSections ? 3 : twoSections ? 2 : 1;

    const visibleSections = () => {
        switch (amountVisibleSections) {
            case 1:
                return [getOneSection({ children, currentPath })];
            case 2:
                return getTwoSections({ children, currentPath });
            case 3:
                return getThreeSections({ children, currentPath });
        }
    };

    return (
        <>
            <Nav />
            <Container pageContainer upperPadding>
                {shouldLayoutBeRendered({ currentPath }) ? (
                    <Grid container spacing={4} className={classes.gridItem}>
                        {visibleSections().map(({ section, key }, i) => (
                            <Slide
                                timeout={
                                    i === amountVisibleSections - 1 ? 300 : 0
                                }
                                in
                                direction={
                                    amountVisibleSections === 1
                                        ? 'down'
                                        : 'left'
                                }
                                mountOnEnter
                                unmountOnExit
                                key={key}
                            >
                                <Grid
                                    item
                                    xs={
                                        (12 / amountVisibleSections) as GridSize
                                    }
                                >
                                    {section}
                                </Grid>
                            </Slide>
                        ))}
                    </Grid>
                ) : (
                    children
                )}
            </Container>
        </>
    );
};

export default UserLayout;

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

const sectionsData = {
    children: {
        key: 'TargetPage',
    },
    main: {
        key: 'MainSection',
        path: '/',
    },
    friends: {
        key: 'FriendsSection',
        path: '/friends',
    },
    people: {
        key: 'PeopleSection',
        path: '/friends/send-request',
    },
    taskInvitations: { path: '/tasks-invitations' },
    friendsRequests: { path: '/friends/requests' },
    settings: { path: '/settings' },
};

/* -------------------------------------------------------------------------- */
/*                                  Utilities                                 */
/* -------------------------------------------------------------------------- */

const getOneSection = ({ children, currentPath }) => {
    switch (currentPath) {
        case sectionsData.main.path:
            return {
                key: sectionsData.main.key,
                section: (
                    <>
                        {children}
                        <MainSection />
                    </>
                ),
            };
        case sectionsData.friends.path:
            return {
                key: sectionsData.friends.key,
                section: (
                    <>
                        {children}
                        <FriendsSection />
                    </>
                ),
            };
        case sectionsData.people.path:
            return {
                key: sectionsData.people.key,
                section: (
                    <>
                        {children}
                        <PeopleSection />
                    </>
                ),
            };
        default:
            return {
                key: sectionsData.children.key,
                section: children,
            };
    }
};

const getTwoSections = ({ children, currentPath }) => {
    if (
        currentPath === sectionsData.main.path ||
        currentPath === sectionsData.friends.path
    ) {
        return [
            {
                key: sectionsData.main.key,
                section: (
                    <>
                        {currentPath === sectionsData.main.path && children}
                        <MainSection />
                    </>
                ),
            },
            {
                key: sectionsData.friends.key,
                section: (
                    <>
                        {currentPath === sectionsData.friends.path && children}
                        <FriendsSection />
                    </>
                ),
            },
        ];
    } else if (currentPath === sectionsData.people.path) {
        return [
            { key: sectionsData.main.key, section: <MainSection /> },
            {
                key: sectionsData.people.key,
                section: (
                    <>
                        {children}
                        <PeopleSection />
                    </>
                ),
            },
        ];
    } else {
        return [
            {
                key: sectionsData.main.key,
                section: <MainSection />,
            },
            { key: sectionsData.children.key, section: children },
        ];
    }
};

const getThreeSections = ({ children, currentPath }) => {
    const base = [
        {
            key: sectionsData.friends.key,
            section: <FriendsSection />,
        },
        { key: sectionsData.main.key, section: <MainSection /> },
    ];
    if (
        currentPath === sectionsData.main.path ||
        currentPath === sectionsData.friends.path ||
        currentPath === sectionsData.people.path
    ) {
        return [
            ...base,
            {
                key: sectionsData.people.key,
                section: (
                    <>
                        {children}
                        <PeopleSection />
                    </>
                ),
            },
        ];
    } else {
        return [...base, { key: sectionsData.children.key, section: children }];
    }
};

const shouldLayoutBeRendered = ({ currentPath }) => {
    if (currentPath === '/') {
        return true;
    }
    const { taskInvitations, friends, people, settings, friendsRequests } =
        sectionsData;

    const withLayout = [
        taskInvitations.path,
        friends.path,
        friendsRequests.path,
        people.path,
        settings.path,
    ];

    for (let i = 0; i < withLayout.length; i++) {
        if (currentPath.startsWith(withLayout[i])) {
            return true;
        }
    }
    return false;
};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ breakpoints: { down } }) => ({
    gridItem: {
        '&>div': {
            [down('xs')]: {
                padding: '0 8px!important',
            },
        },
    },
}));
