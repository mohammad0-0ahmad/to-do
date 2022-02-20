import {
    Badge,
    Grid,
    ListItem,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { NotificationTypeProperty } from 'src/db_schemas';
import {
    markNotificationAsSeen,
    NotificationType,
} from '../../services/notifications';
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
        case NotificationTypeProperty.friendshipRequest:
            onClickURL = `/friends/requests/#${targetId}`;
            textId = 'NotificationCard.friendshipRequest';
            badgeIcon = <PersonRequest />;
            break;
        case NotificationTypeProperty.gotNewFriend:
            onClickURL = `/friends/#${targetId}`;
            textId = 'NotificationCard.gotNewFriend';
            badgeIcon = <People />;
            break;
        case NotificationTypeProperty.taskInvitation:
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
                <Grid item className={classes.textContainer}>
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
export type NotificationCardPropsType = NotificationType & {
    fullWidth?: boolean;
};
/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(
    ({
        palette: { primary, text, background, error, type },
        breakpoints: { down },
    }) => ({
        NotificationCard: {
            backgroundColor: background.paper,
            color: primary.main,
            //@ts-ignore
            width: ({ fullWidth }) => (fullWidth ? '100%' : 470),
            maxHeight: 100,
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
        textContainer: {
            maxWidth: '87.5%',
            flexBasis: '87.5%',
            flexGrow: 0,
            [down(433)]: {
                maxWidth: '80%',
                flexBasis: '80%',
            },
        },
        text: {
            color: text.primary,
            marginLeft: 12,
            lineHeight: 1.2,
        },
        userName: { color: primary.main },
        createdAt: {
            lineHeight: 0.5,
            marginLeft: 16,
            marginTop: 6,
            marginBottom: 3,
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
