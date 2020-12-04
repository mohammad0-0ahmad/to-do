import { Grid, makeStyles, IconButton } from "@material-ui/core";
import AvatarGroup from "../AvatarGroup";
import TextField from "../Inputs/TextField";
import Button from "../Inputs/Button";
import Trans from "../Trans";
import UserAvatar from "../UserAvatar";
import Plus from "../Svg/Plus";

const useStyles = makeStyles(
  ({ palette: { transparent, color3, color4, color5, red, type } }) => ({
    TaskGenerator: {
      backgroundColor: color5[type],
      color: color4[type],
      maxWidth: 568,
      padding: 16,
      boxShadow: "inset 0px 0px 5px rgba(0, 0, 0, 0.25)",
      borderRadius: 4,
      marginTop: 16,
      "& .MuiFormLabel-root": {
        fontSize: 18,
      },
    },
    bottomMargin: {
      marginBottom: 16,
    },
    avatarGroup: {
      width: "fit-content",
    },
    participantsLabel: {
      color: transparent[type],
    },
    addParticipantButton: {
      color: color4[type],
    },
    cancelButton: {
      backgroundColor: red[type],
      color: color3[type],
      width: "100%",
    },
    createButton: {
      backgroundColor: color4[type],
      color: color3[type],
      width: "100%",
    },
  })
);
const TaskGenerator = ({}) => {
  const classes = useStyles();

  return (
    <form>
      <Grid container className={classes.TaskGenerator}>
        <Grid
          container
          justify="space-between"
          className={classes.bottomMargin}
        >
          <Grid item xs={7}>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                label={<Trans id="TaskGenerator.label1" />}
                className={classes.bottomMargin}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <label className={classes.participantsLabel}>
                <Trans id="TaskGenerator.label2" />
                <Grid container alignItems="center">
                  <Grid item>
                    <AvatarGroup max={4}>
                      <UserAvatar radius={20} />
                      <UserAvatar radius={20} />
                      <UserAvatar radius={20} />
                      <UserAvatar radius={20} />
                      <UserAvatar radius={20} />
                      <UserAvatar radius={20} />
                    </AvatarGroup>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.addParticipantButton}>
                      <Plus />
                    </IconButton>
                  </Grid>
                </Grid>
              </label>
            </Grid>
          </Grid>
          <Grid item>
            <UserAvatar radius={50} owner />
          </Grid>
        </Grid>
        <Grid container className={classes.bottomMargin}>
          <Grid item xs={6}>
            <TextField
              variant="standard"
              type="date"
              label={<Trans id="TaskGenerator.label3" />}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Grid
          container
          justify="space-between"
          className={classes.bottomMargin}
        >
          <Grid item xs={5}>
            <TextField
              variant="standard"
              type="time"
              label={<Trans id="TaskGenerator.label4" />}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              variant="standard"
              type="time"
              label={<Trans id="TaskGenerator.label5" />}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Grid container className={classes.bottomMargin}>
          <TextField
            rows={6}
            multiline
            fullWidth
            label={<Trans id="TaskGenerator.label6" />}
          />
        </Grid>
        <Grid container justify="space-between">
          <Grid item xs={5}>
            <Button className={classes.cancelButton}>
              <Trans id="TaskGenerator.button1" />
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button type="submit" className={classes.createButton}>
              <Trans id="TaskGenerator.button2" />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default TaskGenerator;
