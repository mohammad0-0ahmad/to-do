const admin = require('../utilities/getAdmin').default;
const db = require('../utilities/getAdmin').db;
const functions = require('../utilities/getFunctions').default;
const getAddedAttribute = require('../utilities/getDocChanges')
    .getAddedAttribute;

exports.default = functions.firestore
    .document('friendsLists/{uid}')
    .onWrite((change, { params: { uid } }) => {
        try {
            if (change.after.exists) {
                const addedFriendEntry = getAddedAttribute(
                    change.before.data(),
                    change.after.data()
                );
                if (addedFriendEntry) {
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
                        type: 'gotNewFriend',
                        targetId: addedFriendEntry[0],
                        createdAt: admin.firestore.FieldValue.serverTimestamp(),
                        seen: false,
                    });

                    return batch.commit();
                }
            }
        } catch (err) {
            console.error(err);
        }
    });
