import { formatDate } from '../utilities';
import { auth, db } from '../utilities/getFirebase';

export const getNotifications = (setter) => {
    const { uid } = auth.currentUser;
    try {
        return db
            .collection(`users/${uid}/notifications`)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach(async ({ type, doc }) => {
                    if (type === 'removed') {
                        setter((current) => {
                            delete current[doc.id];
                            return current;
                        });
                    } else {
                        const data = doc.data();
                        data.createdAt = formatDate(data?.createdAt.toDate());
                        const userProfile = (
                            await db.doc(`users/${data.causedBy}`).get()
                        ).data();
                        const { firstName, lastName, photoURL } =
                            userProfile || {};
                        data.causedBy = { firstName, lastName, photoURL };
                        setter((current) => ({ ...current, [doc.id]: data }));
                    }
                });
            });
    } catch (err) {
        //console.log(err);
    }
};

export const markNotificationAsSeen = (notificationId) => {
    const { uid } = auth.currentUser;
    try {
        db.doc(`users/${uid}/notifications/${notificationId}`).update({
            seen: true,
        });
    } catch (err) {
        //console.log(err);
    }
};

export const resetNotificationCounter = () => {
    const { uid } = auth.currentUser;
    try {
        db.doc(`users/${uid}`).update({
            notificationsCounter: 0,
        });
    } catch (err) {
        //console.log(err);
    }
};
