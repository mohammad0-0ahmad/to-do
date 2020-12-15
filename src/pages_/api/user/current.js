import sendResponse from '../../../server/sendResponse';
import firebase from '../../../server/getFirebase';

const signUp = async () => { 
    try {
        const currentUser = await firebase.auth().currentUser;
        return ({ status: true ,...currentUser});
    } catch (err) {
        return {
            statusCode: 400,
            msg:'fel',
            ...err
        };
    }
};

const Router = async ({ body, method }, res) => {
    switch (method) {
    case 'GET':sendResponse(res,await signUp(body)); break;
    default:sendResponse(res);
    }
};

export default Router;
