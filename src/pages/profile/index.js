import Router from 'next/router';
import { useEffect } from 'react';
import withRedirectionManger from '../../client/components/withRedirectionManger';
import { useProfile } from '../../client/context/ProfileProvider';
import { useAuth } from '../../client/context/AuthProvider';
import { getServerSidePropsForNextTranslate } from '../../client/utilities';
import ProgressLogo from '../../client/components/Svg/ProgressLogo';
export const getServerSideProps = getServerSidePropsForNextTranslate;

const Index = () => {
    const { isAuthenticated } = useAuth();
    const { userName } = useProfile();

    useEffect(() => {
        isAuthenticated === false && Router.push('/404');
    }, []);

    useEffect(() => {
        if (isAuthenticated && userName) {
            Router.push(`/profile/${userName}`);
        }
    }, [userName]);

    return !userName ? <ProgressLogo /> : <></>;
};

export default withRedirectionManger(Index, { requireAuth: true });
