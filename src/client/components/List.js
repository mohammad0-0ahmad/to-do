import { List as Org, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { string, any, bool } from 'prop-types';

const useStyles = makeStyles(({ palette: { color3, color4, type } }) => ({
    List: {
        color: color3[type],
        backgroundColor: color4[type],
        padding: ({ scrollable }) => (scrollable ? 4 : ''),
    },
    contentContainer: {
        maxHeight: 500,
        overflow: 'auto',
    },
}));

const List = ({ className, children, scrollable, ...props }) => {
    const classes = useStyles({ scrollable });

    return (
        <Org
            {...props}
            className={clsx(classes.List, {
                [className]: Boolean(className),
            })}
        >
            {scrollable ? (
                <div className={classes.contentContainer}>{children}</div>
            ) : (
                children
            )}
        </Org>
    );
};

List.propTypes = {
    children: any,
    className: string,
    scrollable: bool,
};

export default List;
