import { makeStyles, Tooltip as Org } from '@material-ui/core';

const useClasses = makeStyles(({ palette: { color1, color4, type } }) => ({
    Tooltip: {
        //color: color1[type],
        //backgroundColor: color4[type],
    },
}));

const Tooltip = (props) => {
    const classes = useClasses();
    return <Org {...props} />;
};

export default Tooltip;
