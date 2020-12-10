import axios from 'axios';
import { updateProfile } from '../user/update-profile';

const endPoints =
{
    signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.API_KEY}`,
    emailVerification: `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.API_KEY}`
};

const signUp = ({ email, password,firstName,lastName }, res) => { 
    axios.post(endPoints.signUp,{email, password,firstName,lastName })
        .then(({ data:{idToken} }) => {
            updateProfile({ idToken,displayName:`${firstName} ${lastName}`}, res);
            sendEmailVerification(idToken, res);
        })
        .catch(({ response: { data: {error:{code,message}} } }) => {
            res.statusCode=code,
            res.send({message});
        });
};

const sendEmailVerification = (idToken,res) => {
    axios.post(endPoints.emailVerification, { idToken ,requestType:'VERIFY_EMAIL'})
        .then(res.send({message:'success'}))
        .catch(({ response: { data: { error: { code, message } } } }) => {
            res.statusCode=code,
            res.send({message});
        });
};

const Router = ({ body, method }, res) => {
    switch (method) {
    case 'POST': signUp(body, res); break;
    default:
        res.statusCode=404,
        res.end();
    }
};

export default Router;
