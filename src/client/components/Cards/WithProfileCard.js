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
import clsx from 'clsx';

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
        ItemContainer: { width: 'fit-content' },
        name: {
            marginLeft: 16,
            marginTop: ({ time }) => (time ? 14 : ''),
            maxWidth: 150,
            display: '-webkit-box',
            lineClamp: 1,
            boxOrient: 'vertical',
            overflow: 'hidden',
            lineBreak: 'anywhere',
        },
        time: { display: 'block', lineHeight: 1, color: color4[type] },
        buttonsContainer: { fontSize: 30, height: 'fitContent' },
        profile: { color: color4[type] },
        addFriend: { color: color4[type] },
        removeFriend: { color: red[type] },
    })
);

const WithProfileCard = (Component, extra) => {
    const ProfileCard = ({
        photoURL,
        status,
        firstName,
        lastName,
        userName,
        time,
        ...props
    }) => {
        const classes = useStyles({
            time: !!time,
            withoutShadow: extra?.withoutShadow,
        });
        const showProfile = () => {
            Router.push(`/profile/${userName}`);
        };
        return (
            <Paper
                elevation={extra?.withoutShadow ? 0 : 3}
                className={classes.PersonCard}
            >
                <Grid container alignContent="center" justify="space-between">
                    <Grid
                        container
                        alignItems="center"
                        className={clsx(
                            classes.ItemContainer,
                            classes.profileSnapshot
                        )}
                    >
                        <UserAvatar
                            photoURL={photoURL}
                            firstName={firstName}
                            lastName={lastName}
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
                        className={clsx(
                            classes.ItemContainer,
                            classes.buttonsContainer
                        )}
                    >
                        {!extra?.withoutProfileButton && (
                            <IconButton
                                className={classes.profile}
                                onClick={showProfile}
                            >
                                <Profile />
                            </IconButton>
                        )}
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
        time: string,
    };

    return ProfileCard;
};

export default WithProfileCard;
