import SettingsForm from 'frontend/components/Forms/SettingsForm';
import SectionBase from 'frontend/components/SectionBase';
import Seo from 'frontend/components/Seo';
import withRedirectionManger from 'frontend/HOCs/withRedirectionManger';
import { useTranslation } from '@m0-0a/next-intl';

const Settings = () => {
    const { t } = useTranslation();
    return (
        <>
            <Seo title={t('settings.seo.title')} />
            <SectionBase>
                <SettingsForm />
            </SectionBase>
        </>
    );
};

export default withRedirectionManger(Settings, { requireAuth: true });
