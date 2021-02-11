import { auth, db, storageRef } from '../utilities/getFirebase';
import { removeUndefinedAttr } from '../utilities';

export const getProfile = async (setter, userName) => {
    try {
        const profileDoc =
            userName &&
            (
                await db
                    .collection('users')
                    .where('userName', '==', userName)
                    .limit(1)
                    .get()
            )?.docs[0];

        if (userName && !profileDoc) {
            setter((current) => ({ ...current, exists: false }));
        }

        const targetUserUid = userName ? profileDoc.id : auth.currentUser.uid;

        return db.doc(`users/${targetUserUid}`).onSnapshot((doc) => {
            const data = userName
                ? doc.data()
                : {
                      email: auth.currentUser?.email,
                      id: targetUserUid,
                      ...doc.data(),
                  };
            setter((current) => ({ ...current, ...data }));
        });
    } catch (err) {
        console.log(err);
    }
};

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
        if (userName) {
            const isUserNameAvailable =
                (
                    await db
                        .collection('users')
                        .where('userName', '==', userName)
                        .limit(1)
                        .get()
                ).docs.length === 0;

            if (!isUserNameAvailable) {
                return { status: 'error', code: 'auth/unavailable-userName' };
            }
        }
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

        if (firstName || lastName) {
            const newDisplayName = [firstName, lastName].join(' ');
            if (newDisplayName !== user.displayName) {
                await user.updateProfile({
                    displayName: newDisplayName,
                });
            }
        }

        await db.doc(`users/${uid}`).update(
            removeUndefinedAttr({
                firstName,
                lastName,
                status,
                description,
                userName: userName?.toLowerCase(),
                preferences,
            })
        );

        return { status: 'success', code: 'profile/update-success' };
    } catch (err) {
        console.log(err.code);
        return { status: 'error', code: 'profile/update-fail' };
    }
};
