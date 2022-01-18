import firebase, { db, auth } from '../utilities/getFirebase';
import { unsubscribeAll, removeUndefinedAttr } from '../utilities';

export const createTask = ({
    title,
    privacy,
    participants: participantsRaw,
    date,
    startTime,
    endTime,
    description,
}) => {
    try {
        const participants = Object.fromEntries(
            Object.entries(participantsRaw).map(([uid, { userRef }]) => [
                uid,
                { userRef, invitationStatus: 'pending' },
            ])
        );
        const { uid } = auth.currentUser;
        const time = firebase.firestore.FieldValue.serverTimestamp();
        const newTaskRef = db.collection('tasks').doc();
        const batch = db.batch();
        batch.set(newTaskRef, {
            taskId: newTaskRef.id,
            owner: { uid, userRef: db.doc(`users/${uid}`) },
            title,
            privacy,
            participants,
            date,
            startTime,
            endTime,
            description,
            createTime: time,
        });
        //Send invitations to all participants.
        Object.keys(participants).forEach((participantId) =>
            batch.set(db.collection('taskInvitations').doc(participantId), {
                [newTaskRef.id]: {
                    taskRef: newTaskRef,
                    receivingTime: time,
                },
            })
        );

        batch.commit();

        return { status: 'success', code: 'task/create-success' };
    } catch (err) {
        return { status: 'error', code: 'task/create-fail' };
    }
};

export const updateTask = async ({
    taskId,
    title,
    // privacy,
    participants: participantsRaw,
    date,
    startTime,
    endTime,
    description,
}) => {
    try {
        const participantsRawEntries = Object.entries(participantsRaw);
        const alreadyInvitedParticipants = {};
        const newAddedParticipantsEntries = [];
        participantsRawEntries.forEach(
            ([uid, { invitationStatus, responseTime, userRef }]) => {
                if (invitationStatus) {
                    alreadyInvitedParticipants[uid] = removeUndefinedAttr({
                        userRef,
                        invitationStatus,
                        responseTime,
                    });
                } else {
                    newAddedParticipantsEntries.push([
                        uid,
                        { userRef, invitationStatus: 'pending' },
                    ]);
                }
            }
        );
        const time = firebase.firestore.FieldValue.serverTimestamp();
        const taskRef = db.doc(`tasks/${taskId}`);
        const batch = db.batch();
        newAddedParticipantsEntries.forEach((participant) =>
            batch.set(db.collection('taskInvitations').doc(participant[0]), {
                [taskId]: {
                    taskRef,
                    receivingTime: time,
                },
            })
        );

        batch.update(
            taskRef,
            removeUndefinedAttr({
                title,
                //privacy,
                participants: {
                    ...alreadyInvitedParticipants,
                    ...Object.fromEntries(newAddedParticipantsEntries),
                },
                date,
                startTime,
                endTime,
                description,
            })
        );

        await batch.commit();

        return { status: 'success', code: 'task/update-success' };
    } catch (err) {
        return { status: 'error', code: 'task/update-fail' };
    }
};

export const getUserTasks = async (setter, uid) => {
    try {
        let targetUserUid;
        if (uid === undefined) {
            targetUserUid = auth.currentUser.uid;
        } else {
            targetUserUid = uid;
        }

        let tasksHaveUserAsParticipant = db
            .collection('tasks')
            .where(
                `participants.${targetUserUid}.invitationStatus`,
                '==',
                'accepted'
            );
        //Fetch only the public tasks in case the user have not logged in yet.
        tasksHaveUserAsParticipant = uid
            ? tasksHaveUserAsParticipant.where('privacy', '==', 'public')
            : tasksHaveUserAsParticipant;
        const unsubscribe1 = tasksHaveUserAsParticipant.onSnapshot(
            (snapshot) => {
                snapshot.docChanges().forEach(({ type, doc }) => {
                    setter((current) => {
                        let result;
                        delete current?.[doc.id];
                        if (type === 'removed') {
                            result = { ...current };
                        } else {
                            result = {
                                [doc.id]: doc.data(),
                                ...current,
                            };
                        }
                        return result;
                    });
                });
            }
        );

        let tasksHaveUserAsOwner = db
            .collection('tasks')
            .where('owner.uid', '==', targetUserUid);
        //Fetch only the public tasks in case the user have not logged in yet.
        tasksHaveUserAsOwner = uid
            ? tasksHaveUserAsOwner.where('privacy', '==', 'public')
            : tasksHaveUserAsOwner;
        const unsubscribe2 = tasksHaveUserAsOwner.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(({ type, doc }) => {
                setter((current) => {
                    let result;
                    delete current?.[doc.id];
                    if (type === 'removed') {
                        result = { ...current };
                    } else {
                        result = {
                            [doc.id]: doc.data(),
                            ...current,
                        };
                    }
                    return result;
                });
            });
        });

        return unsubscribeAll([unsubscribe1, unsubscribe2]);
    } catch (err) {
       // console.log(err);
    }
};

export const deleteTask = async ({ taskId }) => {
    try {
        await db.doc(`tasks/${taskId}`).delete();
        return { status: 'success', code: 'task/delete-success' };
    } catch (err) {
        return { status: 'error', code: 'task/delete-fail' };
    }
};

export const leaveTask = async ({ taskId }) => {
    const { uid } = auth.currentUser;
    try {
        const batch = db.batch();
        const taskRef = db.doc(`tasks/${taskId}`);
        batch.update(taskRef, {
            [`participants.${uid}.invitationStatus`]: 'left',
            [`participants.${uid}.responseTime`]: firebase.firestore.FieldValue.serverTimestamp(),
        });
        await batch.commit();
        return { status: 'success', code: 'task/leave-success' };
    } catch (err) {
        return { status: 'error', code: 'task/leave-fail' };
    }
};

export const getTaskInvitations = async (setter) => {
    try {
        const { uid } = auth.currentUser;
        db.doc(`taskInvitations/${uid}`).onSnapshot((doc) => {
            setter(doc.data());
        });
    } catch (err) {
        // console.log(err);
    }
};

const respondTaskInvitation = async (taskId, invitationStatus) => {
    const { uid } = auth.currentUser;
    try {
        const batch = db.batch();
        const taskInvitationsRef = db.doc(`taskInvitations/${uid}`);
        batch.update(taskInvitationsRef, {
            [taskId]: firebase.firestore.FieldValue.delete(),
        });
        const taskRef = db.doc(`tasks/${taskId}`);
        batch.update(taskRef, {
            [`participants.${uid}.invitationStatus`]: invitationStatus,
            [`participants.${uid}.responseTime`]: firebase.firestore.FieldValue.serverTimestamp(),
        });
        await batch.commit();
        return {
            status: 'success',
            code: `taskInvitation/${invitationStatus}-success`,
        };
    } catch (err) {
        return {
            status: 'error',
            code: `taskInvitation/${invitationStatus}-fail`,
        };
    }
};

export const acceptTaskInvitation = ({ taskId }) => {
    return respondTaskInvitation(taskId, 'accepted');
};

export const declineTaskInvitation = async ({ taskId }) => {
    return respondTaskInvitation(taskId, 'declined');
};
