import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import Seo from '../../client/components/Seo';
import withRedirectionManger from '../../client/components/withRedirectionManger';
import { getServerSidePropsForNextTranslate } from '../../client/utils';
export const getServerSideProps = getServerSidePropsForNextTranslate;

const sendRequest = () => {
    const { t: tr } = useTranslation();

    return <Seo title={tr('common:friends.send-request.seo.title')} />;
};

export default withRedirectionManger(sendRequest, { requireAuth: true });
