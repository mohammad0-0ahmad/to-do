import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import Seo from '../../client/components/Seo';

const sendRequest = () => {
    const { t: tr } = useTranslation();

    return <Seo title={tr('common:friends.send-request.seo.title')} />;
};

export default sendRequest;
