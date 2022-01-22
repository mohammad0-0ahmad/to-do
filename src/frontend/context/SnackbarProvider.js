import { IconButton, makeStyles } from '@material-ui/core';
import { SnackbarProvider as Org } from 'notistack';
import { useRef } from 'react';
import Close from '../components/Svg/Close';

const useStyles = makeStyles(
    ({ palette: { color2, color4, yellow, green, red, type } }) => ({
        root: {
            '&>div': {
                backgroundColor: `${color4[type]}`,
                color: `${color2[type]} !important`,
                whiteSpace: 'pre-line',
            },
        },
        closeButton: { color: color2[type], fontSize: 18 },
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
    const ref = useRef();
    const settings = {
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        },
        classes: {
            root: classes.root,
            variantSuccess: classes.variantSuccess,
            variantWarning: classes.variantWarning,
            variantError: classes.variantError,
            variantInfo: classes.variantInfo,
        },
    };
    const action = (key) => (
        <IconButton
            className={classes.closeButton}
            onClick={() => ref.current.closeSnackbar(key)}
        >
            <Close />
        </IconButton>
    );
    return <Org {...props} {...settings} action={action} ref={ref} />;
};

export default SnackbarProvider;
