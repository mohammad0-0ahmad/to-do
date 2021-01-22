import AuthProvider, { useAuth } from './AuthProvider';
import UsersProvider from './UsersProvider';
import ProfileProvider from './ProfileProvider';
import TasksProvider from './TasksProvider';
import Theme from './Theme';
import Layout from '../components/layout';
import { any, object, string } from 'prop-types';
import I18nProvider from 'next-translate/I18nProvider';
import SnackbarProvider from './SnackbarProvider';

const Providers = ({ _lang, _ns, ...props }) => {
    return (
        <I18nProvider lang={_lang} namespaces={_ns}>
            <Theme>
                <SnackbarProvider>
                    <AuthProvider>
                        <ProvidersManager {...props} />
                    </AuthProvider>
                </SnackbarProvider>
            </Theme>
        </I18nProvider>
    );
};

Providers.propTypes = {
    children: any,
    _ns: object,
    _lang: string,
};

const ProvidersManager = ({ children, ...props }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        <UsersProvider>
            <ProfileProvider>
                <TasksProvider>
                    <Layout {...props}>{children}</Layout>
                </TasksProvider>
            </ProfileProvider>
        </UsersProvider>
    ) : (
        children
    );
};

ProvidersManager.propTypes = {
    children: any,
};

export default Providers;
