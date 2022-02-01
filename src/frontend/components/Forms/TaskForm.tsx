import { Grid, makeStyles, IconButton } from '@material-ui/core';
import AvatarGroup from '../AvatarGroup';
import TextField from '../Inputs/TextField';
import Trans from '../Trans';
import UserAvatar from '../UserAvatar';
import Plus from '../Svg/Plus';
import { useProfile } from '../../providers/ProfileProvider';
import ParticipantManagerDialog from '../Dialogs/ParticipantManagerDialog';
import Tooltip from '../Tooltip';
import { Dispatch } from 'react';

const TaskForm = ({
    initialFormValues: {
        title = '',
        participants = {},
        date = '',
        startTime = '',
        endTime = '',
        description = '',
    },
    formValuesSetter = (any) => {},
    isMinimized = false,
}) => {
    const classes = useStyles({ isMinimized });
    const { photoURL, firstName, lastName } = useProfile();

    const handleChange = ({ target: { name, value } }) => {
        formValuesSetter((current) => ({ ...current, [name]: value }));
    };

    return (
        <Grid container className={classes.TaskForm}>
            <Grid
                container
                justifyContent="space-between"
                className={classes.bottomMargin}
            >
                <Grid item xs={7}>
                    <Grid item xs={12} className={classes.titleWrapper}>
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
                    {!isMinimized && (
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
                                        <Tooltip titleTransId="TaskForm.toolTips.label1">
                                            <IconButton
                                                className={
                                                    classes.addParticipantButton
                                                }
                                            >
                                                <Plus />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </ParticipantManagerDialog>
                            </Grid>
                        </Grid>
                    )}
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
            {!isMinimized && (
                <>
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
                        justifyContent="space-between"
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
                </>
            )}
        </Grid>
    );
};

export default TaskForm;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type TaskFormPropsType = {
    initialFormValues: {
        title?: string;
        participants?: object;
        date?: string;
        startTime?: string;
        endTime?: string;
        description?: string;
    };
    formValuesSetter: Dispatch<any>;
    isMinimized: boolean;
};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { primary, transparent } }) => ({
    TaskForm: {
        color: primary.main,
    },
    bottomMargin: {
        marginBottom: 16,
    },
    titleWrapper: {
        //@ts-ignore
        marginTop: ({ isMinimized }) => (isMinimized ? 18 : ''),
        //@ts-ignore
        transform: ({ isMinimized }) =>
            isMinimized ? 'scale(1.2) translate(+10%)' : '',
        transition: '300ms margin,300ms transform',
    },
    avatarGroup: {
        width: 'fit-content',
    },
    participants: {
        color: transparent,
        '&>div>*': { cursor: 'pointer' },
    },
    addParticipantButton: {
        color: primary.main,
    },
}));
