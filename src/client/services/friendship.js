import firebase, { auth, db } from '../utilities/getFirebase';
import { subCollections, documents } from '../utilities/firestorePathes';

export const getFriendshipRequests = (setter) => {
    const { uid } = auth.currentUser;
    return db
        .collection(subCollections.friendshipRequests(uid))
        .onSnapshot((snapshot) => {
            if (!snapshot.empty) {
                snapshot.docChanges().forEach(async ({ type, doc }) => {
                    console.log(type);
                    if (type === 'removed') {
                        setter((current) => {
                            delete current[doc.id];
                            return { ...current };
                        });
                    } else {
                        const {
                            senderRef,
                            ...senderFriendshipRequestData
                        } = doc.data();
                        const senderProfile = (await senderRef.get()).data();

                        const sender = {
                            ...senderFriendshipRequestData,
                            ...senderProfile,
                        };
                        delete sender.status;
                        setter((current) => ({ ...current, [doc.id]: sender }));
                    }
                });
            }
        });
};

export const sendFriendshipRequest = async ({ personId }) => {
    try {
        const { uid } = auth.currentUser;

        await db.doc(documents.friendshipRequest(personId, uid)).set({
            uid,
            senderRef: db.doc(documents.user(uid)),
            createTime: firebase.firestore.FieldValue.serverTimestamp(),
        });

        return {
            status: 'success',
            code: 'friendship/send-friendship-req-success',
        };
    } catch (err) {
        return { status: 'error', code: 'friendship/send-friendship-req-fail' };
    }
};

export const rejectFriendshipRequest = async ({ senderId }) => {
    try {
        const { uid } = auth.currentUser;
        await db.doc(documents.friendshipRequest(uid, senderId)).delete();
        return {
            status: 'success',
            code: 'friendship/reject-friendship-req-success',
        };
    } catch (err) {
        return {
            status: 'error',
            code: 'friendship/reject-friendship-req-fail',
        };
    }
};

export const acceptFriendshipRequest = async ({ senderId }) => {
    try {
        const { uid } = auth.currentUser;
        const batch = db.batch();

        const friendDoc = db.doc(documents.friend(uid, senderId));

        batch.set(friendDoc, {
            uid: senderId,
            userRef: db.doc(documents.user(senderId)),
        });

        const friendshipRequestsCollection = db.doc(
            documents.friendshipRequest(uid, senderId)
        );
        batch.delete(friendshipRequestsCollection);

        const senderFriendDoc = db.doc(documents.friend(senderId, uid));
        batch.set(senderFriendDoc, {
            uid,
            userRef: db.doc(documents.user(uid)),
        });

        await batch.commit();
        return {
            status: 'success',
            code: 'friendship/accept-friendship-req-success',
        };
    } catch (err) {
        return {
            status: 'error',
            code: 'friendship/accept-friendship-req-fail',
        };
    }
};

export const unfriend = async ({ friendId }) => {
    try {
        const { uid } = auth.currentUser;
        const batch = db.batch();

        const currentUserFriendDoc = db.doc(documents.friend(uid, friendId));
        batch.delete(currentUserFriendDoc);

        const targetUserFriendDoc = db.doc(documents.friend(friendId, uid));
        batch.delete(targetUserFriendDoc);

        await batch.commit();
        return {
            status: 'success',
            code: 'friendship/unfriend-success',
        };
    } catch (err) {
        return { status: 'error', code: 'friendship/unfriend-fail' };
    }
};
