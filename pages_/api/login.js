const db = require('../../server/getAdmin').firestore();

export default (req, res) => {
    db.collection('users')
        .get()
        .then((snapshot) => {
            res.send(JSON.stringify(snapshot.docs.map((doc) => doc.data())));
        });
};
