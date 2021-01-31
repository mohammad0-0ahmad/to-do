import { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Button from '../Inputs/Button';
import Trans from '../Trans';
import { createTask } from '../../services/tasks';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import TaskForm from '../Forms/TaskForm';
import withSnackbarManager from '../withSnackbarManager';
import { func } from 'prop-types';

const useStyles = makeStyles(
    ({ palette: { color3, color4, color5, red, type } }) => ({
        TaskGeneratorCard: {
            backgroundColor: color5[type],
            color: color4[type],
            maxWidth: 600,
            padding: 16,
            boxShadow: 'inset 0px 0px 5px rgba(0, 0, 0, 0.25)',
            borderRadius: 4,
            '& .MuiFormLabel-root': {
                fontSize: 18,
            },
        },
        cancelButton: {
            backgroundColor: red[type],
            color: color3[type],
        },
        createButton: {
            backgroundColor: color4[type],
            color: color3[type],
        },
    })
);

const initialValues = {
    privacy: 'public',
    title: '',
    participants: {},
    date: '',
    startTime: '',
    endTime: '',
    description: '',
};

const TaskGeneratorCard = ({ showSnackbar }) => {
    const classes = useStyles();
    const [
        isCreateTaskConfirmationDialogVisible,
        setIsCreateTaskConfirmationDialogVisible,
    ] = useState(false);

    const [formValues, setFormValues] = useState(initialValues);

    const createTaskHandle = async () => {
        try {
            hideCreateTaskConfirmationDialog();
            const dataToSend = { ...formValues };
            await showSnackbar(createTask(dataToSend));
            handleCancel();
        } catch (err) {
            console.error(err);
        }
    };

    const hideCreateTaskConfirmationDialog = () => {
        setIsCreateTaskConfirmationDialogVisible(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsCreateTaskConfirmationDialogVisible(true);
    };

    const handleCancel = () => {
        setFormValues(initialValues);
    };

    return (
        <Grid container className={classes.TaskGeneratorCard}>
            <form onSubmit={handleSubmit}>
                <TaskForm
                    initialFormValues={formValues}
                    formValuesSetter={setFormValues}
                />
                <Grid container justify="space-between">
                    <Grid item xs={5}>
                        <ConfirmationDialog
                            body={
                                <Trans id="TaskGeneratorCard.dialogs.taskCancelation" />
                            }
                            confirmButtonProps={{ onClick: handleCancel }}
                        >
                            <Button fullWidth className={classes.cancelButton}>
                                <Trans id="TaskGeneratorCard.button1" />
                            </Button>
                        </ConfirmationDialog>
                    </Grid>
                    <Grid item xs={5}>
                        <ConfirmationDialog
                            handleClose={hideCreateTaskConfirmationDialog}
                            open={isCreateTaskConfirmationDialogVisible}
                            body={
                                <Trans id="TaskGeneratorCard.dialogs.taskConfirmation" />
                            }
                            confirmButtonProps={{
                                onClick: createTaskHandle,
                            }}
                            rejectButtonProps={{
                                onClick: hideCreateTaskConfirmationDialog,
                            }}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            className={classes.createButton}
                        >
                            <Trans id="TaskGeneratorCard.button2" />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};

TaskGeneratorCard.propTypes = {
    showSnackbar: func.isRequired,
};

export default withSnackbarManager(TaskGeneratorCard);
