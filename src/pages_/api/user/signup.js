import {auth} from '../../../server/getFirebase';

const post = ({ body: { email, password } }, res) => {
    auth.createUserWithEmailAndPassword(email, password)
        .then(data => {
            auth.currentUser.sendEmailVerification();
            res.statusCode = 200;
            res.send(data);
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