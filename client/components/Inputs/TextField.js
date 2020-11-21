import { TextField as Org, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ palette: { red, type } }) => ({
  TextField: {
    "& *": {
      color: "currentColor",
    },
    "& .MuiInputLabel-outlined": {
      color:
        type === "light" ? "rgba(0, 0, 0, 0.54)" : "rgba(255, 255, 255, 0.70)",
    },
    "& label.Mui-focused": {
      color: "currentColor",
    },
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: red[type],
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "currentColor",
      },
      "&.Mui-focused fieldset": {
        borderColor: "currentColor",
      },
    },
  },
}));

const TextField = ({ ...props }) => {
  const classes = useStyles();

  return (
    <Org variant="outlined" classes={{ root: classes.TextField }} {...props} />
  );
};

export default TextField;
