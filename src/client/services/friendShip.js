import firebase, { auth, db } from '../utilities/getFirebase';

export const getFriendshipRequests = (setter) => {
    const { uid } = auth.currentUser;
    return db.doc(`friendRequestLists/${uid}`).onSnapshot((doc) => {
        if (doc.exists) {
            setter({});
            Object.entries(doc.data()).map(async (entry) => {
                const sender = (await entry[1].sender.get()).data();
                delete sender.status;
                entry[1].sender = {
                    ...sender,
                    id: entry[0],
                };
                setter((current) => ({
                    ...current,
                    [entry[0]]: {
                        time: entry[1].time?.toDate(),
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
        const batch = db.batch();

        const currentUserFriendsList = db.doc(`friendsLists/${uid}`);
        batch.set(currentUserFriendsList, { [id]: db.doc(`users/${id}`) });

        const currentUserfriendshipRequestsList = db.doc(
            `friendRequestLists/${uid}`
        );
        batch.update(currentUserfriendshipRequestsList, {
            [id]: firebase.firestore.FieldValue.delete(),
        });

        const senderFriendsList = db.doc(`friendsLists/${id}`);
        batch.set(
            senderFriendsList,
            { [uid]: db.doc(`users/${uid}`) },
            { merge: true }
        );

        await batch.commit();
        return {
            status: 'success',
            code: 'friendship/accept-friendship-req-success',
        };
    } catch (err) {
        return {
            status: 'error',
            code: 'friendship/accept-friendship-req-fail',
        };
    }
};

export const rejectFriendshipRequest = async ({ id }) => {
    try {
        const { uid } = auth.currentUser;
        await db.doc(`friendRequestLists/${uid}`).update({
            [id]: firebase.firestore.FieldValue.delete(),
        });
        return {
            status: 'success',
            code: 'friendship/reject-friendship-req-success',
        };
    } catch (err) {
        return {
            status: 'error',
            code: 'friendship/reject-friendship-req-fail',
        };
    }
};

export const sendFriendshipRequest = async ({ id }) => {
    //TODO: push a notification to receiver
    try {
        const { uid } = auth.currentUser;
        await db.doc(`friendRequestLists/${id}`).set(
            {
                [uid]: {
                    sender: db.doc(`users/${uid}`),
                    time: firebase.firestore.FieldValue.serverTimestamp(),
                },
            },
            { merge: true }
        );
        return {
            status: 'success',
            code: 'friendship/send-friendship-req-success',
        };
    } catch (err) {
        return { status: 'error', code: 'friendship/send-friendship-req-fail' };
    }
};

export const unfriend = async ({ id }) => {
    try {
        const { uid } = auth.currentUser;
        const batch = db.batch();

        const currentUserFriendsList = db.doc(`friendsLists/${uid}`);
        batch.update(currentUserFriendsList, {
            [id]: firebase.firestore.FieldValue.delete(),
        });

        const targetUserFriendsList = db.doc(`friendsLists/${id}`);
        batch.update(targetUserFriendsList, {
            [uid]: firebase.firestore.FieldValue.delete(),
        });

        await batch.commit();
        return {
            status: 'success',
            code: 'friendship/unfriend-success',
        };
    } catch (err) {
        return { status: 'error', code: 'friendship/unfriend-fail' };
    }
};
