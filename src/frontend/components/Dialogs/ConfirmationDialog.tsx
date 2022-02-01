import { ButtonProps, Grid } from '@material-ui/core';
import DialogBase, { DialogBasePropsType } from './DialogBase';
import Button from '../Inputs/Button';
import Trans from '../Trans';

const ConfirmationDialog: FC<ConfirmationDialogPropsType> = ({
    confirmButtonProps: {
        onClick: onConfirm,
        label: confirmLabel,
        ...confirmButtonProps
    } = {},
    rejectButtonProps: {
        onClick: onReject,
        label: rejectLabel,
        ...rejectButtonProps
    } = {},
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
                <Grid container justifyContent="space-between">
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            backgroundColorVariant="error"
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
                            backgroundColorVariant="primary"
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

export default ConfirmationDialog;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type ConfirmationDialogPropsType = DialogBasePropsType & {
    confirmButtonProps?: ConfirmationDialogButtonPropsType;
    rejectButtonProps?: ConfirmationDialogButtonPropsType;
};

type ConfirmationDialogButtonPropsType = Omit<
    ButtonProps,
    'label' | 'onClick'
> & {
    label?: any;
    onClick: () => void;
};
