import firebase, { db, auth } from '../../server/getFirebase';

export const createTask = ({
    title,
    privacy,
    participants,
    date,
    startTime,
    endTime,
    description,
}) => {
    try {
        const { uid } = auth.currentUser;
        const time = firebase.firestore.FieldValue.serverTimestamp();
        const newTaskRef = db.collection('tasks').doc();
        const batch = db.batch();
        batch.set(newTaskRef, {
            owner: { id: uid, ref: db.doc(`users/${uid}`) },
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
                    ref: newTaskRef,
                    time,
                },
            })
        );
        batch.commit();
        return { status: true };
    } catch (err) {
        return { status: false };
    }
};

export const getUserTasks = (setter, uid) => {
    const targetUserUid = uid ? uid : auth.currentUser.uid;
    let ref1 = db
        .collection('tasks')
        .where(
            `participants.${targetUserUid}.invitationStatus`,
            '==',
            'accepted'
        );
    ref1 = uid ? ref1.where('privacy', '==', 'public') : ref1;
    const unsubscribe1 = ref1.onSnapshot((snapshot) => {
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

    let ref2 = db.collection('tasks').where('owner.id', '==', targetUserUid);
    ref2 = uid ? ref2.where('privacy', '==', 'public') : ref2;
    const unsubscribe2 = ref2.onSnapshot((snapshot) => {
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

    return () => {
        unsubscribe1();
        unsubscribe2();
    };
};

export const deleteTask = async (id) => {
    try {
        await db.doc(`tasks/${id}`).delete();
        return { status: true };
    } catch (err) {
        return { status: false };
    }
};
