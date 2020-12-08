import { ButtonBase as Org, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(
    ({
        palette: { type },
        fonts: {
            family: { primary },
        },
    }) => ({
        Button: {
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

const Button = ({ ...props }) => {
    const classes = useStyles();

    return <Org classes={{ root: classes.Button }} {...props} />;
};

export default Button;
