import Router from 'next/router';
import { useEffect } from 'react';
import withRedirectionManger from '../../frontend/components/withRedirectionManger';
import { useProfile } from '../../frontend/providers/ProfileProvider';
import { useAuth } from '../../frontend/providers/AuthProvider';
import { getServerSidePropsForNextTranslate } from '../../frontend/utilities';
import ProgressLogo from '../../frontend/components/Svg/ProgressLogo';
export const getServerSideProps = getServerSidePropsForNextTranslate;

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
