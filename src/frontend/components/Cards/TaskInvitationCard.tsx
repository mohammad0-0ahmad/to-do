import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import TaskCheck from '../Svg/TaskCheck';
import TaskUncheck from '../Svg/TaskUncheck';
import Trans from '../Trans';
import TaskCard from './TaskCard';
import {
    acceptTaskInvitation,
    declineTaskInvitation,
} from '../../services/tasks';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import withSnackbarManager from '../../HOCs/withSnackbarManager';
import Tooltip from '../Tooltip';

const TaskInvitationCard: FC<TaskInvitationCardPropsType> = ({
    taskRef,
    showSnackbar,
    ...props
}) => {
    const classes = useStyles();
    const [task, setTask] = useState(null);

    useEffect(() => {
        //@ts-ignore
        const unsubscribe = taskRef.onSnapshot((doc) => {
            setTask(doc.data());
        });
        return unsubscribe;
    }, []);

    const handleAccept = async () => {
        showSnackbar(await acceptTaskInvitation({ taskId: task?.taskId }));
    };

    const handleDecline = async () => {
        showSnackbar(await declineTaskInvitation({ taskId: task?.taskId }));
    };

    return task ? (
        <TaskCard
            CustomSummaryContent={({ expanded, ownerName }) => (
                <Grid container>
                    <Grid
                        item
                        container
                        direction="column"
                        justifyContent="center"
                        className={classes.titleContainer}
                    >
                        {!expanded && (
                            <Tooltip title={ownerName}>
                                <Typography
                                    variant="caption"
                                    className={classes.inviterContainer}
                                >
                                    <Trans id="TaskInvitationCard.title1" />
                                    <Typography
                                        variant="caption"
                                        component="span"
                                        className={classes.inviter}
                                    >
                                        {ownerName}
                                    </Typography>
                                </Typography>
                            </Tooltip>
                        )}
                        <Tooltip title={task.title}>
                            <Typography variant="h6" className={classes.title}>
                                {task.title}
                            </Typography>
                        </Tooltip>
                    </Grid>
                    <Grid
                        item
                        container
                        justifyContent="flex-end"
                        onClick={(e) => e.stopPropagation()}
                        className={classes.actionsButtonsContainer}
                    >
                        <ConfirmationDialog
                            body={
                                <Trans id="TaskInvitationCard.acceptDialog.body" />
                            }
                            confirmButtonProps={{ onClick: handleAccept }}
                        >
                            <Tooltip
                                titleTransId="TaskInvitationCard.toolTips.label1"
                                backgroundColorPaletteVariable="green"
                            >
                                <IconButton className={classes.accept}>
                                    <TaskCheck />
                                </IconButton>
                            </Tooltip>
                        </ConfirmationDialog>
                        <ConfirmationDialog
                            body={
                                <Trans id="TaskInvitationCard.declineDialog.body" />
                            }
                            confirmButtonProps={{ onClick: handleDecline }}
                        >
                            <Tooltip
                                titleTransId="TaskInvitationCard.toolTips.label2"
                                backgroundColorPaletteVariable="red"
                            >
                                <IconButton className={classes.decline}>
                                    <TaskUncheck />
                                </IconButton>
                            </Tooltip>
                        </ConfirmationDialog>
                    </Grid>
                </Grid>
            )}
            {...props}
            {...task}
        />
    ) : (
        <></>
    );
};

export default withSnackbarManager(TaskInvitationCard);

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type TaskInvitationCardPropsType = {
    taskRef: object;
    //TODO: improve type
    showSnackbar: (any) => void;
};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { color4, green, red, type } }) => ({
    accept: {
        color: green[type],
    },
    decline: {
        color: red[type],
    },
    titleContainer: {
        paddingLeft: 8,
        lineHeight: 1,
    },
    title: {
        display: '-webkit-box',
        lineClamp: 1,
        boxOrient: 'vertical',
        overflow: 'hidden',
        lineBreak: 'anywhere',
    },
    inviterContainer: {
        display: '-webkit-box',
        lineClamp: 1,
        boxOrient: 'vertical',
        overflow: 'hidden',
        lineBreak: 'anywhere',
    },
    inviter: {
        color: color4[type],
        fontWeight: 500,
        marginLeft: 4,
    },
    actionsButtonsContainer: { width: 'fit-content', flexShrink: 0 },
}));
