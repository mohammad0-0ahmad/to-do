import { ButtonBase, makeStyles } from '@material-ui/core';
import { bool, oneOf } from 'prop-types';
import colors from '../../constants/colors';

const useStyles = makeStyles(
    ({
        palette: { type, ...palette },
        fonts: {
            family: { primary },
        },
    }) => ({
        Button: {
            color: ({ colorVariant }) =>
                colorVariant ? palette[colorVariant][type] : '',
            backgroundColor: ({ backgroundColorVariant }) =>
                backgroundColorVariant
                    ? palette[backgroundColorVariant][type]
                    : '',
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

const Button = ({
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

Button.propTypes = {
    fullWidth: bool,
    backgroundColorVariant: oneOf(Object.keys(colors)),
    colorVariant: oneOf(Object.keys(colors)),
};

export default Button;
