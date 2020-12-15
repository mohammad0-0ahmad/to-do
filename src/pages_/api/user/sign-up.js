import sendResponse from '../../../server/sendResponse';
import admin from '../../../server/getAdmin';
import firebase from '../../../server/getFirebase';

const signUp = async ({ email, password,firstName,lastName }) => { 
    try {
        const {uid} = await admin.auth().createUser({email,password,displayName:[firstName,lastName].join(' ')});
        const idToken = await admin.auth().createCustomToken(uid);
        const {user} = await firebase.auth().signInWithCustomToken(idToken);
        await user.sendEmailVerification();
        await firebase.auth().signOut();
        return ({ status: true });
    } catch (err) {
        return {
            statusCode:400, 
            status:false,
            //message:code
            ...err
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
