import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';

//Note: Pages that can be visited regardless of auth state mustn't have this HOC as wrapper.

const withRedirectionManger = (Page, settings) => {
    const RedirectionManger = (props) => {
        const { isAuthenticated } = useAuth();
        const [isReadyToRender, setIsReadyToRender] = useState(false);
        const url = settings?.url || '/';
        const requireAuth = settings?.requireAuth || false;

        useEffect(() => {
            const manager = async () => {
                setIsReadyToRender(false);
                if (requireAuth !== isAuthenticated) {
                    await Router.replace(url);
                }
                setIsReadyToRender(true);
            };
            !isReadyToRender && manager();
        }, [isAuthenticated]);

        return isReadyToRender ? <Page {...props} /> : <></>;
    };

    return RedirectionManger;
};

export default withRedirectionManger;
