import { Grid, makeStyles } from '@material-ui/core';
import Container from './Container';
import { any, string } from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles({
    SectionBase: {
        minHeight: 'calc(100vh - 86px)',
        '&>*': {
            marginTop: '16px !important',
        },
    },
});

const SectionBase = ({ children, className, ...props }) => {
    const classes = useStyles();

    return (
        <Container maxWidth="sm" disableGutters>
            <Grid
                container
                direction="column"
                className={clsx(classes.SectionBase, {
                    [className]: Boolean(className),
                })}
                {...props}
            >
                {children}
            </Grid>
        </Container>
    );
};

SectionBase.propTypes = {
    children: any,
    className: string,
};

export default SectionBase;
