import { auth } from '../../server/getFirebase';

export const signUp = ({email, password,firstName,lastName},{onSuccess}) => {
    //TODO:Front-end validating.
    auth.createUserWithEmailAndPassword(email, password)
        .then(({user}) => {
            user.updateProfile({ displayName: `${firstName} ${lastName}` });
            //TODO: fix Email custom verification link.
            // user.sendEmailVerification();
            onSuccess && onSuccess(user);
        })
        .catch(({ code }) => code);
};

export const logIn = ({ email, password }, { onSuccess }) => {
    //TODO:Front-end validating.
    auth.signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
            //TODO: fix Email custom verification link.
            //    user.emailVerified? onSuccess(user) : signOut();
            onSuccess(user);
        })
        .catch(({ code }) => code);
};

export const signOut = ({ onSuccess }) => {
    auth.signOut()
        .then(() => onSuccess && onSuccess())
        .catch(({ code }) => code);
};

export const resetPasswordReq = ({ email }, { onSuccess }) => {
    onSuccess();
    auth.sendPasswordResetEmail(email)
        .then(({user}) => onSuccess && onSuccess(user))
        .catch(({ code }) => code);
};

export const verifyPasswordResetCode = ({code},{onFail,onSuccess}) => { 
    auth.verifyPasswordResetCode(code)
        .then((email) => (email && onSuccess) && onSuccess())
        .catch(({ code }) => onFail(code));
};

export const confirmPasswordReset = ({ code ,newPassword}, { onFail, onSuccess }) => { 
    //TODO:Front-end validating.
    auth.confirmPasswordReset(code,newPassword)
        .then(() => onSuccess && onSuccess())
        .catch(({ code }) => onFail(code));
};

export const isAlreadyAuthenticated = () => {
    return Boolean(auth.currentUser); 
};