import { FC } from 'react';
import {
    Select,
    makeStyles,
    MenuItem,
    GridProps,
    Grid,
    SelectProps,
} from '@material-ui/core';
import locales from '../../constants/locales';
import { usePreferences } from 'frontend/providers/PreferencesProvider';
import { useLocale } from '@m0-0a/next-intl';
import Languages from '../Svg/Languages';
import { LocaleVariant } from 'src/db_schemas';

const LocalePicker: FC<LocalePickerPropsType> = ({ color, ...props }) => {
    const classes = useStyles({ color });
    const { updateLocalPreferences } = usePreferences();
    const { locale, setLocale } = useLocale();

    const handleLanguageChange: SelectProps['onChange'] = ({
        target: { value: newLang },
    }) => {
        setLocale(newLang as LocaleVariant);
        updateLocalPreferences({ lang: newLang as LocaleVariant });
    };

    return (
        <Grid container item alignItems="center" {...props}>
            <Select
                variant="outlined"
                value={locale}
                className={classes.LocalePicker}
                onChange={handleLanguageChange}
                IconComponent={Languages}
                MenuProps={{
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                    transformOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    },
                    getContentAnchorEl: null,
                }}
            >
                {locales.map(({ label, id, ...item }, i) => (
                    <MenuItem key={id + i} value={id} {...item}>
                        {label}
                    </MenuItem>
                ))}
            </Select>
        </Grid>
    );
};

export default LocalePicker;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(
    ({ palette: { primary }, spacing, direction }) => ({
        LocalePicker: {
            height: 38.5,
            borderRadius: 20,
            //@ts-ignore
            color: ({ color }) => primary[color || 'main'],
            '&>.MuiSelect-select': {
                paddingTop: 0,
                paddingBottom: 0,
                height: 'inherit',
                display: 'flex',
                alignItems: 'center',
                paddingRight: (direction === 'ltr' ? 14 : 35) + 'px !important',
                paddingLeft: (direction === 'ltr' ? 35 : 14) + 'px !important',
                '&:focus': {
                    borderRadius: 20,
                },
            },
            '& .MuiSelect-icon': {
                //@ts-ignore
                color: ({ color }) => primary[color || 'main'],
                margin: spacing(0, 0.25),
                fontWeight: 'bold',
                fontSize: 20,
                left: direction === 'ltr' ? 7 : 'unset',
                right: direction === 'ltr' ? 'unset' : 7,
            },
            '& .MuiSelect-iconOpen': {
                transform: 'unset',
            },
            '& .MuiOutlinedInput-notchedOutline': {
                //@ts-ignore
                borderColor: ({ color }) =>
                    `${primary[color || 'main']} !important`,
            },
        },
    })
);

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type LocalePickerPropsType = GridProps & {
    color?: 'contrastText';
};

export type LocaleType = {
    code: string;
    label: string;
};
