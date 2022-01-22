import { ButtonGroup, makeStyles } from '@material-ui/core';
import Button from './Button';
import Trans from '../Trans';
import clsx from 'clsx';
import userStatus from '../../constants/userStatus';

const statusArr = [
    'auto',
    userStatus.available,
    userStatus.busy,
    userStatus.unavailable,
];

const useStyles = makeStyles(
    ({ palette: { color2, color4, grey, yellow, green, type } }) => ({
        UserStatus: {
            color: color2[type],
            '&>*': {
                filter: 'saturate(0.3)',
            },
        },
        selected: {
            filter: 'saturate(1)',
            textDecoration: 'underline',
        },
        [statusArr[0]]: {
            backgroundColor: color4[type],
        },
        [statusArr[1]]: {
            backgroundColor: green[type],
        },
        [statusArr[2]]: {
            backgroundColor: yellow[type],
        },
        [statusArr[3]]: {
            backgroundColor: grey[type],
        },
    })
);

const UserStatus = ({ onChange, value, className, ...props }) => {
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
            className={clsx(classes.UserStatus, className)}
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

export default UserStatus;
