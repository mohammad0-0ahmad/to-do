import firebase from 'firebase/app';
import { firebaseConfig } from './configs';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const storageRef = storage.ref();
