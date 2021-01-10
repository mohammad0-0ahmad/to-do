import '../client/base.css';
import Providers from '../client/context/Providers';

const MyApp = ({ Component, pageProps }) => {
    return (
        <Providers {...pageProps}>
            <Component {...pageProps} />
        </Providers>
    );
};

export default MyApp;
