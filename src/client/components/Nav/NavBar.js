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
import Arrow from '../Svg/Arrow';
import { useState } from 'react';
import Trans from '../Trans';

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

const NavBar = ({ items }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const menuItemProps = [
        items.taskInvitations,
        items.friendshipRequests,
        items.friends,
        items.people,
        items.settings,
        items.logOut,
    ];

    return (
        <AppBar className={classes.NavBar}>
            <Container>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        <Button className={classes.logo} {...items.home}>
                            <Logo />
                            <ColorModeSB />
                        </Button>
                    </Grid>
                    <Grid item className={classes.controlSection}>
                        <Button onClick={items.profile.onClick}>
                            <Typography className={classes.userName}>
                                {items.profile.label}
                            </Typography>
                            <UserAvatar
                                reversedColor
                                badgeBorderColor="color4"
                                photoURL={items.profile.photoURL}
                                firstName={items.profile.firstName}
                                lastName={items.profile.lastName}
                                status={items.profile.status}
                            />
                        </Button>
                        <IconButton>{items.notifications.icon}</IconButton>
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
