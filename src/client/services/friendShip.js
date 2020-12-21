import firebase,{ auth, db } from '../../server/getFirebase';

export const getFriendList = (setter) => {
    const { uid } = auth.currentUser;
    return db.doc(`friendLists/${uid}`).onSnapshot((doc) => {
        setter((current) => ({ ...current, ...doc.data() }));
    });
};

export const getFriendshipRequestList = (setter) => {
    const { uid } = auth.currentUser;
    return db.doc(`friendRequestLists/${uid}`).onSnapshot((doc) => {
        setter((current) => ({ ...current, ...doc.data() }));
    });
};

export const sendFriendshipRequest = ({ id }) => {
    //TODO: push a notification to receiver
    try {
        const { uid } = auth.currentUser;
        db.doc(`friendRequestLists/${id}`).set(
            {
                [uid]: {
                    sender: db.doc(`users/${uid}`),
                    time: firebase.firestore.Timestamp.now()
                },
            },
            { merge: true }
        );
        return { status: true };
    } catch (err) {
        return { status: false };
    }
};
