import SettingsForm from '../client/components/Forms/SettingsForm';
import SectionBase from '../client/components/SectionBase';
import withRedirectionManger from '../client/components/withRedirectionManger';

const Settings = () => {
    return (
        <SectionBase>
            <SettingsForm />
        </SectionBase>
    );
};

export default withRedirectionManger(Settings, { requireAuth: true });
