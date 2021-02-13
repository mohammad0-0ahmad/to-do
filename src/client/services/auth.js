import { auth, db } from '../utilities/getFirebase';
import userStatus from '../constants/userStatus';
//TODO: validate email & password.

export const signUp = async ({
    email,
    password,
    firstName,
    lastName,
    preferences,
}) => {
    try {
        const { user } = await auth.createUserWithEmailAndPassword(
            email,
            password
        );

        const displayName = [firstName, lastName].join(' ');
        await user.updateProfile({
            displayName: displayName,
        });

        await db.doc(`users/${user.uid}`).set({
            uid: user.uid,
            firstName,
            lastName,
            status: userStatus.offline,
            userName: user.uid?.toLowerCase(),
            preferences,
        });

        await user.sendEmailVerification({
            url: process.env.NEXT_PUBLIC_DN,
        });

        await auth.signOut();
        return { status: 'success', code: 'auth/sign-up-success' };
    } catch ({ code }) {
        return { status: 'error', code };
    }
};

export const logIn = async ({ email, password }) => {
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
