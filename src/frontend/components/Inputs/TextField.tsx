import { useState } from 'react';
import {
    TextField as MuiTextField,
    makeStyles,
    InputAdornment,
    OutlinedInput,
    IconButton,
    FormControl,
    InputLabel,
    TextFieldProps,
    OutlinedInputProps,
    FormControlProps,
} from '@material-ui/core';
import Eye from '../Svg/Eye';

const TextField: FC<TextFieldPropsType> = ({ fullWidth, label, ...props }) => {
    const classes = useStyles({ fullWidth });
    const [visiblePassword, setVisiblePassword] = useState(false);

    return props.type === 'password' ? (
        <FormControl
            classes={{ root: classes.TextField }}
            variant="outlined"
            {...(props as FormControlProps)}
        >
            <InputLabel htmlFor="outlined-adornment-password">
                {label}
            </InputLabel>
            <OutlinedInput
                label={label}
                endAdornment={
                    <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                    >
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
                {...(props as OutlinedInputProps)}
                type={visiblePassword ? 'text' : 'password'}
            />
        </FormControl>
    ) : (
        <MuiTextField
            classes={{ root: classes.TextField }}
            label={label}
            //@ts-ignore
            variant={props.variant || 'outlined'}
            {...(props as TextFieldProps)}
        />
    );
};

export default TextField;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type TextFieldPropsType =
    | (TextFieldProps & {
          type: 'password';
          label: JSX.Element | string;
      })
    | (TextFieldProps & {
          type?: Exclude<TextFieldProps['type'], 'password'>;
      });

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { error, transparent } }) => ({
    TextField: {
        //@ts-ignore
        width: ({ fullWidth }) => (fullWidth ? '100%' : ''),
        color: 'currentColor',
        '& .MuiInput-underline:after , .MuiInput-underline:hover:not(.Mui-disabled):before':
            {
                borderColor: 'currentColor',
            },
        '& .MuiFormLabel-root': {
            color: transparent,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
        },
        '& label.Mui-focused': {
            color: 'currentColor',
        },
        '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: error.main,
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
        '&>*': {
            color: transparent,
        },
        '&:hover': {
            opacity: 1,
            '&>*': {
                color: 'currentColor',
            },
        },
    },
}));
