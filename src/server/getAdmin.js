const admin = require('firebase-admin');
const credential = require('./credential');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(credential),
        databaseURL: process.env.DB_URL,
    });
}

module.exports = admin;
