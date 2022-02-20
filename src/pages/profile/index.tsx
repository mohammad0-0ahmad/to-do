import Router from 'next/router';
import { useEffect } from 'react';
import withRedirectionManger from 'frontend/HOCs/withRedirectionManger';
import { useProfile } from 'frontend/providers/ProfileProvider';
import { useAuth } from 'frontend/providers/AuthProvider';

import ProgressLogo from 'frontend/components/Svg/ProgressLogo';

const Index = () => {
    const { isAuthenticated } = useAuth();
    const { userName } = useProfile();

    useEffect(() => {
        isAuthenticated === false && Router.replace('/404');
    }, []);

    useEffect(() => {
        if (isAuthenticated && userName) {
            Router.replace(`/profile/${userName}`);
        }
    }, [userName]);

    return !userName ? <ProgressLogo /> : <></>;
};

export default withRedirectionManger(Index, { requireAuth: true });
