import { formatDate } from '../utilities';
import { auth, db } from '../utilities/getFirebase';
//TODO: complete this func
export const getNotifications = (setter) => {
    const { uid } = auth.currentUser;
    return db
        .collection(`users/${uid}/notifications`)
        .orderBy('createdAt')
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
                    const { firstName, lastName, photoURL } = (
                        await db.doc(`users/${data.targetId}`).get()
                    ).data();
                    data.causedBy = { firstName, lastName, photoURL };
                    setter((current) => ({ ...current, [doc.id]: data }));
                }
            });
        });
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
