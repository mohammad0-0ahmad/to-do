import { Grid, makeStyles, Typography } from '@material-ui/core';
import Trans from '../Trans';
import { string } from 'prop-types';

const useStyles = makeStyles(({ palette: { color4, type } }) => ({
    NoContent: {
        color: color4[type],
        height: '100%',
        minHeight: ({ minHeight }) => (minHeight ? minHeight : '100vh'),
    },
}));

const NoContent = ({ CustomMessageCode, minHeight }) => {
    const classes = useStyles({ minHeight });
    return (
        <Grid
            container
            alignContent="center"
            justify="center"
            className={classes.NoContent}
        >
            <Typography component="p" variant="h6">
                <Trans id={CustomMessageCode || 'NoContent.label'} />
            </Typography>
        </Grid>
    );
};

NoContent.propTypes = {
    CustomMessageCode: string,
    minHeight: string,
};

export default NoContent;
