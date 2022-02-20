import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    makeStyles,
    SelectProps,
} from '@material-ui/core';
import Trans from 'frontend/components/Trans';
import { privacyIcons } from 'frontend/constants/task';
import { TaskPrivacy } from 'src/db_schemas';
import clsx from 'clsx';
import { WithTaskCardItemBasePropsType } from '../TaskCard';
import TaskCardTextFieldItem from './TaskCardTextFieldItem';

const TaskCardPrivacyItem: FC<TaskCardPrivacyItemPropsType> = ({
    isEditMode,
    label,
    gridProps: { className, ...gridProps },
    value = TaskPrivacy.public,
    ...props
}) => {
    const classes = useStyles();

    if (isEditMode) {
        return (
            <Grid
                item
                className={clsx(classes.privacy, className)}
                {...gridProps}
            >
                <Grid container>
                    <FormControl>
                        <InputLabel>
                            <Trans id={label} />
                        </InputLabel>
                        <Select
                            value={value}
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'left',
                                },
                                getContentAnchorEl: null,
                            }}
                            {...props}
                        >
                            {Object.values(TaskPrivacy).map((value) => {
                                const PrivacyIcon = privacyIcons[value];
                                return (
                                    <MenuItem key={value} value={value}>
                                        <Grid container alignItems="center">
                                            <PrivacyIcon
                                                className={clsx(
                                                    classes.privacyIcon,
                                                    classes[
                                                        `privacy-icon-${value}`
                                                    ]
                                                )}
                                            />
                                            <Trans
                                                id={`TaskCard.privacyOptions.${value}`}
                                            />
                                        </Grid>
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        );
    } else {
        const PrivacyIcon = privacyIcons[value];
        return (
            <TaskCardTextFieldItem
                {...{
                    isEditMode,
                    label,
                    value: (
                        <Grid container alignItems="center">
                            <PrivacyIcon
                                className={clsx(
                                    classes.privacyIcon,
                                    classes[`privacy-icon-${value}`]
                                )}
                            />
                            <Trans id={`TaskCard.privacyOptions.${value}`} />
                        </Grid>
                    ),
                    gridProps: { ...gridProps, className },
                }}
            />
        );
    }
};

export default TaskCardPrivacyItem;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type TaskCardPrivacyItemPropsType = WithTaskCardItemBasePropsType<
    Omit<SelectProps, 'type' | 'value'> & {
        label: string;
        value?: TaskPrivacy;
    }
>;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(
    ({ palette: { primary, warning, error, text, transparent } }) => ({
        privacy: {
            '& .MuiInputLabel-root': {
                color: transparent,
            },
            '& .MuiInput-root': {
                color: primary.main,
            },
        },
        privacyIcon: {
            marginRight: 4,
            fontSize: 20,
            '& path': {
                stroke: text.primary,
                strokeWidth: '1%',
            },
        },
        'privacy-icon-public': {
            color: primary.main,
        },
        'privacy-icon-friends': {
            color: warning.main,
        },
        'privacy-icon-private': {
            color: error.main,
        },
    })
);
