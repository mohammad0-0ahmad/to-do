import { useMediaQuery, useTheme } from '@material-ui/core';
import NavBar from './NavBar';
import Drawer from './Drawer';
import Router from 'next/router';
import Settings from '../Svg/Settings';
import PersonPlus from '../Svg/PersonPlus';
import People from '../Svg/People';
import LogOut from '../Svg/LogOut';
import Notifications from '../Svg/Notifications';
import { useProfile } from '../../providers/ProfileProvider';
import { useAuth } from '../../providers/AuthProvider';
import TaskCheck from '../Svg/TaskCheck';
import PersonRequest from '../Svg/PersonRequest';
import withSnackbarManager, {
    WithSnackbarManagerType,
} from '../../HOCs/withSnackbarManager';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import { useState } from 'react';
import Trans from '../Trans';
import { useNotifications } from '../../providers/NotificationsProvider';
import { resetNotificationCounter } from '../../services/notifications';
import { UserStatus } from 'src/db_schemas';
import { useLanguageQuery } from 'next-export-i18n';

const Nav: FC<WithSnackbarManagerType> = ({ showSnackbar }) => {
    const {
        photoURL,
        firstName,
        lastName,
        status,
        userName,
        switchUserAutoStatusTo,
    } = useProfile() || {};
    const [query] = useLanguageQuery();
    const routerPush = (href: string) => Router.push({ pathname: href, query });
    const { isAuthenticated } = useAuth();
    const { notificationsCounter } = useNotifications() || {};

    const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false);
    const { breakpoints } = useTheme();
    const smallScreen = useMediaQuery(breakpoints.down('sm'));
    
    const handleLogOut = async () => {
        showSnackbar(await switchUserAutoStatusTo(UserStatus.offline));
        routerPush('/');
    };

    //TODO: use href instead onClick maybe
    const items: Record<string, MenuItemType> = {
        home: {
            onClick: () => {
                routerPush('/');
            },
        },
        profile: {
            photoURL,
            firstName,
            lastName,
            label: [firstName, lastName].join(' '),
            status,
            onClick: () => {
                routerPush(`/profile/${userName}`);
            },
        },
        notifications: {
            icon: <Notifications counter={notificationsCounter} />,
            labelId: 'Nav.label1',
            onClick: () => {
                resetNotificationCounter();
                routerPush('/notifications');
            },
        },
        friends: {
            icon: <People />,
            labelId: 'Nav.label2',
            onClick: () => {
                routerPush('/friends');
            },
        },
        people: {
            icon: <PersonPlus />,
            labelId: 'Nav.label3',
            onClick: () => {
                routerPush('/friends/send-request');
            },
        },
        settings: {
            icon: <Settings />,
            labelId: 'Nav.label4',
            onClick: () => {
                routerPush('/settings');
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
                routerPush('/tasks-invitations');
            },
        },
        friendshipRequests: {
            icon: <PersonRequest />,
            labelId: 'Nav.label7',
            onClick: () => {
                routerPush('/friends/requests');
            },
        },
        signUp: {
            labelId: 'Nav.label8',
            onClick: () => {
                routerPush('/signup');
            },
        },
        signIn: {
            labelId: 'Nav.label9',
            onClick: () => {
                routerPush('/login');
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

export default withSnackbarManager(Nav);

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export type MenuItemType = {
    label?: string;
    labelId?: string;
    onClick: () => void;
} & Record<string, any>;
