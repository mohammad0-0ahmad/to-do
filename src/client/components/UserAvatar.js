import { Avatar, Badge, Grid, makeStyles } from '@material-ui/core';
import Crown from './Svg/Crown';
import { string, number, bool, oneOf } from 'prop-types';
import userStatus from '../constants/userStatus';
import { useState } from 'react';
import Upload from './Svg/Upload';

//TODO: changeable hover effect.
const useStyles = makeStyles(({ palette: { type, ...palette } }) => ({
    avatarContainer: {
        cursor: ({ changeable }) => (changeable ? 'pointer' : ''),
    },
    avatar: {
        width: ({ radius }) => (radius ? radius * 2 : ''),
        height: ({ radius }) => (radius ? radius * 2 : ''),
        color: palette.color2[type],
        backgroundColor: ({ hasAnAvatar }) =>
            hasAnAvatar ? 'transparent' : palette.color4[type],
    },
    hoveredChangeable: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        color: palette.grey[type],
        fontSize: ({ radius }) => (radius ? radius / 1.5 : 10),
        borderRadius: '50%',
        backdropFilter: 'blur(3px) brightness(0.9)',
    },
    statusBadge: {
        backgroundColor: ({ status }) => {
            const color = palette[userStatus[status]];
            return color ? color[type] : '';
        },
        //width: ({ radius }) => (radius ? radius / 4 : 15),
        //height: ({ radius }) => (radius ? radius / 4 : 15),
        width: ({ statusBadgeDiameter }) => statusBadgeDiameter,
        height: ({ statusBadgeDiameter }) => statusBadgeDiameter,
        border: ({ badgeBorderColor }) =>
            `2px solid ${palette[badgeBorderColor][type]}`,
        borderRadius: '50%',
    },
    ownerBadge: {
        border: ({ badgeBorderColor }) =>
            `1.5px solid ${palette[badgeBorderColor][type]}`,
        backgroundColor: palette.color4[type],
        color: palette.yellow[type],
        padding: '2px 1px',
        borderRadius: '50%',
        transform: ({ radius }) =>
            radius ? `scale(${(radius * 2) / 50}) translate(15%,-15%)` : '',
        top: 0,
        right: 0,
    },
}));

const UserAvatar = ({
    src,
    radius,
    status,
    owner,
    className,
    changeable,
    badgeBorderColor,
    ...props
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const classes = useStyles({
        radius,
        statusBadgeDiameter: radius / 4 > 10 ? radius / 4 : 15,
        status,
        hasAnAvatar: src,
        changeable,
        badgeBorderColor,
    });

    const avatarBase = (
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
                src={src}
                className={`${classes.avatar} ${className}`}
                {...props}
            />
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
    badgeBorderColor: oneOf(['color4', 'color5']),
    radius: number,
    status: oneOf([...Object.keys(userStatus), false]),
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
