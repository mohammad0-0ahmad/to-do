import UserAvatar from '../components/UserAvatar';
import {
    Grid,
    IconButton,
    makeStyles,
    Paper,
    Typography,
} from '@material-ui/core';
import Profile from '../components/Svg/Profile';
import Router from 'next/router';
import clsx from 'clsx';
import Tooltip from '../components/Tooltip';
import { formatDate } from '../utilities';
import { TaskInvitationStatus } from 'src/db_schemas';

const withProfileCard: WithProfileCardHOCType = (Component, options) => {
    const ProfileCard: FC<ProfileCardPropsType> = ({
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
            withoutShadow: options?.withoutShadow,
        });
        const showProfile = () => {
            Router.push(`/profile/${userName}`);
        };

        return (
            <Paper
                elevation={options?.withoutShadow ? 0 : 3}
                className={classes.PersonCard}
            >
                <Grid
                    container
                    alignContent="center"
                    justifyContent="space-between"
                >
                    <Grid
                        container
                        item
                        xs={7}
                        alignItems="center"
                        className={classes.ItemContainer}
                    >
                        <UserAvatar
                            photoURL={photoURL}
                            firstName={firstName}
                            lastName={lastName}
                            radius={25}
                            status={status}
                            invitationStatus={invitationStatus}
                        />
                        <Grid item container direction="column">
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
                        justifyContent="flex-end"
                        className={clsx(
                            classes.ItemContainer,
                            classes.buttonsContainer
                        )}
                    >
                        {!options?.withoutProfileButton && (
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

    return ProfileCard;
};

export default withProfileCard;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export type WithProfileCardHOCType = (
    Component: FC<any>,
    options?: {
        withoutShadow?: boolean;
        withoutProfileButton?: boolean;
    }
) => FC<any>;

type ProfileCardPropsType = Pick<
    UserSchema,
    'userName' | 'userName' | 'photoURL' | 'firstName' | 'lastName' | 'status'
> & {
    time: object;
    invitationStatus: TaskInvitationStatus;
};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(
    ({
        palette: { primary, background, error, text },
        breakpoints: { down },
    }) => ({
        PersonCard: {
            maxWidth: 600,
            minHeight: 82,
            padding: 16,
            backgroundColor: background.paper,
            color: text.primary,
            width: '100%',
        },
        ItemContainer: { width: 'fit-content', flexFlow: 'nowrap' },
        name: {
            marginLeft: 16,
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
            color: primary.main,
            marginLeft: 16,
            whiteSpace: 'pre-line',
        },
        buttonsContainer: { fontSize: 30, height: 'fitContent' },
        profile: { color: primary.main },
        addFriend: { color: primary.main },
        removeFriend: { color: error.main },
    })
);
