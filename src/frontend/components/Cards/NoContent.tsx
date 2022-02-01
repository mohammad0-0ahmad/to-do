import { Grid, makeStyles, Typography } from '@material-ui/core';
import Trans from '../Trans';
import clsx from 'clsx';

const NoContent: FC<NoContentPropsType> = ({
    CustomMessageCode,
    className,
}) => {
    const classes = useStyles();
    return (
        <Grid
            container
            alignContent="center"
            justifyContent="center"
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

export default NoContent;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type NoContentPropsType = {
    CustomMessageCode?: string;
    className?: string;
};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { primary } }) => ({
    NoContent: {
        color: primary.main,
        height: '100%',
        flex: 'auto',
        textAlign: 'center',
    },
}));
