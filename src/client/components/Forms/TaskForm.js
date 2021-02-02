import { Grid, makeStyles, IconButton } from '@material-ui/core';
import AvatarGroup from '../AvatarGroup';
import TextField from '../Inputs/TextField';
import Trans from '../Trans';
import UserAvatar from '../UserAvatar';
import Plus from '../Svg/Plus';
import { useProfile } from '../../context/ProfileProvider';
import ParticipantManagerDialog from '../Dialogs/ParticipantManagerDialog';
import { shape, string, func, object } from 'prop-types';

const useStyles = makeStyles(({ palette: { transparent, color4, type } }) => ({
    TaskForm: {
        color: color4[type],
    },
    bottomMargin: {
        marginBottom: 16,
    },
    avatarGroup: {
        width: 'fit-content',
    },
    participants: {
        color: transparent[type],
        '&>div>*': { cursor: 'pointer' },
    },
    addParticipantButton: {
        color: color4[type],
    },
}));

const TaskForm = ({
    initialFormValues: {
        title,
        participants,
        date,
        startTime,
        endTime,
        description,
    },
    formValuesSetter,
}) => {
    const classes = useStyles();
    const { photoURL, firstName, lastName } = useProfile();

    const handleChange = ({ target: { name, value } }) => {
        formValuesSetter((current) => ({ ...current, [name]: value }));
    };

    return (
        <Grid container className={classes.TaskForm}>
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
                            value={title}
                            variant="standard"
                            label={<Trans id="TaskForm.label1" />}
                            className={classes.bottomMargin}
                            fullWidth
                            required
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.participants}>
                        <Trans id="TaskForm.label2" />
                        <Grid container alignItems="center">
                            <ParticipantManagerDialog
                                participants={participants}
                                setParticipants={(participants) =>
                                    formValuesSetter((current) => ({
                                        ...current,
                                        participants,
                                    }))
                                }
                            >
                                <Grid item>
                                    <AvatarGroup max={4}>
                                        {Object.values(participants).map(
                                            ({
                                                uid,
                                                photoURL,
                                                firstName,
                                                lastName,
                                                invitationStatus,
                                            }) => (
                                                <UserAvatar
                                                    radius={20}
                                                    key={uid}
                                                    photoURL={photoURL}
                                                    firstName={firstName}
                                                    lastName={lastName}
                                                    invitationStatus={
                                                        invitationStatus
                                                    }
                                                />
                                            )
                                        )}
                                    </AvatarGroup>
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        className={classes.addParticipantButton}
                                    >
                                        <Plus />
                                    </IconButton>
                                </Grid>
                            </ParticipantManagerDialog>
                        </Grid>
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
                        value={date}
                        name="date"
                        onChange={handleChange}
                        variant="standard"
                        type="date"
                        label={<Trans id="TaskForm.label3" />}
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
                        value={startTime}
                        name="startTime"
                        onChange={handleChange}
                        variant="standard"
                        type="time"
                        label={<Trans id="TaskForm.label4" />}
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
                        value={endTime}
                        name="endTime"
                        onChange={handleChange}
                        variant="standard"
                        type="time"
                        label={<Trans id="TaskForm.label5" />}
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
                    value={description}
                    name="description"
                    onChange={handleChange}
                    rows={6}
                    multiline
                    fullWidth
                    label={<Trans id="TaskForm.label6" />}
                    autoComplete="off"
                />
            </Grid>
        </Grid>
    );
};

TaskForm.propTypes = {
    initialFormValues: shape({
        privacy: string,
        title: string,
        participants: object,
        date: string,
        startTime: string,
        endTime: string,
        description: string,
    }),
    formValuesSetter: func,
};

TaskForm.defaultProps = {
    initialFormValues: {
        privacy: 'public',
        title: '',
        participants: {},
        date: '',
        startTime: '',
        endTime: '',
        description: '',
    },
    formValuesSetter: () => {},
};

export default TaskForm;
