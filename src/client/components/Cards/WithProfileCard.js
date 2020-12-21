import UserAvatar from '../UserAvatar';
import {
    Grid,
    IconButton,
    makeStyles,
    Paper,
    Typography,
} from '@material-ui/core';
import Profile from '../Svg/Profile';
import Router from 'next/router';
import { string } from 'prop-types';

const useStyles = makeStyles(
    ({ palette: { color1, color4, color5, red, type } }) => ({
        PersonCard: {
            maxWidth: 600,
            minHeight: 82,
            padding: 16,
            backgroundColor: color5[type],
            color: color1[type],
            width: '100%',
        },
        containerItem: { width: 'fit-content' },
        name: { marginLeft: 16 },
        buttonsContainer: { fontSize: 30 },
        profile: { color: color4[type] },
        addFriend: { color: color4[type] },
        removeFriend: { color: red[type] },
    })
);

const WithProfileCard = (Component) => {
    const ProfileCard = ({
        photoURL,
        firstName,
        lastName,
        userName,
        ...props
    }) => {
        const classes = useStyles();
        const showProfile = () => {
            Router.push(`/profile/${userName}`);
        };

        return (
            <Paper elevation={3} className={classes.PersonCard} {...props}>
                <Grid container alignContent="center" justify="space-between">
                    <Grid container alignItems="center" className={classes.containerItem}>
                        <UserAvatar src={photoURL} radius={25} status={status} />
                        <Typography component="p" className={classes.name}>
                            {[firstName, lastName].join(' ')}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        className={`${classes.containerItem} ${classes.buttonsContainer}`}
                    >
                        <IconButton className={classes.profile} onClick={showProfile}>
                            <Profile />
                        </IconButton>
                        <Component />
                    </Grid>
                </Grid>
            </Paper>
        );
    };

    ProfileCard.propTypes = {
        userName: string.isRequired,
        photoURL: string,
        firstName: string.isRequired,
        lastName: string.isRequired,
        status: string,
    };

    return ProfileCard;
};

export default WithProfileCard;
