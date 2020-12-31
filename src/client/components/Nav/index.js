import { useMediaQuery, useTheme } from '@material-ui/core';
import NavBar from './NavBar';
import Drawer from './Drawer';
import Router from 'next/router';
import Settings from '../Svg/Settings';
import PersonPlus from '../Svg/PersonPlus';
import People from '../Svg/People';
import LogOut from '../Svg/LogOut';
import { signOut } from '../../services/auth';
import Notifications from '../Svg/Notifications';
import { useProfile } from '../../context/ProfileProvider';
import TaskCheck from '../Svg/TaskCheck';
import PersonRequest from '../Svg/PersonRequest';

const Nav = () => {
    const { photoURL, firstName, lastName, status } = useProfile();
    const items = {
        profile: {
            src: photoURL,
            label: [firstName, lastName].join(' '),
            status,
            onClick: () => Router.push('/profile'),
        },
        notifications: {
            icon: <Notifications />,
            labelId: 'Nav.label1',
            onClick: () => {},
        },
        friends: { icon: <People />, labelId: 'Nav.label2', onClick: () => {} },
        people: {
            icon: <PersonPlus />,
            labelId: 'Nav.label3',
            onClick: () => {},
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
                signOut({
                    onSuccess: () => {
                        Router.push('/');
                    },
                });
            },
        },
        taskInvitations: { icon: <TaskCheck />, labelId: 'Nav.label6', onClick: () => {Router.push('/task-invitations');} },
        friendshipRequests: { icon: <PersonRequest />, labelId: 'Nav.label7', onClick: () => {Router.push('/friendship-requests');} },
    };

    const { breakpoints } = useTheme();
    const smallScreen = useMediaQuery(breakpoints.down('xs'));
    return smallScreen ? <Drawer items={items} /> : <NavBar items={items} />;
};

export default Nav;
