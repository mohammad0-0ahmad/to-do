import { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Button from '../Inputs/Button';
import Trans from '../Trans';
import { createTask } from '../../services/tasks';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import TaskForm from '../Forms/TaskForm';
import withSnackbarManager from '../../HOCs/withSnackbarManager';
import { TaskPrivacy } from 'src/db_schemas';

const initialValues = {
    privacy: TaskPrivacy.public,
    title: '',
    participants: {},
    date: '',
    startTime: '',
    endTime: '',
    description: '',
};

const TaskGeneratorCard: FC<TaskGeneratorCardPropsType> = ({
    showSnackbar,
}) => {
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
            //console.error(err);
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

    const isMinimized =
        !formValues.title &&
        !formValues.date &&
        !formValues.startTime &&
        !formValues.endTime &&
        !formValues.description &&
        !Object.keys(formValues.participants).length;

    return (
        <Grid container className={classes.TaskGeneratorCard}>
            <form onSubmit={handleSubmit}>
                <TaskForm
                    initialFormValues={formValues}
                    formValuesSetter={setFormValues}
                    isMinimized={isMinimized}
                />
                {!isMinimized && (
                    <Grid container justifyContent="space-between">
                        <Grid item xs={5}>
                            <ConfirmationDialog
                                body={
                                    <Trans id="TaskGeneratorCard.dialogs.taskCancelation" />
                                }
                                confirmButtonProps={{ onClick: handleCancel }}
                            >
                                <Button
                                    fullWidth
                                    backgroundColorVariant="error"
                                >
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
                                backgroundColorVariant="primary"
                            >
                                <Trans id="TaskGeneratorCard.button2" />
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </form>
        </Grid>
    );
};

export default withSnackbarManager(TaskGeneratorCard);

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type TaskGeneratorCardPropsType = {
    showSnackbar: (any) => void;
};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { primary, background, type } }) => ({
    TaskGeneratorCard: {
        backgroundColor: background.paper,
        color: primary.main,
        maxWidth: 600,
        padding: 16,
        boxShadow: 'inset 0px 0px 5px rgba(0, 0, 0, 0.25)',
        borderRadius: 4,
        '& .MuiFormLabel-root': {
            fontSize: 16,
        },
    },
}));
