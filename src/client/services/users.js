import { auth, db } from '../../server/getFirebase';

export const getFriendList = (setter) => {
    const { uid } = auth.currentUser;
    return db.doc(`friendLists/${uid}`).onSnapshot((doc) => {
        if (doc.exists) {
            setter({});
            Object.entries(doc.data()).map(async (entry) => {
                entry[1] = {
                    ...(await entry[1].get()).data(),
                    id: entry[0],
                    ref: entry[1],
                };
                setter((current) => ({
                    ...current,
                    [entry[0]]: {
                        ...entry[1],
                    },
                }));
            });
        }
    });
};

export const getPossibleFriends = async (setter) => {
    //const { uid } = auth.currentUser;
    //TODO: filter the friends & the user.
    const users = await db.collection('users').limit(10).get();
    users.forEach((doc) => {
        const data = doc.data();
        delete data.status;
        setter((current) => ({
            ...current,
            [doc.id]: { id: doc.id, ...data },
        }));
    });
};
