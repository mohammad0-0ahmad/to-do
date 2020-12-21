import { auth, db } from '../../server/getFirebase';

export const getProfile = (setter) => {
    const { uid } = auth.currentUser;
    return db.doc(`users/${uid}`).onSnapshot((doc) => {
        setter((current) => ({ ...current, ...doc.data() }));
    });
};

export const updateProfile = ({firstName,lastName,userName,email,photoURL}) => {
};