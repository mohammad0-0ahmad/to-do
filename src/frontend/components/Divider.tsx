import { Divider as Org, DividerProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const Divider: FC<DividerPropsType> = ({ className, ...props }) => {
    const classes = useStyles();
    return <Org {...props} className={clsx(classes.Divider, className)} />;
};

export default Divider;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type DividerPropsType = DividerProps & {};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { type } }) => ({
    Divider: {
        margin: '0!important',
        backgroundColor: type === 'dark' ? 'rgba(255, 255, 255, 0.2)' : '',
    },
}));
