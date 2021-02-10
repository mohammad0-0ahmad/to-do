import AuthProvider, { useAuth } from './AuthProvider';
import UsersProvider from './UsersProvider';
import ProfileProvider from './ProfileProvider';
import TasksProvider from './TasksProvider';
import Theme from './Theme';
import UserLayout from '../components/Layouts/UserLayout';
import VisitorLayout from '../components/Layouts/VisitorLayout';
import SnackbarProvider from './SnackbarProvider';
import PreferencesProvider from './PreferencesProvider';
import { any } from 'prop-types';
import NotificationsProvider from './NotificationsProvider';

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
                <NotificationsProvider>
                    <TasksProvider>
                        <UserLayout>{children}</UserLayout>
                    </TasksProvider>
                </NotificationsProvider>
            </ProfileProvider>
        </UsersProvider>
    ) : (
        <VisitorLayout>{children}</VisitorLayout>
    );
};

ProvidersManager.propTypes = {
    children: any,
};

export default Providers;
