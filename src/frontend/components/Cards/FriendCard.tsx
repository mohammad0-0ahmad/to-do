import PersonMinus from '../Svg/PersonMinus';
import withProfileCard from '../../HOCs/withProfileCard';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import { unfriend } from '../../services/friendship';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import Trans from '../Trans';
import withSnackbarManager, {
    WithSnackbarManagerType,
} from '../../HOCs/withSnackbarManager';
import Tooltip from '../Tooltip';

const FriendCard: FC<FriendCardPropsType> = ({
    uid,
    firstName,
    lastName,
    showSnackbar,
}) => {
    const classes = useStyles();
    const userFullName = [firstName, lastName].join(' ');

    const handleRemoveFriend = async () => {
        showSnackbar({
            ...(await unfriend({ friendId: uid })),
            values: { userFullName },
        });
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
            <Tooltip
                titleTransId="FriendCard.toolTips.label1"
                backgroundColorPaletteVariable="error"
            >
                <IconButton className={classes.removeFriend}>
                    <PersonMinus />
                </IconButton>
            </Tooltip>
        </ConfirmationDialog>
    );
};

export default withSnackbarManager(withProfileCard(FriendCard));

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type FriendCardPropsType = WithSnackbarManagerType<
    Pick<UserSchema, 'uid' | 'firstName' | 'lastName'>
>;

/* -------------------------------------------------------------------------- */
/*                                    Styles                                  */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { primary, error } }) => ({
    userFullName: { color: primary.main },
    removeFriend: { color: error.main },
}));
