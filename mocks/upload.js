import { db } from '../src/client/utilities/getFirebase';
import mockUsers from './users.json';

export const uploadFirstHalfOfMockUsers = async () => {
    try {
        const batch = db.batch();
        for (let i = 0; i < mockUsers.length / 2; i++) {
            const docRef = db.collection('users').doc();
            batch.set(docRef, {
                ...mockUsers[i],
                uid: docRef.id,
                userName: docRef.id,
            });
        }
        await batch.commit();
    } catch (err) {
        //console.log(err);
    }
};
