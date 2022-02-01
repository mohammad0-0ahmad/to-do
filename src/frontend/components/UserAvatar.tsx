import { useState } from 'react';
import {
    Avatar,
    AvatarProps,
    Badge,
    Grid,
    makeStyles,
} from '@material-ui/core';
import Crown from './Svg/Crown';
import { statusColors, UserStatusType } from '../constants/userStatus';
import Upload from './Svg/Upload';
import clsx from 'clsx';
import Tooltip from './Tooltip';
import TaskInvitationStatusIcon, {
    TaskInvitationStatusType,
} from './TaskInvitationStatusIcon';

const UserAvatar: FC<UserAvatarPropsType> = ({
    firstName,
    lastName,
    photoURL,
    radius = 20,
    status,
    owner = false,
    className,
    changeable = false,
    badgeBorderColor = 'background',
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
                        justifyContent="center"
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
                overlap="circular"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                classes={{
                    badge: clsx(classes.upperRightBadge, {
                        [classes.ownerBadge]: owner,
                        [classes[`${invitationStatus}TaskInvitation`]]:
                            invitationStatus,
                    }),
                }}
                badgeContent={
                    owner ? (
                        <Crown />
                    ) : (
                        <TaskInvitationStatusIcon status={invitationStatus} />
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
            overlap="circular"
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

export default UserAvatar;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type UserAvatarPropsType = AvatarProps & {
    invitationStatus?: TaskInvitationStatusType;
    firstName: string;
    lastName: string;
    photoURL?: string;
    reversedColor?: boolean;
    badgeBorderColor?: 'primary' | 'background';
    radius?: number;
    status?: UserStatusType;
    owner?: boolean;
    className?: string;
    changeable?: boolean;
};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { type, ...palette } }) => ({
    avatarContainer: {
        //@ts-ignore
        cursor: ({ changeable }) => (changeable ? 'pointer' : ''),
        position: 'relative',
    },
    avatar: {
        //@ts-ignore
        width: ({ radius }) => (radius ? radius * 2 : ''),
        //@ts-ignore
        height: ({ radius }) => (radius ? radius * 2 : ''),
        //@ts-ignore
        color: ({ reversedColor }) =>
            reversedColor ? palette.primary.main : palette.text.secondary,
        //@ts-ignore
        backgroundColor: ({ hasAnAvatar, reversedColor }) =>
            hasAnAvatar
                ? 'transparent'
                : reversedColor
                ? palette.text.secondary
                : palette.primary.main,
        //@ts-ignore
        fontSize: ({ radius }) => (radius ? radius / 2 + 5 : 25),
    },
    hoveredChangeable: {
        //@ts-ignore
        width: ({ radius }) => (radius ? radius * 2 : ''),
        //@ts-ignore
        height: ({ radius }) => (radius ? radius * 2 : ''),
        position: 'absolute',
        top: 0,
        left: 0,
        color: palette.warning.main,
        //@ts-ignore
        fontSize: ({ radius }) => (radius ? radius / 1.5 : 10),
        borderRadius: '50%',
        backdropFilter: 'blur(3px) brightness(0.9)',
    },
    statusBadge: {
        //@ts-ignore
        backgroundColor: ({ status }) =>
            status ? palette[statusColors[status]].main : '',
        //@ts-ignore
        width: ({ statusBadgeDiameter }) => statusBadgeDiameter,
        //@ts-ignore
        height: ({ statusBadgeDiameter }) => statusBadgeDiameter,
        //@ts-ignore
        border: ({ badgeBorderColor }) =>
            `2px solid ${
                palette[badgeBorderColor][
                    badgeBorderColor === 'background' ? 'paper' : 'main'
                ]
            }`,
        borderRadius: '50%',
    },
    upperRightBadge: {
        //@ts-ignore
        border: ({ badgeBorderColor }) =>
            `1.5px solid ${
                palette[badgeBorderColor][
                    badgeBorderColor === 'background' ? 'paper' : 'main'
                ]
            }`,
        backgroundColor: palette.primary.main,
        padding: '2px 1px',
        //@ts-ignore
        transform: ({ radius }) =>
            radius ? `scale(${(radius * 2) / 50}) translate(15%,-15%)` : '',
        top: 0,
        right: 0,
    },
    ownerBadge: { color: palette.warning.main },
    pendingTaskInvitation: { color: palette.warning.main },
    acceptedTaskInvitation: { color: palette.success.main, padding: 0 },
    declinedTaskInvitation: { color: palette.error.main },
    leftTaskInvitation: { color: palette.error.main },
}));
