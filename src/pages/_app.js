import { useEffect } from 'react';
import '../client/base.css';
import Providers from '../client/context/Providers';

// eslint-disable-next-line react/prop-types
const MyApp = ({ Component, pageProps }) => {
    useEffect(() => {
        try {
            const el = document.createElement('pwa-update');
            document.body.appendChild(el);
            // eslint-disable-next-line no-empty
        } catch (error) {}
    }, []);

    return (
        <Providers>
            <Component {...pageProps} />
        </Providers>
    );
};

export default MyApp;
