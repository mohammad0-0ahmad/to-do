import axios from 'axios';
const endPoint =`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.API_KEY}`;

const emailVerification = ({oobCode}, res) => { 
    axios.post(endPoint,{oobCode })
        .then(({ data: { displayName,emailVerified } }) => {
            res.send({message:'success',displayName,emailVerified});
        })
        .catch(({ response: { data: {error:{code,message}} } }) => {
            res.statusCode=code,
            res.send({message});
        });
};

const Router = ({ body, method }, res) => {
    switch (method) {
    case 'POST': emailVerification(body, res); break;
    default:
        res.statusCode=404,
        res.end();
    }
};

export default Router;
