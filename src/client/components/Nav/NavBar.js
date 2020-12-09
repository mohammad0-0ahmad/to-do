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
import ColorModeSB from '../Inputs/ColorModeSB';
import Button from '../Inputs/Button';
import UserAvatar from '../UserAvatar';
import Router from 'next/router';
import Notifications from '../Svg/Notifications';
import Arrow from '../Svg/Arrow';
import { useContext, useState } from 'react';
import Trans from '../Trans';
import People from '../Svg/People';
import PersonPlus from '../Svg/PersonPlus';
import Settings from '../Svg/Settings';
import LogOut from '../Svg/LogOut';
import { useAuth } from '../../context/AuthProvider';

const useStyles = makeStyles(({ palette: { color3, color4, type } }) => ({
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
}));

const NavBar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const {setIsAuthenticated} = useAuth();

    const menuItemProps = [
        { icon: <People />, labelId: 'Nav.label2', onClick: () => {} },
        {
            icon: <PersonPlus />,
            labelId: 'Nav.label3',
            onClick: () => {},
        },
        { icon: <Settings />, labelId: 'Nav.label4', onClick: () => {} },
        {
            icon: <LogOut />, labelId: 'Nav.label5', onClick: () => {
                setIsAuthenticated(false);
            }
        },
    ];

    return (
        <AppBar className={classes.NavBar}>
            <Container>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        <Button className={classes.logo}>
                            <Logo />
                            <ColorModeSB />
                        </Button>
                    </Grid>
                    <Grid item className={classes.controlSection}>
                        <Button onClick={() => Router.push('/profile')}>
                            <Typography className={classes.userName}>
                                user name
                            </Typography>
                            <UserAvatar src="https://randomuser.me/portraits/men/1.jpg" />
                        </Button>
                        <IconButton>
                            <Notifications />
                        </IconButton>
                        <IconButton
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                        >
                            <Arrow />
                        </IconButton>
                        <Popover
                            className={classes.popover}
                            elevation={4}
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={() => setAnchorEl(null)}
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
                                {menuItemProps.map(
                                    ({ labelId, ...ItemProps }) => (
                                        <ListItem
                                            {...ItemProps}
                                            label={<Trans id={labelId} />}
                                            key={labelId}
                                        />
                                    )
                                )}
                            </List>
                        </Popover>
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    );
};

export default NavBar;
