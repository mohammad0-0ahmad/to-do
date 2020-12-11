import axios from 'axios';
import sendResponse from '../../../server/sendResponse';

const endPoint =`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.API_KEY}`;

export const updateProfile = async ({ idToken, displayName, photoUrl }) => {
    try {
        await axios.post(endPoint, { idToken, displayName, photoUrl });
        return ({status:true});
    } catch ({ response: { data: {error:{code:statusCode,message}} } }) {
        return {
            statusCode, 
            status:false,
            message
        };
    }
};

const Router = async ({ body, method }, res) => {
    switch (method) {
    case 'POST': sendResponse(res,await updateProfile(body)); break;
    default:sendResponse(res);
    }
};

export default Router;
