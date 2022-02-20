import { Grid, makeStyles } from '@material-ui/core';
import ColorModeSB from './Inputs/ColorModeSB';
import LocalePicker from './Inputs/LocalePicker';

const Footer = () => {
    const classes = useStyles();

    return (
        <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            className={classes.Footer}
        >
            <LocalePicker xs={8} />
            <Grid item>
                <ColorModeSB storeInLocalStorage />
            </Grid>
        </Grid>
    );
};

export default Footer;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { primary, text } }) => ({
    Footer: {
        height: 70,
        backgroundColor: primary.main,
        padding: 16,
        color: text.secondary,
        marginTop: 'auto',
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
