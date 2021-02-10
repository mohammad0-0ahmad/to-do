import { Grid, makeStyles, Typography } from '@material-ui/core';
import Trans from '../Trans';
import clsx from 'clsx';

import { string } from 'prop-types';

const useStyles = makeStyles(({ palette: { color4, type } }) => ({
    NoContent: {
        color: color4[type],
        height: '100%',
        flex: 'auto',
        textAlign: 'center',
    },
}));

const NoContent = ({ CustomMessageCode, className }) => {
    const classes = useStyles();
    return (
        <Grid
            container
            alignContent="center"
            justify="center"
            className={clsx(classes.NoContent, {
                [className]: Boolean(className),
            })}
        >
            <Typography component="p" variant="h6">
                <Trans id={CustomMessageCode || 'NoContent.label'} />
            </Typography>
        </Grid>
    );
};

NoContent.propTypes = {
    CustomMessageCode: string,
    className: string,
};

export default NoContent;
