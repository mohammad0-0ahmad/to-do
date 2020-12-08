import { useState } from 'react';
import {
    TextField as Org,
    makeStyles,
    InputAdornment,
    OutlinedInput,
    IconButton,
    FormControl,
    InputLabel,
} from '@material-ui/core';
import Eye from '../Svg/Eye';
import { string,bool,oneOfType,element} from 'prop-types';

const useStyles = makeStyles(({ palette: { red, transparent, type } }) => ({
    TextField: {
        width: ({ fullWidth }) => (fullWidth ? '100%' : ''),
        color: 'currentColor',
        '& .MuiInput-underline:after , .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderColor: 'currentColor',
        },
        '& .MuiFormLabel-root': {
            color: transparent[type],
        },
        '& label.Mui-focused': {
            color: 'currentColor',
        },
        '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: red[type],
        },
        '& .MuiInputBase-root': {
            color: 'currentColor',
            '&:hover fieldset': {
                borderColor: 'currentColor',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'currentColor',
            },
        },
    },
    inputAdornment: {
        opacity: 0.6,
        '&:hover': {
            opacity: 1,
            '&>*': {
                color: 'currentColor',
            },
        },
    },
}));

const TextField = ({ fullWidth, label, ...props }) => {
    const classes = useStyles({ fullWidth });
    const [visiblePassword, setVisiblePassword] = useState(false);

    return props.type === 'password' ? (
        <FormControl classes={{ root: classes.TextField }} {...props}>
            <InputLabel htmlFor="outlined-adornment-password" {...props}>
                {label}
            </InputLabel>
            <OutlinedInput
                label={label}
                {...props}
                endAdornment={
                    <InputAdornment position="end" className={classes.inputAdornment}>
                        <IconButton
                            onClick={() => {
                                setVisiblePassword(!visiblePassword);
                            }}
                            edge="end"
                        >
                            <Eye closed={!visiblePassword} />
                        </IconButton>
                    </InputAdornment>
                }
                {...props}
                type={visiblePassword ? 'text' : 'password'}
            />
        </FormControl>
    ) : (
        <Org classes={{ root: classes.TextField }} label={label} {...props} />
    );
};

TextField.propTypes = {
    fullWidth: bool,
    variant:string,
    type: string,
    label: oneOfType([element,string])
};

TextField.defaultProps = {
    variant: 'outlined',
};

export default TextField;
