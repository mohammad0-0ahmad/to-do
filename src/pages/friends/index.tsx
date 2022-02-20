import { useTranslation } from 'next-export-i18n';
import Seo from 'frontend/components/Seo';
import withRedirectionManger from 'frontend/HOCs/withRedirectionManger';

const Friends = () => {
    const { t: tr } = useTranslation();

    return <Seo title={tr('friends.index.seo.title')} />;
};

export default withRedirectionManger(Friends, { requireAuth: true });
