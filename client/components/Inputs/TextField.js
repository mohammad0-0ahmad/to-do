import { TextField as Org, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({}) => ({}));

const TextField = ({ ...props }) => {
  const classes = useStyles();

  return <Org variant="outlined" {...props} />;
};

export default TextField;
