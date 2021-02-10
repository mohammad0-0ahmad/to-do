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
import { string, object } from 'prop-types';
import clsx from 'clsx';
import Tooltip from '../Tooltip';
import { formatDate } from '../../utilities';

const useStyles = makeStyles(
    ({
        palette: { color1, color4, color5, red, type },
        breakpoints: { down },
    }) => ({
        PersonCard: {
            maxWidth: 600,
            minHeight: 82,
            padding: 16,
            backgroundColor: color5[type],
            color: color1[type],
            width: '100%',
        },
        ItemContainer: { width: 'fit-content', flexFlow: 'nowrap' },
        name: {
            marginLeft: 16,
            maxWidth: 'auto',
            display: '-webkit-box',
            lineClamp: 1,
            boxOrient: 'vertical',
            overflow: 'hidden',
            lineBreak: 'anywhere',
            [down('xs')]: {
                marginLeft: 8,
            },
        },
        time: {
            lineHeight: 1,
            color: color4[type],
            marginLeft: 16,
            whiteSpace: 'pre-line',
        },
        buttonsContainer: { fontSize: 30, height: 'fitContent' },
        profile: { color: color4[type] },
        addFriend: { color: color4[type] },
        removeFriend: { color: red[type] },
    })
);

const withProfileCard = (Component, extra) => {
    const ProfileCard = ({
        photoURL,
        status,
        firstName,
        lastName,
        userName,
        time,
        invitationStatus,
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
                        item
                        xs={7}
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
                            invitationStatus={invitationStatus}
                        />
                        <Grid
                            item
                            container
                            direction="column"
                            className={classes.ItemContainer}
                        >
                            <Typography component="p" className={classes.name}>
                                {[firstName, lastName].join(' ')}
                            </Typography>
                            {time && (
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.time}
                                >
                                    {formatDate(time)}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={5}
                        alignItems="center"
                        justify="flex-end"
                        className={clsx(
                            classes.ItemContainer,
                            classes.buttonsContainer
                        )}
                    >
                        {!extra?.withoutProfileButton && (
                            <Tooltip titleTransId="withProfileCard.toolTips.label1">
                                <IconButton
                                    className={classes.profile}
                                    onClick={showProfile}
                                >
                                    <Profile />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Component {...props} {...{ firstName, lastName }} />
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
        time: object,
        invitationStatus: string,
    };

    return ProfileCard;
};

export default withProfileCard;
