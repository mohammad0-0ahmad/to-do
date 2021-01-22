import { makeStyles } from '@material-ui/core';
import { SnackbarProvider as Org } from 'notistack';

const useStyles = makeStyles(
    ({ palette: { color2, color4, yellow, green, red, type } }) => ({
        root: {
            '&>div': {
                backgroundColor: `${color4[type]}`,
                color: `${color2[type]} !important`,
                whiteSpace: 'pre-line',
            },
        },
        variantError: {
            backgroundColor: `${red[type]} !important`,
            color: `${color2[type]} !important`,
            whiteSpace: 'pre-line',
        },
        variantSuccess: {
            backgroundColor: `${green[type]} !important`,
            color: `${color2[type]} !important`,
            whiteSpace: 'pre-line',
        },
        variantWarning: {
            backgroundColor: `${yellow[type]} !important`,
            color: `${color2[type]} !important`,
            whiteSpace: 'pre-line',
        },
        variantInfo: {
            backgroundColor: `${color4[type]} !important`,
            color: `${color2[type]} !important`,
            whiteSpace: 'pre-line',
        },
    })
);
const SnackbarProvider = (props) => {
    const classes = useStyles();

    const settings = {
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        },
        classes: classes,
    };
    return <Org {...props} {...settings} />;
};

export default SnackbarProvider;
