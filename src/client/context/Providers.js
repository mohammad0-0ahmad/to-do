import AuthProvider, { useAuth } from './AuthProvider';
import PeopleProvider from './PeopleProvider';
import ProfileProvider from './ProfileProvider';
import TasksProvider from './TasksProvider';
import Theme from './Theme';

const RequireAuth = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        <PeopleProvider>
            <ProfileProvider>
                <TasksProvider>{children}</TasksProvider>
            </ProfileProvider>
        </PeopleProvider>
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
