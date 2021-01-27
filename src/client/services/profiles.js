import { auth, db, storageRef } from '../../server/getFirebase';
import { removeUndefinedAttr } from '../utils';

export const getProfile = (setter, uid) => {
    const targetUserUid = uid ? uid : auth.currentUser.uid;
    return db.doc(`users/${targetUserUid}`).onSnapshot((doc) => {
        if (!doc.exists) {
            setter((current) => ({ ...current, exists: false }));
        }
        const data = uid
            ? doc.data()
            : {
                  email: auth.currentUser?.email,
                  id: targetUserUid,
                  ...doc.data(),
              };
        setter((current) => ({ ...current, ...data }));
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
    preferences,
}) => {
    try {
        const user = auth.currentUser;
        const { uid, email: currentEmail } = user;
        if (email && email !== currentEmail) {
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
        await db.doc(`users/${uid}`).update(
            removeUndefinedAttr({
                firstName,
                lastName,
                status,
                description,
                userName,
                preferences,
            })
        );
    } catch (err) {
        console.log(err);
    }
};
