import PersonPlus from '../Svg/PersonPlus';
import { sendFriendshipRequest } from '../../services/friendship';
import withProfileCard from './withProfileCard';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import { string, func } from 'prop-types';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import Trans from '../Trans';
import withSnackbar from '../withSnackbarManager';

const useStyles = makeStyles(({ palette: { color4, green, type } }) => ({
    userFullName: { color: color4[type] },
    addFriend: { color: green[type] },
}));

const PersonCard = ({ id, firstName, lastName, showSnackbar }) => {
    const classes = useStyles();
    const userFullName = [firstName, lastName].join(' ');
    const addFriend = async () => {
        showSnackbar({
            ...(await sendFriendshipRequest({ id })),
            values: { userFullName },
        });
    };

    return (
        <ConfirmationDialog
            body={
                <Trans
                    id="PersonCard.sendFriendshipRequestDialog.body"
                    components={[
                        <Typography
                            key={userFullName}
                            component="span"
                            className={classes.userFullName}
                        />,
                    ]}
                    values={{
                        userFullName,
                    }}
                />
            }
            confirmButtonProps={{ onClick: addFriend }}
        >
            <IconButton className={classes.addFriend}>
                <PersonPlus />
            </IconButton>
        </ConfirmationDialog>
    );
};

PersonCard.propTypes = {
    id: string.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired,
    showSnackbar: func.isRequired,
};

export default withSnackbar(withProfileCard(PersonCard));
