import { auth, db } from '../utilities/getFirebase';
import { ResponseWithSnackbarDataType } from '../HOCs/withSnackbarManager';
import { UserStatus } from 'src/db_schemas';
import { ResponseStatus } from 'src/globalConstants';

//TODO: validate email & password.

type SignUpType = (
    params: Pick<UserSchema, 'firstName' | 'lastName' | 'preferences'> &
        AuthSchema
) => ResponseWithSnackbarDataType;

export const signUp: SignUpType = async ({
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
            status: UserStatus.offline,
            userName: user.uid?.toLowerCase(),
            preferences,
        });

        await user.sendEmailVerification({
            url: process.env.NEXT_PUBLIC_DN,
        });

        await auth.signOut();
        return { status: ResponseStatus.success, code: 'auth/sign-up-success' };
    } catch ({ code }) {
        return { status: ResponseStatus.error, code };
    }
};

type LoginType = (params: AuthSchema) => ResponseWithSnackbarDataType;

export const logIn: LoginType = async ({ email, password }) => {
    try {
        const { user } = await auth.signInWithEmailAndPassword(email, password);
        if (user.emailVerified) {
            return {
                status: ResponseStatus.success,
                code: 'auth/sign-in-success',
            };
        } else {
            throw { code: 'auth/unverified-email' };
        }
    } catch ({ code }) {
        return { status: ResponseStatus.error, code };
    }
};

type SignOutType = () => ResponseWithSnackbarDataType;

export const signOut: SignOutType = async () => {
    try {
        await auth.signOut();
        return { code: 'auth/sign-out-success' };
    } catch (err) {
        return { status: ResponseStatus.error, code: 'auth/sign-out-fail' };
    }
};

type ResetPasswordReqType = (
    params: Pick<AuthSchema, 'email'>
) => ResponseWithSnackbarDataType;

export const resetPasswordReq: ResetPasswordReqType = async ({ email }) => {
    try {
        await auth.sendPasswordResetEmail(email);
        return {
            status: ResponseStatus.success,
            code: 'auth/reset-password-req-success',
        };
    } catch ({ code }) {
        return { status: ResponseStatus.error, code };
    }
};

type VerifyPasswordResetCodeType = (params: {
    code: string;
}) => ResponseWithSnackbarDataType;

export const verifyPasswordResetCode: VerifyPasswordResetCodeType = async ({
    code,
}) => {
    try {
        const email = await auth.verifyPasswordResetCode(code);
        return { status: ResponseStatus.success };
    } catch (err) {
        //console.log(err);
        return { status: ResponseStatus.error };
    }
};

type ConfirmPasswordResetType = (params: {
    code: string;
    newPassword: AuthSchema['password'];
}) => ResponseWithSnackbarDataType;

export const confirmPasswordReset: ConfirmPasswordResetType = async ({
    code,
    newPassword,
}) => {
    try {
        await auth.confirmPasswordReset(code, newPassword);
        return { status: ResponseStatus.success };
    } catch (err) {
        //console.log(err);
        return { status: ResponseStatus.error };
    }
};
