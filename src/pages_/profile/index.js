import Router from 'next/router';
import { useEffect } from 'react';
import { auth } from '../../server/getFirebase';

const index = () => {
    useEffect(() => {
        const path = auth.currentUser
            ? `/profile/${auth.currentUser.uid}`
            : '/404';
        Router.push(path);
    }, []);

    return <></>;
};

export default index;
