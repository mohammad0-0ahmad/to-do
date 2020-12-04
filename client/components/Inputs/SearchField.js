import {
  makeStyles,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
  Paper,
} from "@material-ui/core";
import Search from "../Svg/Search";

const useStyles = makeStyles(
  ({ palette: { red, color2, color4, color5, transparent, type } }) => ({
    paper: {
      backgroundColor: color5[type],
      padding: 16,
      marginTop: 16,
      marginBottom: 16,
      boxShadow: "inset 0px 0px 5px rgba(0, 0, 0, 0.25)",
      width: "100%",
    },
    SearchField: {
      backgroundColor: color2[type],
      width: "100%",
      color: color4[type],
      "& .MuiInput-underline:after , .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderColor: color4[type],
      },
      "& .MuiFormLabel-root": {
        color: transparent[type],
      },
      "& label.Mui-focused": {
        color: color4[type],
      },
      "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: red[type],
      },
      "& .MuiInputBase-root": {
        color: color4[type],
        "& fieldset": {
          borderWidth: 2,
        },
        "&:hover fieldset": {
          borderColor: color4[type],
        },
        "&.Mui-focused fieldset": {
          borderColor: color4[type],
        },
      },
    },
  })
);

const SearchField = ({ label, ...props }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <FormControl classes={{ root: classes.SearchField }} {...props}>
        <InputLabel variant="outlined" {...props}>
          {label}
        </InputLabel>
        <OutlinedInput
          label={label}
          {...props}
          endAdornment={
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          }
          {...props}
          type="text"
        />
      </FormControl>
    </Paper>
  );
};

export default SearchField;
