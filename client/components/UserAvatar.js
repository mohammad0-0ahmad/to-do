import { Avatar, Badge, makeStyles } from "@material-ui/core";
const useStyles = makeStyles(({ palette: { green, color5, type } }) => ({
  avatar: {
    width: ({ radius }) => (radius ? radius * 2 : ""),
    height: ({ radius }) => (radius ? radius * 2 : ""),
  },
  badge: {
    backgroundColor: ({ status }) => (status === "online" ? green[type] : ""),
    width: 15,
    height: 15,
    border: `2px solid ${color5[type]}`,
    borderRadius: "50%",
  },
}));

const UserAvatar = ({ src, radius, status, className }) => {
  const classes = useStyles({ radius, status });
  return status ? (
    <Badge
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      variant="dot"
      classes={{ badge: classes.badge }}
      className={className}
    >
      <Avatar src={src} className={classes.avatar} />
    </Badge>
  ) : (
    <Avatar src={src} className={`${classes.avatar} ${className}`} />
  );
};

export default UserAvatar;
