import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';

const withRedirectionManger = (Page, settings) => {
    const RedirectionManger = (props) => {
        const { isAuthenticated } = useAuth();
        const [isReadyToRender, setIsReadyToRend] = useState(false);
        const url = settings?.url || '/';
        const requireAuth = settings?.requireAuth || false;

        useEffect(() => {
            const manager = async () => {
                requireAuth !== isAuthenticated && (await Router.push(url));
                setIsReadyToRend(true);
            };
            !isReadyToRender && manager();
        }, []);
        return isReadyToRender ? <Page {...props} /> : <></>;
    };

    return RedirectionManger;
};

export default withRedirectionManger;
