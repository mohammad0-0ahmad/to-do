import AuthProvider, { useAuth } from './AuthProvider';
import UsersProvider from './UsersProvider';
import ProfileProvider from './ProfileProvider';
import TasksProvider from './TasksProvider';
import Theme from './Theme';

const RequireAuth = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        <UsersProvider>
            <ProfileProvider>
                <TasksProvider>{children}</TasksProvider>
            </ProfileProvider>
        </UsersProvider>
    ) : (
        children
    );
};

const Providers = ({ children }) => {
    return (
        <Theme>
            <AuthProvider>
                <RequireAuth>{children}</RequireAuth>
            </AuthProvider>
        </Theme>
    );
};

export default Providers;
