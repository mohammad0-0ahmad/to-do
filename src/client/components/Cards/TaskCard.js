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
import { string, shape, object } from 'prop-types';
import UserAvatar from '../UserAvatar';
import Pen from '../Svg/Pen';
import Trash from '../Svg/Trash';
import { deleteTask } from '../../services/tasks';
import { useUsers } from '../../context/UsersProvider';
import { unsubscribeAll } from '../../utils';

const useStyles = makeStyles(
    ({ palette: { color1, color4, color5, yellow, red, type } }) => ({
        TaskCard: {
            width: '100%',
            backgroundColor: color5[type],
            borderRadius: 4,
            color: color1[type],
        },
        title: {
            paddingLeft: 16,
            fontSize: 18,
            fontWeight: 500,
        },
        summary: {
            paddingLeft: 4,
            paddingRight: 16,
            height: 72,
            direction: 'rtl',
            '&>*': {
                direction: 'ltr',
            },
        },
        arrow: {
            color: color4[type],
        },
        edit: {
            color: yellow[type],
        },
        delete: {
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
}) => {
    const { allFetchedUsers } = useUsers();
    const [{ photoURL, firstName, lastName }, setOwnerData] = useState({});
    const [participants, setParticipants] = useState({});

    useEffect(() => {
        //Checking if an user profile is already fetched for reuse it else it will be fetched.
        //Set owner profile data.
        const unsubscribeFunctions = [];
        allFetchedUsers[owner.id]
            ? setOwnerData(allFetchedUsers[owner.id])
            : unsubscribeFunctions.push(
                  owner.ref.onSnapshot((doc) => setOwnerData(doc.data()))
              );
        //Set participants profile data.
        Object.entries(participantsRaw).forEach((participantRawEntry) => {
            allFetchedUsers[participantRawEntry[0]]
                ? setParticipants((currentParticipants) => ({
                      ...currentParticipants,
                      [participantRawEntry[0]]:
                          allFetchedUsers[participantRawEntry[0]],
                  }))
                : unsubscribeFunctions.push(
                      participantRawEntry[1].ref.onSnapshot((doc) =>
                          setParticipants((currentParticipants) => ({
                              ...currentParticipants,
                              [participantRawEntry[0]]: {
                                  invitationStatus:
                                      participantRawEntry[1].invitationStatus,
                                  ...doc.data(),
                              },
                          }))
                      )
                  );
        });
        return unsubscribeAll(unsubscribeFunctions);
    }, []);
    const classes = useStyles();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleEdit = (e) => {
        e.stopPropagation();
    };
    const handleDelete = (e) => {
        e.stopPropagation();
        deleteTask(id);
    };

    const participantAvatars = (max) => {
        const participantsEntries = Object.entries(participants);
        return participantsEntries.length ? (
            <AvatarGroup max={max}>
                {participantsEntries.map(
                    ([id, { photoURL, firstName, lastName }]) => (
                        <UserAvatar
                            key={id}
                            photoURL={photoURL}
                            firstName={firstName}
                            lastName={lastName}
                            radius={20}
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
                expandIcon={<Arrow className={classes.arrow} />}
                className={classes.summary}
            >
                <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={5}>
                        <Typography component="h3" className={classes.title}>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item container xs={7} justify="flex-end">
                        {isExpanded ? (
                            <>
                                <IconButton
                                    className={classes.edit}
                                    onClick={handleEdit}
                                >
                                    <Pen />
                                </IconButton>
                                <IconButton
                                    className={classes.delete}
                                    onClick={handleDelete}
                                >
                                    <Trash />
                                </IconButton>
                            </>
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
