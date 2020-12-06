import { List as Org, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ palette: { color3, color4, type } }) => ({
  List: {
    color: color3[type],
    backgroundColor: color4[type],
  },
}));

const List = (props) => {
  const classes = useStyles();

  return <Org className={classes.List} {...props} />;
};

export default List;
