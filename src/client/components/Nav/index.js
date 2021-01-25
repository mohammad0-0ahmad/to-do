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
import TaskCheck from '../Svg/TaskCheck';
import PersonRequest from '../Svg/PersonRequest';
import withSnackbarManager from '../withSnackbarManager';
import { func } from 'prop-types';
import userStatus from '../../constants/userStatus';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import { useState } from 'react';
import Trans from '../Trans';

const Nav = ({ showSnackbar }) => {
    const {
        photoURL,
        firstName,
        lastName,
        status,
        switchUserAutoStatusTo,
    } = useProfile();

    const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false);
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
                Router.push('/profile');
            },
        },
        notifications: {
            icon: <Notifications />,
            labelId: 'Nav.label1',
            onClick: () => {},
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
                Router.push('/task-invitations');
            },
        },
        friendshipRequests: {
            icon: <PersonRequest />,
            labelId: 'Nav.label7',
            onClick: () => {
                Router.push('/friends/requests');
            },
        },
    };

    const { breakpoints } = useTheme();
    const smallScreen = useMediaQuery(breakpoints.down('sm'));
    return (
        <>
            <ConfirmationDialog
                open={isLogoutDialogVisible}
                handleClose={() => setIsLogoutDialogVisible(false)}
                body={<Trans id="Nav.dialogs.logout.body" />}
                confirmButtonProps={{
                    onClick: async () => {
                        showSnackbar(
                            await switchUserAutoStatusTo(userStatus.offline)
                        );
                        Router.push('/');
                    },
                }}
            />
            {smallScreen ? <Drawer items={items} /> : <NavBar items={items} />}
        </>
    );
};
Nav.propTypes = {
    showSnackbar: func.isRequired,
};
export default withSnackbarManager(Nav);
