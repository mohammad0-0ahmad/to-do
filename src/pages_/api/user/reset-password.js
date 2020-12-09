import {auth} from '../../../server/getFirebase';

const post = ({ body: { email } }, res) => {
    auth.sendPasswordResetEmail(email)
        .then(() => {
            res.statusCode = 200;
            res.send({ msg: 'auth/reset-password-request-success.' });
        })
        .catch(({ code }) => {
            res.statusCode=400 ;
            res.send({ msg: code });
        });
};

export default ({method,...req}, res) => {
    switch (method) {
    case 'POST': post(req,res); break;  
    default:
        res.statusCode = 404;
        res.end();
    }
};