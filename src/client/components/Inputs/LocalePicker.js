import { Grid, makeStyles } from '@material-ui/core';
import Languages from '../Svg/Languages';
import { useRouter } from 'next/router';
import Button from './Button';
import locales from '../../constants/locales';

const useStyles = makeStyles({
    languagesLogo: {
        fontSize: 24,
        marginRight: 8,
    },
});

const LocalePicker = (props) => {
    const classes = useStyles();
    const { push, pathname, asPath, query } = useRouter();

    return (
        <Grid container item alignItems="center" {...props}>
            <Languages className={classes.languagesLogo} />
            {locales.map(({ id, label }) => (
                <Button
                    key={id}
                    onClick={() => {
                        push({ pathname, query }, asPath, {
                            locale: id,
                        });
                    }}
                >
                    {label}
                </Button>
            ))}
        </Grid>
    );
};

export default LocalePicker;
