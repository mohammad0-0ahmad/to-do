import AuthProvider, { useAuth } from './AuthProvider';
import UsersProvider from './UsersProvider';
import ProfileProvider from './ProfileProvider';
import TasksProvider from './TasksProvider';
import Theme from './Theme';
import Layout from '../components/layout';
import { any } from 'prop-types';

const Providers = (props) => {
    return (
        <Theme>
            <AuthProvider>
                <ProvidersManager {...props} />
            </AuthProvider>
        </Theme>
    );
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
