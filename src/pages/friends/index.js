import useTranslation from 'next-translate/useTranslation';
import Seo from '../../client/components/Seo';
import withRedirectionManger from '../../client/components/withRedirectionManger';

const Friends = () => {
    const { t: tr } = useTranslation();

    return <Seo title={tr('common:friends.index.seo.title')} />;
};

export default withRedirectionManger(Friends, { requireAuth: true });
