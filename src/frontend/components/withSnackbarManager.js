import { useSnackbar } from 'notistack';
import Trans from './Trans';

const withSnackbarManager = (Component) => {
    const SnackbarManager = (props) => {
        const { enqueueSnackbar } = useSnackbar();
        const showSnackbar = ({
            code,
            status,
            values,
            components,
            ...options
        }) => {
            code &&
                enqueueSnackbar(
                    <Trans
                        id={`SnackbarManager.${code}`}
                        {...{ values, components }}
                    />,
                    {
                        ...options,
                        variant: status,
                    }
                );
        };
        return <Component {...props} showSnackbar={showSnackbar} />;
    };
    return SnackbarManager;
};

export default withSnackbarManager;
