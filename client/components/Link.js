import NextLink from 'next/link';
import { Link as MUILink, makeStyles } from '@material-ui/core';
import { string, element, arrayOf, oneOfType } from 'prop-types';

const useStyles = makeStyles({
    Link: {
        color: 'inherit',
        cursor: 'pointer',
    },
});

const Link = ({ href, children, ...props }) => {
    const classes = useStyles();
    return (
        <NextLink href={href}>
            <MUILink classes={{ root: classes.Link }} {...props}>
                {children}
            </MUILink>
        </NextLink>
    );
};

Link.propTypes = {
    children: oneOfType([element, arrayOf(element), string]),
    href: string.isRequired,
};
Link.defaultProps = {
    children: null,
};
export default Link;
