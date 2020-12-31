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
            '& *': {
                color: 'currentColor',
            },
        },
        logo: {
            fontSize: '2em',
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
                '&:first-child': {
                    padding: 20,
                },
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
        logOut: {
            marginTop: 'auto',
        },
    })
);
const Drawer = ({ items }) => {
    const classes = useStyles();
    const menuItemProps = [
        items.notifications,
        items.taskInvitations,
        items.friendshipRequests,
        items.friends,
        items.people,
        items.settings,
    ];
    const [isVisible, setIsVisible] = useState(false);

    return (
        <AppBar className={classes.Drawer}>
            <Container>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        <Button className={classes.logo}>
                            <Logo />
                        </Button>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => setIsVisible(!isVisible)}>
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
                        className={classes.tabs}
                        variant="fullWidth"
                        orientation="vertical"
                    >
                        <Tab
                            //TODO: Present user data.
                            icon={
                                <UserAvatar
                                    radius={25}
                                    src={items.profile.src}
                                    status={items.profile.status}
                                />
                            }
                            label={items.profile.label}
                            onClick={items.profile.onClick}
                        />
                        {menuItemProps.map(({ labelId, ...props }) => (
                            <Tab
                                key={labelId}
                                label={<Trans id={labelId} />}
                                {...props}
                            />
                        ))}
                        <Tab
                            {...items.logOut}
                            label={<Trans id={items.logOut.labelId} />}
                            className={classes.logOut}
                        />
                    </Tabs>
                </OrgDrawer>
            </Container>
        </AppBar>
    );
};

export default Drawer;
