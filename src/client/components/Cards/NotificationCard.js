import {
    Badge,
    Grid,
    ListItem,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { string, bool, shape } from 'prop-types';
import { markNotificationAsSeen } from '../../services/notifications';
import People from '../Svg/People';
import PersonRequest from '../Svg/PersonRequest';
import TaskCheck from '../Svg/TaskCheck';
import Trans from '../Trans';
import UserAvatar from '../UserAvatar';

const useStyles = makeStyles(
    ({ palette: { color1, color4, color5, red, type } }) => ({
        NotificationCard: {
            backgroundColor: color5[type],
            color: color4[type],
            width: ({ fullWidth }) => (fullWidth ? '100%' : 470),
            height: 70,
            padding: '16px 8px',
            borderBottom: `2px solid ${color4[type]}`,
            cursor: 'pointer',
            filter: ({ seen }) => (seen ? 'brightness(.95)' : ''),
            '&.MuiListItem-button:hover': {
                backgroundColor: color5[type],
                filter: type === 'light' ? 'brightness(0.95)' : 'brightness(1)',
            },
        },
        badge: {
            color: color5[type],
            backgroundColor: color4[type],
        },
        text: {
            color: color1[type],
            display: '-webkit-box',
            lineClamp: 1,
            boxOrient: 'vertical',
            overflow: 'hidden',
            lineBreak: 'anywhere',
            marginLeft: 12,
        },
        userName: { color: color4[type] },
        createdAt: {
            lineHeight: 0.5,
            marginLeft: 16,
        },
        unClickedYet: {
            backgroundColor: red[type],
            borderRadius: '50%',
            width: 12,
            height: 12,
            opacity: 0.9,
        },
    })
);

const NotificationCard = ({
    notificationId,
    type,
    targetId,
    createdAt,
    seen,
    causedBy,
    fullWidth,
}) => {
    const classes = useStyles({ seen, fullWidth });
    const { push } = useRouter();
    let onClickURL = '';
    let textId = '';
    let badgeIcon;
    switch (type) {
        case 'friendshipRequest':
            onClickURL = `/friends/requests/#${targetId}`;
            textId = 'NotificationCard.friendshipRequest';
            badgeIcon = <PersonRequest />;
            break;
        case 'gotNewFriend':
            onClickURL = `/friends/#${targetId}`;
            textId = 'NotificationCard.gotNewFriend';
            badgeIcon = <People />;
            break;
        case 'taskInvitation':
            onClickURL = `/tasks-invitations/#${targetId}`;
            textId = 'NotificationCard.taskInvitation';
            badgeIcon = <TaskCheck />;
            break;
    }

    const text = (
        <Trans
            id={textId}
            values={{
                userName: [causedBy.firstName, causedBy.lastName].join(' '),
            }}
            components={[
                <span className={classes.userName} key="userNameSpan" />,
            ]}
        />
    );

    const handleClick = () => {
        push(onClickURL);
        markNotificationAsSeen(notificationId);
    };

    return (
        <ListItem
            className={classes.NotificationCard}
            onClick={handleClick}
            button
            disableGutters
        >
            <Grid
                container
                justify={!seen ? 'space-between' : 'flex-start'}
                alignItems="center"
            >
                <Grid item>
                    <Badge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        badgeContent={badgeIcon}
                        classes={{ badge: classes.badge }}
                    >
                        <UserAvatar {...causedBy} radius={25} />
                    </Badge>
                </Grid>
                <Grid item xs={10}>
                    <Grid container direction="column">
                        <Typography className={classes.text}>{text}</Typography>
                        <Typography
                            component="span"
                            className={classes.createdAt}
                            variant="caption"
                        >
                            {createdAt}
                        </Typography>
                    </Grid>
                </Grid>
                {!seen && <span className={classes.unClickedYet} />}
            </Grid>
        </ListItem>
    );
};

NotificationCard.propTypes = {
    notificationId: string.isRequired,
    type: string.isRequired,
    targetId: string.isRequired,
    createdAt: string.isRequired,
    seen: bool.isRequired,
    causedBy: shape({
        firstName: string.isRequired,
        lastName: string.isRequired,
        photoURL: string,
    }),
    fullWidth: bool,
};

export default NotificationCard;
