import NextLink from 'next/link';
import { Link as MUILink, LinkProps, makeStyles } from '@material-ui/core';
import { useLanguageQuery } from 'next-export-i18n';

const Link: FC<LinkProps> = ({ href, children, ...props }) => {
    const classes = useStyles();
    const [query] = useLanguageQuery();

    return (
        <NextLink
            href={{
                query: query,
                pathname: href,
            }}
        >
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
