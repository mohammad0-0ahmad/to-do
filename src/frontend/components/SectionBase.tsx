import { Grid, GridProps, makeStyles } from '@material-ui/core';
import Container from './Container';
import clsx from 'clsx';

const SectionBase: FC<GridProps> = ({ children, className, ...props }) => {
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

export default SectionBase;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles({
    SectionBase: {
        minHeight: 'calc(100vh - 86px)',
        '&>*': {
            marginTop: '16px !important',
        },
    },
});
