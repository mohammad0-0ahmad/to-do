import axios from 'axios';
import sendResponse from '../../../server/sendResponse';

const endPoint = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.API_KEY}`;

const emailVerification = async ({ oobCode }) => { 
    try {
        const { data: { displayName, emailVerified } }= await axios.post(endPoint, { oobCode });
        return ({
            status: true,
            displayName,
            emailVerified
        });
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
    case 'POST':sendResponse(res,await emailVerification(body)); break;
    default:sendResponse(res);
    }
};

export default Router;
