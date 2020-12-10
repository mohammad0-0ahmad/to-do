import axios from 'axios';
const endPoint =`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.API_KEY}`;

export const updateProfile = ({idToken,displayName,photoUrl}, res) => { 
    axios.post(endPoint,{idToken,displayName,photoUrl })
        .then(()=> {
            res.send({message:'success'});
        })
        .catch(({ response: { data: {error:{code,message}} } }) => {
            res.statusCode=code,
            res.send({message});
        });
};

const Router = ({ body, method }, res) => {
    switch (method) {
    case 'POST': updateProfile(body, res); break;
    default:
        res.statusCode=404,
        res.end();
    }
};

export default Router;
