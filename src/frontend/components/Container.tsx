import {
    Box,
    Container as MuiContainer,
    ContainerProps,
    makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import { isWeb } from 'frontend/constants/platform';

const Container: FC<ContainerPropsType> = ({
    children,
    upperPadding = false,
    pageContainer = false,
    ...props
}) => {
    const classes = useStyles({ upperPadding, pageContainer });
    const content = (
        <MuiContainer maxWidth="xl" className={classes.content} {...props}>
            {children}
        </MuiContainer>
    );

    return pageContainer ? (
        <Box className={clsx(classes.Container, classes.customScrollbar)}>
            {content}
        </Box>
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

const useStyles = makeStyles(
    ({ palette: { primary, background }, spacing, breakpoints: { down } }) => ({
        '@global': {
            body: {
                backgroundColor: background.default,
            },
        },
        Container: {
            width: '100%',
            //@ts-ignore
            margin: ({ pageContainer }) =>
                pageContainer ? spacing(2, 0, 0, 0) : 'auto',
        },
        content: {
            //@ts-ignore
            marginTop: ({ upperPadding }) => (upperPadding ? 55 : 0),
            [down('xs')]: {
                //@ts-ignore
                marginTop: ({ upperPadding }) => (upperPadding ? 70 : 0),
                //@ts-ignore
                paddingBottom: ({ pageContainer }) => (pageContainer ? 30 : 0),
            },
        },
        customScrollbar: {
            overflowY: isWeb ? 'scroll' : 'unset',
            '&::-webkit-scrollbar': {
                width: 16,
            },
            '&::-webkit-scrollbar-thumb': {
                borderRadius: 8,
                border: ' 4px solid transparent',
                backgroundClip: 'content-box',
                backgroundColor: '#aaaaaa',
                height: 56,
                '&:hover': {
                    backgroundColor: primary.main,
                },
            },
        },
    })
);
