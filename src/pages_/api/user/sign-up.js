import sendResponse from '../../../server/sendResponse';
import admin from '../../../server/getAdmin';
import firebase from '../../../server/getFirebase';

const signUp = async ({ email, password,firstName,lastName }) => { 
    try {
        const {uid} = await admin.auth().createUser({email,password});
        await admin.firestore().doc(`users/${uid}`).set({ firstName, lastName, userName: uid });
        const idToken = await admin.auth().createCustomToken(uid);
        //TODO:What happen if someone logout from front-end or send sign-up request att same time.
        const {user} = await firebase.auth().signInWithCustomToken(idToken);
        //await user.sendEmailVerification();
        await firebase.auth().signOut();
        return ({ status: true });
    } catch (err) {
        return {
            statusCode:400, 
            status:false,
            message:err.code || err
        };
    }
};

const Router = async ({ body, method }, res) => {
    switch (method) {
    case 'POST':sendResponse(res,await signUp(body)); break;
    default:sendResponse(res);
    }
};

export default Router;
