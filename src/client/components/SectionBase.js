import { Grid, makeStyles } from '@material-ui/core';
import Container from './Container';
import { any } from 'prop-types';

const useStyles = makeStyles({
    SectionBase: {
        '&>*': {
            marginTop: '16px !important',
        },
    },
});

const SectionBase = ({ children, ...props }) => {
    const classes = useStyles();

    return (
        <Container maxWidth="sm" disableGutters>
            <Grid
                container
                direction="column"
                {...props}
                className={classes.SectionBase}
            >
                {children}
            </Grid>
        </Container>
    );
};

SectionBase.propTypes = {
    children: any,
};

export default SectionBase;
