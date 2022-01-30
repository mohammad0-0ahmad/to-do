import PersonCheck from '../Svg/PersonCheck';
import PersonUncheck from '../Svg/PersonUncheck';
import {
    acceptFriendshipRequest,
    rejectFriendshipRequest,
} from '../../services/friendship';
import withProfileCard from '../../HOCs/withProfileCard';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import Trans from '../Trans';
import withSnackbarManager, {
    WithSnackbarManagerType,
} from '../../HOCs/withSnackbarManager';
import Tooltip from '../Tooltip';

const FriendshipRequestCard: FC<FriendshipRequestCardPropsType> = ({
    uid,
    firstName,
    lastName,
    showSnackbar,
}) => {
    const classes = useStyles();
    const userFullName = [firstName, lastName].join(' ');

    const accept = async () => {
        showSnackbar({
            ...(await acceptFriendshipRequest({ senderId: uid })),
            values: { userFullName },
        });
    };

    const reject = async () => {
        showSnackbar({
            ...(await rejectFriendshipRequest({ senderId: uid })),
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
                <Tooltip
                    titleTransId="FriendshipRequestCard.toolTips.label1"
                    backgroundColorPaletteVariable="green"
                >
                    <IconButton className={classes.accept}>
                        <PersonCheck />
                    </IconButton>
                </Tooltip>
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
                <Tooltip
                    titleTransId="FriendshipRequestCard.toolTips.label2"
                    backgroundColorPaletteVariable="red"
                >
                    <IconButton className={classes.reject}>
                        <PersonUncheck />
                    </IconButton>
                </Tooltip>
            </ConfirmationDialog>
        </>
    );
};

export default withSnackbarManager(withProfileCard(FriendshipRequestCard));

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type FriendshipRequestCardPropsType = WithSnackbarManagerType<{
    uid: string;
    firstName: string;
    lastName: string;
}>;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { color4, green, red, type } }) => ({
    userFullName: { color: color4[type] },
    accept: { color: green[type] },
    reject: { color: red[type] },
}));
