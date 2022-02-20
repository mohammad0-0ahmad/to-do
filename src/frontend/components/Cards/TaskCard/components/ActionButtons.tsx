import { Grid, IconButton, makeStyles } from '@material-ui/core';
import ConfirmationDialog from 'frontend/components/Dialogs/ConfirmationDialog';
import Check from 'frontend/components/Svg/Check';
import Close from 'frontend/components/Svg/Close';
import Pen from 'frontend/components/Svg/Pen';
import TaskLeave from 'frontend/components/Svg/TaskLeave';
import Trash from 'frontend/components/Svg/Trash';
import Tooltip from 'frontend/components/Tooltip';
import Trans from 'frontend/components/Trans';
import withSnackbarManager, {
    WithSnackbarManagerType,
} from 'frontend/HOCs/withSnackbarManager';
import { useProfile } from 'frontend/providers/ProfileProvider';
import { deleteTask, leaveTask, updateTask } from 'frontend/services/tasks';
import { TaskInvitationStatus } from 'src/db_schemas';

const ActionButtons: FC<ActionButtonsType> = ({
    showSnackbar,
    isEditModeState,
    taskData: { taskId, ...taskData },
}) => {
    const classes = useStyles();
    const [isEditMode, setIsEditMode] = isEditModeState;
    const { uid: currentUserUid } = useProfile();
    const isCurrentUserTaskOwner = currentUserUid === taskData.owner.uid;
    const isCurrentUserTaskParticipant =
        currentUserUid &&
        Object.entries(taskData.participants).some(
            ([participantUid, participantData]) =>
                participantUid === currentUserUid &&
                //@ts-ignore
                participantData?.invitationStatus ===
                    TaskInvitationStatus.accepted
        );

    const handleLeave = async () => {
        showSnackbar(await leaveTask({ taskId }));
    };

    const handleDelete = async () => {
        showSnackbar(await deleteTask({ taskId }));
    };

    const disableEditMode = () => {
        setIsEditMode(false);
    };

    const saveTaskChanges = async () => {
        try {
            //@ts-ignore
            showSnackbar(await updateTask({ taskId, ...taskData }));
            disableEditMode();
        } catch (err) {
            // console.log(err);
        }
    };

    return (
        <Grid onClick={(e) => e.stopPropagation()}>
            {isCurrentUserTaskOwner ? (
                !isEditMode ? (
                    <>
                        <Tooltip
                            titleTransId="TaskCard.toolTips.editTask"
                            backgroundColorPaletteVariable="warning"
                        >
                            <IconButton
                                className={classes.yellowIconButton}
                                onClick={() => setIsEditMode(true)}
                            >
                                <Pen />
                            </IconButton>
                        </Tooltip>
                        <ConfirmationDialog
                            body={
                                <Trans id="TaskCard.dialogs.deleteTask.body" />
                            }
                            confirmButtonProps={{
                                onClick: handleDelete,
                            }}
                        >
                            <Tooltip
                                titleTransId="TaskCard.toolTips.deleteTask"
                                backgroundColorPaletteVariable="error"
                            >
                                <IconButton className={classes.redIconButton}>
                                    <Trash />
                                </IconButton>
                            </Tooltip>
                        </ConfirmationDialog>
                    </>
                ) : (
                    <>
                        <ConfirmationDialog
                            body={
                                <Trans id="TaskCard.dialogs.saveTaskChanges.body" />
                            }
                            confirmButtonProps={{ onClick: saveTaskChanges }}
                        >
                            <Tooltip
                                titleTransId="TaskCard.toolTips.saveChanges"
                                backgroundColorPaletteVariable="success"
                            >
                                <IconButton
                                    className={classes.save}
                                    type="submit"
                                >
                                    <Check />
                                </IconButton>
                            </Tooltip>
                        </ConfirmationDialog>
                        <ConfirmationDialog
                            body={
                                <Trans id="TaskCard.dialogs.discardTaskChanges.body" />
                            }
                            confirmButtonProps={{ onClick: disableEditMode }}
                        >
                            <Tooltip
                                titleTransId="TaskCard.toolTips.discardTaskChanges"
                                backgroundColorPaletteVariable="error"
                            >
                                <IconButton className={classes.redIconButton}>
                                    <Close />
                                </IconButton>
                            </Tooltip>
                        </ConfirmationDialog>
                    </>
                )
            ) : (
                isCurrentUserTaskParticipant && (
                    <ConfirmationDialog
                        body={<Trans id="TaskCard.dialogs.leaveTask.body" />}
                        confirmButtonProps={{
                            onClick: handleLeave,
                        }}
                    >
                        <Tooltip
                            titleTransId="TaskCard.toolTips.leaveTask"
                            backgroundColorPaletteVariable="error"
                        >
                            <IconButton className={classes.redIconButton}>
                                <TaskLeave />
                            </IconButton>
                        </Tooltip>
                    </ConfirmationDialog>
                )
            )}
        </Grid>
    );
};

export default withSnackbarManager(ActionButtons);

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type ActionButtonsType = WithSnackbarManagerType<{
    isEditModeState: [boolean, SetStateType<boolean>];
    taskData: TaskSchema;
}>;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { error, warning, success } }) => ({
    yellowIconButton: {
        color: warning.main,
    },
    redIconButton: {
        color: error.main,
    },
    save: {
        color: success.main,
    },
}));
