import useTranslation from 'next-translate/useTranslation';
import Seo from '../../client/components/Seo';
import withRedirectionManger from '../../client/components/withRedirectionManger';
import { getServerSidePropsForNextTranslate } from '../../client/utils';
export const getServerSideProps = getServerSidePropsForNextTranslate;

const Friends = () => {
    const { t: tr } = useTranslation();

    return <Seo title={tr('common:friends.index.seo.title')} />;
};

export default withRedirectionManger(Friends, { requireAuth: true });
