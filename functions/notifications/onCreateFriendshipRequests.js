const admin = require('../utilities/getAdmin').default;
const db = require('../utilities/getAdmin').db;
const functions = require('../utilities/getFunctions').default;
const getAddedAttribute = require('../utilities/getDocChanges')
    .getAddedAttribute;

exports.default = functions.firestore
    .document('friendRequestLists/{uid}')
    .onWrite((change, { params: { uid } }) => {
        try {
            if (change.after.exists) {
                const addedFriendshipRequestEntry = getAddedAttribute(
                    change.before.data(),
                    change.after.data()
                );
                if (addedFriendshipRequestEntry) {
                    const batch = db.batch();
                    batch.set(
                        db.doc(`users/${uid}`),
                        {
                            notificationsCounter: admin.firestore.FieldValue.increment(
                                1
                            ),
                        },
                        { merge: true }
                    );
                    const notificationDocRef = db
                        .collection(`users/${uid}/notifications`)
                        .doc();
                    batch.set(notificationDocRef, {
                        notificationId: notificationDocRef.id,
                        type: 'friendshipRequest',
                        targetId: addedFriendshipRequestEntry[0],
                        createdAt: admin.firestore.FieldValue.serverTimestamp(),
                        causedBy: addedFriendshipRequestEntry[0],
                        seen: false,
                    });

                    return batch.commit();
                }
            }
        } catch (err) {
            console.error(err);
        }
    });
