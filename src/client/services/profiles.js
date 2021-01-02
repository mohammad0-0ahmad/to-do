import { auth, db, storageRef } from '../../server/getFirebase';

export const getProfile = (setter) => {
    const { uid, email, photoURL } = auth.currentUser;
    return db.doc(`users/${uid}`).onSnapshot((doc) => {
        setter((current) => ({ ...current, photoURL, email, ...doc.data() }));
    });
};
//TODO: onSuccess, onFail.
export const updateProfile = async ({
    firstName,
    lastName,
    status,
    description,
    userName,
    email,
    newProfilePhoto,
    newPassword,
}) => {
    try {
        const user = auth.currentUser;
        const { uid, email: currentEmail } = user;

        if (email !== currentEmail) {
            //TODO: send confirmation email before change it.
            await user.updateEmail(email);
        }
        if (newPassword) {
            await user.updatePassword(newPassword);
        }
        if (newProfilePhoto) {
            //TODO: check image size and format.
            const imgRef = storageRef.child([uid, 'profile.jpg'].join('/'));
            await imgRef.put(newProfilePhoto);
            const newPhotoURL = await imgRef.getDownloadURL();
            await db.doc(`users/${uid}`).update({ photoURL: newPhotoURL });
        }
        await db.doc(`users/${uid}`).update({
            firstName,
            lastName,
            status: status || null,
            description: description || null,
            userName,
        });
    } catch (err) {
        console.log(err);
    }
};
