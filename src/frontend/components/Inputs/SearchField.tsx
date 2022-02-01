import Search from '../Svg/Search';
import {
    makeStyles,
    InputAdornment,
    OutlinedInput,
    FormControl,
    InputLabel,
    Paper,
    OutlinedInputProps,
} from '@material-ui/core';

const SearchField: FC<SearchFieldPropsType> = ({ label, ...props }) => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <FormControl classes={{ root: classes.SearchField }}>
                <InputLabel variant="outlined">{label}</InputLabel>
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

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type SearchFieldPropsType = OutlinedInputProps & {};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(
    ({ palette: { primary, text, background, error, transparent } }) => ({
        paper: {
            backgroundColor: background.paper,
            padding: 16,
            boxShadow: 'inset 0px 0px 5px rgba(0, 0, 0, 0.25)',
            width: '100%',
        },
        SearchField: {
            backgroundColor: text.secondary,
            width: '100%',
            color: primary.main,
            '& .MuiInput-underline:after , .MuiInput-underline:hover:not(.Mui-disabled):before':
                {
                    borderColor: primary.main,
                },
            '& .MuiFormLabel-root': {
                color: transparent,
            },
            '& label.Mui-focused': {
                color: primary.main,
            },
            '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline':
                {
                    borderColor: error.main,
                },
            '& .MuiInputBase-root': {
                color: primary.main,
                '& fieldset': {
                    borderWidth: 2,
                },
                '&:not(.Mui-disabled):hover fieldset': {
                    borderColor: primary.main,
                },
                '&.Mui-focused fieldset': {
                    borderColor: primary.main,
                },
            },
        },
    })
);
