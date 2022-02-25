import Seo from 'frontend/components/Seo';
import withRedirectionManger from 'frontend/HOCs/withRedirectionManger';
import { useTranslation } from '@m0-0a/next-intl';

const Friends = () => {
    const { t } = useTranslation();

    return <Seo title={t('friends.index.seo.title')} />;
};

export default withRedirectionManger(Friends, { requireAuth: true });
