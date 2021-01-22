import { useSnackbar } from 'notistack';
import Trans from './Trans';

const withSnackbarManager = (Component) => {
    const SnackbarManager = (props) => {
        const { enqueueSnackbar } = useSnackbar();
        const showSnackbar = ({ code, status, ...options }) => {
            //TODO:Delete console logs
            console.log(code);
            console.log(status);
            code &&
                enqueueSnackbar(<Trans id={`SnackbarManager.${code}`} />, {
                    ...options,
                    variant: status,
                });
        };
        return <Component {...props} showSnackbar={showSnackbar} />;
    };
    return SnackbarManager;
};

export default withSnackbarManager;
