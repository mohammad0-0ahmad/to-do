import { useState } from 'react';
import { Grid, makeStyles, IconButton } from '@material-ui/core';
import AvatarGroup from '../AvatarGroup';
import TextField from '../Inputs/TextField';
import Button from '../Inputs/Button';
import Trans from '../Trans';
import UserAvatar from '../UserAvatar';
import Plus from '../Svg/Plus';
import { createTask } from '../../services/tasks';
import { useProfile } from '../../context/ProfileProvider';
import ParticipantManagerDialog from '../Dialogs/ParticipantManagerDialog';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';

const useStyles = makeStyles(
    ({ palette: { transparent, color3, color4, color5, red, type } }) => ({
        TaskGenerator: {
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
        bottomMargin: {
            marginBottom: 16,
        },
        avatarGroup: {
            width: 'fit-content',
        },
        participantsLabel: {
            color: transparent[type],
            cursor: 'pointer',
        },
        addParticipantButton: {
            color: color4[type],
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

const TaskGenerator = () => {
    const classes = useStyles();
    const { photoURL, firstName, lastName } = useProfile();
    const [
        isCreateTaskConfirmationDialogVisible,
        setIsCreateTaskConfirmationDialogVisible,
    ] = useState(false);

    const [formValues, setFormValues] = useState({
        privacy: 'public',
        title: '',
        participants: {},
        date: '',
        startTime: '',
        endTime: '',
        description: '',
    });
    const createTaskHandle = () => {
        hideCreateTaskConfirmationDialog();
        const res = createTask(formValues);
        alert(res);
    };

    const hideCreateTaskConfirmationDialog = () => {
        setIsCreateTaskConfirmationDialogVisible(false);
    };

    const handleChange = ({ target: { name, value } }) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsCreateTaskConfirmationDialogVisible(true);
    };

    const handleCancel = (e) => {
        setFormValues({
            privacy: 'public',
            title: '',
            participants: {},
            date: '',
            startTime: '',
            endTime: '',
            description: '',
        });
    };

    return (
        <Grid container className={classes.TaskGenerator}>
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    justify="space-between"
                    className={classes.bottomMargin}
                >
                    <Grid item xs={7}>
                        <Grid item xs={12}>
                            <TextField
                                name="title"
                                onChange={handleChange}
                                value={formValues.title}
                                variant="standard"
                                label={<Trans id="TaskGenerator.label1" />}
                                className={classes.bottomMargin}
                                fullWidth
                                required
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <label className={classes.participantsLabel}>
                                <Trans id="TaskGenerator.label2" />
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <AvatarGroup max={4}>
                                            {Object.values(
                                                formValues.participants
                                            ).map(
                                                ({
                                                    id,
                                                    photoURL,
                                                    firstName,
                                                    lastName,
                                                }) => (
                                                    <UserAvatar
                                                        radius={20}
                                                        key={id}
                                                        photoURL={photoURL}
                                                        firstName={firstName}
                                                        lastName={lastName}
                                                    />
                                                )
                                            )}
                                        </AvatarGroup>
                                    </Grid>
                                    <Grid item>
                                        <ParticipantManagerDialog
                                            participants={
                                                formValues.participants
                                            }
                                            setParticipants={(participants) =>
                                                setFormValues({
                                                    ...formValues,
                                                    participants,
                                                })
                                            }
                                        >
                                            <IconButton
                                                className={
                                                    classes.addParticipantButton
                                                }
                                            >
                                                <Plus />
                                            </IconButton>
                                        </ParticipantManagerDialog>
                                    </Grid>
                                </Grid>
                            </label>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <UserAvatar
                            radius={50}
                            owner
                            photoURL={photoURL}
                            firstName={firstName}
                            lastName={lastName}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.bottomMargin}>
                    <Grid item xs={6}>
                        <TextField
                            value={formValues.date}
                            name="date"
                            onChange={handleChange}
                            variant="standard"
                            type="date"
                            label={<Trans id="TaskGenerator.label3" />}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            required
                            autoComplete="off"
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    justify="space-between"
                    className={classes.bottomMargin}
                >
                    <Grid item xs={5}>
                        <TextField
                            value={formValues.startTime}
                            name="startTime"
                            onChange={handleChange}
                            variant="standard"
                            type="time"
                            label={<Trans id="TaskGenerator.label4" />}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            required
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            value={formValues.endTime}
                            name="endTime"
                            onChange={handleChange}
                            variant="standard"
                            type="time"
                            label={<Trans id="TaskGenerator.label5" />}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            required
                            autoComplete="off"
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.bottomMargin}>
                    <TextField
                        value={formValues.description}
                        name="description"
                        onChange={handleChange}
                        rows={6}
                        multiline
                        fullWidth
                        label={<Trans id="TaskGenerator.label6" />}
                        autoComplete="off"
                    />
                </Grid>
                <Grid container justify="space-between">
                    <Grid item xs={5}>
                        <ConfirmationDialog
                            body={
                                <Trans id="TaskGenerator.dialogs.taskCancelation" />
                            }
                            confirmButtonProps={{ onClick: handleCancel }}
                        >
                            <Button fullWidth className={classes.cancelButton}>
                                <Trans id="TaskGenerator.button1" />
                            </Button>
                        </ConfirmationDialog>
                    </Grid>
                    <Grid item xs={5}>
                        <ConfirmationDialog
                            closeHandle={hideCreateTaskConfirmationDialog}
                            open={isCreateTaskConfirmationDialogVisible}
                            body={
                                <Trans id="TaskGenerator.dialogs.taskConfirmation" />
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
                            <Trans id="TaskGenerator.button2" />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};

export default TaskGenerator;
