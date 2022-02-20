import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useProfile } from '../../providers/ProfileProvider';
import firebase, { auth } from '../../utilities/getFirebase';
import TextField from '../Inputs/TextField';
import Trans from '../Trans';
import ConfirmationDialog from './ConfirmationDialog';
import withSnackbarManager, {
    WithSnackbarManagerType,
} from '../../HOCs/withSnackbarManager';
import { ResponseStatus } from 'src/globalConstants';

const ReAuthDialog: FC<ReAuthDialogPropsType> = ({
    handleClose,
    showSnackbar,
    ...props
}) => {
    const classes = useStyles();
    const { email } = useProfile() || {};
    const [password, setPassword] = useState('');
    const handleReAuth = async () => {
        try {
            const cred = firebase.auth.EmailAuthProvider.credential(
                email,
                password
            );
            await auth.currentUser.reauthenticateWithCredential(cred);
            handleClose(2);
        } catch ({ code }) {
            showSnackbar({ status: ResponseStatus.error, code });
        }
    };
    const handleCloseToPass = () => handleClose(0);

    return (
        <ConfirmationDialog
            handleClose={handleCloseToPass}
            confirmButtonProps={{
                onClick: handleReAuth,
            }}
            header={<Trans id="ReAuthDialog.header" />}
            body={
                <Grid
                    container
                    direction="column"
                    className={classes.bodyContainer}
                    alignItems="center"
                >
                    <Grid container>
                        <Typography component="p">
                            <Trans id="ReAuthDialog.body" />
                        </Typography>
                    </Grid>
                    <TextField
                        fullWidth
                        type="password"
                        className={classes.passwordInput}
                        label={<Trans id="ReAuthDialog.label1" />}
                        onChange={({ target: { value } }) => setPassword(value)}
                    />
                </Grid>
            }
            {...props}
        />
    );
};

export default withSnackbarManager(ReAuthDialog);

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type ReAuthDialogPropsType = WithSnackbarManagerType<{
    handleClose: (e?: number) => void;
}>;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { primary } }) => ({
    bodyContainer: {},
    passwordInput: {
        color: primary.main,
        maxWidth: 400,
        marginTop: 16,
    },
}));
