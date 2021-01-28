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

const NavBar = ({ menuItems, otherItems }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    return (
        <AppBar className={classes.NavBar}>
            <Container>
                <Grid container justify="space-between" alignItems="center">
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
                                    setAnchorEl(null);
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
                            <IconButton>
                                {otherItems.notifications.icon}
                            </IconButton>
                        )}
                        {Boolean(menuItems.length) && (
                            <>
                                <IconButton
                                    onClick={(e) =>
                                        setAnchorEl(e.currentTarget)
                                    }
                                >
                                    <Arrow up={Boolean(anchorEl)} />
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
                                                        setAnchorEl(null);
                                                    }}
                                                />
                                            )
                                        )}
                                    </List>
                                </Popover>
                            </>
                        )}
                        {otherItems.signUp && (
                            <Button onClick={otherItems.signUp.onClick}>
                                <Trans id={otherItems.signUp.labelId} />
                            </Button>
                        )}
                        {otherItems.signIn && (
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
