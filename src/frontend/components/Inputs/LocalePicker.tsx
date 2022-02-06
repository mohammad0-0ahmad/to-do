import { Grid, GridProps, makeStyles } from '@material-ui/core';
import Languages from '../Svg/Languages';
import Button from './Button';
import locales from '../../constants/locales';
import { usePreferences } from '../../providers/PreferencesProvider';
import clsx from 'clsx';
import { useLanguageQuery } from 'next-export-i18n';
import { useRouter } from 'next/router';

const LocalePicker: FC<LocalePickerPropsType> = ({ ...props }) => {
    const classes = useStyles();
    const { updateLocalPreferences } = usePreferences();
    const [query] = useLanguageQuery();
    const locale = query?.lang;
    const { push, pathname, asPath } = useRouter();
    const handleLanguageChange = (lang) => {
        push({ pathname, query: { lang } }, asPath);
        updateLocalPreferences({ lang });
    };

    return (
        <Grid container item alignItems="center" {...props}>
            <Languages className={classes.languagesLogo} />
            {locales.map(({ id, label }) => (
                <Button
                    key={id}
                    className={clsx({
                        [classes.currentLang]: locale === id,
                    })}
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

export type LocalePickerPropsType = GridProps;

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
