import { Avatar, Badge, Grid, makeStyles } from '@material-ui/core';
import Crown from './Svg/Crown';
import { string, number, bool, oneOf } from 'prop-types';
import { statusColors } from '../constants/userStatus';
import { useState } from 'react';
import Upload from './Svg/Upload';
import taskInvitationStatus, {
    getTaskInvitationStatusIcon,
} from '../constants/taskInvitationStatus';
import clsx from 'clsx';
import Tooltip from './Tooltip';

const useStyles = makeStyles(({ palette: { type, ...palette } }) => ({
    avatarContainer: {
        cursor: ({ changeable }) => (changeable ? 'pointer' : ''),
        position: 'relative',
    },
    avatar: {
        width: ({ radius }) => (radius ? radius * 2 : ''),
        height: ({ radius }) => (radius ? radius * 2 : ''),
        color: ({ reversedColor }) =>
            reversedColor ? palette.color4[type] : palette.color2[type],
        backgroundColor: ({ hasAnAvatar, reversedColor }) =>
            hasAnAvatar
                ? 'transparent'
                : reversedColor
                ? palette.color2[type]
                : palette.color4[type],
        fontSize: ({ radius }) => (radius ? radius / 2 + 5 : 25),
    },
    hoveredChangeable: {
        width: ({ radius }) => (radius ? radius * 2 : ''),
        height: ({ radius }) => (radius ? radius * 2 : ''),
        position: 'absolute',
        top: 0,
        left: 0,
        color: palette.yellow[type],
        fontSize: ({ radius }) => (radius ? radius / 1.5 : 10),
        borderRadius: '50%',
        backdropFilter: 'blur(3px) brightness(0.9)',
    },
    statusBadge: {
        backgroundColor: ({ status }) => {
            return status ? palette[statusColors[status]][type] : '';
        },
        width: ({ statusBadgeDiameter }) => statusBadgeDiameter,
        height: ({ statusBadgeDiameter }) => statusBadgeDiameter,
        border: ({ badgeBorderColor }) =>
            `2px solid ${palette[badgeBorderColor][type]}`,
        borderRadius: '50%',
    },
    upperRightBadge: {
        border: ({ badgeBorderColor }) =>
            `1.5px solid ${palette[badgeBorderColor][type]}`,
        backgroundColor: palette.color4[type],
        padding: '2px 1px',
        transform: ({ radius }) =>
            radius ? `scale(${(radius * 2) / 50}) translate(15%,-15%)` : '',
        top: 0,
        right: 0,
    },
    ownerBadge: { color: palette.yellow[type] },
    pendingTaskInvitation: { color: palette.yellow[type] },
    acceptedTaskInvitation: { color: palette.green[type], padding: 0 },
    declinedTaskInvitation: { color: palette.red[type] },
    leftTaskInvitation: { color: palette.red[type] },
}));

const UserAvatar = ({
    firstName,
    lastName,
    photoURL,
    radius,
    status,
    owner,
    className,
    changeable,
    badgeBorderColor,
    reversedColor,
    invitationStatus,
    ...props
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const classes = useStyles({
        radius,
        statusBadgeDiameter: radius / 4 > 10 ? radius / 4 : 15,
        status,
        hasAnAvatar: photoURL,
        changeable,
        badgeBorderColor,
        reversedColor,
    });

    const avatarBase = (
        <Tooltip enterDelay={3000} title={[firstName, lastName].join(' ')}>
            <div
                className={classes.avatarContainer}
                onMouseEnter={() => {
                    setIsHovered(true);
                }}
                onMouseLeave={() => {
                    setIsHovered(false);
                }}
            >
                <Avatar
                    src={photoURL}
                    className={`${classes.avatar} ${className}`}
                    {...props}
                >
                    {!photoURL && firstName && lastName
                        ? firstName[0] + lastName[0]
                        : null}
                </Avatar>
                {changeable && isHovered && (
                    <Grid
                        container
                        alignContent="center"
                        justify="center"
                        className={classes.hoveredChangeable}
                    >
                        <Upload />
                    </Grid>
                )}
            </div>
        </Tooltip>
    );
    const avatar =
        owner || invitationStatus ? (
            <Badge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                classes={{
                    badge: clsx(classes.upperRightBadge, {
                        [classes.ownerBadge]: owner,
                        [classes[
                            `${invitationStatus}TaskInvitation`
                        ]]: invitationStatus,
                    }),
                }}
                badgeContent={
                    owner ? (
                        <Crown />
                    ) : (
                        getTaskInvitationStatusIcon(invitationStatus)
                    )
                }
            >
                {avatarBase}
            </Badge>
        ) : (
            avatarBase
        );

    return status ? (
        <Badge
            overlap="circle"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            variant="dot"
            classes={{ badge: classes.statusBadge }}
            className={className}
        >
            {avatar}
        </Badge>
    ) : (
        avatar
    );
};

UserAvatar.propTypes = {
    invitationStatus: oneOf(taskInvitationStatus),
    firstName: string,
    lastName: string,
    photoURL: string,
    reversedColor: bool,
    badgeBorderColor: oneOf(['color4', 'color5']),
    radius: number,
    status: oneOf([...Object.keys(statusColors), '']),
    owner: bool,
    className: string,
    changeable: bool,
};

UserAvatar.defaultProps = {
    owner: false,
    radius: 20,
    badgeBorderColor: 'color5',
    className: '',
    changeable: false,
};

export default UserAvatar;
