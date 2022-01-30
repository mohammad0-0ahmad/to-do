import PersonPlus from '../Svg/PersonPlus';
import { sendFriendshipRequest } from '../../services/friendship';
import withProfileCard from '../../HOCs/withProfileCard';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import Trans from '../Trans';
import withSnackbarManager, {
    WithSnackbarManagerType,
} from '../../HOCs/withSnackbarManager';
import Tooltip from '../Tooltip';

const PersonCard: FC<PersonCardPropsType> = ({
    uid,
    firstName,
    lastName,
    showSnackbar,
}) => {
    const classes = useStyles();
    const userFullName = [firstName, lastName].join(' ');
    const addFriend = async () => {
        showSnackbar({
            ...(await sendFriendshipRequest({ personId: uid })),
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
            <Tooltip
                titleTransId="PersonCard.toolTips.label1"
                backgroundColorPaletteVariable="green"
            >
                <IconButton className={classes.addFriend}>
                    <PersonPlus />
                </IconButton>
            </Tooltip>
        </ConfirmationDialog>
    );
};

export default withSnackbarManager(withProfileCard(PersonCard));

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type PersonCardPropsType = WithSnackbarManagerType<{
    uid?: string;
    firstName?: string;
    lastName?: string;
}>;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { color4, green, type } }) => ({
    userFullName: { color: color4[type] },
    addFriend: { color: green[type] },
}));
