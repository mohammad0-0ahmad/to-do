import { Grid, makeStyles } from '@material-ui/core';
import Container from './Container';
import { oneOfType, element, arrayOf } from 'prop-types';

const useStyles = makeStyles({
    SectionBase: {
        '&>*': {
            marginTop: 16,
        },
    },
});

const SectionBase = ({ children, ...props }) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} md={4}>
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
        </Grid>
    );
};

SectionBase.propTypes = {
    children: oneOfType([element, arrayOf(element)]),
};

export default SectionBase;
