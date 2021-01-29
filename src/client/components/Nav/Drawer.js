import { useState } from 'react';
import Logo from '../Svg/Logo';
import Container from '../Container';
import {
    AppBar,
    Button,
    Grid,
    IconButton,
    makeStyles,
    Drawer as OrgDrawer,
    Tabs,
    Tab,
} from '@material-ui/core';
import Menu from '../Svg/Menu';
import Trans from '../Trans';
import UserAvatar from '../UserAvatar';
import { shape, array, object } from 'prop-types';

const useStyles = makeStyles(
    ({
        palette: { color2, color3, color4, type },
        fonts: {
            family: { secondary },
        },
    }) => ({
        Drawer: {
            backgroundColor: color4[type],
            padding: 5,
            height: 70,
            justifyContent: 'center',
            color: color3[type],
        },
        openButton: {
            color: 'currentColor',
        },
        logo: {
            fontSize: '2em',
            color: 'currentColor',
        },
        paper: {
            backgroundColor: color4[type],
            color: color3[type],
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
                borderTop: `2px solid ${color2[type]}`,
                fontFamily: secondary,
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

const Drawer = ({ menuItems, otherItems }) => {
    const classes = useStyles();
    const [isVisible, setIsVisible] = useState(false);

    return (
        <AppBar className={classes.Drawer}>
            <Container>
                <Grid container justify="space-between" alignItems="center">
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
                            <Menu open={isVisible} />
                        </IconButton>
                    </Grid>
                </Grid>
                <OrgDrawer
                    anchor="right"
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
                                        badgeBorderColor="color4"
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
                                {...otherItems.logOut}
                                label={<Trans id={otherItems.logOut.labelId} />}
                                className={classes.logOut}
                            />
                        )}
                    </Tabs>
                </OrgDrawer>
            </Container>
        </AppBar>
    );
};

Drawer.propTypes = {
    menuItems: array,
    otherItems: shape({
        home: object.isRequired,
        profile: object,
        logout: object,
    }),
};

export default Drawer;
