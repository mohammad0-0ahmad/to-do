import { formatDate } from '../utilities';
import { auth, db } from '../utilities/getFirebase';

export type NotificationType = Omit<NotificationSchema, 'causedBy'> & {
    causedBy: Pick<UserSchema, 'firstName' | 'lastName' | 'photoURL'>;
};

type GetNotificationsType = (setter: SetStateType<NotificationType>) => void;

export const getNotifications: GetNotificationsType = (setter) => {
    const { uid } = auth.currentUser;
    try {
        return db
            .collection(`users/${uid}/notifications`)
            .orderBy('createdAt', 'asc')
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
                        setter((current) => {
                            delete current?.[doc.id];
                            return { [doc.id]: data, ...current };
                        });
                    }
                });
            });
    } catch (err) {
        //console.log(err);
    }
};

type MarkNotificationAsSeenType = (
    notificationId: NotificationSchema['notificationId']
) => void;
export const markNotificationAsSeen: MarkNotificationAsSeenType = (
    notificationId
) => {
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
