import { useRef } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { SnackbarProvider as Org } from 'notistack';
import Close from '../components/Svg/Close';

const SnackbarProvider: FC<any> = (props) => {
    const classes = useStyles();
    const ref = useRef(null);
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

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(
    ({ palette: { primary, text, warning, success, error } }) => ({
        root: {
            '&>div': {
                backgroundColor: `${primary.main}`,
                color: `${text.secondary} !important`,
                whiteSpace: 'pre-line',
            },
        },
        closeButton: { color: text.secondary, fontSize: 18 },
        variantError: {
            backgroundColor: `${error.main} !important`,
            color: `${text.secondary} !important`,
            whiteSpace: 'pre-line',
        },
        variantSuccess: {
            backgroundColor: `${success.main} !important`,
            color: `${text.secondary} !important`,
            whiteSpace: 'pre-line',
        },
        variantWarning: {
            backgroundColor: `${warning.main} !important`,
            color: `${text.secondary} !important`,
            whiteSpace: 'pre-line',
        },
        variantInfo: {
            backgroundColor: `${primary.main} !important`,
            color: `${text.secondary} !important`,
            whiteSpace: 'pre-line',
        },
    })
);
