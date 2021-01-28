import useTranslation from 'next-translate/useTranslation';
import SettingsForm from '../client/components/Forms/SettingsForm';
import SectionBase from '../client/components/SectionBase';
import Seo from '../client/components/Seo';
import withRedirectionManger from '../client/components/withRedirectionManger';
import { getServerSidePropsForNextTranslate } from '../client/utils';
export const getServerSideProps = getServerSidePropsForNextTranslate;

const Settings = () => {
    const { t: tr } = useTranslation();
    return (
        <>
            <Seo title={tr('common:settings.seo.title')} />
            <SectionBase>
                <SettingsForm />
            </SectionBase>
        </>
    );
};

export default withRedirectionManger(Settings, { requireAuth: true });
