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
import { string, date } from 'prop-types';

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
        name: {
            marginLeft: 16,
            marginTop: ({ time }) => (time ? 14 : ''),
            maxWidth: 150,
            textOverflow: 'ellipsis',
        },
        time: { display: 'block', lineHeight: 1, color: color4[type] },
        buttonsContainer: { fontSize: 30, height: 'fitContent' },
        profile: { color: color4[type] },
        addFriend: { color: color4[type] },
        removeFriend: { color: red[type] },
    })
);

const WithProfileCard = (Component) => {
    const ProfileCard = ({
        photoURL,
        status,
        firstName,
        lastName,
        userName,
        time,
        ...props
    }) => {
        const classes = useStyles({ time: !!time });
        const showProfile = () => {
            Router.push(`/profile/${userName}`);
        };

        return (
            <Paper elevation={3} className={classes.PersonCard}>
                <Grid container alignContent="center" justify="space-between">
                    <Grid
                        container
                        alignItems="center"
                        className={classes.containerItem}
                    >
                        <UserAvatar
                            src={photoURL}
                            radius={25}
                            status={status}
                        />
                        <Typography component="p" className={classes.name}>
                            {[firstName, lastName].join(' ')}
                            {time && (
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.time}
                                >
                                    {/*TODO: Improve time*/}
                                    {[
                                        time.toLocaleDateString({
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        }),
                                        time.toLocaleTimeString(),
                                    ].join(' ')}
                                </Typography>
                            )}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        alignItems="center"
                        className={`${classes.containerItem} ${classes.buttonsContainer}`}
                    >
                        <IconButton
                            className={classes.profile}
                            onClick={showProfile}
                        >
                            <Profile />
                        </IconButton>
                        <Component {...props} />
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
        time: date,
    };

    return ProfileCard;
};

export default WithProfileCard;
