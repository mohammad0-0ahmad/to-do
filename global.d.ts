declare type FC<P = {}> = React.VoidFunctionComponent<P>;
declare type PropsWithChildren<P = {}> = React.PropsWithChildren<P>;
declare type SetStateType<S> = React.Dispatch<React.SetStateAction<S>>;
declare type StateType<S> = [S, React.Dispatch<React.SetStateAction<S>>];
