import { auth, db } from '../../server/getFirebase';
import { unsubscribeAll } from '../utils';

export const getFriendList = (setter) => {
    const unsubscribeFunctions = [];
    const { uid } = auth.currentUser;
    unsubscribeFunctions.push(
        db.doc(`friendsLists/${uid}`).onSnapshot((doc) => {
            if (doc.exists) {
                setter({});
                Object.entries(doc.data()).map(async (entry) => {
                    unsubscribeFunctions.push(
                        entry[1].onSnapshot((doc) =>
                            setter((current) => ({
                                ...current,
                                [entry[0]]: {
                                    id: entry[0],
                                    userRef: entry[1],
                                    ...doc.data(),
                                },
                            }))
                        )
                    );
                });
            }
        })
    );
    return unsubscribeAll(unsubscribeFunctions);
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
