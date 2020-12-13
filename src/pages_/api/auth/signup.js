import axios from 'axios';
import sendResponse from '../../../server/sendResponse';
import { updateProfile } from '../user/profile';

const endPoints =
{
    signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.API_KEY}`,
    emailVerification: `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.API_KEY}`
};

const signUp = async ({ email, password,firstName,lastName }) => { 
    try {
        const {data: { idToken }} = await axios.post(endPoints.signUp, { email, password, firstName, lastName });
        await updateProfile({ idToken, displayName: `${firstName} ${lastName}` }),
        await sendEmailVerification(idToken);
        return ({status:true});
    } catch ({ response: { data: { error: { code, message } } } }) {
        return {
            statusCode:code, 
            status:false,
            message:message
        };
    }
};

const sendEmailVerification = async (idToken) => {
    try {
        await axios.post(endPoints.emailVerification, { idToken, requestType: 'VERIFY_EMAIL' });
        return ({status:true});
    } catch ({ response: { data: { error: { code, message } } } }) {
        return {
            statusCode: code,
            status: false,
            message: message
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
