import AuthProvider, { useAuth } from './AuthProvider';
import UsersProvider from './UsersProvider';
import ProfileProvider from './ProfileProvider';
import TasksProvider from './TasksProvider';
import Theme from './Theme';
import UserLayout from '../components/Layouts/UserLayout';
import { any } from 'prop-types';
import SnackbarProvider from './SnackbarProvider';
import PreferencesProvider from './PreferencesProvider';

const Providers = (props) => {
    return (
        <Theme>
            <PreferencesProvider>
                <SnackbarProvider>
                    <AuthProvider>
                        <ProvidersManager {...props} />
                    </AuthProvider>
                </SnackbarProvider>
            </PreferencesProvider>
        </Theme>
    );
};

const ProvidersManager = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        <UsersProvider>
            <ProfileProvider>
                <TasksProvider>
                    <UserLayout>{children}</UserLayout>
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
