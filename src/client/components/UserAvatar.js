import { Avatar, Badge, makeStyles } from '@material-ui/core';
import Crown from './Svg/Crown';
import { string, number, bool } from 'prop-types';
import userStatus from '../constants/userStatus';
//TODO: changeable hover effect.
const useStyles = makeStyles(
    ({ palette: { color2, color4, color5, type, ...palette } }) => ({
        avatar: {
            width: ({ radius }) => (radius ? radius * 2 : ''),
            height: ({ radius }) => (radius ? radius * 2 : ''),
            color: color2[type],
            borderColor: `${color5[type]}!important`,
            backgroundColor: ({ hasAnAvatar }) =>
                hasAnAvatar ? 'transparent' : color4[type],
            cursor: ({ changeable }) => (changeable ? 'pointer' : ''),
        },
        statusBadge: {
            backgroundColor: ({ status }) => {
                const color = palette[userStatus[status]];
                return color ? color[type] : '';
            },
            width: ({ radius }) => (radius ? radius / 4 : 15),
            height: ({ radius }) => (radius ? radius / 4 : 15),
            border: `2px solid ${color5[type]}`,
            borderRadius: '50%',
        },
        ownerBadge: {
            border: `1.5px solid ${color5[type]}`,
            backgroundColor: color4[type],
            color: palette.yellow[type],
            padding: '2px 1px',
            borderRadius: '50%',
            transform: ({ radius }) =>
                radius ? `scale(${(radius * 2) / 50}) translate(15%,-15%)` : '',
            top: 0,
            right: 0,
        },
    })
);

const UserAvatar = ({ src, radius, status, owner, className,changeable, ...props }) => {
    const classes = useStyles({
        radius,
        status,
        hasAnAvatar: src,
        changeable,
    });
    const avatarBase = (
        <Avatar src={src} className={`${classes.avatar} ${className}`} {...props} />
    );
    const avatar = owner ? (
        <Badge
            overlap="circle"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            classes={{ badge: classes.ownerBadge }}
            badgeContent={<Crown />}
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
    src: string,
    radius: number,
    status: string,
    owner: bool,
    className: string,
    changeable: bool,
};

export default UserAvatar;
