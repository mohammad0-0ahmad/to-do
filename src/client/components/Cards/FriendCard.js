import PersonMinus from '../Svg/PersonMinus';
import withProfileCard from './withProfileCard';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import { string, func } from 'prop-types';
import { unfriend } from '../../services/friendship';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import Trans from '../Trans';
import withSnackbarManager from '../withSnackbarManager';

const useStyles = makeStyles(({ palette: { color4, red, type } }) => ({
    userFullName: { color: color4[type] },
    removeFriend: { color: red[type] },
}));

const FriendCard = ({ id, firstName, lastName, showSnackbar }) => {
    const classes = useStyles();
    const userFullName = [firstName, lastName].join(' ');

    const handleRemoveFriend = async () => {
        showSnackbar({ ...(await unfriend({ id })), values: { userFullName } });
    };

    return (
        <ConfirmationDialog
            body={
                <Trans
                    id="FriendCard.dialogs.unfriend.body"
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
            confirmButtonProps={{ onClick: handleRemoveFriend }}
        >
            <IconButton className={classes.removeFriend}>
                <PersonMinus />
            </IconButton>
        </ConfirmationDialog>
    );
};

FriendCard.propTypes = {
    id: string.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired,
    showSnackbar: func.isRequired,
};

export default withSnackbarManager(withProfileCard(FriendCard));
