import StatusbarProvider from './StatusProvider';

const PlatformProvider = ({ children }) => {
    return <StatusbarProvider>{children}</StatusbarProvider>;
};

export default PlatformProvider;
