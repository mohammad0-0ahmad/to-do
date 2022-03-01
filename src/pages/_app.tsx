import Providers from 'frontend/providers/Providers';
import initGlobals from '../../globals';
initGlobals();

const MyApp = ({ Component, pageProps }) => {
    return (
        <Providers>
            <Component {...pageProps} />
        </Providers>
    );
};

export default MyApp;
