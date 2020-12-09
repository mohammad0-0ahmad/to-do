import {auth} from '../../../server/getFirebase';

export default (req, res) => {
    auth.signOut()
        .then(data => {
            res.statusCode = 200; res.send(data);
        })
        .catch((err) => {
            res.statusCode=400 ;
            res.send(err);
        });  
};