import { auth, db } from '../../server/getFirebase';

export const getNotificationList = (setter) => {
    const { uid } = auth.currentUser;
    return db.doc(`notificationLists/${uid}`).onSnapshot((doc) => {
        setter((current) => ({ ...current, ...doc.data() }));
    });
};
