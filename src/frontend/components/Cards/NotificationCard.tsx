import {
    Badge,
    Grid,
    ListItem,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { markNotificationAsSeen } from '../../services/notifications';
import People from '../Svg/People';
import PersonRequest from '../Svg/PersonRequest';
import TaskCheck from '../Svg/TaskCheck';
import Trans from '../Trans';
import UserAvatar from '../UserAvatar';

const NotificationCard: FC<NotificationCardPropsType> = ({
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
            <Grid container alignItems="center">
                <Grid item>
                    <Badge
                        overlap="circular"
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
                <Grid item xs={9}>
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

export default NotificationCard;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export type NotificationCardPropsType = {
    notificationId: string;
    type: string;
    targetId: string;
    createdAt: string;
    seen: boolean;
    causedBy: {
        firstName: string;
        lastName: string;
        photoURL?: string;
    };
    fullWidth?: boolean;
};
/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(
    ({ palette: { primary, text, background, error, type } }) => ({
        NotificationCard: {
            backgroundColor: background.paper,
            color: primary.main,
            //@ts-ignore
            width: ({ fullWidth }) => (fullWidth ? '100%' : 470),
            height: 70,
            padding: '16px 8px',
            borderBottom: `2px solid ${primary.main}`,
            cursor: 'pointer',
            //@ts-ignore
            filter: ({ seen }) => (seen ? 'brightness(.95)' : ''),
            '&.MuiListItem-button:hover': {
                backgroundColor: background.paper,
                filter: type === 'light' ? 'brightness(0.95)' : 'brightness(1)',
            },
        },
        badge: {
            color: background.paper,
            backgroundColor: primary.main,
        },
        text: {
            color: text.primary,
            display: '-webkit-box',
            lineClamp: 1,
            boxOrient: 'vertical',
            overflow: 'hidden',
            lineBreak: 'anywhere',
            marginLeft: 12,
        },
        userName: { color: primary.main },
        createdAt: {
            lineHeight: 0.5,
            marginLeft: 16,
        },
        unClickedYet: {
            backgroundColor: error.main,
            borderRadius: '50%',
            width: 12,
            height: 12,
            opacity: 0.9,
            marginLeft: 'auto',
        },
    })
);
