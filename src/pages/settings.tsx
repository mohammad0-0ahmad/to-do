import useTranslation from 'next-translate/useTranslation';
import SettingsForm from 'frontend/components/Forms/SettingsForm';
import SectionBase from 'frontend/components/SectionBase';
import Seo from 'frontend/components/Seo';
import withRedirectionManger from 'frontend/HOCs/withRedirectionManger';

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
