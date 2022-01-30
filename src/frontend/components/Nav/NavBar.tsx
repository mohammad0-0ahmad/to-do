import Logo from '../Svg/Logo';
import Container from '../Container';
import {
    AppBar,
    Grid,
    IconButton,
    makeStyles,
    Typography,
    Popover,
} from '@material-ui/core';
import List from '../List';
import ListItem from '../ListItem';
import Button from '../Inputs/Button';
import UserAvatar from '../UserAvatar';
import Arrow from '../Svg/Arrow';
import { useState } from 'react';
import Trans from '../Trans';
import { useNotifications } from '../../providers/NotificationsProvider';
import NotificationCard from '../Cards/NotificationCard';
import { resetNotificationCounter } from '../../services/notifications';
import NoContent from '../Cards/NoContent';
import { MenuItemType } from '.';

const NavBar: FC<NavBarPropsType> = ({ menuItems, otherItems }) => {
    const classes = useStyles();
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
    const { notifications } = useNotifications() || {};
    const notificationsEntries = Object.entries(notifications || {});
    return (
        <AppBar className={classes.NavBar}>
            <Container>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Button className={classes.logo} {...otherItems.home}>
                            <Logo />
                        </Button>
                    </Grid>
                    <Grid item className={classes.controlSection}>
                        {otherItems.profile && (
                            <Button
                                onClick={() => {
                                    otherItems.profile.onClick();
                                    setMenuAnchorEl(null);
                                }}
                            >
                                <Typography className={classes.userName}>
                                    {otherItems.profile.label}
                                </Typography>
                                <UserAvatar
                                    reversedColor
                                    badgeBorderColor="color4"
                                    photoURL={otherItems.profile.photoURL}
                                    firstName={otherItems.profile.firstName}
                                    lastName={otherItems.profile.lastName}
                                    status={otherItems.profile.status}
                                />
                            </Button>
                        )}
                        {otherItems.notifications && (
                            <>
                                <IconButton
                                    onClick={(e) => {
                                        resetNotificationCounter();
                                        setNotificationsAnchorEl(
                                            e.currentTarget
                                        );
                                    }}
                                >
                                    {otherItems.notifications.icon}
                                </IconButton>
                                <Popover
                                    className={classes.popover}
                                    elevation={4}
                                    open={Boolean(notificationsAnchorEl)}
                                    anchorEl={notificationsAnchorEl}
                                    onClose={() =>
                                        setNotificationsAnchorEl(null)
                                    }
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    <List
                                        scrollable
                                        onClick={() =>
                                            setNotificationsAnchorEl(null)
                                        }
                                    >
                                        {notificationsEntries.length ? (
                                            notificationsEntries.map(
                                                ([
                                                    notificationId,
                                                    notificationProps,
                                                ]) => (
                                                    <NotificationCard
                                                        key={notificationId}
                                                        {...notificationProps}
                                                    />
                                                )
                                            )
                                        ) : (
                                            <NoContent
                                                className={classes.noContent}
                                            />
                                        )}
                                    </List>
                                </Popover>
                            </>
                        )}
                        {Boolean(menuItems.length) && (
                            <>
                                <IconButton
                                    onClick={(e) =>
                                        setMenuAnchorEl(e.currentTarget)
                                    }
                                >
                                    <Arrow up={Boolean(menuAnchorEl)} />
                                </IconButton>
                                <Popover
                                    className={classes.popover}
                                    elevation={4}
                                    open={Boolean(menuAnchorEl)}
                                    anchorEl={menuAnchorEl}
                                    onClose={() => setMenuAnchorEl(null)}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    <List>
                                        {menuItems.map(
                                            ({
                                                labelId,
                                                onClick,
                                                ...ItemProps
                                            }) => (
                                                <ListItem
                                                    {...ItemProps}
                                                    label={
                                                        <Trans id={labelId} />
                                                    }
                                                    key={labelId}
                                                    onClick={() => {
                                                        onClick();
                                                        setMenuAnchorEl(null);
                                                    }}
                                                />
                                            )
                                        )}
                                    </List>
                                </Popover>
                            </>
                        )}
                        {otherItems?.signUp && (
                            <Button onClick={otherItems.signUp.onClick}>
                                <Trans id={otherItems.signUp.labelId} />
                            </Button>
                        )}
                        {otherItems?.signIn && (
                            <Button onClick={otherItems.signIn.onClick}>
                                <Trans id={otherItems.signIn.labelId} />
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    );
};

export default NavBar;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type NavBarPropsType = {
    menuItems: any[];
    otherItems: {
        home: MenuItemType;
        profile?: MenuItemType;
        notifications?: MenuItemType;
        signUp?: MenuItemType;
        signIn?: MenuItemType;
    };
};
/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(
    ({ palette: { color2, color3, color4, type } }) => ({
        NavBar: {
            backgroundColor: color4[type],
            padding: 5,
            height: 70,
            '& >*': {
                margin: 'auto',
            },
        },
        logo: {
            fontSize: '3em',
            color: color3[type],
        },
        userName: { marginRight: 16 },
        controlSection: {
            color: color3[type],
            '& >*': {
                color: 'currentColor',
            },
        },
        popover: {
            marginTop: 11,
        },
        noContent: { color: `${color2[type]}!important`, padding: 16 },
    })
);
