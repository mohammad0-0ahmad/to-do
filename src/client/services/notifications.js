import { auth, db } from '../utilities/getFirebase';
//TODO: complete this func
export const getNotifications = (setter) => {
    const { uid } = auth.currentUser;
    return db.doc(`notifications/${uid}/all`).onSnapshot((doc) => {
        setter((current) => ({ ...current, ...doc.data() }));
    });
};
