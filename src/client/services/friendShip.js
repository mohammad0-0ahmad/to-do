import firebase, { auth, db } from '../../server/getFirebase';

export const getFriendshipRequests = (setter) => {
    const { uid } = auth.currentUser;
    return db.doc(`friendRequestLists/${uid}`).onSnapshot((doc) => {
        if (doc.exists) {
            setter({});
            Object.entries(doc.data()).map(async (entry) => {
                entry[1].sender = {
                    ...(await entry[1].sender.get()).data(),
                    id: entry[0],
                };
                setter((current) => ({
                    ...current,
                    [entry[0]]: {
                        time: entry[1].time.toDate(),
                        ...entry[1].sender,
                    },
                }));
            });
        }
    });
};

export const acceptFriendshipRequest = async ({ id }) => {
    try {
        const { uid } = auth.currentUser;
        await db.doc(`friendLists/${uid}`).set({ [id]: db.doc(`users/${id}`) });
        await db.doc(`friendRequestLists/${uid}`).update({
            [id]: firebase.firestore.FieldValue.delete(),
        });
        await db.doc(`friendLists/${id}`).set({ [uid]: db.doc(`users/${uid}`) });
    } catch (err) {
        console.log(err);
    }
};

export const rejectFriendshipRequest = async ({ id }) => {
    try {
        const { uid } = auth.currentUser;
        await db.doc(`friendRequestLists/${uid}`).update({
            [id]: firebase.firestore.FieldValue.delete(),
        });
    } catch (err) {
        console.log(err);
    }
};

export const sendFriendshipRequest = ({ id }) => {
    //TODO: push a notification to receiver
    try {
        const { uid } = auth.currentUser;
        db.doc(`friendRequestLists/${id}`).set(
            {
                [uid]: {
                    sender: db.doc(`users/${uid}`),
                    time: firebase.firestore.Timestamp.now(),
                },
            },
            { merge: true }
        );
        return { status: true };
    } catch (err) {
        return { status: false };
    }
};
