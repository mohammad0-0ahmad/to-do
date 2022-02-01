import { ButtonGroup, ButtonGroupProps, makeStyles } from '@material-ui/core';
import Button from './Button';
import Trans from '../Trans';
import clsx from 'clsx';
import userStatus, { UserStatusType } from '../../constants/userStatus';

const statusArr = [
    userStatus.auto,
    userStatus.available,
    userStatus.busy,
    userStatus.unavailable,
] as const;

const UserStatusPicker: FC<UserStatusPropsType> = ({
    onChange,
    value,
    className,
    ...props
}) => {
    const classes = useStyles();

    const handleClick = (newValue) => {
        newValue = newValue === statusArr[0] ? userStatus.online : newValue;
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
                            (i === 0 && value === userStatus.online),
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
    value?: Extract<UserStatusType, typeof statusArr[number] | 'online'>;
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
        [userStatus.auto]: {
            backgroundColor: primary.main,
        },
        [userStatus.available]: {
            backgroundColor: success.main,
        },
        [userStatus.busy]: {
            backgroundColor: warning.main,
        },
        [userStatus.unavailable]: {
            backgroundColor: grey['500'],
        },
    })
);
