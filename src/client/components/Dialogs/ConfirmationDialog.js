import { Grid, makeStyles } from '@material-ui/core';
import DialogBase from '../DialogBase';
import Button from '../Inputs/Button';
import { object } from 'prop-types';
import Trans from '../Trans';

const useStyles = makeStyles(({ palette: { color3, color4, red, type } }) => ({
    confirmButton: { backgroundColor: color4[type], color: color3[type] },
    rejectButton: { backgroundColor: red[type], color: color3[type] },
}));

const ConfirmationDialog = ({
    confirmButtonProps: {
        onClick: onConfirm,
        label: confirmLabel,
        ...confirmButtonProps
    },
    rejectButtonProps: {
        onClick: onReject,
        label: rejectLabel,
        ...rejectButtonProps
    },
    ...props
}) => {
    const classes = useStyles();
    const confirmHandle = (close) => {
        onConfirm && onConfirm();
        close();
    };
    const rejectHandle = (close) => {
        onReject && onReject();
        close();
    };

    return (
        <DialogBase
            paddedBody
            header={<Trans id="ConfirmationDialog.header" />}
            footer={(close) => (
                <Grid container justify="space-between">
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            className={classes.rejectButton}
                            {...rejectButtonProps}
                            onClick={() => rejectHandle(close)}
                        >
                            {rejectLabel || (
                                <Trans id="ConfirmationDialog.rejectButton" />
                            )}
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            className={classes.confirmButton}
                            {...confirmButtonProps}
                            onClick={() => confirmHandle(close)}
                        >
                            {confirmLabel || (
                                <Trans id="ConfirmationDialog.confirmButton" />
                            )}
                        </Button>
                    </Grid>
                </Grid>
            )}
            {...props}
        />
    );
};

ConfirmationDialog.propTypes = {
    confirmButtonProps: object,
    rejectButtonProps: object,
};

ConfirmationDialog.defaultProps = {
    confirmButtonProps: {},
    rejectButtonProps: {},
};
export default ConfirmationDialog;
