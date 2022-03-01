declare type FC<P = {}> = {
    (props: P, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
};
declare type FCWC<P = {}> = (props: P & PropsWithChildren) => JSX.Element;
declare type PropsWithChildren<P = {}> = React.PropsWithChildren<P>;
declare type SetStateType<S> = React.Dispatch<React.SetStateAction<S>>;
declare type StateType<S> = [S, React.Dispatch<React.SetStateAction<S>>];
