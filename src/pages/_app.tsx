import Providers from 'frontend/providers/Providers';
import { makeStyles } from '@material-ui/core';

const MyApp = ({ Component, pageProps }) => {
    useStyles();
    return (
        <Providers>
            <Component {...pageProps} />
        </Providers>
    );
};

export default MyApp;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({}) => ({
    '@global': {
        '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            userSelect: 'none',
            '-webkit-user-drag': 'none',
        },
        'html,body ': {
            width: '100%',
            height: '100%',
        },
        '#__next': {
            display: 'flex',
            flexFlow: 'column',
            minHeight: '100%',
        },
        form: {
            display: 'contents',
        },
    },
}));
