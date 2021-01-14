import { Divider as Org, makeStyles } from '@material-ui/core';
import { string } from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles(({ palette: { type } }) => ({
    Divider: {
        margin: '0!important',
        backgroundColor: type === 'dark' ? 'rgba(255, 255, 255, 0.2)' : '',
    },
}));

const Divider = ({ className, ...props }) => {
    const classes = useStyles();
    return <Org {...props} className={clsx(classes.Divider, className)} />;
};

Divider.propTypes = {
    className: string,
};

export default Divider;
