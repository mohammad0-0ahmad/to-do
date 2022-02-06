import {
    Box,
    Container as MuiContainer,
    ContainerProps,
    makeStyles,
} from '@material-ui/core';

const Container: FC<ContainerPropsType> = ({
    children,
    upperPadding = false,
    pageContainer = false,
    ...props
}) => {
    const classes = useStyles({ upperPadding });
    const content = (
        <MuiContainer maxWidth="xl" className={classes.content} {...props}>
            {children}
        </MuiContainer>
    );

    return pageContainer ? (
        <Box className={classes.Container}>{content}</Box>
    ) : (
        content
    );
};

export default Container;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type ContainerPropsType = ContainerProps & {
    upperPadding?: boolean;
    pageContainer?: boolean;
};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { background } }) => ({
    '@global': {
        body: {
            backgroundColor: background.default,
        },
    },
    Container: {
        width: '100%',
        margin: 'auto',
    },
    content: {
        //@ts-ignore
        paddingTop: ({ upperPadding }) => (upperPadding ? 70 : 0),
    },
}));