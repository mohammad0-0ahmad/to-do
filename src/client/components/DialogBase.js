import { useState } from 'react';
import {
    Dialog as Org,
    DialogTitle,
    DialogContent,
    DialogActions,
    makeStyles,
    Grid,
    IconButton,
} from '@material-ui/core';
import Close from './Svg/Close';
import {
    string,
    element,
    arrayOf,
    oneOfType,
    any,
    bool,
    func,
} from 'prop-types';
import Divider from './Divider';

const useStyle = makeStyles(({ palette: { color1, color5, red, type } }) => ({
    Dialog: {
        backgroundColor: color5[type],
        color: color1[type],
        width: '-webkit-fill-available',
    },
    dialogTitle: {
        padding: '4px 4px 4px 16px',
    },
    closeButton: { color: red[type] },
    contentContainer: {
        minHeight: 100,
        padding: ({ paddedBody }) => (paddedBody ? 16 : 0),
        whiteSpace: 'pre-line',
        fontSize: 18,
    },
    wrapper: { display: 'contents' },
}));

const DialogBase = ({
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
                onClose={closeOnClickOutside && hide()}
                {...props}
                classes={{ paper: classes.Dialog }}
            >
                {header && (
                    <DialogTitle className={classes.dialogTitle}>
                        <Grid
                            container
                            justify="space-between"
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

DialogBase.propTypes = {
    handleClose: func,
    children: any,
    paddedBody: bool,
    closeOnClickOutside: bool,
    header: oneOfType([string, element, bool]),
    body: oneOfType([element, arrayOf(element), string]).isRequired,
    footer: oneOfType([element, arrayOf(element), string, func]),
};
export default DialogBase;
