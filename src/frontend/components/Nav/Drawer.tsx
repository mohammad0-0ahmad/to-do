import { useState } from 'react';
import Logo from '../Svg/Logo';
import Container from '../Container';
import {
    AppBar,
    Button,
    Grid,
    IconButton,
    makeStyles,
    Drawer as MuiDrawer,
    Tabs,
    Tab,
    useTheme,
} from '@material-ui/core';
import Menu from '../Svg/Menu';
import Trans from '../Trans';
import UserAvatar from '../UserAvatar';
import { useNotifications } from '../../providers/NotificationsProvider';

const Drawer = ({ menuItems = [], otherItems }) => {
    const classes = useStyles();
    const [isVisible, setIsVisible] = useState(false);
    const { notificationsCounter } = useNotifications() || {};
    const { direction } = useTheme();

    return (
        <AppBar className={classes.Drawer}>
            <Container>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    dir="ltr"
                >
                    <Grid item>
                        <Button
                            className={classes.logo}
                            {...otherItems.home}
                            onClick={() => {
                                setIsVisible(false);
                                otherItems.home.onClick();
                            }}
                        >
                            <Logo />
                        </Button>
                    </Grid>
                    <Grid item>
                        <IconButton
                            onClick={() => setIsVisible(!isVisible)}
                            className={classes.openButton}
                        >
                            <Menu
                                open={isVisible}
                                counter={notificationsCounter}
                            />
                        </IconButton>
                    </Grid>
                </Grid>
                <MuiDrawer
                    anchor={direction === 'rtl' ? 'left' : 'right'}
                    variant="persistent"
                    open={isVisible}
                    classes={{ paper: classes.paper }}
                >
                    <Tabs
                        value={false}
                        className={classes.tabs}
                        variant="fullWidth"
                        orientation="vertical"
                    >
                        {otherItems.profile && (
                            <Tab
                                icon={
                                    <UserAvatar
                                        reversedColor
                                        badgeBorderColor="primary"
                                        radius={25}
                                        photoURL={otherItems.profile.photoURL}
                                        firstName={otherItems.profile.firstName}
                                        lastName={otherItems.profile.lastName}
                                        status={otherItems.profile.status}
                                    />
                                }
                                label={otherItems.profile.label}
                                className={classes.profile}
                                onClick={() => {
                                    otherItems.profile.onClick();
                                    setIsVisible(false);
                                }}
                            />
                        )}
                        {menuItems.map(({ labelId, onClick, ...props }) => (
                            <Tab
                                key={labelId}
                                label={<Trans id={labelId} />}
                                onClick={() => {
                                    onClick();
                                    setIsVisible(false);
                                }}
                                {...props}
                            />
                        ))}
                        {otherItems.logOut && (
                            <Tab
                                icon={otherItems.logOut.icon}
                                onClick={otherItems.logOut.onClick}
                                label={<Trans id={otherItems.logOut.labelId} />}
                                className={classes.logOut}
                            />
                        )}
                    </Tabs>
                </MuiDrawer>
            </Container>
        </AppBar>
    );
};

export default Drawer;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type DrawerPropsType = {
    menuItems?: any[];
    otherItems: {
        home: object;
        profile?: object;
        logout?: object;
    };
};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(
    ({ palette: { primary, secondary, text }, fonts: { family } }) => ({
        Drawer: {
            backgroundColor: primary.main,
            padding: 5,
            height: 70,
            justifyContent: 'center',
            color: secondary.main,
        },
        openButton: {
            color: 'currentColor',
        },
        logo: {
            fontSize: '2em',
            color: 'currentColor',
        },
        paper: {
            backgroundColor: primary.main,
            color: secondary.main,
            width: '100vw',
            height: 'calc(100% - 70px)',
            marginTop: 70,
        },
        tabs: {
            height: '100%',

            '& .MuiTabs-flexContainer': {
                height: '100%',
            },
            '& .MuiTab-root': {
                textTransform: 'none',
                opacity: 1,
                fontSize: 18,
                borderTop: `2px solid ${text.secondary}`,
                fontFamily: family.secondary,
                padding: 30,
                maxHeight: 70,
                flexBasis: 'auto',
                '& .MuiTab-wrapper': {
                    flexDirection: 'row',
                    justifyContent: 'left',
                    '&>:nth-child(1)': {
                        margin: 0,
                        marginRight: 16,
                        fontSize: 30,
                    },
                },
            },
        },
        profile: {
            paddingLeft: '20px !important',
        },
        logOut: {
            marginTop: 'auto',
        },
    })
);
