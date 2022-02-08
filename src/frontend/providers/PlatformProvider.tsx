import NavigationBarProvider from './NavigationBarProvider';
import StatusBarProvider from './StatusBarProvider';

const PlatformProvider = ({ children }) => {
    return (
        <StatusBarProvider>
            <NavigationBarProvider>{children}</NavigationBarProvider>
        </StatusBarProvider>
    );
};

export default PlatformProvider;
