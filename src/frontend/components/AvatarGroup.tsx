import { makeStyles } from '@material-ui/core';
import MuiAvatarGroup, { AvatarGroupProps } from '@material-ui/lab/AvatarGroup';

//TODO: Check if it possible to override MuiAvatarGroup instead.
const AvatarGroup: FC<AvatarGroupProps> = ({ className, ...props }) => {
    const classes = useStyles();
    return (
        <MuiAvatarGroup
            max={4}
            {...props}
            className={`${classes.AvatarGroup} ${className}`}
        />
    );
};

export default AvatarGroup;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */
const useStyles = makeStyles(
    ({ palette: { color2, color4, color5, type } }) => ({
        AvatarGroup: {
            '& .MuiAvatar-colorDefault': {
                backgroundColor: color4[type],
                color: color2[type],
                borderColor: `${color5[type]}!important`,
            },
        },
    })
);
