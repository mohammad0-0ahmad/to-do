import { auth, db } from '../../server/getFirebase';

export const getFriendList = (setter) => {
    const { uid } = auth.currentUser;
    return db.doc(`friendLists/${uid}`).onSnapshot((doc) => {
        setter((current) => ({ ...current, ...doc.data() }));
    });
};

export const getPossibleFriends = async (setter) => {
    //const { uid } = auth.currentUser;
    //TODO: filter the friends & the user.
    const users = await db.collection('users').limit(10).get();
    users.forEach((doc) => {
        setter((current) => ({
            ...current,
            [doc.id]: { id: doc.id, ...doc.data() },
        }));
    });
};
