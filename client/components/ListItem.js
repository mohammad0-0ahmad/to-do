import {
  ListItem as Org,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(({}) => ({
  ListItem: { minWidth: 250, padding: 16 },
  listItemIcon: {
    minWidth: "auto",
    marginRight: 16,
    fontSize: 30,
    color: "currentColor",
  },
  listItemText: {},
}));

const ListItem = ({ icon, label, ...props }) => {
  const classes = useStyles();
  return (
    <Org button className={classes.ListItem} {...props}>
      <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
      <ListItemText className={classes.listItemText}>{label}</ListItemText>
    </Org>
  );
};

export default ListItem;
