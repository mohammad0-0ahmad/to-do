import PersonCheck from '../Svg/PersonCheck';
import PersonUncheck from '../Svg/PersonUncheck';
import {
    acceptFriendshipRequest,
    rejectFriendshipRequest,
} from '../../services/friendship';
import withProfileCard from './withProfileCard';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import { string, func } from 'prop-types';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import Trans from '../Trans';
import withSnackbarManager from '../withSnackbarManager';

const useStyles = makeStyles(({ palette: { color4, green, red, type } }) => ({
    userFullName: { color: color4[type] },
    accept: { color: green[type] },
    reject: { color: red[type] },
}));

const FriendshipRequestCard = ({ id, firstName, lastName, showSnackbar }) => {
    const classes = useStyles();
    const userFullName = [firstName, lastName].join(' ');

    const accept = async () => {
        showSnackbar({
            ...(await acceptFriendshipRequest({ id })),
            values: { userFullName },
        });
    };

    const reject = async () => {
        showSnackbar({
            ...(await rejectFriendshipRequest({ id })),
            values: { userFullName },
        });
    };

    return (
        <>
            <ConfirmationDialog
                body={
                    <Trans
                        id="FriendshipRequestCard.dialogs.accept.body"
                        values={{ userFullName }}
                        components={[
                            <Typography
                                key={userFullName}
                                component="span"
                                className={classes.userFullName}
                            />,
                        ]}
                    />
                }
                confirmButtonProps={{ onClick: accept }}
            >
                <IconButton className={classes.accept}>
                    <PersonCheck />
                </IconButton>
            </ConfirmationDialog>
            <ConfirmationDialog
                body={
                    <Trans
                        id="FriendshipRequestCard.dialogs.reject.body"
                        values={{ userFullName }}
                        components={[
                            <Typography
                                key={userFullName}
                                component="span"
                                className={classes.userFullName}
                            />,
                        ]}
                    />
                }
                confirmButtonProps={{ onClick: reject }}
            >
                <IconButton className={classes.reject}>
                    <PersonUncheck />
                </IconButton>
            </ConfirmationDialog>
        </>
    );
};

FriendshipRequestCard.propTypes = {
    id: string.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired,
    showSnackbar: func.isRequired,
};

export default withSnackbarManager(withProfileCard(FriendshipRequestCard));
