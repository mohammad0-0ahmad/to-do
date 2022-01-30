import useTranslation from 'next-translate/useTranslation';
import Seo from '../../frontend/components/Seo';
import withRedirectionManger from '../../frontend/HOCs/withRedirectionManger';
import { getServerSidePropsForNextTranslate } from '../../frontend/utilities';
export const getServerSideProps = getServerSidePropsForNextTranslate;

const Friends = () => {
    const { t: tr } = useTranslation();

    return <Seo title={tr('common:friends.index.seo.title')} />;
};

export default withRedirectionManger(Friends, { requireAuth: true });
