import '../frontend/base.css';
import Providers from '../frontend/providers/Providers';

const MyApp = ({ Component, pageProps }) => {
    return (
        <Providers>
            <Component {...pageProps} />
        </Providers>
    );
};

export default MyApp;
