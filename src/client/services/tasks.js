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
            Object.entries(participantsRaw).map(([id, { userRef }]) => [
                id,
                { userRef, invitationStatus: 'pending' },
            ])
        );
        const { uid } = auth.currentUser;
        const time = firebase.firestore.FieldValue.serverTimestamp();
        const newTaskRef = db.collection('tasks').doc();
        const batch = db.batch();
        batch.set(newTaskRef, {
            owner: { id: uid, userRef: db.doc(`users/${uid}`) },
            title,
            privacy,
            participants,
            date,
            startTime,
            endTime,
            description,
            createTime: time,
        });
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
    id,
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
            ([id, { invitationStatus, responseTime, userRef }]) => {
                if (invitationStatus) {
                    alreadyInvitedParticipants[id] = removeUndefinedAttr({
                        userRef,
                        invitationStatus,
                        responseTime,
                    });
                } else {
                    newAddedParticipantsEntries.push([
                        id,
                        { userRef, invitationStatus: 'pending' },
                    ]);
                }
            }
        );
        const time = firebase.firestore.FieldValue.serverTimestamp();
        const taskRef = db.doc(`tasks/${id}`);
        const batch = db.batch();
        newAddedParticipantsEntries.forEach((participant) =>
            batch.set(db.collection('taskInvitations').doc(participant[0]), {
                [id]: {
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

export const getUserTasks = (setter, uid) => {
    const targetUserUid = uid ? uid : auth.currentUser.uid;
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
    const unsubscribe1 = tasksHaveUserAsParticipant.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(({ type, doc }) => {
            setter((current) => {
                let result;
                if (type === 'removed') {
                    delete current[doc.id];
                    result = { ...current };
                } else {
                    result = {
                        ...current,
                        [doc.id]: { ...doc.data(), id: doc.id },
                    };
                }
                return result;
            });
        });
    });

    let tasksHaveUserAsOwner = db
        .collection('tasks')
        .where('owner.id', '==', targetUserUid);
    //Fetch only the public tasks in case the user have not logged in yet.
    tasksHaveUserAsOwner = uid
        ? tasksHaveUserAsOwner.where('privacy', '==', 'public')
        : tasksHaveUserAsOwner;
    const unsubscribe2 = tasksHaveUserAsOwner.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(({ type, doc }) => {
            setter((current) => {
                let result;
                if (type === 'removed') {
                    delete current[doc.id];
                    result = { ...current };
                } else {
                    result = {
                        ...current,
                        [doc.id]: { ...doc.data(), id: doc.id },
                    };
                }
                return result;
            });
        });
    });

    return unsubscribeAll([unsubscribe1, unsubscribe2]);
};

export const deleteTask = async (id) => {
    try {
        await db.doc(`tasks/${id}`).delete();
        return { status: true };
    } catch (err) {
        return { status: false };
    }
};

export const leaveTask = async (taskId) => {
    const { uid } = auth.currentUser;
    try {
        const batch = db.batch();
        const taskRef = db.doc(`tasks/${taskId}`);
        batch.update(taskRef, {
            [`participants.${uid}.invitationStatus`]: 'left',
            [`participants.${uid}.responseTime`]: firebase.firestore.FieldValue.serverTimestamp(),
        });
        await batch.commit();
        return { status: true };
    } catch (err) {
        console.log(err);
        return { status: false };
    }
};

export const getTaskInvitations = async (setter) => {
    try {
        const { uid } = auth.currentUser;
        db.doc(`taskInvitations/${uid}`).onSnapshot((doc) => {
            setter(doc.data());
        });
    } catch (err) {
        console.log(err);
    }
};

const respondeTaskInvitation = async (taskId, invitationStatus) => {
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
        return { status: true };
    } catch (err) {
        console.log(err);
        return { status: false };
    }
};

export const acceptTaskInvitation = (taskId) => {
    return respondeTaskInvitation(taskId, 'accepted');
};

export const declineTaskInvitation = async (taskId) => {
    return respondeTaskInvitation(taskId, 'declined');
};
