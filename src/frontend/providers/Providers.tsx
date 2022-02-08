import AuthProvider, { useAuth } from './AuthProvider';
import UsersProvider from './UsersProvider';
import ProfileProvider from './ProfileProvider';
import TasksProvider from './TasksProvider';
import ThemeProvider from './ThemeProvider';
import UserLayout from '../components/Layouts/UserLayout';
import VisitorLayout from '../components/Layouts/VisitorLayout';
import SnackbarProvider from './SnackbarProvider';
import PreferencesProvider from './PreferencesProvider';
import NotificationsProvider from './NotificationsProvider';
import PlatformProvider from './PlatformProvider';

const Providers: FC<any> = (props) => {
    return (
        <ThemeProvider>
            <PreferencesProvider>
                <PlatformProvider>
                    <SnackbarProvider>
                        <AuthProvider>
                            <ProvidersManager {...props} />
                        </AuthProvider>
                    </SnackbarProvider>
                </PlatformProvider>
            </PreferencesProvider>
        </ThemeProvider>
    );
};

const ProvidersManager: FC<any> = ({ children }) => {
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

export default Providers;
