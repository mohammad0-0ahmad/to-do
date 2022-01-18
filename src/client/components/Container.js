import { Box, Container as Org, makeStyles } from '@material-ui/core';
import { bool, oneOfType, element, arrayOf } from 'prop-types';

const useStyles = makeStyles(({ palette: { color2, type } }) => ({
    '@global': {
        body: {
            backgroundColor: color2[type],
        },
    },
    Container: {
        width: '100%',
        margin: 'auto',
    },
    content: {
        paddingTop: ({ upperPadding }) => {
            return upperPadding ? 70 : 0;
        },
    },
}));

const Container = ({
    children,
    upperPadding = false,
    pageContainer,
    ...props
}) => {
    const classes = useStyles({ upperPadding });
    const content = (
        <Org maxWidth="xl" className={classes.content} {...props}>
            {children}
        </Org>
    );

    return pageContainer ? (
        <Box className={classes.Container}>{content}</Box>
    ) : (
        content
    );
};

Container.propTypes = {
    pageContainer: bool,
    upperPadding: bool,
    children: oneOfType([element, arrayOf(element)]),
};

Container.defaultProps = {
    pageContainer: false,
    upperPadding: false,
};

export default Container;
