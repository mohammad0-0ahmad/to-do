import { Avatar, Badge, makeStyles } from "@material-ui/core";
import Crown from "./Svg/Crown";
const useStyles = makeStyles(
  ({ palette: { green, yellow, color2, color4, color5, type } }) => ({
    avatar: {
      width: ({ radius }) => (radius ? radius * 2 : ""),
      height: ({ radius }) => (radius ? radius * 2 : ""),
      backgroundColor: color4[type],
      color: color2[type],
      borderColor: `${color5[type]}!important`,
    },
    statusBadge: {
      backgroundColor: ({ status }) => (status === "online" ? green[type] : ""),
      width: 15,
      height: 15,
      border: `2px solid ${color5[type]}`,
      borderRadius: "50%",
    },
    ownerBadge: {
      border: `1.5px solid ${color5[type]}`,
      backgroundColor: color4[type],
      color: yellow[type],
      padding: "2px 1px",
      borderRadius: "50%",
      transform: ({ radius }) =>
        radius ? `scale(${(radius * 2) / 50}) translate(15%,-15%)` : "",
      top: 0,
      right: 0,
    },
  })
);

const UserAvatar = ({ src, radius, status, owner, className }) => {
  const classes = useStyles({ radius, status });
  const avatar = owner ? (
    <Badge
      overlap="circle"
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      classes={{ badge: classes.ownerBadge }}
      badgeContent={<Crown />}
    >
      <Avatar src={src} className={`${classes.avatar} ${className}`} />
    </Badge>
  ) : (
    <Avatar src={src} className={`${classes.avatar} ${className}`} />
  );

  return status ? (
    <Badge
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
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
