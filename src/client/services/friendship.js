import firebase, { auth, db } from '../utilities/getFirebase';

export const getFriendshipRequests = (setter) => {
    const { uid } = auth.currentUser;
    return db.doc(`friendRequestLists/${uid}`).onSnapshot((doc) => {
        if (doc.exists) {
            setter({});
            Object.entries(doc.data()).map(async (entry) => {
                const sender = (await entry[1].sender.get()).data();
                delete sender.status;
                setter((current) => ({
                    ...current,
                    [entry[0]]: {
                        time: entry[1].time?.toDate(),
                        ...sender,
                    },
                }));
            });
        }
    });
};

export const acceptFriendshipRequest = async ({ senderId }) => {
    try {
        const { uid } = auth.currentUser;
        const batch = db.batch();

        const currentUserFriendsList = db.doc(`friendsLists/${uid}`);
        batch.set(currentUserFriendsList, {
            [senderId]: db.doc(`users/${senderId}`),
        });

        const currentUserFriendshipRequestsList = db.doc(
            `friendRequestLists/${uid}`
        );
        batch.update(currentUserFriendshipRequestsList, {
            [senderId]: firebase.firestore.FieldValue.delete(),
        });

        const senderFriendsList = db.doc(`friendsLists/${senderId}`);
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

export const rejectFriendshipRequest = async ({ senderId }) => {
    try {
        const { uid } = auth.currentUser;
        await db.doc(`friendRequestLists/${uid}`).update({
            [senderId]: firebase.firestore.FieldValue.delete(),
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

export const sendFriendshipRequest = async ({ personId }) => {
    try {
        const { uid } = auth.currentUser;
        await db.doc(`friendRequestLists/${personId}`).set(
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

export const unfriend = async ({ friendId }) => {
    try {
        const { uid } = auth.currentUser;
        const batch = db.batch();

        const currentUserFriendsList = db.doc(`friendsLists/${uid}`);
        batch.update(currentUserFriendsList, {
            [friendId]: firebase.firestore.FieldValue.delete(),
        });

        const targetUserFriendsList = db.doc(`friendsLists/${friendId}`);
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
