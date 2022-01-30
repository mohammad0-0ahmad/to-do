import { ButtonBase, ButtonProps, makeStyles } from '@material-ui/core';
import colors from '../../constants/palettes';

const Button: FC<ButtonPropsType> = ({
    fullWidth,
    backgroundColorVariant,
    colorVariant,
    ...props
}) => {
    const classes = useStyles({
        fullWidth,
        colorVariant,
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

export type ButtonPropsType = ButtonProps & {
    backgroundColorVariant?: keyof typeof colors;
    colorVariant?: keyof typeof colors;
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
            color: ({ colorVariant }) =>
                colorVariant ? palette[colorVariant][type] : '',
            //@ts-ignore
            backgroundColor: ({ backgroundColorVariant }) =>
                backgroundColorVariant
                    ? palette[backgroundColorVariant][type]
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
