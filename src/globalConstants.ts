import { VariantType } from 'notistack';

/* -------------------------------------------------------------------------- */
/*                                    Constants                               */
/* -------------------------------------------------------------------------- */
export type ResponseStatusType = {
    [K in VariantType]: K;
};

export const ResponseStatus: ResponseStatusType = {
    default: 'default',
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'warning',
};
