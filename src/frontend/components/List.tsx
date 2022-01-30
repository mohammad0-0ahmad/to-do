import { List as MuiList, ListProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const List: FC<ListPropsType> = ({
    className,
    children,
    scrollable = false,
    ...props
}) => {
    const classes = useStyles({ scrollable });

    return (
        <MuiList
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
        </MuiList>
    );
};

export default List;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type ListPropsType = ListProps & {
    scrollable?: boolean;
};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { color3, color4, type } }) => ({
    List: {
        color: color3[type],
        backgroundColor: color4[type],
        //@ts-ignore
        padding: ({ scrollable }) => (scrollable ? 4 : ''),
    },
    contentContainer: {
        maxHeight: 500,
        overflow: 'auto',
    },
}));
