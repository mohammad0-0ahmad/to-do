import { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    makeStyles,
    Typography,
    IconButton,
} from '@material-ui/core';
import AvatarGroup from '../AvatarGroup';
import Arrow from '../Svg/Arrow';
import Trans from '../Trans';
import { string, shape, object, func } from 'prop-types';
import UserAvatar from '../UserAvatar';
import Pen from '../Svg/Pen';
import Trash from '../Svg/Trash';
import { deleteTask, leaveTask, updateTask } from '../../services/tasks';
import { useUsers } from '../../context/UsersProvider';
import { unsubscribeAll } from '../../utilities';
import { useProfile } from '../../context/ProfileProvider';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import TaskLeave from '../Svg/TaskLeave';
import Close from '../Svg/Close';
import Check from '../Svg/Check';
import TaskForm from '../Forms/TaskForm';
import withSnackbarManager from '../withSnackbarManager';
import Tooltip from '../Tooltip';

const useStyles = makeStyles(
    ({ palette: { color1, color4, color5, green, yellow, red, type } }) => ({
        TaskCard: {
            width: '100%',
            backgroundColor: color5[type],
            borderRadius: 4,
            color: color1[type],
        },
        title: {
            paddingLeft: 8,
            fontSize: 18,
            display: '-webkit-box',
            lineClamp: 1,
            boxOrient: 'vertical',
            overflow: 'hidden',
            lineBreak: 'anywhere',
        },
        summary: {
            paddingLeft: 4,
            paddingRight: ({ isExpanded }) => (isExpanded ? 8 : 16),
            height: 72,
            direction: 'rtl',
            '&>*': {
                margin: 0,
                direction: 'ltr',
                flexFlow: 'nowrap',
            },
            '& .MuiAccordionSummary-content > *': {
                flexFlow: 'nowrap',
            },
            '&>.MuiAccordionSummary-expandIcon': {
                color: color4[type],
            },
        },
        actionsButtonsContainer: { width: 'fit-content', flexShrink: 0 },
        yellowIconButton: {
            color: yellow[type],
        },
        redIconButton: {
            color: red[type],
        },
        save: {
            color: green[type],
        },
        details: {
            '&>div>*': { paddingBottom: 16 },
            '& label': { color: color4[type], fontSize: 18 },
            '& p': { paddingLeft: 10 },
        },
        participants: {
            paddingLeft: 10,
            paddingBottom: 16,
        },
    })
);

const TaskCard = ({
    taskId,
    title,
    date,
    owner,
    participants: participantsRaw,
    startTime,
    endTime,
    description,
    CustomSummaryContent,
    showSnackbar,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const classes = useStyles({ isExpanded });
    const [isEditMode, setIsEditMode] = useState(false);
    const { allFetchedUsers } = useUsers() || {};
    const [{ photoURL, firstName, lastName, uid: ownerId }, setOwnerData] =
        useState({});
    const [participants, setParticipants] = useState({});
    const { uid: currentUserUid } = useProfile() || {};
    const [formValues, setFormValues] = useState({});

    const currentUserIsTaskOwner = currentUserUid === ownerId;
    const isLeaveTaskButtonVisible =
        currentUserUid &&
        Object.entries(participants).some(
            ([participantUid, participantData]) =>
                participantUid === currentUserUid &&
                participantData.invitationStatus === 'accepted'
        );

    useEffect(() => {
        setFormValues({
            title,
            participants,
            date,
            startTime,
            endTime,
            description,
        });
    }, [
        title,
        participants,
        date,
        startTime,
        endTime,
        description,
        isEditMode,
    ]);

    useEffect(() => {
        const unsubscribeFunctions = [];
        //Checking if an user profile is already fetched for reuse it else it will be fetched.
        //Set owner profile data.
        allFetchedUsers?.[owner.uid]
            ? setOwnerData(allFetchedUsers[owner.uid])
            : unsubscribeFunctions.push(
                  owner.userRef.onSnapshot((doc) => setOwnerData(doc.data()))
              );
    }, [owner]);

    useEffect(() => {
        setParticipants({});
        const unsubscribeFunctions = [];
        //Set participants profile data.
        Object.entries(participantsRaw).forEach(
            ([uid, { userRef, invitationStatus }]) => {
                allFetchedUsers?.[uid]
                    ? setParticipants((currentParticipants) => ({
                          ...currentParticipants,
                          [uid]: {
                              invitationStatus: invitationStatus,
                              ...allFetchedUsers[uid],
                          },
                      }))
                    : unsubscribeFunctions.push(
                          userRef?.onSnapshot((doc) =>
                              setParticipants((currentParticipants) => ({
                                  ...currentParticipants,
                                  [uid]: {
                                      invitationStatus: invitationStatus,
                                      ...doc.data(),
                                  },
                              }))
                          )
                      );
            }
        );
        return unsubscribeAll(unsubscribeFunctions);
    }, [participantsRaw]);

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
            await showSnackbar(await updateTask({ ...formValues, taskId }));
            disableEditMode();
        } catch (err) {
            // console.log(err);
        }
    };

    const ActionsButtons = (
        <Grid onClick={(e) => e.stopPropagation()}>
            {currentUserIsTaskOwner ? (
                !isEditMode ? (
                    <>
                        <Tooltip
                            titleTransId="TaskCard.toolTips.label1"
                            backgroundColorPaletteVariable="yellow"
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
                                titleTransId="TaskCard.toolTips.label2"
                                backgroundColorPaletteVariable="red"
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
                                titleTransId="TaskCard.toolTips.label3"
                                backgroundColorPaletteVariable="green"
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
                                titleTransId="TaskCard.toolTips.label4"
                                backgroundColorPaletteVariable="red"
                            >
                                <IconButton className={classes.redIconButton}>
                                    <Close />
                                </IconButton>
                            </Tooltip>
                        </ConfirmationDialog>
                    </>
                )
            ) : (
                isLeaveTaskButtonVisible && (
                    <ConfirmationDialog
                        body={<Trans id="TaskCard.dialogs.leaveTask.body" />}
                        confirmButtonProps={{
                            onClick: handleLeave,
                        }}
                    >
                        <Tooltip
                            titleTransId="TaskCard.toolTips.label5"
                            backgroundColorPaletteVariable="red"
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

    const participantAvatars = (max) => {
        const participantsEntries = Object.entries(participants);
        return participantsEntries.length ? (
            <AvatarGroup max={max}>
                {participantsEntries.map(
                    ([
                        uid,
                        { photoURL, firstName, lastName, invitationStatus },
                    ]) => (
                        <UserAvatar
                            key={uid}
                            photoURL={photoURL}
                            firstName={firstName}
                            lastName={lastName}
                            invitationStatus={invitationStatus}
                            radius={isExpanded ? 25 : 20}
                        />
                    )
                )}
            </AvatarGroup>
        ) : null;
    };

    return (
        <Accordion
            elevation={4}
            className={classes.TaskCard}
            expanded={isExpanded}
        >
            <AccordionSummary
                onClick={() => {
                    !isEditMode && setIsExpanded(!isExpanded);
                }}
                expandIcon={!isEditMode && <Arrow />}
                className={classes.summary}
            >
                {CustomSummaryContent ? (
                    <CustomSummaryContent
                        expanded={isExpanded}
                        ownerName={[firstName, lastName].join(' ')}
                    />
                ) : (
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            {!isEditMode && (
                                <Tooltip title={title}>
                                    <Typography
                                        component="h3"
                                        variant="h6"
                                        className={classes.title}
                                    >
                                        {title}
                                    </Typography>
                                </Tooltip>
                            )}
                        </Grid>
                        <Grid
                            item
                            container
                            className={classes.actionsButtonsContainer}
                            justifyContent="flex-end"
                        >
                            {isExpanded ? (
                                ActionsButtons
                            ) : (
                                <>
                                    {participantAvatars(3)}
                                    <UserAvatar
                                        photoURL={photoURL}
                                        firstName={firstName}
                                        lastName={lastName}
                                        radius={20}
                                        owner
                                    />
                                </>
                            )}
                        </Grid>
                    </Grid>
                )}
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                {!isEditMode ? (
                    <Grid container>
                        <Grid container justifyContent="space-between">
                            <Grid item xs={6}>
                                {participantAvatars(5) && (
                                    <>
                                        <Grid item xs={12}>
                                            <Typography component="label">
                                                <Trans id="TaskCard.label1" />
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            className={classes.participants}
                                        >
                                            {participantAvatars(5)}
                                        </Grid>
                                    </>
                                )}
                                <Grid item xs={12}>
                                    <Typography component="label">
                                        <Trans id="TaskCard.label2" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>{date}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <UserAvatar
                                    photoURL={photoURL}
                                    radius={40}
                                    firstName={firstName}
                                    lastName={lastName}
                                    owner
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6}>
                                <Grid item xs={12}>
                                    <Typography component="label">
                                        <Trans id="TaskCard.label3" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>{startTime}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid item xs={12}>
                                    <Typography component="label">
                                        <Trans id="TaskCard.label4" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>{endTime}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        {description && (
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography component="label">
                                        <Trans id="TaskCard.label5" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>{description}</Typography>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                ) : (
                    <form>
                        <TaskForm
                            initialFormValues={formValues}
                            formValuesSetter={setFormValues}
                        />
                    </form>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

TaskCard.propTypes = {
    CustomSummaryContent: func,
    taskId: string.isRequired,
    title: string.isRequired,
    owner: shape().isRequired,
    participants: object,
    date: string.isRequired,
    startTime: string.isRequired,
    endTime: string.isRequired,
    description: string,
    showSnackbar: func.isRequired,
};

TaskCard.defaultProps = {
    participants: {},
};

export default withSnackbarManager(TaskCard);
