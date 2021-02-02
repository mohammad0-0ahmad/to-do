import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import TaskCheck from '../Svg/TaskCheck';
import TaskUncheck from '../Svg/TaskUncheck';
import Trans from '../Trans';
import TaskCard from './TaskCard';
import { bool, object, func, string } from 'prop-types';
import {
    acceptTaskInvitation,
    declineTaskInvitation,
} from '../../services/tasks';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import withSnackbarManager from '../withSnackbarManager';

const useStyles = makeStyles(({ palette: { color4, green, red, type } }) => ({
    accept: {
        color: green[type],
    },
    decline: {
        color: red[type],
    },
    titleContainer: { paddingLeft: 8 },
    inviter: { color: color4[type], fontWeight: 500 },
}));

const TaskInvitationCard = ({ taskRef, showSnackbar, ...props }) => {
    const classes = useStyles();
    const [task, setTask] = useState(null);

    useEffect(() => {
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

    const CustomSummaryContent = ({ expanded, ownerName }) => (
        <Grid container>
            <Grid
                item
                container
                xs={5}
                direction="column"
                justify="center"
                className={classes.titleContainer}
            >
                {!expanded && (
                    <Typography variant="caption">
                        <Trans id="TaskInvitationCard.title1" />
                        <Typography
                            variant="caption"
                            component="span"
                            className={classes.inviter}
                        >
                            {ownerName}
                        </Typography>
                    </Typography>
                )}
                <Typography variant="h6">{task.title}</Typography>
            </Grid>
            <Grid
                item
                container
                xs={7}
                justify="flex-end"
                onClick={(e) => e.stopPropagation()}
            >
                <ConfirmationDialog
                    body={<Trans id="TaskInvitationCard.acceptDialog.body" />}
                    confirmButtonProps={{ onClick: handleAccept }}
                >
                    <IconButton className={classes.accept}>
                        <TaskCheck />
                    </IconButton>
                </ConfirmationDialog>
                <ConfirmationDialog
                    body={<Trans id="TaskInvitationCard.declineDialog.body" />}
                    confirmButtonProps={{ onClick: handleDecline }}
                >
                    <IconButton className={classes.decline}>
                        <TaskUncheck />
                    </IconButton>
                </ConfirmationDialog>
            </Grid>
        </Grid>
    );
    CustomSummaryContent.propTypes = { expanded: bool, ownerName: string };
    return task ? (
        <TaskCard
            CustomSummaryContent={CustomSummaryContent}
            {...props}
            {...task}
        />
    ) : (
        <></>
    );
};

TaskInvitationCard.propTypes = {
    taskRef: object.isRequired,
    showSnackbar: func.isRequired,
};

export default withSnackbarManager(TaskInvitationCard);
