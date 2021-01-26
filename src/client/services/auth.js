import { auth, db } from '../../server/getFirebase';
import userStatus from '../constants/userStatus';

export const signUp = async ({
    email,
    password,
    firstName,
    lastName,
    preferences,
}) => {
    //TODO:Front-end validating.
    try {
        const { user } = await auth.createUserWithEmailAndPassword(
            email,
            password
        );
        await db.doc(`users/${user.uid}`).set({
            firstName,
            lastName,
            status: userStatus.offline,
            userName: user.uid,
            preferences,
        });
        //TODO: reactivate send email verification
        await user.sendEmailVerification({
            url: process.env.NEXT_PUBLIC_DN,
        });
        return { status: 'success', code: 'auth/sign-up-success' };
    } catch ({ code }) {
        return { status: 'error', code };
    }
};

export const logIn = async ({ email, password }) => {
    //TODO:Front-end validating.
    try {
        const { user } = await auth.signInWithEmailAndPassword(email, password);
        if (user.emailVerified) {
            return { status: 'success', code: 'auth/sign-in-success' };
        } else {
            throw { code: 'auth/unverified-email' };
        }
    } catch ({ code }) {
        return { status: 'error', code };
    }
};

export const signOut = async () => {
    try {
        await auth.signOut();
        return { code: 'auth/sign-out-success' };
    } catch (err) {
        return { status: 'error', code: 'auth/sign-out-fail' };
    }
};

export const resetPasswordReq = async ({ email }) => {
    try {
        await auth.sendPasswordResetEmail(email);
        return {
            status: 'success',
            code: 'auth/reset-password-req-success',
        };
    } catch ({ code }) {
        return { status: 'error', code };
    }
};
//TODO: Activate related page.
export const verifyPasswordResetCode = async ({ code }) => {
    try {
        const email = await auth.verifyPasswordResetCode(code);
        return { status: 'success' };
    } catch (err) {
        console.log(err);
        return { status: 'error' };
    }
};

//TODO: Activate related page.
export const confirmPasswordReset = async ({ code, newPassword }) => {
    //TODO:Front-end validating.
    try {
        await auth.confirmPasswordReset(code, newPassword);
        return { status: 'success' };
    } catch (err) {
        console.log(err);
        return { status: 'error' };
    }
};
