import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import Seo from 'frontend/components/Seo';
import withRedirectionManger from 'frontend/HOCs/withRedirectionManger';

const sendRequest = () => {
    const { t: tr } = useTranslation();

    return <Seo title={tr('common:friends.send-request.seo.title')} />;
};

export default withRedirectionManger(sendRequest, { requireAuth: true });
