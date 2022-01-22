import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useProfile } from '../../providers/ProfileProvider';
import firebase, { auth } from '../../utilities/getFirebase';
import TextField from '../Inputs/TextField';
import Trans from '../Trans';
import ConfirmationDialog from './ConfirmationDialog';
import { func } from 'prop-types';
import withSnackbarManager from '../withSnackbarManager';

const useStyles = makeStyles(({ palette: { color4, type } }) => ({
    bodyContainer: {},
    passwordInput: {
        color: color4[type],
        maxWidth: 400,
        marginTop: 16,
    },
}));

const ReAuthDialog = ({ handleClose, showSnackbar, ...props }) => {
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
            showSnackbar({ status: 'error', code });
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

ReAuthDialog.propTypes = {
    handleClose: func.isRequired,
    showSnackbar: func.isRequired,
};

export default withSnackbarManager(ReAuthDialog);
