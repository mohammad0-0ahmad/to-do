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
import { deleteTask, leaveTask } from '../../services/tasks';
import { useUsers } from '../../context/UsersProvider';
import { unsubscribeAll } from '../../utilities';
import { useProfile } from '../../context/ProfileProvider';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import TaskLeave from '../Svg/TaskLeave';

const useStyles = makeStyles(
    ({ palette: { color1, color4, color5, yellow, red, type } }) => ({
        TaskCard: {
            width: '100%',
            backgroundColor: color5[type],
            borderRadius: 4,
            color: color1[type],
        },
        title: {
            paddingLeft: 8,
            fontSize: 18,
        },
        summary: {
            paddingLeft: 4,
            paddingRight: 16,
            height: 72,
            direction: 'rtl',
            '&>*': {
                margin: 0,
                direction: 'ltr',
            },
            '&>.MuiAccordionSummary-expandIcon': {
                color: color4[type],
            },
        },
        yellowIconButton: {
            color: yellow[type],
        },
        redIconButton: {
            color: red[type],
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
    id,
    title,
    date,
    owner,
    participants: participantsRaw,
    startTime,
    endTime,
    description,
    CustomSummaryContent,
}) => {
    const classes = useStyles();
    const [isExpanded, setIsExpanded] = useState(false);
    const { allFetchedUsers } = useUsers() || {};
    const [
        { photoURL, firstName, lastName, id: ownerId },
        setOwnerData,
    ] = useState({});
    const [participants, setParticipants] = useState({});
    const { id: currentUser } = useProfile() || {};

    useEffect(() => {
        const unsubscribeFunctions = [];
        //Checking if an user profile is already fetched for reuse it else it will be fetched.
        //Set owner profile data.
        allFetchedUsers && allFetchedUsers[owner.id]
            ? setOwnerData(allFetchedUsers[owner.id])
            : unsubscribeFunctions.push(
                  owner.userRef.onSnapshot((doc) =>
                      setOwnerData({ id: doc.id, ...doc.data() })
                  )
              );
    }, [owner]);

    useEffect(() => {
        const unsubscribeFunctions = [];
        //Set participants profile data.
        Object.entries(participantsRaw).forEach(
            ([taskID, { userRef, invitationStatus }]) => {
                allFetchedUsers[taskID]
                    ? setParticipants((currentParticipants) => ({
                          ...currentParticipants,
                          [taskID]: {
                              invitationStatus: invitationStatus,
                              ...allFetchedUsers[taskID],
                          },
                      }))
                    : unsubscribeFunctions.push(
                          userRef.onSnapshot((doc) =>
                              setParticipants((currentParticipants) => ({
                                  ...currentParticipants,
                                  [taskID]: {
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

    const handleEdit = () => {};

    const handleLeave = () => {
        leaveTask(id);
    };

    const handleDelete = () => {
        deleteTask(id);
    };

    const participantAvatars = (max) => {
        const participantsEntries = Object.entries(participants);
        return participantsEntries.length ? (
            <AvatarGroup max={max}>
                {participantsEntries.map(
                    ([
                        id,
                        { photoURL, firstName, lastName, invitationStatus },
                    ]) => (
                        <UserAvatar
                            key={id}
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
                onClick={() => setIsExpanded(!isExpanded)}
                expandIcon={<Arrow />}
                className={classes.summary}
            >
                {CustomSummaryContent ? (
                    <CustomSummaryContent
                        expanded={isExpanded}
                        ownerName={[firstName, lastName].join(' ')}
                    />
                ) : (
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item xs={5}>
                            <Typography
                                component="h3"
                                variant="h6"
                                className={classes.title}
                            >
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item container xs={7} justify="flex-end">
                            {isExpanded ? (
                                <Grid onClick={(e) => e.stopPropagation()}>
                                    {currentUser === ownerId ? (
                                        <>
                                            <IconButton
                                                className={
                                                    classes.yellowIconButton
                                                }
                                                onClick={handleEdit}
                                            >
                                                <Pen />
                                            </IconButton>
                                            <ConfirmationDialog
                                                body={
                                                    <Trans id="TaskCard.dialogs.deleteTask.body" />
                                                }
                                                confirmButtonProps={{
                                                    onClick: handleDelete,
                                                }}
                                            >
                                                <IconButton
                                                    className={
                                                        classes.redIconButton
                                                    }
                                                >
                                                    <Trash />
                                                </IconButton>
                                            </ConfirmationDialog>
                                        </>
                                    ) : (
                                        currentUser && (
                                            <ConfirmationDialog
                                                body={
                                                    <Trans id="TaskCard.dialogs.leaveTask.body" />
                                                }
                                                confirmButtonProps={{
                                                    onClick: handleLeave,
                                                }}
                                            >
                                                <IconButton
                                                    className={
                                                        classes.redIconButton
                                                    }
                                                >
                                                    <TaskLeave />
                                                </IconButton>
                                            </ConfirmationDialog>
                                        )
                                    )}
                                </Grid>
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
                <Grid container>
                    <Grid container justify="space-between">
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
            </AccordionDetails>
        </Accordion>
    );
};

TaskCard.propTypes = {
    CustomSummaryContent: func,
    id: string.isRequired,
    title: string.isRequired,
    owner: shape().isRequired,
    participants: object,
    date: string.isRequired,
    startTime: string.isRequired,
    endTime: string.isRequired,
    description: string,
};

TaskCard.defaultProps = {
    participants: [],
};
export default TaskCard;
