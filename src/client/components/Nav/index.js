import { useMediaQuery, useTheme } from '@material-ui/core';
import NavBar from './NavBar';
import Drawer from './Drawer';
import Router from 'next/router';
import Settings from '../Svg/Settings';
import PersonPlus from '../Svg/PersonPlus';
import People from '../Svg/People';
import LogOut from '../Svg/LogOut';
import Notifications from '../Svg/Notifications';
import { useProfile } from '../../context/ProfileProvider';
import { useAuth } from '../../context/AuthProvider';
import TaskCheck from '../Svg/TaskCheck';
import PersonRequest from '../Svg/PersonRequest';
import withSnackbarManager from '../withSnackbarManager';
import { func } from 'prop-types';
import userStatus from '../../constants/userStatus';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import { useState } from 'react';
import Trans from '../Trans';
import { useNotifications } from '../../context/NotificationsProvider';
import { resetNotificationCounter } from '../../services/notifications';

const Nav = ({ showSnackbar }) => {
    const {
        photoURL,
        firstName,
        lastName,
        status,
        userName,
        switchUserAutoStatusTo,
    } = useProfile() || {};
    const { isAuthenticated } = useAuth();
    const { notificationsCounter } = useNotifications() || {};

    const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false);
    const { breakpoints } = useTheme();
    const smallScreen = useMediaQuery(breakpoints.down('sm'));
    const handleLogOut = async () => {
        showSnackbar(await switchUserAutoStatusTo(userStatus.offline));
        Router.push('/');
    };

    const items = {
        home: {
            onClick: () => {
                Router.push('/');
            },
        },
        profile: {
            photoURL,
            firstName,
            lastName,
            label: [firstName, lastName].join(' '),
            status,
            onClick: () => {
                Router.push(`/profile/${userName}`);
            },
        },
        notifications: {
            icon: <Notifications counter={notificationsCounter} />,
            labelId: 'Nav.label1',
            onClick: () => {
                resetNotificationCounter();
                Router.push('/notifications');
            },
        },
        friends: {
            icon: <People />,
            labelId: 'Nav.label2',
            onClick: () => {
                Router.push('/friends');
            },
        },
        people: {
            icon: <PersonPlus />,
            labelId: 'Nav.label3',
            onClick: () => {
                Router.push('/friends/send-request');
            },
        },
        settings: {
            icon: <Settings />,
            labelId: 'Nav.label4',
            onClick: () => {
                Router.push('/settings');
            },
        },
        logOut: {
            icon: <LogOut />,
            labelId: 'Nav.label5',
            onClick: () => {
                setIsLogoutDialogVisible(true);
            },
        },
        taskInvitations: {
            icon: <TaskCheck />,
            labelId: 'Nav.label6',
            onClick: () => {
                Router.push('/tasks-invitations');
            },
        },
        friendshipRequests: {
            icon: <PersonRequest />,
            labelId: 'Nav.label7',
            onClick: () => {
                Router.push('/friends/requests');
            },
        },
        signUp: {
            labelId: 'Nav.label8',
            onClick: () => {
                Router.push('/signup');
            },
        },
        signIn: {
            labelId: 'Nav.label9',
            onClick: () => {
                Router.push('/login');
            },
        },
    };

    const navBarMenuItems = isAuthenticated
        ? [
              items.taskInvitations,
              items.friendshipRequests,
              items.friends,
              items.people,
              items.settings,
              items.logOut,
          ]
        : [];

    const navBarOtherItems = isAuthenticated
        ? {
              home: items.home,
              profile: items.profile,
              notifications: items.notifications,
          }
        : {
              home: items.home,
              signUp: items.signUp,
              signIn: items.signIn,
          };

    const drawerMenuItems = isAuthenticated
        ? [
              items.notifications,
              items.taskInvitations,
              items.friendshipRequests,
              items.friends,
              items.people,
              items.settings,
          ]
        : [items.signUp, items.signIn];

    const drawerOtherItems = isAuthenticated
        ? {
              home: items.home,
              profile: items.profile,
              logOut: items.logOut,
          }
        : {
              home: items.home,
          };

    return (
        <>
            <ConfirmationDialog
                open={isLogoutDialogVisible}
                handleClose={() => setIsLogoutDialogVisible(false)}
                body={<Trans id="Nav.dialogs.logout.body" />}
                confirmButtonProps={{
                    onClick: handleLogOut,
                }}
            />
            {smallScreen ? (
                <Drawer
                    menuItems={drawerMenuItems}
                    otherItems={drawerOtherItems}
                />
            ) : (
                <NavBar
                    menuItems={navBarMenuItems}
                    otherItems={navBarOtherItems}
                />
            )}
        </>
    );
};

Nav.propTypes = {
    showSnackbar: func.isRequired,
};

export default withSnackbarManager(Nav);
