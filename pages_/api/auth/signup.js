import axios from 'axios';
const END_POINT=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.API_KEY}`;

const signup = ({ body: { email,password} }, res) => {
    axios.post(END_POINT,{email,password})
        .then(data => res.send(data))
        .catch(err => res.send(err));
};

export default signup;
