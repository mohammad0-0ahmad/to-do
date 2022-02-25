import React from 'react';
import Seo from 'frontend/components/Seo';
import withRedirectionManger from 'frontend/HOCs/withRedirectionManger';
import { useTranslation } from '@m0-0a/next-intl';

const sendRequest = () => {
    const { t } = useTranslation();

    return <Seo title={t('friends.send-request.seo.title')} />;
};

export default withRedirectionManger(sendRequest, { requireAuth: true });
