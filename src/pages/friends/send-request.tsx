import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import Seo from '../../frontend/components/Seo';
import withRedirectionManger from '../../frontend/components/withRedirectionManger';
import { getServerSidePropsForNextTranslate } from '../../frontend/utilities';
export const getServerSideProps = getServerSidePropsForNextTranslate;

const sendRequest = () => {
    const { t: tr } = useTranslation();

    return <Seo title={tr('common:friends.send-request.seo.title')} />;
};

export default withRedirectionManger(sendRequest, { requireAuth: true });
