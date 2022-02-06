import { ProviderContext, useSnackbar, VariantType } from 'notistack';

import Trans, { TransPropsType } from '../components/Trans';

const withSnackbarManager: WithSnackbarManagerHOCType = (Component) => {
    const SnackbarManager = (props) => {
        const { enqueueSnackbar } = useSnackbar();

        const showSnackbar: showSnackbarType = ({
            code,
            values,
            components,
            status,
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

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type WithSnackbarManagerHOCType = (Component: FC<any>) => FC<any>;

export type WithSnackbarManagerType<P = {}> = {
    showSnackbar: showSnackbarType;
} & P;

type EnqueueSnackbarOptionType = Parameters<
    ProviderContext['enqueueSnackbar']
>['1'];

export type SnackbarDataType = {
    code?: TransPropsType['id'];
    status?: VariantType;
};

export type showSnackbarType = (
    props: Omit<TransPropsType, 'id'> &
        EnqueueSnackbarOptionType &
        SnackbarDataType
) => void;

export type ResponseWithSnackbarDataType<
    T = {},
    P = unknown
> = T extends Promise<P>
    ? Promise<SnackbarDataType & P>
    : Promise<SnackbarDataType & T>;
