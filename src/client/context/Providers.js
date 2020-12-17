import AuthProvider, { useAuth } from './AuthProvider';
import TasksProvider from './TasksProvider';
import Theme from './Theme';

const RequireAuth = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        <TasksProvider>{children}</TasksProvider>
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
