import {
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { string, bool } from "prop-types";
import Profile from "../Svg/Profile";
import PersonPlus from "../Svg/PersonPlus";
import PersonMinus from "../Svg/PersonMinus";
import UserAvatar from "../UserAvatar";

const useStyles = makeStyles(
  ({ palette: { color1, color4, color5, red, type } }) => ({
    PersonCard: {
      marginTop: 16,
      marginBottom: 16,
      maxWidth: 568,
      minHeight: 82,
      padding: 16,
      backgroundColor: color5[type],
      color: color1[type],
    },
    containerItem: { width: "fit-content" },
    name: { marginLeft: 16 },
    buttonsContainer: { fontSize: 30 },
    profile: { color: color4[type] },
    addFriend: { color: color4[type] },
    removeFriend: { color: red[type] },
  })
);

const PersonCard = ({ alreadyFriend, status, src, name, ...props }) => {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.PersonCard} {...props}>
      <Grid container alignContent="center" justify="space-between">
        <Grid container alignItems="center" className={classes.containerItem}>
          <UserAvatar
            src={src}
            radius={25}
            status={alreadyFriend ? status : false}
          />
          <Typography component="p" className={classes.name}>
            {name}
          </Typography>
        </Grid>
        <Grid
          container
          className={`${classes.containerItem} ${classes.buttonsContainer}`}
        >
          <IconButton className={classes.profile}>
            <Profile />
          </IconButton>
          {!alreadyFriend && (
            <IconButton className={classes.addFriend}>
              <PersonPlus />
            </IconButton>
          )}
          {alreadyFriend && (
            <IconButton className={classes.removeFriend}>
              <PersonMinus />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

PersonCard.propTypes = {
  src: string.isRequired,
  alreadyFriend: bool,
  name: string.isRequired,
};

export default PersonCard;
