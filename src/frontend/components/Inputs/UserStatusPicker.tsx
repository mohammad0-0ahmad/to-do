import { ButtonGroup, ButtonGroupProps, makeStyles } from '@material-ui/core';
import Button from './Button';
import Trans from '../Trans';
import clsx from 'clsx';
import { UserStatus } from 'src/db_schemas';

const statusArr = [
    UserStatus.auto,
    UserStatus.available,
    UserStatus.busy,
    UserStatus.unavailable,
] as const;

const UserStatusPicker: FC<UserStatusPropsType> = ({
    onChange,
    value,
    className,
    ...props
}) => {
    const classes = useStyles();

    const handleClick = (newValue) => {
        newValue = newValue === statusArr[0] ? UserStatus.online : newValue;
        onChange && value !== newValue && onChange(newValue);
    };

    return (
        <ButtonGroup
            {...props}
            disableElevation
            variant="outlined"
            className={clsx(classes.UserStatusPicker, className)}
        >
            {statusArr.map((status, i) => (
                <Button
                    onClick={() => handleClick(status)}
                    key={status}
                    className={clsx(classes[status], {
                        [classes.selected]:
                            status === value ||
                            (i === 0 && value === UserStatus.online),
                    })}
                >
                    <Trans id={`UserStatus.${status}`} />
                </Button>
            ))}
        </ButtonGroup>
    );
};

export default UserStatusPicker;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type UserStatusPropsType = ButtonGroupProps & {
    value?: Extract<UserStatus, typeof statusArr[number] | UserStatus.online>;
};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(
    ({ palette: { primary, text, grey, warning, success } }) => ({
        UserStatusPicker: {
            color: text.secondary,
            '&>*': {
                filter: 'saturate(0.3)',
            },
        },
        selected: {
            filter: 'saturate(1)',
            textDecoration: 'underline',
        },
        //TODO: use map fun instead
        [UserStatus.auto]: {
            backgroundColor: primary.main,
        },
        [UserStatus.available]: {
            backgroundColor: success.main,
        },
        [UserStatus.busy]: {
            backgroundColor: warning.main,
        },
        [UserStatus.unavailable]: {
            backgroundColor: grey['500'],
        },
    })
);
