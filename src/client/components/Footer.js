import { Grid, makeStyles } from '@material-ui/core';
import ColorModeSB from './Inputs/ColorModeSB';
import LocalePicker from './Inputs/LocalePicker';

const useStyles = makeStyles(({ palette: { color2, color4, type } }) => ({
    Footer: {
        height: 70,
        backgroundColor: color4[type],
        padding: 16,
        color: color2[type],
    },
    link: {
        cursor: 'pointer',
        padding: 16,
    },
    languagesLogo: {
        fontSize: 24,
        marginRight: 8,
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.Footer}
        >
            <LocalePicker xs={8} storeInLocalStorage />
            <Grid item>
                <ColorModeSB storeInLocalStorage />
            </Grid>
        </Grid>
    );
};

export default Footer;
