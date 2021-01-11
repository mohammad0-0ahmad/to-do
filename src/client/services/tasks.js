import { db, auth } from '../../server/getFirebase';

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
        db.collection('tasks').add({
            owner: db.doc(`users/${uid}`),
            title,
            privacy,
            participants,
            date,
            startTime,
            endTime,
            description,
        });
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
            'participants',
            'array-contains',
            db.doc(`users/${targetUserUid}`)
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

    let ref2 = db
        .collection('tasks')
        .where('owner', '==', db.doc(`users/${targetUserUid}`));
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
