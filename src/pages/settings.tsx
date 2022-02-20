import { useTranslation } from 'next-export-i18n';
import SettingsForm from 'frontend/components/Forms/SettingsForm';
import SectionBase from 'frontend/components/SectionBase';
import Seo from 'frontend/components/Seo';
import withRedirectionManger from 'frontend/HOCs/withRedirectionManger';

const Settings = () => {
    const { t: tr } = useTranslation();
    return (
        <>
            <Seo title={tr('settings.seo.title')} />
            <SectionBase>
                <SettingsForm />
            </SectionBase>
        </>
    );
};

export default withRedirectionManger(Settings, { requireAuth: true });
