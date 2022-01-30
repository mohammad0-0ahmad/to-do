import { Grid, GridProps, makeStyles } from '@material-ui/core';
import Languages from '../Svg/Languages';
import { useRouter } from 'next/router';
import Button from './Button';
import locales from '../../constants/locales';
import { usePreferences } from '../../providers/PreferencesProvider';
import clsx from 'clsx';

const LocalePicker: FC<LocalePickerPropsType> = ({
    storeInLocalStorage,
    value,
    ...props
}) => {
    const classes = useStyles();
    const { push, pathname, asPath, query, locale } = useRouter();
    const { updateLocalPreferences } = usePreferences();

    const handleLanguageChange = (lang) => {
        push({ pathname, query }, asPath, {
            locale: lang,
        });
        storeInLocalStorage && updateLocalPreferences({ lang });
    };

    return (
        <Grid container item alignItems="center" {...props}>
            <Languages className={classes.languagesLogo} />
            {locales.map(({ id, label }) => (
                <Button
                    className={clsx({
                        [classes.currentLang]: (value || locale) === id,
                    })}
                    key={id}
                    onClick={() => handleLanguageChange(id)}
                >
                    {label}
                </Button>
            ))}
        </Grid>
    );
};

export default LocalePicker;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type LocalePickerPropsType = GridProps & {
    storeInLocalStorage?: boolean;
    value?: string;
};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles({
    languagesLogo: {
        fontSize: 24,
        marginRight: 8,
    },
    currentLang: {
        borderBottom: '2px solid',
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
});
