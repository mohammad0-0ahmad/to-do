import { Grid } from '@material-ui/core';
import DialogBase from '../DialogBase';
import Button from '../Inputs/Button';
import { object, func, bool } from 'prop-types';
import Trans from '../Trans';

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
    handleClose,
    closeOnClickOutside,
    ...props
}) => {
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
                            backgroundColorVariant="red"
                            colorVariant="color3"
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
                            backgroundColorVariant="color4"
                            colorVariant="color3"
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
            handleClose={handleClose}
            closeOnClickOutside={closeOnClickOutside}
            {...props}
        />
    );
};

ConfirmationDialog.propTypes = {
    closeOnClickOutside: bool,
    handleClose: func,
    confirmButtonProps: object,
    rejectButtonProps: object,
};

ConfirmationDialog.defaultProps = {
    confirmButtonProps: {},
    rejectButtonProps: {},
};
export default ConfirmationDialog;
