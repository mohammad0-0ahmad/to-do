import { makeStyles } from "@material-ui/core";
import Org from "@material-ui/lab/AvatarGroup";

const useStyles = makeStyles(
  ({ palette: { color2, color4, color5, type } }) => ({
    AvatarGroup: {
      "& .MuiAvatar-colorDefault": {
        backgroundColor: color4[type],
        color: color2[type],
        borderColor: `${color5[type]}!important`,
      },
    },
  })
);

const AvatarGroup = ({ className, ...props }) => {
  const classes = useStyles();
  return (
    <Org max={4} {...props} className={`${classes.AvatarGroup} ${className}`} />
  );
};

export default AvatarGroup;
