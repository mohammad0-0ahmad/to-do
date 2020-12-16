import { auth ,db} from '../../server/getFirebase';

export const signUp = async ({email, password,firstName,lastName},{onSuccess,onFail}) => {
    //TODO:Front-end validating.
    try {
        const {user} = await auth.createUserWithEmailAndPassword(email, password);
        await db.doc(`users/${user.uid}`).set({firstName,lastName,userName:user.uid});
        user.sendEmailVerification({url:'http://localhost:3000/login'});
        onSuccess && onSuccess(user);
    } catch (err) {
        onFail && onFail(err.code || err);
    }
};

export const logIn = async ({ email, password }, { onSuccess, onFail }) => {
    //TODO:Front-end validating.
    try {
        const { user } = await auth.signInWithEmailAndPassword(email, password);
        if (user.emailVerified) {
            onSuccess && onSuccess(user);
        }
        else {
            auth.signOut();
            throw 'auth/unverified-email';
        }
    } catch (err) {
        onFail && onFail(err.code || err);
    }
};

export const signOut = async ({ onSuccess,onFail }) => {
    try {
        await auth.signOut();
        onSuccess && onSuccess();
    } catch (err) {
        onFail && onFail(err.code || err);
    }
};

export const resetPasswordReq = async ({ email }, { onSuccess ,onFail}) => {
    try {
        await auth.sendPasswordResetEmail(email);
        onSuccess && onSuccess();
    } catch (err) {
        onFail && onFail(err.code || err);
    }
};

export const verifyPasswordResetCode = async ({ code }, {onSuccess,onFail}) => { 
    try {
        const email = await auth.verifyPasswordResetCode(code);
        onSuccess && onSuccess(email);
    } catch (err) {
        onFail && onFail(err.code || err);
    }
};

export const confirmPasswordReset = async ({ code ,newPassword}, { onFail, onSuccess }) => { 
    //TODO:Front-end validating.
    try {
        await auth.confirmPasswordReset(code, newPassword);
        onSuccess && onSuccess();
    }catch (err) {
        onFail && onFail(err.code || err);
    }
};