const admin = require('../utilities/getAdmin').default;
const db = require('../utilities/getAdmin').db;
const functions = require('../utilities/getFunctions').default;

exports.default = functions.firestore
    .document('friendRequestLists/{uid}')
    .onWrite((change, { params: { uid } }) => {
        console.log(change.after);
        try {
            return db.collection(`notifications/${uid}/all`).add({
                type: 'friendshipRequest',
                targetId: 'test',
                created: admin.firestore.FieldValue.serverTimestamp(),
                seen: false,
            });
        } catch (err) {
            console.log(err);
        }
    });
