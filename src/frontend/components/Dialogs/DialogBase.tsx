import { ReactNode, useState } from 'react';
import {
    Dialog as Org,
    DialogTitle,
    DialogContent,
    DialogActions,
    makeStyles,
    Grid,
    IconButton,
    DialogProps,
} from '@material-ui/core';
import Close from '../Svg/Close';
import Divider from '../Divider';

const DialogBase: FC<DialogBasePropsType> = ({
    header,
    body,
    footer,
    children,
    paddedBody,
    handleClose,
    closeOnClickOutside,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyle({ paddedBody });

    const show = () => {
        setIsOpen(true);
    };

    const hide = () => {
        handleClose ? handleClose() : setIsOpen(false);
    };

    const shownFooter =
        footer && typeof footer === 'function' ? footer(hide) : footer;

    return (
        <>
            <div onClick={show} className={classes.wrapper}>
                {children}
            </div>
            <Org
                scroll="paper"
                open={isOpen}
                onClose={closeOnClickOutside && hide}
                {...props}
                classes={{ paper: classes.Dialog }}
            >
                {header && (
                    <DialogTitle className={classes.dialogTitle}>
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item>{header}</Grid>
                            <Grid item>
                                <IconButton
                                    onClick={hide}
                                    className={classes.closeButton}
                                >
                                    <Close />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </DialogTitle>
                )}
                <Divider />
                <DialogContent className={classes.contentContainer}>
                    {body}
                </DialogContent>
                {footer && <Divider />}
                <DialogActions>{footer && shownFooter}</DialogActions>
            </Org>
        </>
    );
};

export default DialogBase;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type DialogBasePropsType = PropsWithChildren<
    Omit<DialogProps, 'open'> & {
        handleClose?: () => void;
        paddedBody?: boolean;
        closeOnClickOutside?: boolean;
        header?: ReactNode;
        body: ReactNode;
        footer?: ReactNode;
        open?: DialogProps['open'];
    }
>;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyle = makeStyles(({ palette: { background, text, error } }) => ({
    Dialog: {
        backgroundColor: background.paper,
        color: text.primary,
        width: '-webkit-fill-available',
    },
    dialogTitle: {
        padding: '4px 4px 4px 16px',
    },
    closeButton: { color: error.main },
    contentContainer: {
        minHeight: 100,
        //@ts-ignore
        padding: ({ paddedBody }) => (paddedBody ? 16 : 0),
        whiteSpace: 'pre-line',
        fontSize: 18,
    },
    wrapper: { display: 'contents' },
}));
