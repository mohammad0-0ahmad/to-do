import admin from 'firebase-admin';
import { adminConfig } from './configs';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(adminConfig.credential),
        databaseURL: adminConfig.databaseURL,
    });
}

export default admin;
export const auth = admin.auth();
export const db = admin.firestore();
