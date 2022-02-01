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
const useStyles = makeStyles(({ palette: { primary, text, background } }) => ({
    AvatarGroup: {
        '& .MuiAvatar-colorDefault': {
            backgroundColor: primary.main,
            color: text.secondary,
            borderColor: `${background.paper}!important`,
        },
    },
}));
