const admin = require('firebase-admin');

if (!admin.apps.length) {
    admin.initializeApp();
}

exports.default = admin;
exports.db = admin.firestore();
