import NextLink from 'next/link';
import { Link as MUILink, LinkProps, makeStyles } from '@material-ui/core';

const Link: FC<LinkProps> = ({ href, children, ...props }) => {
    const classes = useStyles();
    return (
        <NextLink href={href}>
            <MUILink classes={{ root: classes.Link }} {...props}>
                {children}
            </MUILink>
        </NextLink>
    );
};

export default Link;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles({
    Link: {
        color: 'inherit',
        cursor: 'pointer',
    },
});
