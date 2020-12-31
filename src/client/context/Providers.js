import AuthProvider from './AuthProvider';
import Theme from './Theme';

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            <Theme>{children}</Theme>
        </AuthProvider>
    );
};

export default Providers;
