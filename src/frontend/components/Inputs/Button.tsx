import { ButtonBase, ButtonProps, makeStyles } from '@material-ui/core';
import { Palette } from '@material-ui/core/styles/createPalette';

const Button: FC<ButtonPropsType> = ({
    fullWidth,
    backgroundColorVariant,
    ...props
}) => {
    const classes = useStyles({
        fullWidth,
        backgroundColorVariant,
    });
    const passableProps = { ...props };

    // Note: Delete some props that should not be passed to ButtonBase.
    delete passableProps.disableElevation;
    delete passableProps.disableFocusRipple;

    return <ButtonBase classes={{ root: classes.Button }} {...passableProps} />;
};

export default Button;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
type PossibleColors = keyof Pick<
    Palette,
    'primary' | 'secondary' | 'success' | 'warning' | 'error'
>;

export type ButtonPropsType = ButtonProps & {
    backgroundColorVariant?: PossibleColors;
};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(
    ({
        palette: { type, ...palette },

        fonts: {
            family: { primary },
        },
    }) => ({
        Button: {
            //@ts-ignore
            color: ({ backgroundColorVariant }) =>
                backgroundColorVariant
                    ? palette[backgroundColorVariant].contrastText
                    : '',
            //@ts-ignore
            backgroundColor: ({ backgroundColorVariant }) =>
                backgroundColorVariant
                    ? palette[backgroundColorVariant].main
                    : '',
            //@ts-ignore
            width: ({ fullWidth }) => (fullWidth ? '100%' : ''),
            padding: '8px 6px',
            minWidth: 64,
            fontSize: '1em',
            fontFamily: primary,
            fontWeight: 500,
            lineHeight: 1.75,
            borderRadius: 4,
            textTransform: 'capitalize',
            filter: type === 'light' ? 'brightness(1)' : 'brightness(0.90)',
            '&:hover': {
                filter: type === 'light' ? 'brightness(0.95)' : 'brightness(1)',
            },
        },
    })
);
